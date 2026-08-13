'use client';

import React from "react";
import { notFound, useParams } from "next/navigation";
import Banner from "@/components/CourseBanner";
import { motion } from "framer-motion";
import { Trophy, Target, Zap, Award, Brain, Rocket, Star, BookOpen, CreditCard } from 'lucide-react';

const courses = [
  {
    slug: "digital-marketing",
    title: "DIGITAL MARKETING",
    bannerDescription: "Grow your business online and optimize brand reach.",
    bannerImage: "/categories/dm.jpeg",
    whyLearn: [
      "Reach a global audience with targeted ads.",
      "Build effective marketing campaigns.",
      "Analyze and improve campaign performance.",
    ],
    capabilities: [
      "Create and execute effective digital campaigns.",
      "Boost traffic and engagement for any brand.",
      "Utilize advanced tools for data analysis.",
    ],
    faqs: [
      { question: "What are the prerequisites for learning Digital Marketing?", answer: "No prerequisites! Anyone can learn, but basic internet usage helps." },
      { question: "How can Digital Marketing help me in my career?", answer: "You can work as a freelancer, join marketing teams, or grow your own business." },
      { question: "Will I get a certificate?", answer: "Yes, you will receive a certificate upon successful completion." },
    ],
  },
  {
    slug: "python",
    title: "PYTHON",
    bannerDescription: "Master Python basics, AI integration, and automation.",
    bannerImage: "/categories/py.webp",
    whyLearn: [
      "Great for data analysis and visualization.",
      "Foundation for AI and machine learning.",
      "One of the most versatile programming languages.",
    ],
    capabilities: [
      "Develop automation scripts and tools.",
      "Analyze complex datasets with Python libraries.",
      "Build machine learning and AI models.",
    ],
    faqs: [
      { question: "Do I need prior programming experience?", answer: "No, this course is beginner-friendly!" },
      { question: "Where can I use Python?", answer: "Python is widely used in AI, web development, and data science." },
      { question: "Will I get a certificate?", answer: "Yes, you will receive a certificate upon successful completion." },
    ],
  },
  {
    slug: "graphic-designing",
    title: "GRAPHIC DESIGNING",
    bannerDescription: "Master creative design tools and principles.",
    bannerImage: "/categories/gd.png",
    whyLearn: [
      "Express creativity through visual design.",
      "Master industry-standard design tools.",
      "Create professional branding materials.",
    ],
    capabilities: [
      "Design logos and brand identities.",
      "Create engaging social media graphics.",
      "Develop print and digital marketing materials.",
    ],
    faqs: [
      { question: "What software will I learn in this course?", answer: "You will learn Photoshop, Illustrator, and Canva." },
      { question: "Is Graphic Designing good for freelancing?", answer: "Yes! It is one of the most in-demand freelance skills." },
      { question: "Will I get a certificate?", answer: "Yes, you will receive a certificate upon successful completion." },
    ],
  },
  {
    slug: "html-css",
    title: "HTML & CSS",
    bannerDescription: "Build the foundation of web development.",
    bannerImage: "/categories/hc.webp",
    whyLearn: [
      "Essential skills for web development.",
      "Create responsive web layouts.",
      "Master modern CSS techniques.",
    ],
    capabilities: [
      "Build responsive websites from scratch.",
      "Style web pages professionally.",
      "Implement modern CSS frameworks.",
    ],
    faqs: [
      { question: "Do I need prior coding knowledge?", answer: "No, this course is designed for beginners!" },
      { question: "What can I build with HTML & CSS?", answer: "You can create static and responsive websites." },
      { question: "Will I get a certificate?", answer: "Yes, you will receive a certificate upon successful completion." },
    ],
  },
  {
    slug: "javascript-typescript",
    title: "JAVASCRIPT & TYPESCRIPT",
    bannerDescription: "Create dynamic web applications.",
    bannerImage: "/categories/jt.jpg",
    whyLearn: [
      "Add interactivity to websites.",
      "Build modern web applications.",
      "Learn type-safe programming.",
    ],
    capabilities: [
      "Develop interactive web features.",
      "Write clean, maintainable code.",
      "Build full-stack applications.",
    ],
    faqs: [
      { question: "What is the difference between JavaScript and TypeScript?", answer: "TypeScript is a superset of JavaScript with static typing." },
      { question: "Is JavaScript necessary for web development?", answer: "Yes, it is essential for making interactive websites." },
      { question: "Will I get a certificate?", answer: "Yes, you will receive a certificate upon successful completion." },
    ],
  },
  {
    slug: "react-nextjs",
    title: "REACT & NEXT.JS",
    bannerDescription: "Build modern web applications.",
    bannerImage: "/categories/rn.avif",
    whyLearn: [
      "Create dynamic user interfaces.",
      "Learn modern React patterns.",
      "Master server-side rendering.",
    ],
    capabilities: [
      "Build scalable React applications.",
      "Implement server-side rendering.",
      "Create optimized web apps.",
    ],
    faqs: [
      { question: "Do I need to know JavaScript before learning Next.js?", answer: "Yes, basic JavaScript knowledge is recommended." },
      { question: "What can I build with Next.js?", answer: "You can create server-side rendered and SEO-friendly websites." },
      { question: "Will I get a certificate?", answer: "Yes, you will receive a certificate upon successful completion." },
    ],
  },
  {
    slug: "wordpress",
    title: "WORDPRESS",
    bannerDescription: "Create professional websites with ease.",
    bannerImage: "/categories/wp.jpg",
    whyLearn: [
      "Build websites without coding.",
      "Customize themes and plugins.",
      "Manage content effectively.",
    ],
    capabilities: [
      "Create custom WordPress themes.",
      "Manage e-commerce websites.",
      "Optimize WordPress performance.",
    ],
    faqs: [
      { question: "Do I need coding knowledge to use WordPress?", answer: "No, WordPress allows you to build websites without coding." },
      { question: "Can I make an e-commerce site with WordPress?", answer: "Yes, using WooCommerce, you can create an online store." },
      { question: "Will I get a certificate?", answer: "Yes, you will receive a certificate upon successful completion." },
    ],
  },
  {
    slug: "seo",
    title: "SEO",
    bannerDescription: "Master search engine optimization.",
    bannerImage: "/categories/seo.webp",
    whyLearn: [
      "Improve website visibility.",
      "Understand search algorithms.",
      "Drive organic traffic.",
    ],
    capabilities: [
      "Optimize website content.",
      "Conduct keyword research.",
      "Track and analyze SEO metrics.",
    ],
    faqs: [
      { question: "How long does it take to see SEO results?", answer: "SEO results usually take 3-6 months to show." },
      { question: "Is SEO necessary for websites?", answer: "Yes, SEO improves website visibility and traffic." },
      { question: "Will I get a certificate?", answer: "Yes, you will receive a certificate upon successful completion." },
    ],
  },
];

