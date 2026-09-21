import { motion } from "framer-motion";
import { Layers, Shield, Zap, MapPin, Award, HeartHandshake } from "lucide-react";
import aboutImg from "@/assets/picture.jpg";

const benefits = [
  {
    icon: Layers,
    title: "Comprehensive Services",
    description: "From commercial offices to residential properties, we provide a wide range of solutions to accommodate diverse requirements.",
  },
  {
    icon: Shield,
    title: "Trust and Transparency",
    description: "Our transparent approach ensures you have complete visibility into every step of the property transaction process.",
  },
  {
    icon: Zap,
    title: "Quick and Efficient",
    description: "Our ready-to-move-in properties ensure a seamless setup process, allowing you to focus on what matters most.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Benefit from strategically located properties in high-traffic areas to maximize visibility and foot traffic.",
  },
  {
    icon: Award,
    title: "30+ Years Expertise",
    description: "With years of experience in real estate, our team brings expertise and insights to guide you through every step.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    description: "We prioritize your satisfaction, providing responsive support and a commitment to excellence in all interactions.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative">
      <div className="grid lg:grid-cols-5">
        {/* Image - Left */}
        <div className="lg:col-span-2 relative min-h-[400px] lg:min-h-full">
          <img
            src={aboutImg}
            alt="SAB Properties office"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content - Right */}
        <div className="lg:col-span-3 bg-foreground py-16 px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.3 }}
          >
            <span className="text-primary font-display font-bold text-sm tracking-[0.2em] uppercase">
              Your Benefits
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mt-2 mb-4">
              Why Choose Us
            </h2>
            <p className="text-primary-foreground/70 font-body text-sm md:text-base lg:text-lg leading-relaxed mb-10 max-w-2xl">
              At SAB Properties, we prioritize your success, offering tailored real estate solutions 
              and unparalleled service to meet your property needs.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", stiffness: 150, damping: 15, delay: i * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 hover-lift"
                >
                  <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary-foreground text-sm lg:text-base mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-primary-foreground/60 font-body text-xs lg:text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
