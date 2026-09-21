import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceBoxes from "@/components/ServiceBoxes";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PropertiesSection from "@/components/PropertiesSection";
import TrustedBy from "@/components/TrustedBy";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="SAB Properties Private Limited | Real Estate Experts in Delhi"
        description="Sab Properties in Delhi is one of the leading businesses in the Estate Agents. Also known for Estate Agents, Loans, Property Consultants, Commercial Properties, and Office Spaces."
        canonical="/"
        useBusinessSchema={true}
      />
      <Navbar />
      <HeroSection />
      <ServiceBoxes />
      <ServicesSection />
      <WhyChooseUs />
      <PropertiesSection />
      <TrustedBy />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