export default function CoursePage() {
  const params = useParams();
  const courseSlug = params?.slug as string;
  const course = courses.find((course) => course.slug === courseSlug);

  if (!course) {
    notFound();
  }

  // Animation Variants
  const fadeInUpDown = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
    exit: { opacity: 0, y: -60, transition: { type: "spring", stiffness: 80, damping: 20 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const hoverEffect = {
    whileHover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)" },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <Banner
        title={course.title}
        description={course.bannerDescription}
        image={course.bannerImage}
      />

      {/* Why Learn Section */}
      <motion.div
        className="py-24 px-4 md:px-16 bg-white relative"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        variants={stagger}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-50" />

        {/* Heading Animation */}
        <motion.div
          variants={fadeInUpDown}
          className="max-w-screen-xl mx-auto relative z-10"
        >
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mb-8 transform rotate-45">
              <Trophy className="w-10 h-10 text-purple-700 transform -rotate-45" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Why Learn <span className="text-purple-700">{course.title}</span>
            </h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mb-8" />
            <p className="text-gray-600 text-center max-w-3xl text-lg leading-relaxed">
              Embark on a transformative journey with {course.title}. Learn
              essential skills to excel in this domain with a practical and
              beginner-friendly curriculum.
            </p>
          </div>
        </motion.div>

        {/* Cards Animation */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {course.whyLearn.map((text, index) => (
            <motion.div
              key={index}
              variants={fadeInUpDown}
              {...hoverEffect}
              className="group relative overflow-hidden rounded-3xl bg-white border border-purple-100 shadow-lg transition-all duration-300 p-10"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 rounded-full bg-purple-100 flex items-center justify-center">
                  {index === 0 && <Target className="w-8 h-8 text-purple-700" />}
                  {index === 1 && <Zap className="w-8 h-8 text-purple-700" />}
                  {index === 2 && <Award className="w-8 h-8 text-purple-700" />}
                </div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                  Benefit {index + 1}
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Capabilities Section */}
      <motion.div
        className="py-24 px-4 md:px-16 bg-gray-50 relative"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        variants={stagger}
      >
        {/* Heading Animation */}
        <motion.div
          variants={fadeInUpDown}
          className="max-w-screen-xl mx-auto relative z-10"
        >
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-8">
              <Brain className="w-10 h-10 text-purple-700" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Skills You&apos;ll Learn in{" "}
              <span className="text-purple-700">{course.title}</span>
            </h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mb-8" />
            <p className="text-gray-600 text-center max-w-3xl text-lg leading-relaxed">
              Gain foundational skills with {course.title}. Our beginner-focused
              curriculum ensures a smooth learning experience.
            </p>
          </div>
        </motion.div>

        {/* Cards Animation */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {course.capabilities.map((text, index) => (
            <motion.div
              key={index}
              variants={fadeInUpDown}
              {...hoverEffect}
              className="group relative overflow-hidden rounded-3xl bg-white border border-purple-100 shadow-lg transition-all duration-300 p-10"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 rounded-full bg-purple-100 flex items-center justify-center">
                  {index === 0 && <Rocket className="w-8 h-8 text-purple-700" />}
                  {index === 1 && <Star className="w-8 h-8 text-purple-700" />}
                  {index === 2 && <Award className="w-8 h-8 text-purple-700" />}
                </div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                  Skill {index + 1}
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        id="fee-plans"
        className="py-24 px-4 md:px-16 bg-white relative"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div
          variants={fadeInUpDown}
          className="max-w-screen-xl mx-auto relative z-10"
        >
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-8">
              <CreditCard className="w-10 h-10 text-purple-700" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Affordable Fee Plans for{" "}
              <span className="text-purple-700">{course.title}</span>
            </h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mb-8" />
            <p className="text-gray-600 text-center max-w-3xl text-lg leading-relaxed">
              Choose the best plan that fits your needs and start learning today!
            </p>
          </div>
        </motion.div>

        {/* Cards Animation */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* First Plan */}
          <motion.div
            variants={fadeInUpDown}
            {...hoverEffect}
            className="group relative overflow-hidden rounded-3xl bg-white border border-purple-100 shadow-lg transition-all duration-300 p-10"
          >
            <div className="relative z-10">
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                First Month Plan
              </h4>
              <p className="text-3xl font-bold text-purple-700 mb-2">2500 PKR</p>
              <div className="w-16 h-1 bg-purple-700 rounded-full mb-4" />
              <ul className="text-gray-700 text-lg leading-relaxed mb-6 space-y-2">
                <li>✔️ One-month access</li>
                <li>✔️ Live classes provided</li>
                <li>✔️ Recorded lectures included</li>
                <li>✔️ Attendance tracking system</li>
                <li>✔️ Tasks and assignments</li>
                <li>✔️ Dedicated support team</li>
                <li>✔️ Certificate of completion</li>
              </ul>
              <button
                onClick={() => window.location.href = "/Payment"}
                className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-lg shadow-md transition-all hover:bg-yellow-300"
              >
                Pay Now
              </button>
            </div>
          </motion.div>

          {/* Second Plan */}
          <motion.div
            variants={fadeInUpDown}
            {...hoverEffect}
            className="group relative overflow-hidden rounded-3xl bg-white border border-purple-100 shadow-lg transition-all duration-300 p-10"
          >
            <div className="relative z-10">
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                Second Month Plan
              </h4>
              <p className="text-3xl font-bold text-purple-700 mb-2">5000 PKR</p>
              <div className="w-16 h-1 bg-purple-700 rounded-full mb-4" />
              <ul className="text-gray-700 text-lg leading-relaxed mb-6 space-y-2">
                <li>✔️ Two-month access</li>
                <li>✔️ Live classes provided</li>
                <li>✔️ Recorded lectures included</li>
                <li>✔️ Attendance tracking system</li>
                <li>✔️ Tasks and assignments</li>
                <li>✔️ Dedicated support team</li>
                <li>✔️ Certificate of completion</li>
              </ul>
              <button
                onClick={() => window.location.href = "/Payment"}
                className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-lg shadow-md transition-all hover:bg-yellow-300"
              >
                Pay Now
              </button>
            </div>
          </motion.div>

          {/* Third Plan */}
          <motion.div
            variants={fadeInUpDown}
            {...hoverEffect}
            className="group relative overflow-hidden rounded-3xl bg-white border border-purple-100 shadow-lg transition-all duration-300 p-10"
          >
            <div className="relative z-10">
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                Third Month Plan
              </h4>
              <p className="text-3xl font-bold text-purple-700 mb-2">7500 PKR</p>
              <div className="w-16 h-1 bg-purple-700 rounded-full mb-4" />
              <ul className="text-gray-700 text-lg leading-relaxed mb-6 space-y-2">
                <li>✔️ Three-month access</li>
                <li>✔️ Live classes provided</li>
                <li>✔️ Recorded lectures included</li>
                <li>✔️ Attendance tracking system</li>
                <li>✔️ Tasks and assignments</li>
                <li>✔️ Dedicated support team</li>
                <li>✔️ Certificate of completion</li>
              </ul>
              <button
                onClick={() => window.location.href = "/Payment"}
                className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-lg shadow-md transition-all hover:bg-yellow-300"
              >
                Pay Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>


      {/* FAQ Section */}
      <motion.div className="py-24 px-4 md:px-16 bg-white relative" initial="hidden" whileInView="visible" exit="exit" viewport={{ once: false, amount: 0.3 }} variants={stagger}>
        {/* Heading Animation */}
        <motion.div variants={fadeInUpDown} className="max-w-screen-xl mx-auto relative z-10">
          <div className="flex flex-col items-center mb-16">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-8">
              <BookOpen className="w-10 h-10 text-purple-700" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Frequently Asked Questions About <span className="text-purple-700">{course.title}</span>
            </h3>

          </div>
        </motion.div>

        {/* FAQ Items Animation */}
        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {course.faqs.map((faq, index) => (
            <motion.div key={index} variants={fadeInUpDown} {...hoverEffect} className="group relative overflow-hidden rounded-3xl bg-white border border-purple-100 shadow-lg transition-all duration-300 p-10">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Q{index + 1}: {faq.question}</h4>
              <p className="text-gray-700 text-lg leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

    </div>
  );
}

