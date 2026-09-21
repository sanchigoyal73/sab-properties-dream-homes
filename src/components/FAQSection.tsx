import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What's the difference between an office space and co-working space?",
    answer: "An office space is a private facility that your business rents solely, so you're free to layout, brand, and customize it into a consistent and dedicated workspace. Whereas a co-working space is a communal managed workspace where different businesses work alongside each other using shared facilities and common areas. Office spaces are ideal for established teams that require private and stable work environment, co-working spaces are the best option for start-ups, freelancers, or teams that require the utmost flexibility over long-term investment commitments. Both types are available in central Delhi through SAB Properties.",
  },
  {
    question: "What is the cost of commercial office space in central Delhi?",
    answer: "The cost of commercial office space in central Delhi depends upon factors like size, location, and build-out. Certain areas like Asaf Ali Road, and Connaught Place are extremely popular for commercial office space and the price could range from market rates in serviced and managed office spaces to costlier large floor plates for large companies with 100+ employees. For an exact estimation you need to consult a professional. SAB Properties provides market price for commercial office spaces in central Delhi based on client's need and requirement.",
  },
  {
    question: "Should I buy a showroom if customers regularly visit my business?",
    answer: "Absolutely yes! If your clients frequently visit your store to browse, select and purchase products/services then a showroom is exactly what you need as prime location and high visibility will directly boost your sales. High footfall areas like Ajmeri Gate, and Asaf Ali Road provide visibility with potential of thousands of customers viewing your store on a daily basis. However, if your client engagement is mainly through consultations (meetings and presentations) than office spaces might suit you better.",
  },
  {
    question: "Can I start a business from co-working and move into a private office space later on?",
    answer: "This is perhaps the most conventional and logical approach taken by many start-up ventures in Delhi. Co-working space gives you the advantage of professional address, infrastructure and networking opportunities at considerably lower costs with a reduced long-term financial commitment. Transitioning to a managed office space or a private office floor once your business grows and demands predictable space requirements ensures complete privacy and branding as per business standards. SAB Properties is equipped to facilitate this transitional plan to any of the available options.",
  },
  {
    question: "What all factors should be considered when choosing a commercial space in Delhi?",
    answer: (
      <div className="space-y-2">
        <p>When opting for commercial space in Delhi, keep the following factors in mind:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Location and footfall:</strong> the centre of the city holds prime visibility</li>
          <li><strong>Size and scalability:</strong> your team will grow; anticipate size requirements over next 12-24 months</li>
          <li><strong>Lease flexibility:</strong> what is the duration of your commitment?</li>
          <li><strong>Infrastructure readiness:</strong> IT, power back-up, security, parking etc.</li>
          <li><strong>Legal and documentation clarity:</strong> check OC obtained, property is registered, and clear title deed.</li>
        </ul>
        <p>A reputable consultant like SAB Properties can verify these crucial factors prior to making any recommendations.</p>
      </div>
    ),
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 overflow-hidden bg-slate-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-40 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-10 -right-64 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
            Got Questions?
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Questions</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our real estate services and properties in Delhi.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? "bg-white border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-primary/5" 
                    : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
                }`}
              >
                {/* Active Indicator Line */}
                <div 
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 ${
                    isOpen ? "h-12 bg-primary" : "h-0 bg-transparent group-hover:h-6 group-hover:bg-primary/30"
                  }`}
                />

                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 sm:p-8 text-left focus:outline-none"
                >
                  <span className={`font-display text-lg sm:text-xl font-bold pr-8 transition-colors duration-300 ${
                    isOpen ? "text-primary" : "text-foreground group-hover:text-primary/80"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? "bg-primary text-white rotate-180" 
                      : "bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary"
                  }`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 text-muted-foreground font-body text-base sm:text-lg leading-relaxed text-justify">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
