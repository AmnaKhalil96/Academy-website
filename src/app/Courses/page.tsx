'use client';

import React from "react";
import Image from "next/image";  // ✅ Import Next.js Image Component
import Link from "next/link";
import { motion } from "framer-motion";

const courses = [
  {
    id: 1,
    title: "DIGITAL MARKETING",
    description: "Master SEO, social media, and digital strategies.",
    hoverInfo: "Grow businesses online and optimize brand reach.",
    slug: "digital-marketing",
    image: "/courses/digi.jpg",
  },
  {
    id: 2,
    title: "PYTHON",
    description: "Learn Python for data science and AI.",
    hoverInfo: "Dive into Python basics, AI integration, and automation.",
    slug: "python",
    image: "/courses/python.jpg",
  },
  {
    id: 3,
    title: "GRAPHIC DESIGNING",
    description: "Unleash your creativity with design tools.",
    hoverInfo: "Master Photoshop, Illustrator, and Figma.",
    slug: "graphic-designing",
    image: "/images/gra.jpg",
  },
  {
    id: 4,
    title: "HTML & CSS",
    description: "Master the fundamentals of web development.",
    hoverInfo: "Learn modern HTML5 and CSS3 with real projects.",
    slug: "html-css",
    image: "/courses/html2.jpg",
  },
  {
    id: 5,
    title: "TYPESCRIPT & JAVASCRIPT",
    description: "Build dynamic web applications.",
    hoverInfo: "Master modern JavaScript and TypeScript fundamentals.",
    slug: "javascript-typescript",
    image: "/courses/ts.jpg",
  },
  {
    id: 6,
    title: "REACT & NEXT.JS",
    description: "Build high-performance web apps with React & Next.js.",
    hoverInfo: "Build scalable apps with React and Next.js.",
    slug: "react-nextjs",
    image: "/courses/react.png",
  },
  {
    id: 7,
    title: "WORDPRESS",
    description: "Create professional websites with ease.",
    hoverInfo: "Build blogs, e-commerce, and dynamic sites.",
    slug: "wordpress",
    image: "/courses/wordpress.jpg",
  },
  {
    id: 8,
    title: "SEO",
    description: "Optimize websites for search engines.",
    hoverInfo: "Understand analytics, keywords, and content optimization.",
    slug: "seo",
    image: "/courses/seo.jpg",
  },
];

const CourseCategory = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      {/* Page Heading */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={stagger}
      >
        <motion.h1
          variants={fadeInUp}
          className="text-5xl sm:text-6xl font-extrabold mb-4"
        >
          <span className="text-black">ABOUT</span>{" "}
          <span className="text-purple-900">OUR COURSES</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto"
        >
          Discover a range of professional courses designed to boost your skills
          and advance your career.
        </motion.p>
      </motion.div>

      {/* Course Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={stagger}
      >
        {courses.map((course) => (
          <motion.div
            key={course.id}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <Link href={`/${course.slug}`} className="group">
              <div className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 h-full">
                {/* Card Image with Hover Info */}
                <div className="relative overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={300}   // ✅ Set width
                    height={200}  // ✅ Set height
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center text-sm md:text-base px-4">
                      {course.hoverInfo}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 text-center flex flex-col h-full">
                  <h2 className="text-xl font-bold text-purple-900 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-600">{course.description}</p>
                  <button className="mt-4 px-6 py-2 bg-yellow-400 text-white font-medium rounded-md hover:bg-yellow-300 transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CourseCategory;

