import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustedBy from "@/components/TrustedBy";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEO 
        title="Exclusive Commercial Property Offers | SAB Properties Delhi"
        description="Get exclusive access to premium office spaces, showrooms, and warehouses in Delhi. Expert consultancy with 30+ years of experience."
        canonical="/exclusive-offer"
        useBusinessSchema={true}
      />
      
      <LandingNavbar />
      
      <main>
        <LandingHero />
        
        {/* Social Proof */}
        <div className="bg-white py-12">
          <TrustedBy />
        </div>

        {/* Core Services - Focused for Landing Page */}
        <ServicesSection />

        {/* Why Us? */}
        <WhyChooseUs />

        {/* Final Conversion Point */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
