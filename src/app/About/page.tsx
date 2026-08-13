'use client';

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutUs = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 sm:px-12 py-16 space-y-16">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            <span className="text-black">ABOUT</span>{" "}
            <span className="text-purple-900">WORD SKILLED</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Your gateway to skillful learning, empowering your future with
            industry-leading courses.
          </p>
        </motion.div>

        {/* WHO WE ARE Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          {/* Left Side - Text */}
          <motion.div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">WHO WE ARE</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Word Skilled, our mission is to empower students with the skills they need to excel in the digital world. 
              We are dedicated to providing high-quality online learning opportunities that help individuals not only learn 
              new skills but also grow and refine them for their future success.
            </p>
          </motion.div>

          {/* Right Side - Image (Updated Style) */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-lg blur opacity-30"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/about01.webp"
                  alt="Who We Are"
                  width={400}
                  height={400}
                  className="relative rounded-lg shadow-lg"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* OUR VISION Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="flex flex-col md:flex-row-reverse items-center gap-12"
        >
          {/* Left Side - Text */}
          <motion.div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">OUR VISION</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our vision is to create a community where anyone, regardless of their background, can gain valuable 
              skills and transform their lives through education.
            </p>
          </motion.div>

          {/* Right Side - Image (Updated Style) */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-lg blur opacity-30"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/about002.jpeg"
                  alt="Our Vision"
                  width={400}
                  height={400}
                  className="relative rounded-lg shadow-lg"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* WHY CHOOSE US Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-purple-900 mb-12">WHY CHOOSE US</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
                title: "EXPERT INSTRUCTORS",
                description: "Learn from top professionals with real-world experience.",
                image: "/images/instructor.jpeg",
              },
              {
                title: "LIVE CLASSES",
                description: "Interact with expert instructors in real time to deepen your understanding.",
                image: "/images/live.jpeg",
              },
              {
                title: "CAREER-FOCUSED",
                description: "Gain industry-relevant skills to boost your career growth.",
                image: "/images/career.webp",
              },
              {
                title: "ENGAGING VIDEO LECTURES",
                description: "Learn at your own pace with high-quality, easy-to-follow content.",
                image: "/images/video.webp",
                alt: "Engaging Video Lectures",
              },
              {
                title: "ASSIGNMENTS & TASKS",
                description: "Practical exercises that ensure you master what you learn.",
                image: "/images/about02.webp",
                alt: "Assignments & Tasks",
              },
              {
                title: "WE OFFER",
                description: "We specialize in offering 3-month short courses designed to take learners from basic to advanced levels.",
                image: "/images/about04.webp",
                alt: "We Offer",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeInUp}
                className="p-6 border rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-40 w-full mb-4 overflow-hidden rounded-lg relative">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      {/* FAQs Section */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false }}
  variants={fadeInUp}
  className="py-12"
>
  <h2 className="text-3xl font-bold text-center text-purple-900 mb-8">
    FREQUENTLY ASKED QUESTIONS
  </h2>
  <div className="space-y-8">
    {[
      {
        question: "How can I enroll in a course?",
        answer: "You can enroll by visiting our Courses page, selecting a course, and following the registration process.",
      },
      {
        question: "Do you provide certificates?",
        answer: "You will receive a certificate upon successful completion of the course.",
      },
      {
        question: "What topics do you cover?",
        answer: "We offer a wide range of courses, including technology, business, design, and personal development.",
      },
      {
        question: "Can beginners join your courses?",
        answer: "Absolutely! Our courses are designed for learners of all levels, including beginners.",
      },
      {
        question: "What support do you provide?",
        answer: "Our support team is available to assist you with any queries or technical issues.",
      },
    ].map((faq, index) => (
      <motion.div
        key={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInUp}
        className="p-6 border rounded-lg shadow-md hover:shadow-lg hover:bg-[#f8f4fc] transition"
      >
        <h4 className="text-xl font-semibold text-purple-900 mb-2">
          Q: {faq.question}
        </h4>
        <p className="text-gray-600">{faq.answer}</p>
      </motion.div>
    ))}
  </div>
</motion.div>


        {/* FINAL CALL-TO-ACTION Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
          className="text-center py-12 bg-purple-200 rounded-lg shadow-md"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            READY TO JOIN WORD SKILLED?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Take the next step in your career with our expertly crafted courses.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-yellow-400 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-yellow-300 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us Now
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
