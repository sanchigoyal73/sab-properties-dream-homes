/**
 * Spam and injection protection for the website's lead form endpoint.
 *
 * HOW TO INSTALL (Google Sheet → Extensions → Apps Script):
 *   1. Rename your existing `function doPost(e)` to `function handleLead_(e)`.
 *      Don't change anything inside it.
 *   2. Paste this whole file below it (or into a new script file in the same project).
 *   3. Deploy → Manage deployments → edit the existing deployment → Version: "New version" → Deploy.
 *      Editing the existing deployment keeps the same URL, so the website needs no change.
 *
 * WHAT IT DOES:
 *   - Silently drops submissions where the hidden "website" field was filled in (bots).
 *   - Silently drops an exact repeat (same phone, service and message) within 10 minutes: double clicks, floods.
 *   - Escapes values that start with = + - @ so nobody can plant spreadsheet formulas in your sheet.
 *   - Cuts every value to 2,000 characters.
 *   - Instead of dropping them, moves doubtful leads to a "Suspected spam" tab so no real lead is lost:
 *     posts that didn't come from the website form, posts made under 2 seconds after the page
 *     opened, invalid phone numbers, and anything past 30 submissions in 10 minutes.
 */

const HONEYPOT_FIELD = "website";
const MAX_VALUE_LENGTH = 2000;
const MIN_ELAPSED_MS = 2000;
const DUPLICATE_WINDOW_SECONDS = 10 * 60;
const BURST_LIMIT = 30; // submissions per 10 minutes before everything goes to "Suspected spam"
const SPAM_SHEET_NAME = "Suspected spam";

function doPost(e) {
  try {
    const params = (e && e.parameter) || {};

    // 1. Honeypot filled in: a bot. Pretend it worked so it doesn't retry.
    if (params[HONEYPOT_FIELD]) return ok_();

    // 2. Exact repeat of a submission from the last 10 minutes: duplicate.
    const phone = String(params.phone || "").replace(/\D/g, "");
    if (isDuplicate_([phone, params.service, params.message].join("|"))) return ok_();

    const safeEvent = sanitizeEvent_(e);
    const reason = suspicionReason_(params, phone);
    if (reason) {
      logSuspect_(safeEvent.parameter, reason);
      return ok_();
    }

    // 3. Looks genuine: hand over to your original code.
    return handleLead_(safeEvent);
  } catch (err) {
    console.error(err);
    return ok_();
  }
}

function suspicionReason_(params, phone) {
  if (params.elapsedMs === undefined) return "Not sent from the website form";
  if (Number(params.elapsedMs) < MIN_ELAPSED_MS) return "Submitted too fast";
  if (phone && !/^[6-9]\d{9}$/.test(phone)) return "Invalid phone number";
  if (isBurst_()) return "Too many submissions in 10 minutes";
  return "";
}

function isDuplicate_(fingerprint) {
  const cache = CacheService.getScriptCache();
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, fingerprint, Utilities.Charset.UTF_8);
  const key = "lead_" + Utilities.base64EncodeWebSafe(digest);
  if (cache.get(key)) return true;
  cache.put(key, "1", DUPLICATE_WINDOW_SECONDS);
  return false;
}

function isBurst_() {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const cache = CacheService.getScriptCache();
    const count = Number(cache.get("lead_burst") || 0) + 1;
    cache.put("lead_burst", String(count), DUPLICATE_WINDOW_SECONDS);
    return count > BURST_LIMIT;
  } finally {
    lock.releaseLock();
  }
}

// Text starting with = + - @ (or a tab/return) is treated as a formula by Sheets.
// A leading apostrophe makes Sheets store it as plain text instead.
function safeValue_(value) {
  let text = String(value == null ? "" : value).slice(0, MAX_VALUE_LENGTH);
  if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
  return text;
}

// Returns a copy of the request with every value made safe, in both e.parameter and e.parameters.
function sanitizeEvent_(e) {
  const parameter = {};
  const parameters = {};
  Object.keys((e && e.parameter) || {}).forEach(function (key) {
    parameter[key] = safeValue_(e.parameter[key]);
  });
  Object.keys((e && e.parameters) || {}).forEach(function (key) {
    parameters[key] = [].concat(e.parameters[key]).map(safeValue_);
  });
  return Object.assign({}, e, { parameter: parameter, parameters: parameters });
}

function logSuspect_(params, reason) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SPAM_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SPAM_SHEET_NAME);
    sheet.appendRow(["Received", "Reason", "Name", "Phone", "Email", "Service", "Company", "Message"]);
  }
  sheet.appendRow([
    new Date(),
    reason,
    params.fullName || "",
    params.phone || "",
    params.email || "",
    params.service || "",
    params.company || "",
    params.message || "",
  ].map(function (v, i) { return i === 0 ? v : safeValue_(v); }));
}

function ok_() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
