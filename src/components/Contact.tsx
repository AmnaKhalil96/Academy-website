"use client";
import React, { useState } from "react";
import { Send, User, Mail, MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [characterCount, setCharacterCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (name === "message") setCharacterCount(value.length);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          source: "Homepage Contact Form", // Yeh Google Sheets me show karega ke form homepage se aaya
        }),
      });

      const result = await response.json();
      console.log("Form Submission Response:", result);

      if (response.ok) {
        setFormStatus("success");
        setTimeout(() => {
          setFormStatus("idle");
          setFormState({ name: "", email: "", message: "" });
          setCharacterCount(0);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 2000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setFormStatus("error");
    }
  };

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-16 px-4"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <motion.div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full mx-auto mb-8 flex items-center justify-center">
            <MessageSquare className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-4">
            Get in Touch
          </motion.h2>
        </div>

        <motion.div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 md:p-10">
          <AnimatePresence mode="wait">
            {formStatus === "success" ? (
              <motion.div className="text-center py-12">
                <CheckCircle className="w-20 h-20 text-purple-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Message Sent Successfully!</h3>
                <p className="text-purple-600">Thank you for reaching out. We&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.form onSubmit={handleFormSubmit} className="space-y-6">
                <motion.div className="relative group">
                  <label htmlFor="home-contact-name" className="sr-only">Your Name</label>
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="home-contact-name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full bg-white/90 backdrop-blur-sm border-2 rounded-xl p-4 pl-12 border-gray-200 hover:border-purple-300 focus:outline-none focus:border-purple-500"
                    required
                  />
                </motion.div>

                <motion.div className="relative group">
                  <label htmlFor="home-contact-email" className="sr-only">Your Email</label>
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="home-contact-email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full bg-white/90 backdrop-blur-sm border-2 rounded-xl p-4 pl-12 border-gray-200 hover:border-purple-300 focus:outline-none focus:border-purple-500"
                    required
                  />
                </motion.div>

                <motion.div className="relative group">
                  <label htmlFor="home-contact-message" className="sr-only">Your Message</label>
                  <MessageSquare className="absolute left-4 top-6 text-gray-400" size={20} />
                  <textarea
                    id="home-contact-message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={4}
                    maxLength={500}
                    className="w-full bg-white/90 backdrop-blur-sm border-2 rounded-xl p-4 pl-12 border-gray-200 hover:border-purple-300 focus:outline-none focus:border-purple-500 resize-none"
                    required
                  />
                  <div className="absolute bottom-2 right-2 text-sm text-gray-400">{characterCount}/500</div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-4 px-8 rounded-xl font-medium text-white flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {formStatus === "submitting" ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;
