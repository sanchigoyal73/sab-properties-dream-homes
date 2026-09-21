import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, CheckCircle, Users, Building, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { singleNameValidation, phoneValidation, sanitizeName, sanitizePhone } from "@/utils/leadValidation";

const formSchema = z.object({
  name: singleNameValidation,
  phone: phoneValidation,
});

type FormData = z.infer<typeof formSchema>;

const officeImages = [
  "/officeSpaces/officeSpace1.jpg",
  "/officeSpaces/officeSpace10.jpg",
  "/officeSpaces/officeSpace3.jpg",
  "/officeSpaces/officeSpace4.jpg",
  "/officeSpaces/officeSpace6.jpg",
];

const OfficeHero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % officeImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const targetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (targetUrl) {
        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append("fullName", data.name);
        urlEncodedData.append("phone", data.phone);
        urlEncodedData.append("service", "Premium Office Lead");
        urlEncodedData.append("message", "Lead from High-Converting Office Hero Section");
        
        await fetch(targetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlEncodedData.toString(),
        });
      }
      
      if (typeof (window as any).gtag_report_conversion === 'function') {
        (window as any).gtag_report_conversion();
      }
      
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={officeImages[currentImage]}
              alt="Premium Commercial Space in Delhi"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/95 z-10" />
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] z-10 pointer-events-none animate-pulse-glow" />
      </div>

      <div className="container relative z-30 mx-auto px-4 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 xl:col-span-8 pr-0 lg:pr-12"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-white font-mono text-[11px] font-medium tracking-wide uppercase">
                45+ Premium Spaces Available Now
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-display font-black text-5xl md:text-6xl lg:text-[5.5rem] text-white leading-[1.05] tracking-tight mb-8 drop-shadow-xl">
              Stop Searching <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
                Get Delhi's Best Offices Handpicked for You
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-slate-300 font-body text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              Skip the endless browsing. Tell us your requirements, and our experts will instantly share a curated shortlist of move-in-ready, verified commercial spaces tailored for your growth.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-8 mb-12">
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-200 font-medium">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>Move-in Ready Workspaces</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200 font-medium">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>Zero Brokerage Support</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200 font-medium">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>Verified Business Locations</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
              <a href="#listings" className="group flex items-center gap-2 text-white font-mono text-sm tracking-wider uppercase hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
                Explore All Listings <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="tel:+918700513200" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all backdrop-blur-sm">
                <Phone className="w-4 h-4 text-primary" /> Talk to an Expert
              </a>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5 xl:col-span-4 relative mt-8 lg:mt-0 lg:translate-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {!submitted ? (
                  <>
                    <div className="mb-8">
                      <h3 className="font-display font-semibold text-2xl text-white mb-2 tracking-tight">Get Your Shortlist</h3>
                      <p className="text-slate-400 text-sm font-light">Enter details to get 3-5 matching options within 30 mins.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Full Name</label>
                        <input
                          {...register("name", {
                            onChange: (e) => {
                              e.target.value = sanitizeName(e.target.value);
                            }
                          })}
                          placeholder="Full Name"
                          className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-body`}
                        />
                        {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Phone Number</label>
                        <input
                          type="tel"
                          {...register("phone", {
                            onChange: (e) => {
                              e.target.value = sanitizePhone(e.target.value);
                            }
                          })}
                          placeholder="+91 00000 00000"
                          className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-body`}
                        />
                        {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.phone.message}</p>}
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="group w-full bg-primary text-white font-display font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(255,102,0,0.2)] hover:shadow-[0_0_30px_rgba(255,102,0,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <span>Get Available Offices</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-500 font-mono text-center">
                       <ShieldCheck className="w-4 h-4" />
                       <span>No spam. Zero brokerage fees.</span>
                    </div>
                  </>
                ) : (
                  <div className="py-12 text-center flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="font-display font-semibold text-2xl text-white mb-3">Request Received</h3>
                    <p className="text-slate-400 text-sm mb-8 font-light leading-relaxed">Our experts are curating your custom shortlist. We'll contact you within 30 minutes.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-primary font-mono text-xs uppercase tracking-wider hover:text-white transition-colors border-b border-primary hover:border-white pb-1"
                    >
                      Submit Another Request
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-30 w-full mt-auto border-t border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-8">
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest hidden lg:block">Trusted By Industry Leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-primary/70" />
                <span className="text-slate-300 font-medium text-sm">120+ Companies</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Building className="w-5 h-5 text-primary/70" />
                <span className="text-slate-300 font-medium text-sm">500+ Offices</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5 text-primary/70" />
                <span className="text-slate-300 font-medium text-sm">30+ Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeHero;
