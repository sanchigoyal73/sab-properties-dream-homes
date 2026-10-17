import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Maximize, Phone, Lock, Star, 
  Layers, Compass, Send, Calendar, Share2, Heart,
  Building, ArrowUpCircle, Car, ShieldCheck, Zap, Flame,
  Briefcase, CircleDollarSign, TrendingUp, Clock, Coins, FileText, ArrowLeft
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allProperties } from "@/data/properties";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { nameValidation, phoneValidation, emailValidation, sanitizeName, sanitizePhone, sanitizeEmail } from "@/utils/leadValidation";

const normalizeLocation = (loc: string) => {
  if (!loc) return "";
  const normalized = loc.trim().toLowerCase();
  // Map common variations to standard keys
  if (normalized.includes("asaf ali")) return "Asaf Ali Road";
  if (normalized.includes("connaught")) return "Connaught Place";
  if (normalized.includes("karol bagh")) return "Karol Bagh";
  if (normalized.includes("okhla")) return "Okhla";
  if (normalized.includes("lajpat")) return "Lajpat Nagar";
  if (normalized.includes("kailash")) return "East Of Kailash";
  if (normalized.includes("kirti")) return "Kirti Nagar";
  if (normalized.includes("mg road")) return "MG Road";
  return loc;
};

const locationDescriptions: Record<string, string[]> = {
  "Asaf Ali Road": [
    "Asaf Ali Road occupies a prestigious position as one of Central Delhi’s most significant commercial thoroughfares, serving as a critical bridge that connects the historic legacy of the Walled City with the contemporary business infrastructure of New Delhi. Known for its robust financial ecosystem, it has long been the preferred corporate address for major banking institutions, financial firms, and government offices. Its accessibility is unparalleled, being situated just minutes away from the New Delhi Railway Station and well-integrated into the city’s major transit networks. The area’s historical significance, combined with its modern functional advantages, makes it an ideal location for established enterprises seeking a high-visibility, professional environment in the heart of the national capital."
  ],
  "Connaught Place": [
    "Connaught Place, affectionately known as CP, stands as the undisputed heart of Delhi’s commercial landscape and remains one of the world’s most sought-after business addresses. Its iconic Georgian-style circular architecture and vibrant white corridors house a prestigious mix of international brands, corporate headquarters, and governmental institutions. As a central nexus of the Delhi Metro’s comprehensive rail network, CP offers effortless connectivity to every corner of the National Capital Region, from Gurgaon to Noida. The area is not only a commercial powerhouse but also a cultural landmark, offering a sophisticated environment where heritage meets modern business efficiency, making it the ultimate destination for any premium corporate presence."
  ],
  "Karol Bagh": [
    "Karol Bagh is celebrated as one of Delhi’s most dynamic and historically significant mixed-use commercial districts, offering a unique blend of high-energy retail markets and professional office spaces. Renowned for its massive footfall and popularity among both locals and tourists, it provides businesses with exceptional visibility and a direct pulse on the city’s trade. The area has seen significant infrastructure upgrades, boasting premier metro connectivity and a modernized business environment that continues to attract a diverse range of professional services and retail showrooms. Its central location and established commercial reputation make Karol Bagh a strategic choice for businesses looking to capitalize on high market engagement and accessibility."
  ],
  "Okhla": [
    "Okhla Industrial Estate has transformed into one of South Delhi’s most sophisticated commercial hubs, shifting from its traditional industrial roots to become a premier destination for technology firms, manufacturing giants, and modern corporate offices. With its proximity to the Noida border and seamless connectivity via the Outer Ring Road and the DND Flyway, Okhla offers a strategic advantage for logistics and regional distribution. The district is characterized by state-of-the-art business parks, high-capacity utility infrastructure, and a professional atmosphere that caters to the needs of large-scale operations. It remains a top-tier choice for companies requiring large floor plates and a prime South Delhi business address."
  ],
  "Lajpat Nagar": [
    "Lajpat Nagar stands out as a premier commercial and residential epicenter in South Delhi, globally recognized for its vibrant Central Market and bustling economic activity. This strategic location offers businesses an enviable level of exposure, benefited by its direct access to the Ring Road and multiple major metro lines. The area’s unique charm lies in its ability to attract a diverse demographic, making it an exceptional location for retail flagship stores, boutique professional offices, and corporate service centers. Its high density of premium residential units nearby ensures a steady stream of high-value patrons, providing a fertile ground for businesses to establish a strong and visible brand presence."
  ],
  "East Of Kailash": [
    "East Of Kailash is an upscale South Delhi neighborhood that has carved out a niche as a sophisticated and prestigious commercial enclave. Offering a refined business environment, it is ideally positioned near the Nehru Place financial district while providing a quieter, more exclusive professional setting. The area is highly sought after by boutique firms, executive consultants, and multinational regional offices that value a premium address with excellent transit links. Its blend of high-end residential surroundings and professional infrastructure creates a unique ecosystem where business leaders can operate in a polished, well-connected environment that reflects corporate excellence and high social standing."
  ],
  "Kirti Nagar": [
    "Kirti Nagar is globally recognized as Asia's largest dedicated furniture and timber hub, but it has rapidly evolved into a multifaceted commercial powerhouse in West Delhi. Offering robust infrastructure and high-grade industrial-to-commercial spaces, it serves as the primary trade gateway for the entire western region of the capital. The area’s strategic value is bolstered by its proximity to major highways and its position on the Delhi Metro’s crucial lines, facilitating smooth logistics and employee transit. Kirti Nagar's mature commercial ecosystem provides an established foundation for businesses in manufacturing, large-scale retail, and specialized professional services looking for a well-connected and historically successful trade environment."
  ],
  "MG Road": [
    "MG Road serves as the flagship commercial corridor connecting Delhi to the booming corporate hub of Gurgaon, representing the pinnacle of modern Indian business development. Characterized by glass-fronted skyscrapers, luxury retail malls, and Grade-A office complexes, it is the primary address for Fortune 500 companies and high-end lifestyle brands. Its location on the Yellow Line of the Delhi Metro and direct access to the NH-48 highway ensures that it remains one of the most accessible and visible business districts in the country. MG Road offers an international-standard work environment with world-class amenities, making it the preferred choice for organizations looking to project a global corporate image."
  ]
};

