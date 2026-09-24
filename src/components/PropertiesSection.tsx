import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Maximize, ArrowRight, Lock, X, CheckCircle, Star, ShieldCheck, Zap, CheckCircle2, Check } from "lucide-react";
import { allProperties } from "@/data/properties";
import { singleNameValidation, phoneValidation, sanitizeName, sanitizePhone } from "@/utils/leadValidation";

const PropertiesSection = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<typeof allProperties[0] | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem("sab_unlocked_all") === "true";
    setIsUnlocked(unlocked);
  }, []);

  // Focus on top 3 most premium featured properties
  const featuredProperties = allProperties.filter(p => p.featured).slice(0, 3);

  const handlePropertyClick = (property: typeof allProperties[0]) => {
    if (isUnlocked) {
      navigate(`/property/${property.id}`);
      return;
    }
    setSelectedProperty(property);
    setSubmitted(false);
    setFormData({ name: "", phone: "" });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    const nameResult = singleNameValidation.safeParse(formData.name);
    if (!nameResult.success) {
      newErrors.name = nameResult.error.errors[0].message;
    }

    const phoneResult = phoneValidation.safeParse(formData.phone);
    if (!phoneResult.success) {
      newErrors.phone = phoneResult.error.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const targetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (targetUrl) {
        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append("fullName", formData.name);
        urlEncodedData.append("phone", formData.phone);
        urlEncodedData.append("service", "Property Unlock");
        urlEncodedData.append("message", `Property: ${selectedProperty?.title} | Category: ${selectedProperty?.category} | Location: ${selectedProperty?.location}`);
        
        await fetch(targetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlEncodedData.toString(),
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    localStorage.setItem("sab_unlocked_all", "true");
    setIsUnlocked(true);
    setSubmitted(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setSubmitted(false);
    setErrors({});
  };

  return (
    <section className="relative py-24 overflow-hidden bg-slate-50">
      {/* Premium Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.3 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-display font-bold text-sm tracking-[0.2em] uppercase mb-4">
            Exclusive Collection
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Curated Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Properties</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            Discover our handpicked selection of exceptional commercial spaces, designed to elevate your business presence in Delhi's most prestigious locations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="group shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl cursor-pointer"
              onClick={() => {
                if (property.category === "Pre-Rented") {
                  navigate(`/property/${property.id}`);
                } else {
                  handlePropertyClick(property);
                }
              }}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 h-full [transform:translateZ(0)]">
                <div className="relative h-[280px] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-foreground font-display font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                      {property.category}
                    </span>
                    {property.featured && (
                      <span className="bg-primary/90 backdrop-blur-md text-white flex items-center gap-1 font-display font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-4">
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>

                  {/* Location and Seats Info */}
                  <div className="flex items-center gap-2 mb-6 group/loc">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center text-slate-400 group-hover/loc:bg-primary/5 group-hover/loc:text-primary transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-medium tracking-wide text-slate-500 truncate">
                      <span className="text-slate-700 font-semibold">{property.location}</span>
                      <span className="text-slate-300">•</span>
                      <span className="truncate">{property.seats}</span>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-2.5 mb-8">
                    {(property.highlights || []).slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2.5 group/item">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-[13px] text-muted-foreground font-medium group-hover/item:text-foreground transition-colors truncate">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    {property.category === "Pre-Rented" ? (
                      <>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-medium mb-1">Monthly Rent</span>
                          <span className="flex items-center gap-1.5 text-sm font-display font-bold text-foreground">
                            <Zap className="w-4 h-4 text-primary" />
                            ₹{typeof property.rent === 'number' ? property.rent.toLocaleString() : property.rent}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-display font-bold text-primary hover:text-orange-600 transition-colors uppercase tracking-widest group/btn">
                           <span>Learn More</span>
                           <ArrowRight className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-medium mb-1">Space</span>
                          <span className="flex items-center gap-1.5 text-sm font-display font-bold text-foreground">
                            <Maximize className="w-4 h-4 text-primary" />
                            {property.area}
                          </span>
                        </div>

                        <button className="flex items-center gap-2 text-sm font-display font-bold text-primary hover:text-orange-600 transition-colors uppercase tracking-widest group/btn">
                          {!isUnlocked && <Lock className="w-4 h-4" />}
                          <span>{isUnlocked ? "View Details" : "Unlock"}</span>
                          <ArrowRight className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 15 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.3 }}
           className="mt-16 text-center"
        >
          <p className="text-muted-foreground font-body text-lg mb-6">
            Looking for more exclusive options?
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 gradient-orange text-white font-display font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg"
          >
            Explore All Properties
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Property Disclaimer */}
        <div className="mt-16">
          <p className="text-slate-400 font-body text-xs leading-relaxed text-center max-w-3xl mx-auto border-t border-slate-100 pt-8">
            <span className="font-bold uppercase tracking-wider mr-2 text-slate-500">Disclaimer:</span>
            Property images are for representational purposes only and may not depict the actual property.
          </p>
        </div>
      </div>

      {/* Modern Glassmorphism Modal */}
      <AnimatePresence>
        {selectedProperty !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 text-left"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {!submitted ? (
                <>
                  <div className="relative h-48 overflow-hidden rounded-t-3xl [transform:translateZ(0)]">
                    <img
                      src={selectedProperty.image}
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-4 left-6">
                      <h3 className="text-white font-display font-bold text-xl drop-shadow-md mb-1">{selectedProperty.title}</h3>
                      <p className="text-white/80 text-sm flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {selectedProperty.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <div className="w-10 h-10 rounded-full gradient-orange flex items-center justify-center shrink-0">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-foreground text-sm">Unlock Property Details</h4>
                        <p className="text-muted-foreground text-xs mt-0.5">Enter details to view price and full specs</p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => {
                            const sanitized = sanitizeName(e.target.value);
                            setFormData({...formData, name: sanitized});
                            if (errors.name) setErrors({...errors, name: undefined});
                          }}
                          className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border ${
                            errors.name ? 'border-red-500 ring-2 ring-red-500/10' : 'border-slate-200'
                          } text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body`}
                        />
                        {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold uppercase">{errors.name}</p>}
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => {
                            const sanitized = sanitizePhone(e.target.value);
                            setFormData({...formData, phone: sanitized});
                            if (errors.phone) setErrors({...errors, phone: undefined});
                          }}
                          className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 border ${
                            errors.phone ? 'border-red-500 ring-2 ring-red-500/10' : 'border-slate-200'
                          } text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body`}
                        />
                        {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold uppercase">{errors.phone}</p>}
                      </div>
                      <button type="submit" className="w-full gradient-orange text-white font-display font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 mt-2">
                        Unlock Details Now
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="p-8 pb-10">
                  <div className="text-center mb-8">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="font-display font-bold text-3xl text-foreground">Unlocked!</h3>
                    <p className="text-muted-foreground text-sm mt-2 font-body">Our team will be in touch shortly.</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100">
                    <div className="space-y-4">

                      
                      <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                        <div>
                           <span className="text-muted-foreground text-xs font-medium block mb-1">Area</span>
                           <span className="font-display font-bold text-sm text-foreground">{selectedProperty.area}</span>
                        </div>
                        <div>
                           <span className="text-muted-foreground text-xs font-medium block mb-1">Location</span>
                           <span className="font-display font-bold text-sm text-foreground line-clamp-1">{selectedProperty.location}</span>
                        </div>
                        <div>
                           <span className="text-muted-foreground text-xs font-medium block mb-1">Type</span>
                           <span className="font-display font-bold text-sm text-foreground">{selectedProperty.category}</span>
                        </div>
                        <div>
                           <span className="text-muted-foreground text-xs font-medium block mb-1">Floor</span>
                           <span className="font-display font-bold text-sm text-foreground">{selectedProperty.floor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <Link 
                      to={`/property/${selectedProperty.id}`} 
                      onClick={closeModal} 
                      className="w-full text-center gradient-orange text-white font-display font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                      View Full Gallery and Info
                    </Link>
                    <button onClick={closeModal} className="w-full py-4 rounded-xl text-foreground font-display font-semibold hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 text-sm">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PropertiesSection;