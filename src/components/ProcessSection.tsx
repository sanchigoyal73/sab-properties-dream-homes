import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import {
  Search,
  MessagesSquare,
  ClipboardList,
  MapPin,
  Handshake,
  FileSignature,
  KeyRound,
  Phone,
  type LucideIcon,
} from "lucide-react";

type Step = { text: string; icon: LucideIcon; phase: number };

const phases = ["Discover", "Visit & Negotiate", "Close"];

const steps: Step[] = [
  { text: "Searching for your dream property", icon: Search, phase: 0 },
  { text: "Arrange a meeting/discuss over Phone/Emails/ Whatsapp etc", icon: MessagesSquare, phase: 0 },
  { text: "We understand your requirement & send you most appropriate proposals", icon: ClipboardList, phase: 0 },
  { text: "Arrange site visits to shortlisted properties", icon: MapPin, phase: 1 },
  { text: "Upon finalization of property, we arrange your meeting & enter into negotiations with other party", icon: Handshake, phase: 1 },
  { text: "Preparing all documents like Sale /Lease deed etc", icon: FileSignature, phase: 2 },
  { text: "Handover the keys", icon: KeyRound, phase: 2 },
];

const ProcessSection = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Progress of the step list past the reading line drives the rail fill and the active step
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 85%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  const activePhase = steps[active].phase;

  return (
    <section className="relative pt-28 pb-24 bg-white">
      {/* Divider from the partners strip above */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-center px-4 lg:px-8">
        <div className="h-px flex-1 max-w-xl bg-gradient-to-r from-transparent to-slate-200" />
        <div className="mx-4 w-2 h-2 rotate-45 bg-primary" />
        <div className="h-px flex-1 max-w-xl bg-gradient-to-l from-transparent to-slate-200" />
      </div>

      {/* Clipped separately so the sticky column still works */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: sticky intro + phase tracker */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary font-display font-bold text-sm tracking-[0.2em] uppercase">
                  How We Work
                </span>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 leading-tight">
                  We are ready to support you with your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                    property requirements.
                  </span>
                </h2>

                {/* Phase tracker (desktop) */}
                <div className="hidden lg:block mt-10 space-y-3">
                  {phases.map((phase, i) => {
                    const count = steps.filter((s) => s.phase === i).length;
                    const isActive = i === activePhase;
                    const isDone = i < activePhase;
                    return (
                      <div
                        key={phase}
                        className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-500 ${
                          isActive
                            ? "bg-white border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                            : "bg-slate-50 border-transparent"
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm transition-colors duration-500 ${
                            isActive || isDone ? "bg-primary text-white" : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={`font-display font-bold text-lg transition-colors duration-500 ${
                            isActive ? "text-foreground" : "text-slate-400"
                          }`}
                        >
                          {phase}
                        </span>
                        <span className="ml-auto font-mono text-xs text-slate-400">{count} steps</span>
                      </div>
                    );
                  })}
                </div>

                <a
                  href="tel:+918700513200"
                  className="mt-10 inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-foreground text-white font-display font-bold hover:bg-primary transition-colors duration-300"
                >
                  <Phone className="w-5 h-5" />
                  Call Experts Now
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right: vertical journey */}
          <div className="lg:col-span-7">
            <div ref={listRef} className="relative">
              {/* Rail */}
              <div className="absolute left-6 md:left-7 top-6 bottom-6 w-0.5 -ml-px bg-slate-200" />
              <motion.div
                style={{ scaleY: fill }}
                className="absolute left-6 md:left-7 top-6 bottom-6 w-0.5 -ml-px bg-primary origin-top"
              />

              <ol className="space-y-5 md:space-y-6">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  const reached = i <= active;
                  const isActive = i === active;
                  const startsPhase = i === 0 || steps[i - 1].phase !== step.phase;
                  return (
                    <li key={i}>
                      {startsPhase && (
                        <p className="lg:hidden relative pl-16 md:pl-20 mb-3 font-display font-bold text-xs tracking-[0.2em] uppercase text-primary text-left">
                          {phases[step.phase]}
                        </p>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative flex items-start gap-4 md:gap-6"
                      >
                        {/* Node */}
                        <div
                          className={`relative z-10 flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            reached
                              ? "bg-primary text-white shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.6)]"
                              : "bg-white text-slate-400 border border-slate-200"
                          } ${isActive ? "scale-110" : ""}`}
                        >
                          <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>

                        {/* Card */}
                        <div
                          className={`flex-1 rounded-2xl border px-5 py-5 md:px-7 md:py-6 transition-all duration-500 ${
                            isActive
                              ? "bg-white border-primary/25 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                              : "bg-slate-50/70 border-slate-100"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <span className="font-mono text-xs font-semibold tracking-widest text-primary">
                              STEP {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-display font-extrabold text-3xl md:text-4xl leading-none text-slate-100 select-none">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <p
                            className={`font-display font-semibold text-lg md:text-xl leading-snug text-left transition-colors duration-500 ${
                              reached ? "text-foreground" : "text-slate-500"
                            }`}
                          >
                            {step.text}
                          </p>
                        </div>
                      </motion.div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
