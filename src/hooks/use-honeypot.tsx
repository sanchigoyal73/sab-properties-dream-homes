import { useRef } from "react";

// Spam trap for the lead forms. Bots tend to fill every input, so a field that
// humans never see (and must leave empty) catches them. We also send how long the
// page was open before submitting; the Apps Script uses that to flag instant posts.
const HONEYPOT_FIELD = "website";

export const useHoneypot = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(Date.now());

  const field = (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Leave this field empty
        <input ref={inputRef} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );

  // True when the hidden field was filled in: treat the submission as spam
  const isBot = () => !!inputRef.current?.value;

  // Adds the trap values to the payload so the Apps Script can check them too
  const stamp = (params: URLSearchParams) => {
    params.append(HONEYPOT_FIELD, inputRef.current?.value ?? "");
    params.append("elapsedMs", String(Date.now() - startedAt.current));
  };

  return { field, isBot, stamp };
};
