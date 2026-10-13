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

type Step = { text: string; icon: LucideIcon };

const steps: Step[] = [
  { text: "Searching for your dream property", icon: Search },
  { text: "Arrange a meeting/discuss over Phone/Emails/ Whatsapp etc", icon: MessagesSquare },
  { text: "We understand your requirement & send you most appropriate proposals", icon: ClipboardList },
  { text: "Arrange site visits to shortlisted properties", icon: MapPin },
  { text: "Upon finalization of property, we arrange your meeting & enter into negotiations with other party", icon: Handshake },
  { text: "Preparing all documents like Sale /Lease deed etc", icon: FileSignature },
  { text: "Handover the keys", icon: KeyRound },
];

const ProcessSection = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(-1);

  // Spine fills as the list passes the reading line; nodes light up as the fill reaches them
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 65%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.floor(v * steps.length + 0.35) - 1);
  });

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16 lg:mb-24"
        >
          <span className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-semibold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
            How We Work
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.08]">
            We are ready to support you with your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
              property requirements.
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <ol ref={listRef} className="relative max-w-5xl mx-auto">
          {/* Spine */}
          <div className="absolute top-8 bottom-8 left-7 lg:left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-slate-100" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute top-8 bottom-8 left-7 lg:left-1/2 w-[3px] -ml-[1.5px] rounded-full bg-gradient-to-b from-orange-400 to-primary origin-top"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            const onLeft = i % 2 === 0;
            const lit = i <= reached;

            return (
              <li
                key={i}
                className="relative grid grid-cols-[3.5rem_1fr] lg:grid-cols-[1fr_5rem_1fr] gap-x-5 lg:gap-x-12 items-center py-5 lg:py-6"
              >
                {/* Node */}
                <div className="col-start-1 lg:col-start-2 row-start-1 flex justify-center">
                  <div
                    className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-500 ${
                      isLast ? "w-14 h-14 lg:w-[4.5rem] lg:h-[4.5rem]" : "w-14 h-14 lg:w-16 lg:h-16"
                    } ${
                      lit
                        ? "gradient-orange text-white shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.7)]"
                        : "bg-white text-slate-400 ring-1 ring-slate-200"
                    }`}
                  >
                    <Icon className={isLast ? "w-6 h-6 lg:w-8 lg:h-8" : "w-6 h-6 lg:w-7 lg:h-7"} />
                    {lit && isLast && (
                      <span className="absolute inset-0 rounded-full gradient-orange animate-ping opacity-20" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: onLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative col-start-2 row-start-1 ${onLeft ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"}`}
                >
                  {/* Stub linking the text to its node (desktop) */}
                  <span
                    className={`hidden lg:block absolute top-1/2 h-[2px] w-8 rounded-full transition-colors duration-500 ${
                      onLeft ? "-right-10" : "-left-10"
                    } ${lit ? "bg-primary/60" : "bg-slate-200"}`}
                  />
                  <span
                    className={`block font-display font-bold text-xs lg:text-sm tracking-[0.25em] uppercase mb-2 transition-colors duration-500 ${
                      lit ? "text-primary" : "text-slate-400"
                    }`}
                  >
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={`font-display tracking-tight text-left ${onLeft ? "lg:ml-auto lg:!text-right" : ""} ${
                      isLast
                        ? "font-extrabold text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 w-fit pb-1"
                        : "font-bold text-lg lg:text-2xl leading-snug text-foreground max-w-md"
                    }`}
                  >
                    {step.text}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 lg:mt-24 flex justify-center"
        >
          <a
            href="tel:+918700513200"
            className="inline-flex items-center gap-3 gradient-orange text-white font-display font-bold text-lg px-10 py-5 rounded-xl hover:opacity-90 transition-all shadow-lg glow-orange-hover"
          >
            <Phone className="w-5 h-5" />
            Call Experts Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
