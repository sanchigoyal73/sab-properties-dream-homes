import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, Maximize, ArrowRight, Building2, Search, SlidersHorizontal, X, ChevronDown, Check, Lock, Phone, User, Star, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import propertiesImg from "@/assets/properties.jpg";
import propertyHeroImg from "@/assets/property-hero.png";
import ResponsiveImage from "@/components/ResponsiveImage";

const locations = ["All Locations", "Asaf Ali Road", "Connaught Place", "Karol Bagh", "Okhla", "Lajpat Nagar", "East of Kailash", "Kirti Nagar"];
const propertyTypes = ["All Types", "Office/Serviced Office", "Showroom", "Warehouse", "Co-Working", "Pre-Rented", "Cloud Kitchen/Dark Store"];
const sizeRanges = ["Any Size", "Under 1000 sq.ft", "1000-5000 sq.ft", "5000-10000 sq.ft", "10000+ sq.ft"];

// "Godown" was renamed to "Warehouse"; keep old links and searches for godown working
const legacyCategories: Record<string, string> = { Godown: "Warehouse" };
const normalizeSearch = (q: string) => q.toLowerCase().replace(/godowns?/g, "warehouse");

import { allProperties, matchesCategory } from "@/data/properties";
import { singleNameValidation, phoneValidation, sanitizeName, sanitizePhone } from "@/utils/leadValidation";
import { useHoneypot } from "@/hooks/use-honeypot";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedSize, setSelectedSize] = useState("Any Size");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<typeof allProperties[0] | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadFormData, setLeadFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [leadFormErrors, setLeadFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem("sab_unlocked_all") === "true";
    setIsUnlocked(unlocked);
  }, []);

  useEffect(() => {
    let filtered = [...allProperties];
    let count = 0;

    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter(p => {
        if (!p.location) return false;
        return p.location.toLowerCase().includes(selectedLocation.toLowerCase());
      });
      count++;
    }
    if (selectedType !== "All Types") {
      filtered = filtered.filter(p => matchesCategory(p, selectedType));
      count++;
    }
    if (selectedSize !== "Any Size") {
      if (selectedSize === "Under 1000 sq.ft") filtered = filtered.filter(p => p.size < 1000);
      else if (selectedSize === "1000-5000 sq.ft") filtered = filtered.filter(p => p.size >= 1000 && p.size <= 5000);
      else if (selectedSize === "5000-10000 sq.ft") filtered = filtered.filter(p => p.size > 5000 && p.size <= 10000);
      else if (selectedSize === "10000+ sq.ft") filtered = filtered.filter(p => p.size > 10000);
      count++;
    }

    if (searchQuery) {
      const q = normalizeSearch(searchQuery);
      filtered = filtered.filter(p => 
        (p.title && p.title.toLowerCase().includes(q)) || 
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    setFilteredProperties(filtered);
    setActiveFiltersCount(count);
  }, [selectedLocation, selectedType, selectedSize, searchQuery]);

  // Handle case where category is in search params on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedType(legacyCategories[categoryParam] ?? categoryParam);
      setShowFilters(true);
    }
  }, [searchParams]);

  const clearFilters = () => {
    setSelectedLocation("All Locations");
    setSelectedType("All Types");
    setSelectedSize("Any Size");
    setSearchQuery("");
    setActiveFiltersCount(0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePropertyClick = (property: typeof allProperties[0]) => {
    if (isUnlocked) {
      navigate(`/property/${property.id}`);
      return;
    }
    setSelectedProperty(property);
    setShowLeadForm(true);
    setFormSubmitted(false);
    setLeadFormData({ name: "", email: "", phone: "", message: "" });
    setLeadFormErrors({});
  };

  const validateLeadForm = () => {
    const errors: { name?: string; phone?: string } = {};
    
    const nameResult = singleNameValidation.safeParse(leadFormData.name);
    if (!nameResult.success) {
      errors.name = nameResult.error.errors[0].message;
    }

    const phoneResult = phoneValidation.safeParse(leadFormData.phone);
    if (!phoneResult.success) {
      errors.phone = phoneResult.error.errors[0].message;
    }

    setLeadFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const honeypot = useHoneypot();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLeadForm()) return;
    try {
      const targetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (targetUrl) {
        const urlEncodedData = new URLSearchParams();
        honeypot.stamp(urlEncodedData);
        urlEncodedData.append("fullName", leadFormData.name);
        urlEncodedData.append("phone", leadFormData.phone);
        urlEncodedData.append("service", "Property Unlock");
        urlEncodedData.append("message", `Property: ${selectedProperty?.title} | Category: ${selectedProperty?.category} | Location: ${selectedProperty?.location}`);
        
        if (!honeypot.isBot()) await fetch(targetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlEncodedData.toString(),
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setShowLeadForm(false);
    localStorage.setItem("sab_unlocked_all", "true");
    setIsUnlocked(true);
    navigate(`/property/${selectedProperty?.id}`);
  };

  const closeModal = () => {
    setShowLeadForm(false);
    setSelectedProperty(null);
    setFormSubmitted(false);
    setLeadFormErrors({});
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Commercial Properties in Delhi | Offices, Showrooms & Warehouses"
        description="Browse office spaces, showrooms, warehouses (godowns), co-working and pre-rented commercial properties for rent and sale across Delhi."
        keywords="commercial property Delhi, office space Delhi, showroom in Delhi, warehouse in Delhi, godown in Delhi, godown for rent in Delhi, pre-rented property Delhi"
        canonical="/properties"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={propertyHeroImg} alt="Our Properties" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.3 }}
          className="relative text-center px-4"
        >
          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white mb-6">
            Our Properties
          </h1>
          <p className="text-white/80 font-body text-base md:text-xl lg:text-2xl max-w-2xl mx-auto">
            Discover premium spaces across Delhi NCR
          </p>
        </motion.div>
      </section>

      {/* Unified Search and Filter Section - Refined Design */}
      <section className="relative -mt-16 z-40 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-4 md:p-6 border border-slate-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Main Search Input */}
              <div className="relative flex-1 w-full group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary text-muted-foreground">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search project name, location or type..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none font-body text-base"
                />
              </div>

              {/* Filter Controls Row */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-display font-bold text-sm transition-all border ${
                    showFilters 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                    : 'bg-white border-slate-200 text-foreground hover:border-primary hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-primary text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black">
                      {activeFiltersCount}
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                <div className="hidden md:block h-10 w-[1px] bg-slate-200 mx-2" />
              </div>
            </div>

            {/* Expandable Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Hub Selection */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-display font-black text-muted-foreground uppercase tracking-widest ml-1">Business Hub</label>
                        <div className="relative group">
                          <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-foreground font-display font-bold text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
                          >
                            {locations.map(loc => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                          </select>
                          <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none group-hover:text-primary transition-colors" />
                        </div>
                      </div>

                      {/* category Selection */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-display font-black text-muted-foreground uppercase tracking-widest ml-1">Usage Type</label>
                        <div className="relative group">
                          <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-foreground font-display font-bold text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
                          >
                            {propertyTypes.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                          <Building2 className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none group-hover:text-primary transition-colors" />
                        </div>
                      </div>

                      {/* Area Selection */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-display font-black text-muted-foreground uppercase tracking-widest ml-1">Carpet Area</label>
                        <div className="relative group">
                          <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-foreground font-display font-bold text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
                          >
                            {sizeRanges.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                          <Maximize className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Active Filter Chips */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
                      <div className="flex flex-wrap gap-2">
                         {(activeFiltersCount > 0 || searchQuery) ? (
                           <>
                             {selectedLocation !== "All Locations" && (
                               <button onClick={() => setSelectedLocation("All Locations")} className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all group">
                                 {selectedLocation}
                                 <X className="w-3 h-3 transition-transform group-hover:rotate-90" />
                               </button>
                             )}
                             {selectedType !== "All Types" && (
                               <button onClick={() => setSelectedType("All Types")} className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all group">
                                 {selectedType}
                                 <X className="w-3 h-3 transition-transform group-hover:rotate-90" />
                               </button>
                             )}
                             {searchQuery && (
                               <button onClick={() => setSearchQuery("")} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all group">
                                 "{searchQuery}"
                                 <X className="w-3 h-3 transition-transform group-hover:rotate-90" />
                               </button>
                             )}
                           </>
                         ) : (
                           <div className="flex items-center gap-2 text-slate-400 text-xs font-medium italic">
                              <Check className="w-4 h-4" />
                              Currently showing all results
                           </div>
                         )}
                      </div>

                      {(activeFiltersCount > 0 || searchQuery) && (
                        <button onClick={clearFilters} className="text-[10px] font-display font-black text-primary hover:text-orange-600 uppercase tracking-widest transition-colors flex items-center gap-2">
                           <X className="w-4 h-4" />
                           Reset Everything
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Results Count - Restored to Original Style */}
      {(selectedLocation !== "Faridabad" && selectedLocation !== "East of Kailash") && (
      <section className="pt-4 pb-2 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-slate-500 font-body text-xs font-semibold uppercase tracking-wider">
              {filteredProperties.length === 0 
                ? "0 properties matched your search" 
                : `${filteredProperties.length} properties found in our portfolio`}
            </p>
          </div>
        </div>
      </section>
      )}

      {/* Properties Content Area */}
      <section className="pt-8 pb-24 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] translate-x-1/4" />

        <div className="container relative mx-auto px-4 lg:px-8">
          {(selectedLocation === "Faridabad" || selectedLocation === "East of Kailash") ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] shadow-sm border border-slate-100"
            >
              <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-8 relative">
                 <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
                 <Star className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-display font-black text-5xl md:text-6xl text-foreground mb-4">Coming Soon</h2>
              <p className="text-muted-foreground font-body text-xl text-center max-w-md">Our premium portfolio in {selectedLocation} is being curated. Stay tuned for updates.</p>
              <button onClick={() => setSelectedLocation("All Locations")} className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-display font-bold hover:bg-slate-800 transition-all">
                 Explore Available Units
              </button>
            </motion.div>
          ) : filteredProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 min-h-[500px]">
               {/* Complete blank state for filtered searches with 0 results */}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProperties.map((property, i) => (
                <motion.div
                  key={property.id || property.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i % 3 * 0.1 }}
                  className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-primary/20 hover:shadow-[0_40px_80px_-25px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-3 cursor-pointer"
                  onClick={() => {
                    if (property.category === "Pre-Rented") {
                      navigate(`/property/${property.id}`);
                    } else {
                      handlePropertyClick(property);
                    }
                  }}
                >
                  <div className="relative h-[320px] overflow-hidden m-2.5 rounded-[2rem]">
                    <ResponsiveImage
                      src={property.image}
                      alt={property.title}
                      sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 480px, (min-width: 768px) 50vw, (min-width: 480px) 100vw, 480px"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out filter brightness-[1.02] contrast-[1.05] saturate-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                       <span className="bg-white/95 backdrop-blur-md text-foreground font-display font-black text-[10px] px-4 py-2 rounded-full shadow-lg uppercase tracking-widest">
                          {property.category}
                       </span>
                       {property.featured && (
                         <span className="bg-primary/95 backdrop-blur-md text-white flex items-center gap-1.5 font-display font-black text-[10px] px-4 py-2 rounded-full shadow-lg uppercase tracking-widest">
                            <Star className="w-3 h-3 fill-current" />
                            Premium
                         </span>
                       )}
                    </div>


                  </div>

                  <div className="p-8 pt-5">
                    <h3 className="font-display font-semibold text-xl text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                      {property.title}
                    </h3>

                    {/* Location & Seats Info */}
                    <div className="flex items-center gap-2 mb-6 group/loc">
                      <div className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center text-slate-400 group-hover/loc:bg-primary/5 group-hover/loc:text-primary transition-colors">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex items-center gap-2 text-[13px] font-medium tracking-wide text-slate-500">
                        <span className="text-slate-700 font-semibold">{property.location}</span>
                        <span className="text-slate-300">•</span>
                        <span>{property.seats}</span>
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-2.5 mb-8">
                      {(property.highlights || []).slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2.5 group/item">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-[13px] text-muted-foreground font-medium group-hover/item:text-foreground transition-colors">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100/80">
                      {property.category === "Pre-Rented" ? (
                        <>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-[0.15em] mb-1.5">Monthly Rent</span>
                            <span className="flex items-center gap-2 text-sm font-display font-bold text-foreground">
                              <Zap className="w-4 h-4 text-primary/60" />
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
                            <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-[0.15em] mb-1.5">Carpet Area</span>
                            <span className="flex items-center gap-2 text-sm font-display font-bold text-foreground">
                              <Maximize className="w-4 h-4 text-primary/60" />
                              {property.area}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-display font-bold text-primary hover:text-orange-600 transition-colors uppercase tracking-widest group/btn">
                             {!isUnlocked && <Lock className="w-4 h-4" />}
                             <span>{isUnlocked ? "View Details" : "Unlock Info"}</span>
                             <ArrowRight className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Property Disclaimer */}
        <div className="container mx-auto px-4 lg:px-8 mt-16 mb-8">
          <div className="bg-slate-100/50 rounded-2xl p-6 border border-slate-200/50">
            <p className="text-slate-500 font-body text-xs leading-relaxed text-center">
              <span className="font-bold uppercase tracking-wider mr-2">Disclaimer:</span>
              Property images are for representational purposes only and may not depict the actual property.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Premium Modal Implementation */}
      <AnimatePresence>
        {showLeadForm && selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
            >
              {!formSubmitted ? (
                <>
                  <div className="relative h-56">
                    <ResponsiveImage
                      src={selectedProperty.image}
                      alt={selectedProperty.title}
                      sizes="512px"
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <button
                      onClick={closeModal}
                      className="absolute top-6 right-6 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors border border-white/20"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-6 left-8 right-8">
                      <span className="bg-primary/95 text-white font-display font-black text-[10px] px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                        {selectedProperty.category}
                      </span>
                      <h3 className="font-display font-black text-3xl text-white mt-4 drop-shadow-xl">
                        {selectedProperty.title}
                      </h3>
                      <p className="text-white/80 text-sm mt-1 flex items-center gap-1.5">
                         <MapPin className="w-3.5 h-3.5" />
                         {selectedProperty.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-10">
                    <div className="flex items-start gap-4 mb-8 p-5 bg-orange-50 rounded-3xl border border-orange-100">
                      <div className="w-12 h-12 rounded-2xl gradient-orange flex items-center justify-center shrink-0 shadow-lg">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-foreground text-lg">Unlock Specification</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed mt-1">Enter your details to reveal the floor plan, asking price, and premium amenities.</p>
                      </div>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-5">
                      {honeypot.field}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-display font-black text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            required
                            value={leadFormData.name}
                            onChange={(e) => {
                              const sanitized = sanitizeName(e.target.value);
                              setLeadFormData({ ...leadFormData, name: sanitized });
                              if (leadFormErrors.name) setLeadFormErrors({ ...leadFormErrors, name: undefined });
                            }}
                            placeholder="e.g. Rahul Sharma"
                            className={`w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border ${
                              leadFormErrors.name ? "border-red-500 ring-4 ring-red-500/10" : "border-slate-200"
                            } text-foreground placeholder:text-slate-400 font-body text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all`}
                          />
                          {leadFormErrors.name && (
                            <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase tracking-wider">
                              {leadFormErrors.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-display font-black text-muted-foreground uppercase tracking-widest ml-1">Phone</label>
                        <div className="relative group">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <input
                            type="tel"
                            required
                            value={leadFormData.phone}
                            onChange={(e) => {
                              const sanitized = sanitizePhone(e.target.value);
                              setLeadFormData({ ...leadFormData, phone: sanitized });
                              if (leadFormErrors.phone) setLeadFormErrors({ ...leadFormErrors, phone: undefined });
                            }}
                            placeholder="e.g. +91 98765 43210"
                            className={`w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border ${
                              leadFormErrors.phone ? "border-red-500 ring-4 ring-red-500/10" : "border-slate-200"
                            } text-foreground placeholder:text-slate-400 font-body text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all`}
                          />
                          {leadFormErrors.phone && (
                            <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 uppercase tracking-wider">
                              {leadFormErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full gradient-orange text-white font-display font-black py-5 rounded-2xl hover:opacity-90 transition-all shadow-[0_20px_40px_-10px_rgba(249,115,22,0.3)] flex items-center justify-center gap-3 mt-4 text-sm uppercase tracking-widest"
                      >
                        Unlock Full Details
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                      <a
                        href="tel:+918700513200"
                        className="w-full py-5 bg-slate-900 text-white font-display font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 mt-3 text-sm uppercase tracking-widest"
                      >
                        <Phone className="w-5 h-5" />
                        Call Now
                      </a>
                    </form>

                    <p className="text-center text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-8">
                       Strictly Confidential • Instant Access
                    </p>
                  </div>
                </>
              ) : (
                <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
                  <div className="relative h-64">
                    <ResponsiveImage
                      src={selectedProperty.image}
                      alt={selectedProperty.title}
                      sizes="512px"
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                    <button
                      onClick={closeModal}
                      className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-8 left-10 right-10">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="px-5 py-2 bg-green-500 text-white rounded-full font-display font-black text-[10px] uppercase tracking-widest shadow-xl">Unlocked Successfully</div>
                      </div>
                      <h3 className="font-display font-black text-4xl text-white drop-shadow-2xl">
                        {selectedProperty.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-10">
                    {/* Price Header */}


                    <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:border-primary/20 transition-colors">
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2">Total Space</p>
                        <p className="font-display font-black text-xl text-foreground flex items-center gap-2">
                           <Maximize className="w-5 h-5 text-primary" />
                           {selectedProperty.area}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:border-primary/20 transition-colors">
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2">Floor No.</p>
                        <p className="font-display font-black text-xl text-foreground flex items-center gap-2">
                           <Building2 className="w-5 h-5 text-primary" />
                           {selectedProperty.floor}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6 mb-10">
                       <div className="flex justify-between items-center py-5 border-b border-slate-100 group">
                          <span className="text-muted-foreground font-display font-bold group-hover:text-foreground transition-colors">Property Facing</span>
                          <span className="font-display font-black text-foreground uppercase tracking-widest">{selectedProperty.facing}</span>
                       </div>
                       <div className="flex justify-between items-center py-5 border-b border-slate-100 group">
                          <span className="text-muted-foreground font-display font-bold group-hover:text-foreground transition-colors">Location Grade</span>
                          <span className="font-display font-black text-primary uppercase tracking-widest">Premium A+</span>
                       </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <Link
                        to={`/contact?property=${encodeURIComponent(selectedProperty.title)}`}
                        onClick={closeModal}
                        className="flex-1 text-center bg-slate-900 text-white font-display font-black py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl uppercase tracking-widest text-xs"
                      >
                        Schedule Private Viewing
                      </Link>
                      <button 
                         onClick={closeModal}
                         className="px-10 py-5 rounded-2xl bg-slate-100 text-foreground font-display font-black hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                      >
                         Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Properties;
