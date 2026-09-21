import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Maximize, ArrowRight, Lock, X, CheckCircle, Zap, Check } from "lucide-react";
import { allProperties } from "@/data/properties";
import OfficeNavbar from "@/components/OfficeNavbar";
import OfficeHero from "@/components/OfficeHero";
import LocationInsights from "@/components/LocationInsights";
import TrustedBy from "@/components/TrustedBy";
import CTASection from "@/components/CTASection";
import OfficeFooter from "@/components/OfficeFooter";
import SEO from "@/components/SEO";
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

const OfficeLandingPage = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<typeof allProperties[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
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
    const unlocked = localStorage.getItem("sab_unlocked_all") === "true";
    setIsUnlocked(unlocked);
  }, []);

  // Filter for Office Space only (exactly 10 listings)
  const officeProperties = allProperties.filter(p => 
    p.category === "Office/Serviced Office"
  );

  const handlePropertyClick = (property: typeof allProperties[0]) => {
    if (isUnlocked) {
      navigate(`/property/${property.id}`);
      return;
    }
    setSelectedProperty(property);
    setSubmitted(false);
    reset();
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const targetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (targetUrl) {
        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append("fullName", data.name);
        urlEncodedData.append("phone", data.phone);
        urlEncodedData.append("service", "Office Property Unlock");
        urlEncodedData.append("message", `Property: ${selectedProperty?.title} | Location: ${selectedProperty?.location}`);
        
        await fetch(targetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlEncodedData.toString(),
        });
      }
      
      // Track Google Ads Conversion
      if (typeof (window as any).gtag_report_conversion === 'function') {
        (window as any).gtag_report_conversion();
      }
      
      localStorage.setItem("sab_unlocked_all", "true");
      setIsUnlocked(true);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Best Premium Office Space in Delhi | Managed & Raw Spaces"
        description="Looking for office space in Delhi? Find premium managed, plug-and-play, and raw office spaces in Central Delhi, Asaf Ali Road, and South Delhi. 30+ years of experience."
        canonical="/office-space-delhi"
        useBusinessSchema={true}
      />
      
      <OfficeNavbar />
      
      <main>
        <OfficeHero />
        

        {/* Featured Listings Section */}
        <section id="listings" className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-10 h-[2px] bg-primary"></span>
                <span className="text-primary font-display font-bold text-xs tracking-widest uppercase">Available Listings</span>
              </div>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mb-6">
                Explore Current <br />
                <span className="text-primary">Office Opportunities</span>
              </h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed">
                Browse our curated selection of premium office spaces. Each property is verified for commercial compliance and strategic advantage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {officeProperties.map((property, i) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-500 cursor-pointer"
                  onClick={() => handlePropertyClick(property)}
                >
                  <div className="relative h-[240px] overflow-hidden m-2 rounded-[1.5rem]">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-foreground font-display font-bold text-[10px] px-3 py-1.5 rounded-full shadow-sm uppercase tracking-tighter">
                        {property.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{property.location}</span>
                      <span className="text-slate-300">•</span>
                      <span>{property.seats}</span>
                    </div>

                    <div className="space-y-2 mb-8">
                      {(property.highlights || []).slice(0, 3).map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-green-500" />
                          <span className="text-[11px] text-muted-foreground font-medium">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">Space Area</span>
                        <span className="flex items-center gap-1 text-sm font-display font-bold text-foreground">
                          <Maximize className="w-3.5 h-3.5 text-primary" />
                          {property.area}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary font-display font-bold text-xs uppercase tracking-widest group-hover:gap-2 transition-all">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <LocationInsights />

        <CTASection />
      </main>

      <OfficeFooter />

      {/* Property Unlock Modal */}
      <AnimatePresence>
        {selectedProperty !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {!submitted ? (
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-display font-bold text-2xl text-foreground">Unlock Full Specs</h3>
                      <p className="text-muted-foreground text-sm mt-1">Property: {selectedProperty.title}</p>
                    </div>
                    <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1">
                      <input
                        {...register("name", {
                          onChange: (e) => {
                            e.target.value = sanitizeName(e.target.value);
                          }
                        })}
                        placeholder="Your Name"
                        className={`w-full px-5 py-4 rounded-xl bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200'} text-sm focus:outline-none focus:border-primary transition-all`}
                      />
                      {errors.name && <p className="text-red-500 text-[10px] ml-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <input
                        type="tel"
                        {...register("phone", {
                          onChange: (e) => {
                            e.target.value = sanitizePhone(e.target.value);
                          }
                        })}
                        placeholder="Phone Number"
                        className={`w-full px-5 py-4 rounded-xl bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-200'} text-sm focus:outline-none focus:border-primary transition-all`}
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] ml-1">{errors.phone.message}</p>}
                    </div>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-primary text-white font-display font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/30 transition-all mt-2 disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        "View Pricing & Full Details"
                      )}
                    </button>
                  </form>
                  <p className="text-[10px] text-slate-400 text-center mt-4 uppercase font-bold tracking-tighter italic">We value your privacy. No spam, just property data.</p>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">Access Granted</h3>
                  <p className="text-muted-foreground text-sm mb-8">You can now view all technical specifications and pricing for this office space.</p>
                  <button 
                    onClick={() => {
                      closeModal();
                      navigate(`/property/${selectedProperty.id}`);
                    }}
                    className="w-full bg-primary text-white font-display font-bold py-4 rounded-xl shadow-lg"
                  >
                    Go to Property Page
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OfficeLandingPage;
