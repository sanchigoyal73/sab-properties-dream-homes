import { motion } from "framer-motion";
import { ArrowRight, Target, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import SEO from "@/components/SEO";
import heroImg from "@/assets/picture.jpg";

const team = [
  {
    name: "Sanjay Gupta",
    role: "Founder and Managing Director",
    image: "/images/team/SG.png",
    description: "Sanjay Gupta is a real estate professional with more than forty years of experience across Delhi’s ever-changing property market. Sanjay Gupta’s career is deeply dedicated to the real estate industry, with an extended focus on Central Delhi and the Asaf Ali Road market. Over the years, Sanjay Gupta has seen many traditional office leasing and warm-shell spaces evolve into modern business centres, furnished offices, flexible workspaces and suitable coworking environments.",
  },
  {
    name: "Kushagra Gupta",
    role: "Executive Director",
    image: "/images/team/KG2.png",
    description: "Kushagra Gupta is a dedicated and forward-thinking professional committed to transforming the modern workspace experience. He specializes in delivering tailored commercial real estate solutions, with meticulous attention to detail and a deep understanding of client objectives. His focus on operational excellence ensures seamless execution, while contributing to sustained business growth and long-term client success.",
  },
  {
    name: "Kashish Gupta",
    role: "Director of Operations",
    image: "/images/team/KaG.jpg",
    description: "Kashish Gupta is focused on delivering outstanding end-to-end results while building long-lasting relationships with clients. With a strong commitment to transparency, reliability, and a client-first approach, she ensures that every portfolio is managed with precision and care. Her proactive leadership and strategic mindset play a key role in driving the growth of SAB Properties’ expanding commercial footprint.",
  },
];



const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us | SAB Properties"
        description="Learn about SAB Properties, Delhi's premier commercial real estate consultancy with over 40 years of expertise."
        canonical="/about"
        useBusinessSchema={true}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroImg}
            className="w-full h-full object-cover"
          >
            <source src="/about-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.3 }}
          className="relative text-center px-4"
        >
          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            About SAB Properties
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-body">
            Delhi's Premier Commercial Real Estate Consultancy with Over 40 Years of Excellence
          </p>
        </motion.div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.3 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-10 rounded-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-orange flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-display font-extrabold text-3xl text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                We envision a dynamic future of work where businesses thrive in flexible,
                innovative spaces designed for growth. We are committed to reshaping how
                companies perceive and utilize their workspaces.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.3 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-10 rounded-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-display font-extrabold text-3xl text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                Our mission is to provide tailored, flexible, and inspiring workspace
                solutions with transparency, service excellence, and a client-first
                approach that ensures every business finds their perfect space.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expanded Vision Block */}
      <section className="py-24 bg-section">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.3 }}
            className="text-center"
          >
            <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-8">
              We believe in removing traditional workspace limitations. Our approach enables
              <span className="text-primary font-semibold"> collaboration, innovation, and flexibility</span>
              at every level. We don't just provide spaces — we act as a
              <span className="text-primary font-semibold"> catalyst for business growth</span>,
              creating environments where companies can flourish and achieve their full potential.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 gradient-orange text-white font-display font-bold px-8 py-4 rounded-md hover:opacity-90 transition-all shadow-lg"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-10 left-10 w-64 h-64 bg-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-primary font-display font-bold text-sm tracking-[0.2em] uppercase mb-4 inline-block">
              Leadership
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-foreground mb-6">
              Meet Our Visionaries
            </h2>
            <div className="w-24 h-1.5 bg-orange mx-auto rounded-full mb-8" />
            <p className="text-muted-foreground font-body text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              Our dedicated leadership team brings decades of combined experience,
              committed to transforming your commercial real estate journey.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl hover:shadow-orange/20 border border-slate-100/80 flex flex-col h-full max-w-[360px] w-full mx-auto transition-all duration-500"
              >
                {/* Image Container with Matching Backdrop Styling */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-slate-100 via-gray-100 to-slate-200/90 shrink-0 flex items-center justify-center p-3">
                  {/* Subtle Background Glow Accent for visual unity */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(249,115,22,0.12),transparent_70%)] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Portrait Frame */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/60 shadow-inner">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Uniform Top Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Information Body */}
                <div className="relative p-8 flex-grow flex flex-col items-center text-center">
                  <span className="text-orange font-body font-bold text-[11px] tracking-[0.25em] uppercase mb-2 inline-block">
                    {member.role}
                  </span>
                  <h3 className="font-display font-black text-2xl text-foreground mb-4 leading-tight">
                    {member.name}
                  </h3>

                  {/* Decorative Accent Line */}
                  <div className="w-10 h-[2px] bg-orange/40 mb-5 rounded-full group-hover:w-20 group-hover:bg-orange transition-all duration-500" />

                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 opacity-90 group-hover:opacity-100 transition-opacity whitespace-pre-line">
                    {member.description}
                  </p>

                  {/* Bottom Border Glow Accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] gradient-orange group-hover:w-full transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      <Footer />
    </div>
  );
};

export default About;
