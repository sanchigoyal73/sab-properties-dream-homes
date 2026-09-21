import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { Phone, Loader2, CheckCircle2, Star, ShieldCheck, Trophy } from "lucide-react";
import { toast } from "sonner";
import { nameValidation, phoneValidation, emailValidation, sanitizeName, sanitizePhone, sanitizeEmail } from "@/utils/leadValidation";

const formSchema = z.object({
  fullName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  service: z.string().min(1, "Please select a service"),
});

type FormData = z.infer<typeof formSchema>;

const Counter = ({ to, suffix = "+" }: { to: number, suffix?: string }) => {
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    const controls = animate(count, to, { duration: 2, ease: "easeOut", delay: 0.5 });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{display}</motion.span>;
};

const LandingHero = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const targetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      
      if (!targetUrl) {
        toast.error("Configuration error. Please call us directly.");
        setIsSubmitting(false);
        return;
      }

      const urlEncodedData = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        urlEncodedData.append(key, value as string);
      });
      urlEncodedData.append("message", "Lead from Ads Landing Page");

      await fetch(targetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData.toString(),
      });
      
      // Track Google Ads Conversion
      if (typeof (window as any).gtag_report_conversion === 'function') {
        (window as any).gtag_report_conversion();
      }

      toast.success("Thank you! We'll contact you shortly.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            >
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-white/80 font-display text-xs font-bold tracking-widest uppercase">
                Delhi's Top-Rated Consultancy
              </span>
            </motion.div>

            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Unlock Prime <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-500">
                Commercial Success
              </span>
            </h1>

            <p className="text-white/60 font-body text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              From premium office spaces to high-visibility showrooms. We provide exclusive access to Delhi's most sought-after commercial real estate.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col gap-1">
                <span className="font-display font-black text-3xl md:text-4xl text-white">
                  <Counter to={30} />
                </span>
                <span className="text-white/40 text-xs font-bold tracking-widest uppercase">Years Experience</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display font-black text-3xl md:text-4xl text-white">
                  <Counter to={1000} suffix="+" />
                </span>
                <span className="text-white/40 text-xs font-bold tracking-widest uppercase">Satisfied Clients</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: ShieldCheck, text: "Verified Properties Only" },
                { icon: Trophy, text: "Award-Winning Service" },
                { icon: CheckCircle2, text: "Zero Brokerage Hassle" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="font-display font-semibold text-sm tracking-wide">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: High-Conversion Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full transform scale-75" />
            
            <div className="relative glass-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-white/[0.03] backdrop-blur-2xl">
              <div className="text-center mb-8">
                <h3 className="font-display font-black text-2xl text-white mb-2">Get Exclusive Access</h3>
                <p className="text-white/50 text-sm">Fill the form for a priority callback within 15 minutes.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1">
                  <input
                    {...register("fullName", {
                      onChange: (e) => {
                        e.target.value = sanitizeName(e.target.value);
                      }
                    })}
                    placeholder="Full Name"
                    className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${errors.fullName ? "border-red-500" : "border-white/10"} text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all font-display text-sm`}
                  />
                  {errors.fullName && <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase font-bold">{errors.fullName.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <input
                      {...register("phone", {
                        onChange: (e) => {
                          e.target.value = sanitizePhone(e.target.value);
                        }
                      })}
                      placeholder="Phone Number"
                      className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${errors.phone ? "border-red-500" : "border-white/10"} text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all font-display text-sm`}
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase font-bold">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <select
                      {...register("service")}
                      className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${errors.service ? "border-red-500" : "border-white/10"} text-white/40 focus:outline-none focus:border-primary transition-all font-display text-sm`}
                    >
                      <option value="" className="bg-neutral-900">Interest</option>
                      <option value="Office Space" className="bg-neutral-900 text-white">Office Space</option>
                      <option value="Showroom" className="bg-neutral-900 text-white">Showroom</option>
                      <option value="Godown" className="bg-neutral-900 text-white">Godown</option>
                      <option value="Other" className="bg-neutral-900 text-white">Other</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase font-bold">{errors.service.message}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <input
                    {...register("email", {
                      onChange: (e) => {
                        e.target.value = sanitizeEmail(e.target.value);
                      }
                    })}
                    placeholder="Email Address"
                    className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all font-display text-sm`}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase font-bold">{errors.email.message}</p>}
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-orange-600 text-white font-display font-black py-5 rounded-2xl text-base tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(249,115,22,0.3)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Phone className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-[10px] text-white/20 text-center mt-6 uppercase tracking-widest font-bold">
                Privacy Protected • Secured with 256-bit SSL
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LandingHero;
