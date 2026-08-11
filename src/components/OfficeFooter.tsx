import { Phone, Mail, ShieldCheck, CheckCircle, Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const OfficeFooter = () => {
  return (
    <footer className="bg-[#050505] text-white pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Conversion Reinforcement Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 p-8 lg:p-12 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm relative overflow-hidden group">
          {/* Subtle glow background */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
          
          <div className="text-center lg:text-left relative z-10">
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 tracking-tight">
              Still Looking for the Perfect Space?
            </h3>
            <p className="text-slate-400 font-body text-base max-w-xl">
              Don't waste more time browsing. Our experts can find you 3-5 matching options in Delhi NCR within 30 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
            <a 
              href="tel:+918700513200" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-display font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
            <div className="hidden sm:block text-slate-600 font-mono text-sm">OR</div>
            <a 
              href="mailto:info@sabproperties.in" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-display font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span>Email Requirements</span>
            </a>
          </div>
        </div>

        {/* Minimal Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start mb-12">
          
          {/* Brand & Statement */}
          <div className="text-center md:text-left">
            <img src="/newlogo.png" alt="SAB Properties" className="h-16 w-auto mb-6 mx-auto md:mx-0 opacity-90" />
            <p className="text-slate-400 font-body text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              SAB Properties is Delhi's premier commercial real estate consultancy, specializing in high-end office spaces for growing businesses.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
              <a 
                href="https://www.facebook.com/profile.php?id=61579467053882" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all group"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.instagram.com/sabprop/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-xs uppercase font-mono tracking-[0.2em] text-slate-500 mb-2">Direct Contact</h4>
            <div className="flex items-center gap-3 text-slate-300 font-body text-lg hover:text-primary transition-colors">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+918700513200">+91 87005 13200</a>
            </div>
            <div className="flex items-center gap-3 text-slate-300 font-body text-lg hover:text-primary transition-colors">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:info@sabproperties.in">info@sabproperties.in</a>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
             <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-end gap-2 text-slate-400 font-body text-sm font-medium">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>No spam. 100% privacy protected.</span>
                </div>
                <div className="flex items-center justify-center md:justify-end gap-2 text-slate-400 font-body text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Trusted by businesses across Delhi NCR</span>
                </div>
             </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <p className="text-slate-600 font-body text-xs">
              © {new Date().getFullYear()} SAB Properties Private Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-slate-600 font-body text-xs">
               <span>Registered Commercial Estate Agents in Delhi</span>
            </div>
          </div>
          <p className="text-slate-600 font-body text-xs mt-2 w-full text-center md:text-left">
            A part of SAB Group
          </p>
          <p className="text-slate-600/70 font-body text-[11px] w-full text-center md:text-left mt-1">
            Disclaimer: Property images are for representational purposes only and may not depict the actual property.
          </p>
        </div>
      </div>

      {/* Sticky Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 lg:hidden pointer-events-none">
         <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="pointer-events-auto bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4"
         >
            <div className="flex flex-col">
               <span className="text-[9px] text-primary font-mono uppercase tracking-widest font-bold">Talk to us</span>
               <span className="text-white text-sm font-display font-bold">8700513200</span>
            </div>
            <a 
               href="tel:+918700513200"
               className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-display font-bold text-xs rounded-xl shadow-lg shadow-primary/20"
            >
               <Phone className="w-3.5 h-3.5" />
               <span>CALL NOW</span>
            </a>
         </motion.div>
      </div>
    </footer>
  );
};

export default OfficeFooter;
