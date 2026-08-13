"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMsg("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMsg(result.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseMsg("Failed to send message. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="bg-purple-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Heading */}
        <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}>
          <motion.h1 variants={fadeInUp} className="text-4xl font-bold text-purple-700 mb-6">
            Get in Touch
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-gray-700 mb-12">
            Have any questions? Feel free to reach out using the form below, or connect with us directly.
          </motion.p>
        </motion.div>

        {/* Contact Information */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}>
          {[
            { icon: <FiPhone size={32} className="text-yellow-400 mb-2" />, title: "Phone", content: "+447523716075" },
            { icon: <FiMail size={32} className="text-yellow-400 mb-2" />, title: "Email", content: "word.skilled.online@gmail.com" },
            { icon: <FiMapPin size={32} className="text-yellow-400 mb-2" />, title: "Location", content: "Remote, Worldwide" },
          ].map((info, index) => (
            <motion.div key={index} variants={fadeInUp} className="flex flex-col items-center">
              {info.icon}
              <h3 className="text-lg font-bold text-purple-700">{info.title}</h3>
              <p className="text-gray-600">{info.content}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Media Links */}
        <motion.div className="flex justify-center space-x-6 mb-12" initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}>
          {[
            { href: "https://www.facebook.com/share/1BMrDYksQ3/?mibextid=qi2Omg", icon: <FaFacebookF size={24} /> },
            { href: "https://www.instagram.com/word.skilled.online.pk?igsh=YmF3bWVkenE0ZzN6", icon: <FaInstagram size={24} /> },
            { href: "https://www.linkedin.com/company/word-skilled/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_companies%3BApw9lPjmQDuaNP3WHbOUWg%3D%3D", icon: <FaLinkedinIn size={24} /> },
            { href: "https://youtube.com/@wordskilled?feature=shared", icon: <FaYoutube size={24} /> },
          ].map((link, index) => (
            <motion.a key={index} variants={fadeInUp} href={link.href} target="_blank" rel="noopener noreferrer" className="bg-yellow-400 p-4 rounded-full text-purple-900 hover:bg-yellow-300 transition-colors duration-300">
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6" initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Enter your name" },
              { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
            ].map((field, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <label htmlFor={field.id} className="block text-purple-700 font-semibold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.id}
                  id={field.id}
                  required
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleChange}
                />
              </motion.div>
            ))}

            {/* Message */}
            <motion.div variants={fadeInUp}>
              <label htmlFor="message" className="block text-purple-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button type="submit" variants={fadeInUp} className="bg-yellow-400 text-purple-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 w-full transition-colors duration-300" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

            {/* Response Message */}
            {responseMsg && <p className="text-center text-purple-700 mt-4">{responseMsg}</p>}
          </form>
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;
