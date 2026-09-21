import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { useEffect } from "react";

// Animated Counter Component
const Counter = ({ from = 0, to, duration = 2, suffix = "+" }: { from?: number, to: number, duration?: number, suffix?: string }) => {
  const count = useMotionValue(from);
  const display = useTransform(count, (latest) => {
    const num = Math.round(latest);
    if (to === 1000 && num >= 1000) return "1K" + suffix;
    return num + suffix;
  });

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut", delay: 1 });
    return controls.stop;
  }, [count, to, duration]);

  return <motion.span>{display}</motion.span>;
};

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/images/hero-poster.jpg"
          className="w-full h-full object-cover brightness-50"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient Overlay for better depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent mix-blend-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-36 md:pt-48 pb-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-display font-medium text-xs sm:text-sm tracking-[0.25em] uppercase mb-8 shadow-xl"
            >
              Premium Property Solutions
            </motion.span>
            
            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] mb-8 drop-shadow-2xl">
              Leading Commercial <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-500 drop-shadow-none relative">
                Property Consultants
              </span>
              <br/> in Delhi
            </h1>
            
            <p className="text-white/80 font-body text-sm md:text-lg lg:text-xl leading-relaxed mb-12 max-w-3xl drop-shadow-md">
              Discover unparalleled excellence in real estate. From state-of-the-art office spaces to prime showrooms, we curate seamless experiences for modern businesses.
            </p>
            
            {/* Quick Contact and Action */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 0.8 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16 w-full"
            >
              <a 
                href="tel:+918700513200" 
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-white text-foreground font-display font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] overflow-hidden w-full sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-orange-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <Phone className="w-5 h-5 relative z-10" />
                <span className="relative z-10 text-base md:text-lg">Call Experts Now</span>
              </a>
              
              <Link 
                to="/properties" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-10 sm:py-5 bg-white/5 backdrop-blur-xl text-white font-display font-bold rounded-2xl border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="text-base md:text-lg whitespace-nowrap">Explore Properties</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            {/* Trust Badges - Centered Footer style */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="grid grid-cols-3 gap-6 md:gap-16 pt-10 border-t border-white/10 w-full max-w-3xl"
            >
              <div className="flex flex-col items-center gap-2 text-white">
                <span className="font-display font-bold text-3xl md:text-5xl text-primary drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                  <Counter to={30} />
                </span>
                <span className="font-body text-[10px] md:text-xs text-white/60 tracking-[0.2em] uppercase">Years Expertise</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-white">
                <span className="font-display font-bold text-3xl md:text-5xl text-primary drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                  <Counter to={500} />
                </span>
                <span className="font-body text-[10px] md:text-xs text-white/60 tracking-[0.2em] uppercase">Prime Properties</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-white">
                <span className="font-display font-bold text-3xl md:text-5xl text-primary drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                  <Counter to={1000} duration={2.5} />
                </span>
                <span className="font-body text-[10px] md:text-xs text-white/60 tracking-[0.2em] uppercase">Happy Clients</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
