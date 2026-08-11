import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const colVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20, delay: i * 0.07 },
  }),
};

const Footer = () => {
  return (
    <footer className="gradient-dark pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={colVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/newlogo.png" alt="SAB Properties Logo" className="h-32 w-auto" />
            </div>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed mb-6">
              A trusted and reputable name in the real estate sector, delivering exceptional services since establishment.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61579467053882"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:text-primary hover:border-primary transition-all group"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com/sabprop/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:text-primary hover:border-primary transition-all group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={colVariants}
          >
            <h4 className="font-display font-bold text-primary-foreground mb-4 text-base md:text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/properties", label: "Properties" },
                { to: "/contact", label: "Contact" },
              ].map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 + i * 0.04 }}
                >
                  <Link to={link.to} className="text-primary-foreground/60 hover:text-primary font-body text-sm lg:text-base transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={colVariants}
          >
            <h4 className="font-display font-bold text-primary-foreground mb-4 text-base md:text-lg">Our Services</h4>
            <ul className="space-y-2">
              {[
                { to: "/services#property-consultancy", label: "Property Consultancy" },
                { to: "/services#portfolio-management", label: "Portfolio Management" },
                { to: "/services#legal-assistance", label: "Legal Assistance" },
                { to: "/services#market-insights", label: "Market Insights" },
              ].map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.15 + i * 0.04 }}
                >
                  <Link to={link.to} className="text-primary-foreground/60 hover:text-primary font-body text-sm lg:text-base transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={colVariants}
          >
            <h4 className="font-display font-bold text-primary-foreground mb-4 text-base md:text-lg">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-primary-foreground/60 font-body text-sm lg:text-base">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                1/22, Asaf Ali Road, Delhi - 110002
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/60 font-body text-sm lg:text-base">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+918700513200" className="hover:text-primary transition-colors">
                  8700513200
                </a>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/60 font-body text-sm lg:text-base">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@sabproperties.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  info@sabproperties.in
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-primary-foreground/10 pt-8 text-center flex flex-col gap-1"
        >
          <p className="text-primary-foreground/40 font-body text-sm">
            © {new Date().getFullYear()} SAB Properties Private Limited. All rights reserved.
          </p>
          <p className="text-primary-foreground/40 font-body text-sm">
            A part of SAB Group
          </p>
          <p className="text-primary-foreground/30 font-body text-xs mt-2">
            Disclaimer: Property images are for representational purposes only and may not depict the actual property.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
