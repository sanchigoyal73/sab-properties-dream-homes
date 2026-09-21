import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Building2, Shield, TrendingUp, Briefcase, MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle, Users, FileText, BarChart3, Key } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import servicesImg from "@/assets/services.jpg";
import servicesHeroImg from "@/assets/services-hero.png";
import propertyConsultancyImg from "@/assets/property-consultancy.jpg";
import portfolioManagementImg from "@/assets/portfolio-management.jpg";
import legalAssistanceImg from "@/assets/legal-assistance.jpg";
import marketInsightsImg from "@/assets/market-insights.jpg";

const services = [
  {
    id: "property-consultancy",
    icon: Building2,
    title: "Property Consultancy",
    description: "Our expert team provides comprehensive property consultancy services tailored to your specific needs. We guide you through every step of your real estate journey, from property selection to final acquisition.",
    image: propertyConsultancyImg,
    features: [
      "Personalized property recommendations",
      "Market analysis and trends",
      "Site visits and property tours",
      "Investment advisory",
      "ROI projections",
    ],
  },
  {
    id: "legal-assistance",
    icon: FileText,
    title: "Legal Assistance",
    description: "Navigate the complexities of real estate transactions with our expert legal support. We ensure transparency and compliance throughout every legal process.",
    image: legalAssistanceImg,
    features: [
      "Title verification",
      "Agreement drafting and review",
      "Property registration",
      "Due diligence",
      "Dispute resolution",
    ],
  },
  {
    id: "market-insights",
    icon: BarChart3,
    title: "Market Insights",
    description: "Stay ahead with our data-driven market intelligence. We provide valuable insights to help you make informed real estate investment decisions.",
    image: marketInsightsImg,
    features: [
      "Price trend analysis",
      "Location analytics",
      "Market forecasts",
      "Competitive analysis",
      "Investment opportunities",
    ],
  },
  {
    id: "portfolio-management",
    icon: Briefcase,
    title: "Portfolio Management",
    description: "Maximize your real estate investments with our professional portfolio management services. We handle all aspects of property management for optimal returns.",
    image: portfolioManagementImg,
    features: [
      "Tenant management",
      "Rent collection",
      "Property maintenance",
      "Financial reporting",
      "Asset optimization",
    ],
  },
];

const ServicesPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our Services | SAB Properties"
        description="Comprehensive commercial real estate solutions in Delhi including Property Consultancy, Legal Assistance, Market Insights, and Portfolio Management."
        canonical="/services"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Commercial Real Estate Services",
          "provider": {
            "@type": "LocalBusiness",
            "name": "SAB Properties"
          },
          "areaServed": "Delhi NCR",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Real Estate Services",
            "itemListElement": services.map((s, index) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": s.title
              }
            }))
          }
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={servicesHeroImg} 
            alt="Our Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.3 }}
          className="relative text-center px-4"
        >
          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            Our Services
          </h1>
          <p className="text-white/80 font-body text-base md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            Comprehensive real estate solutions tailored to your needs
          </p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-slate-50" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.3 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-primary font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
              What We Offer
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mb-6">
              Professional Real Estate Services
            </h2>
            <p className="text-muted-foreground font-body text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
              We provide end-to-end real estate solutions ensuring a seamless experience for all your property needs. 
              From consultancy to legal assistance, we've got you covered.
            </p>
          </motion.div>

          <div className="space-y-16">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: i * 0.1 }}
                className={`bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100/50 ${
                  i % 2 === 1 ? "bg-white" : "bg-white"
                }`}
              >
                <div className="flex flex-col lg:flex-row items-stretch lg:h-[600px]">
                  {/* Content */}
                  <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center h-full">
                    <div className="w-16 h-16 rounded-2xl gradient-orange flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-base lg:text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, index) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.2 + index * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-foreground font-body text-sm lg:text-base">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 gradient-orange text-white font-display font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Image Placeholder */}
                  {/* Service Image */}
                  <div className="w-full lg:w-1/2 relative min-h-[400px] lg:h-full overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      initial={{ scale: 1.1, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h3 className="font-display font-extrabold text-3xl lg:text-4xl text-foreground mb-4">
            Need More Information?
          </h3>
          <p className="text-muted-foreground font-body text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Contact our team of experts for personalized assistance
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 gradient-orange text-white font-display font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
