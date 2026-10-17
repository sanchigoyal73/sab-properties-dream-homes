import { motion } from "framer-motion";
import { MapPin, TrendingUp, Building2, Target, Warehouse, Store } from "lucide-react";
import TrustedBy from "./TrustedBy";

const locations = [
  {
    title: "Central Delhi & Connaught Place",
    description: "The premium retail destination. High-impact showrooms in CP Inner and Outer circles offer unmatched brand visibility and access to elite clientele in India's most iconic commercial hub.",
    keywords: ["Showroom in Connaught Place", "Premium Retail Space", "Elite Brand Address"],
    icon: Store,
    stats: "Luxury Retail Hub"
  },
  {
    title: "Asaf Ali Road & Ajmeri Gate",
    description: "The distribution powerhouse. Strategically located warehouses and showrooms here serve as the primary supply link between Old Delhi's trade markets and the rest of the city.",
    keywords: ["Warehouse in Asaf Ali Road", "Logistics Hub Delhi", "Trade Connectivity"],
    icon: Warehouse,
    stats: "Trade & Logistics"
  },
  {
    title: "Karol Bagh Market",
    description: "Delhi's most active retail ecosystem. Showrooms in Karol Bagh benefit from massive footfall and a mature commercial environment suitable for fashion, jewelry, and electronics.",
    keywords: ["Showroom in Karol Bagh", "Retail Frontage", "High Footfall Zone"],
    icon: Building2,
    stats: "Consumer Powerhouse"
  },
  {
    title: "Okhla Industrial Estate",
    description: "The modern warehouse solution. Okhla offers high-capacity warehouses and industrial-grade commercial spaces with excellent connectivity to South Delhi and Noida.",
    keywords: ["Okhla Warehouse Space", "Industrial Warehouse", "South Delhi Logistics"],
    icon: TrendingUp,
    stats: "Modern Storage"
  }
];

const CommercialLocationInsights = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Text Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="font-display font-black text-[15vw] leading-none text-foreground rotate-[-5deg]">COMMERCIAL DELHI</span>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-[2px] bg-primary"></span>
            <span className="text-primary font-display font-bold text-xs tracking-widest uppercase">Market Intelligence</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mb-6">
            Prime Trade Locations <br />
            <span className="text-primary">Built for Growth</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg leading-relaxed">
            From heavy-duty storage to premium retail frontage. We help you secure spaces in locations that directly impact your bottom line and operational efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((loc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <loc.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-bold text-xl text-foreground">{loc.title}</h3>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">{loc.stats}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {loc.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {loc.keywords.map((kw, i) => (
                      <span key={i} className="text-[11px] font-display font-semibold text-primary/60 bg-primary/5 px-3 py-1 rounded-full">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <TrustedBy />

        <div className="mt-20 p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="font-display font-bold text-2xl text-foreground mb-8 text-center">Why Businesses Choose Delhi for Showrooms & Warehouses?</h3>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <h4 className="font-display font-bold text-primary text-sm uppercase tracking-wider">Unrivaled Trade Access</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Delhi acts as the primary distribution node for North India. Securing a warehouse in Asaf Ali Road or Okhla ensures your supply chain is connected to one of the largest consumer markets in the world.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-display font-bold text-primary text-sm uppercase tracking-wider">Maximum Visibility</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Prime showroom locations in Connaught Place or Karol Bagh offer more than just square footage — they offer status and direct exposure to millions of potential customers annually.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-display font-bold text-primary text-sm uppercase tracking-wider">Commercial Infrastructure</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our properties are located in established commercial zones that offer the power, security, and loading/unloading facilities required for intensive retail and logistics operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommercialLocationInsights;
