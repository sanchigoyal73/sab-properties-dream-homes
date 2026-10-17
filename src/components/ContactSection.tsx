import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Loader2, Facebook, Instagram } from "lucide-react";
import { toast } from "sonner";
import { nameValidation, phoneValidation, emailValidation, sanitizeName, sanitizePhone, sanitizeEmail } from "@/utils/leadValidation";
import { useHoneypot } from "@/hooks/use-honeypot";

const formSchema = z.object({
  fullName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const onError = (errors: any) => {
    console.log("Form validation failed. Details:", errors);
    // Force a visible alert so it can't be missed
    alert("Please fill out all fields correctly. Check the red messages under the text boxes.");
  };

  const honeypot = useHoneypot();

  const onSubmit = async (data: FormData) => {
    console.log("Submission started!", data);
    setIsSubmitting(true);
    try {
      const targetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      
      if (!targetUrl) {
        alert("Error: Google Sheets URL is missing from your .env file!");
        setIsSubmitting(false);
        return;
      }

      // Convert standard JSON to URLSearchParams which Google Apps Script loves
      const urlEncodedData = new URLSearchParams();
      honeypot.stamp(urlEncodedData);
      Object.entries(data).forEach(([key, value]) => {
        urlEncodedData.append(key, value as string);
      });

      if (!honeypot.isBot()) await fetch(targetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData.toString(),
      });

      // No-cors means we don't get the server response, but the request was sent
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display font-bold text-sm tracking-[0.2em] uppercase">
            Get In Touch
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mt-3 mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Ready to discuss your real estate needs? Our team of experts is here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg gradient-orange flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-1">Our Office</h4>
                <p className="text-muted-foreground font-body text-sm">
                  1/22, Asaf Ali Road, Delhi - 110002
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg gradient-orange flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-1">Phone</h4>
                <p className="text-muted-foreground font-body text-sm">8700513200</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg gradient-orange flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-1">Email</h4>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@sabproperties.in" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-body text-sm hover:text-primary transition-colors">info@sabproperties.in</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg gradient-orange flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-1">Working Hours</h4>
                <p className="text-muted-foreground font-body text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61579467053882" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/sabprop/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-5 bg-card p-8 rounded-xl border border-border" onSubmit={handleSubmit(onSubmit, onError)}>
              {honeypot.field}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <input
                    {...register("fullName", {
                      onChange: (e) => {
                        e.target.value = sanitizeName(e.target.value);
                      }
                    })}
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.fullName ? "border-red-500" : "border-border"} text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-1">
                  <input
                    {...register("email", {
                      onChange: (e) => {
                        e.target.value = sanitizeEmail(e.target.value);
                      }
                    })}
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.email ? "border-red-500" : "border-border"} text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <input
                    {...register("phone", {
                      onChange: (e) => {
                        e.target.value = sanitizePhone(e.target.value);
                      }
                    })}
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.phone ? "border-red-500" : "border-border"} text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div className="space-y-1">
                  <select 
                    {...register("service")}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.service ? "border-red-500" : "border-border"} text-muted-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors`}
                  >
                    <option value="">Service Required</option>
                    <option value="Property Consultancy">Property Consultancy</option>
                    <option value="Portfolio Management">Portfolio Management</option>
                    <option value="Legal Assistance">Legal Assistance</option>
                    <option value="Market Insights">Market Insights</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <textarea
                  {...register("message")}
                  placeholder="How can we help you?"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.message ? "border-red-500" : "border-border"} text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full gradient-orange text-primary-foreground font-display font-bold py-3.5 rounded-lg text-sm tracking-wide hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

