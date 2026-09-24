import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { allProperties } from "../data/properties";

const ServiceBoxes = () => {
  const categories = [
    {
      id: "showroom",
      title: "SHOWROOM",
      description: "Spaces where businesses and customers seamlessly connect.",
      properties: `${allProperties.filter(p => p.category === "Showroom").length} Properties`,
      cta: "Explore Showrooms",
      link: "/properties?category=Showroom",
      image: "/showroom/showroom6.jpg",
    },
    {
      id: "office",
      title: "OFFICE",
      description: "Business environments that inspire success and productivity.",
      properties: `${allProperties.filter(p => p.category === "Office/Serviced Office").length} Properties`,
      cta: "Explore Offices",
      link: "/properties?category=Office/Serviced Office",
      image: "/officeSpaces/officeSpace1.jpg",
    },
    {
      id: "godown",
      title: "GODOWN",
      description: "Spacious godown facilities with loading docks and secure storage solutions.",
      properties: `${allProperties.filter(p => p.category === "Godown").length} Properties`,
      cta: "Explore Godown Spaces",
      link: "/properties?category=Godown",
      image: "/godown/godown4.jpg",
    },
    {
      id: "coworking",
      title: "CO-WORK",
      description: "Modern co-work spaces with flexible seating and premium facilities.",
      properties: `${allProperties.filter(p => p.category === "Co-Working").length} Properties`,
      cta: "Explore Co-Work Spaces",
      link: "/properties?category=Co-Working",
      image: "/coworking/co-work3.jpg",
    },
    {
      id: "prerented",
      title: "PRE-RENTED",
      description: "High-ROI investment properties with established corporate tenants.",
      properties: `${allProperties.filter(p => p.category === "Pre-Rented").length} Properties`,
      cta: "Explore Investments",
      link: "/properties?category=Pre-Rented",
      image: "/pre-rented/preRented.jpg",
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-primary font-display font-bold text-sm tracking-[0.25em] uppercase mb-4">
            Explore Our
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground">
            Property Categories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-orange-400 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 130, damping: 18, delay: i * 0.07 }}
              className={`group shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 rounded-[2rem] cursor-pointer ${i === 0 ? "md:col-span-2 lg:col-span-2" : "col-span-1"}`}
            >
              <Link
                to={category.link}
                className="relative h-[320px] md:h-[380px] rounded-[2rem] overflow-hidden block [-webkit-mask-image:-webkit-radial-gradient(white,black)] [transform:translateZ(0)]"
              >
                {/* Background Image and Zoom Effect */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-[1.10]"
                  />
                </div>

                {/* Sleek Gradient Overlays */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700" />
                <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-primary/20 mix-blend-multiply transition-colors duration-700" />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    {/* Category Title */}
                    <h3 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-wider uppercase mb-2 drop-shadow-md">
                      {category.title}
                    </h3>

                    {/* Properties Count */}
                    <p className="font-body font-bold text-xs text-primary tracking-[0.2em] uppercase mb-1">
                      {category.properties}
                    </p>
                  </div>

                  {/* Sliding Glass Panel Description & CTA */}
                  <div className="overflow-hidden">
                    <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-out">
                      <div className="overflow-hidden">
                        <div className="pt-4 pb-2">
                          <p className="font-body text-white/90 text-sm md:text-base leading-relaxed mb-4">
                            {category.description}
                          </p>
                          <span className="inline-flex items-center gap-2 text-white font-display font-bold text-xs uppercase tracking-[0.15em] hover:text-primary transition-colors">
                            {category.cta}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBoxes;