const locationMaps: Record<string, string> = {
  "Asaf Ali Road": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.845448651478!2d77.224856!3d28.6337346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd395a691533%3A0xc3f173f412c1b72e!2sAsaf+Ali+Rd%2C+New+Delhi%2C+Delhi!5e0!3m2!1sen!2sin!4v1712739486000",
  "Connaught Place": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.2721111!2d77.2167!3d28.6289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b7496677%3A0x33e3026936637aca!2sConnaught+Place%2C+New+Delhi%2C+Delhi!5e0!3m2!1sen!2sin!4v1712739486000",
  "Karol Bagh": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14007.47271031358!2d77.1887!3d28.6448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd447d6c8b41%3A0x4a4a4a4a4a4a4a!2sKarol+Bagh%2C+New+Delhi%2C+Delhi!5e0!3m2!1sen!2sin!4v1712739486000",
  "Okhla": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14016.923838383!2d77.272!3d28.528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e564daac3b%3A0x392461012674681f!2sOkhla%20Industrial%20Estate%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1712739486000",
  "Lajpat Nagar": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.433!2d77.24!3d28.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c564daac3b%3A0x392461012674681f!2sLajpat%20Nagar%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1712739486000",
  "MG Road": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14028.0!2d77.08!3d28.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19213123123!2sMG+Road%2C+Gurgaon%2C+Haryana!5e0!3m2!1sen!2sin!4v1712739486000"
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<typeof allProperties[0] | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  useEffect(() => {
    const prop = allProperties.find(p => p.id === parseInt(id || "0"));
    setProperty(prop || null);
    window.scrollTo(0, 0);
  }, [id]);

  // Warehouses used to be listed as "godowns" — keep that search term in the metadata
  const isWarehouse = !!property && /warehouse/i.test(`${property.category} ${property.title}`);
  const seoDescription = property && isWarehouse
    ? `Warehouse (godown) in ${property.location}, Delhi. ${property.description}`
    : property?.description;
  const seoKeywords = property && isWarehouse
    ? `warehouse in ${property.location}, godown in ${property.location}, warehouse in Delhi, godown in Delhi, godown for rent in Delhi`
    : undefined;

  const propertySchema = property ? {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": seoDescription,
    ...(seoKeywords && { "keywords": seoKeywords }),
    "image": `https://sabproperties.in${property.image}`,
    "url": `https://sabproperties.in/property/${property.id}`,
    "datePosted": "2024-01-01",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": typeof property.salePrice === 'number' ? property.salePrice * 10000000 : (typeof property.rent === 'number' ? property.rent : "Contact for price"),
      "url": `https://sabproperties.in/property/${property.id}`
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location,
      "addressRegion": "Delhi",
      "addressCountry": "IN"
    }
  } : null;

  const normalizedLoc = property ? normalizeLocation(property.location) : "";

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Name validation
    const nameResult = nameValidation.safeParse(formData.name);
    if (!nameResult.success) {
      newErrors.name = nameResult.error.errors[0].message;
    }

    // Email validation
    if (formData.email.trim()) {
      const emailResult = emailValidation.safeParse(formData.email);
      if (!emailResult.success) {
        newErrors.email = emailResult.error.errors[0].message;
      }
    }

    // Phone validation
    const phoneResult = phoneValidation.safeParse(formData.phone);
    if (!phoneResult.success) {
      newErrors.phone = phoneResult.error.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Inquiry sent successfully! Our team will contact you shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } else {
      toast.error("Please fix the validation errors in the form.");
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <h1 className="text-2xl font-medium mb-4 font-display">Property Not Found</h1>
          <Link to="/properties" className="text-primary hover:underline font-body">Back to All Properties</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-body">
      <SEO 
        title={property.title}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={`/property/${property.id}`}
        ogImage={property.image}
        structuredData={propertySchema || undefined}
      />
      <Navbar solid />
      
      <main className="pt-32 sm:pt-40 pb-40">
        
        {/* Back Button */}
        <div className="container mx-auto px-4 lg:px-8 mb-8">
          <Link 
            to="/properties" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group"
          >
            <div className="p-2 rounded-full border border-slate-100 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Back to all properties</span>
          </Link>
        </div>
        
        {/* 1. GALLERY AT THE TOP */}
        <section className="container mx-auto px-4 lg:px-8 mb-12">
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 relative group">
            <img 
              src={property.image} 
              alt={property.title} 
              className="w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[1.02] contrast-[1.05] saturate-[1.1]"
            />
            <div className="absolute top-8 right-8 flex gap-4">
              <button className="p-4 bg-white/90 backdrop-blur-md rounded-full shadow-xl hover:bg-white transition-all hover:scale-110 active:scale-95 border border-white/20">
                <Share2 className="w-6 h-6 text-slate-700" />
              </button>
              <button className="p-4 bg-white/90 backdrop-blur-md rounded-full shadow-xl hover:bg-white transition-all hover:scale-110 active:scale-95 border border-white/20">
                <Heart className="w-6 h-6 text-slate-700 hover:text-red-500 transition-colors" />
              </button>
            </div>
            
            {/* Visual Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </section>

        {/* 2. CONTENT AREA: Heading below Gallery */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Header Info Block */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-medium text-slate-900 leading-[1.1] font-display tracking-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-3 text-slate-500 text-lg">
                    <MapPin className="w-5 h-5 text-primary/60" />
                    <span>{property.location}</span>
                    <span className="inline-flex items-center gap-1.5 ml-2">
                       <Star className="w-4 h-4 text-primary" fill="currentColor" />
                       <span className="text-slate-900 font-medium">5.0</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Description */}
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-slate-900 font-display">Description:</h2>
                <p className="text-slate-600 text-lg leading-relaxed font-normal">
                  {property.description}
                </p>
              </div>

              {/* Professional Amenities Section */}
              <div className="space-y-8 pt-8">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  <h2 className="text-xl font-medium text-slate-900 font-display">
                    {property.category === "Pre-Rented" ? "Investment Details" : "Property Specifications"}
                  </h2>
                </div>
                
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-10">
                    {[
                      ...(property.category === "Pre-Rented" ? [
                        { label: "Tenant", value: property.tenant, icon: Briefcase },
                        { label: "Monthly Rent", value: typeof property.rent === 'number' ? `₹${property.rent.toLocaleString()}` : property.rent, icon: CircleDollarSign },
                        { label: "ROI", value: typeof property.roi === 'number' ? `${(property.roi * 100).toFixed(2)}%` : property.roi, icon: TrendingUp },
                        { label: "Sale Price", value: typeof property.salePrice === 'number' ? `₹${property.salePrice} Cr` : property.salePrice, icon: Coins },
                        { label: "Locking Period", value: property.lockin || "N/A", icon: Clock },
                        { label: "Security Deposit", value: typeof property.securityDeposit === 'number' ? `₹${property.securityDeposit.toLocaleString()}` : property.securityDeposit, icon: ShieldCheck },
                        { label: "Lease Period", value: property.tenure ? `${property.tenure} Years` : "N/A", icon: FileText },
                        { label: "Escalation", value: property.escalation || "N/A", icon: TrendingUp },
                      ] : [
                        { label: "Floor", value: property.floor || "Multiple", icon: Layers },
                        { label: "Lift / Elevator", value: "High Speed", icon: ArrowUpCircle },
                        { label: "Parking", value: "Available", icon: Car },
                        { label: "Security", value: "24/7 CCTV", icon: ShieldCheck },
                        { label: "Power Backup", value: "100%", icon: Zap },
                        { label: "Fire Safety", value: "Equipped", icon: Flame },
                        { label: "Total Area", value: property.area, icon: Maximize },
                        { label: "Location Grade", value: "Premium A+", icon: Star },
                      ])
                    ].map((feat, i) => (
                      <div key={i} className="flex flex-col gap-4 group">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                          <feat.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{feat.label}</p>
                          <p className="text-sm font-semibold text-slate-900">{feat.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Column: Lead Form */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-[#F8F8F8] rounded-3xl p-8 border border-slate-100 sticky top-28">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-900 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className={`w-full px-5 py-4 bg-white border rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary/40 transition-all font-normal text-sm ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => {
                          const sanitized = sanitizeName(e.target.value);
                          setFormData({...formData, name: sanitized});
                          if (errors.name) setErrors({...errors, name: undefined});
                        }}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-900 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className={`w-full px-5 py-4 bg-white border rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary/40 transition-all font-normal text-sm ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          const sanitized = sanitizeEmail(e.target.value);
                          setFormData({...formData, email: sanitized});
                          if (errors.email) setErrors({...errors, email: undefined});
                        }}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-900 ml-1">Phone</label>
                      <input 
                        type="tel" 
                        required
                        className={`w-full px-5 py-4 bg-white border rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary/40 transition-all font-normal text-sm ${errors.phone ? 'border-red-500' : 'border-slate-200'}`}
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => {
                          const sanitized = sanitizePhone(e.target.value);
                          setFormData({...formData, phone: sanitized});
                          if (errors.phone) setErrors({...errors, phone: undefined});
                        }}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-900 ml-1">Message</label>
                      <textarea 
                        className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary/40 transition-all h-32 resize-none font-normal text-sm"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-5 bg-black text-white rounded-2xl font-medium text-sm shadow-xl hover:bg-slate-800 transition-all mt-4"
                    >
                      Enquire Now
                    </button>
                    <a 
                      href="tel:+918700513200"
                      className="w-full py-5 bg-primary text-white rounded-2xl font-medium text-sm shadow-xl hover:opacity-90 transition-all mt-3 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  </form>
               </div>
            </div>
          </div>

          {/* 3. FULL WIDTH SECTION: About the Location */}
          <div className="mt-24 border-t border-slate-100 pt-24">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-8 w-1 bg-primary rounded-full" />
                <h3 className="text-xl font-medium text-slate-900 font-display">About the Location</h3>
              </div>
              
              <div className="space-y-10">
                <div className="bg-slate-50/50 rounded-[2.5rem] p-10 md:p-14 border border-slate-100">
                  {Array.isArray(locationDescriptions[normalizedLoc]) ? (
                    (locationDescriptions[normalizedLoc] as string[]).map((paragraph, index) => (
                      <p key={index} className="text-slate-600 text-lg md:text-xl leading-relaxed font-normal">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-normal">
                      {locationDescriptions[normalizedLoc] || `${property.location} is a strategically positioned commercial zone in Delhi, offering excellent business infrastructure and connectivity. It remains a preferred choice for companies seeking a professional growth-oriented environment with superior access to transit and key markets.`}
                    </p>
                  )}
                </div>

                {locationMaps[normalizedLoc] && (
                  <div className="rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl h-[500px] md:h-[600px]">
                    <iframe 
                      src={locationMaps[normalizedLoc]}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Location map for ${property.location}`}
                      className="filter grayscale-[0.2] contrast-[1.05]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Property Image Disclaimer */}
          <div className="mt-24 pt-12 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-500 font-body text-sm leading-relaxed text-center max-w-4xl mx-auto">
                <span className="font-bold uppercase tracking-wider mr-2">Disclaimer:</span>
                Property images are for representational purposes only and may not depict the actual property.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
