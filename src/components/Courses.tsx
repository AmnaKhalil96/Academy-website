"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Courses Data
const allCourses = [
  { title: "HTML & CSS", description: "Learn the building blocks of the web: HTML and CSS.", image: "/courses/html2.jpg" },
  { title: "TypeScript & JavaScript", description: "Understand JavaScript deeply and harness the power of TypeScript.", image: "/courses/ts.jpg" },
  { title: "React & Next.js", description: "Master modern web frameworks: React and Next.js.", image: "/courses/react.png" },
  { title: "Python", description: "Dive into Python programming and build powerful applications.", image: "/courses/python.jpg" },
  { title: "Graphics Designing", description: "Master the art of visual storytelling and create stunning graphics.", image: "/images/gra.jpg" },
  { title: "WordPress", description: "Build beautiful, functional websites with WordPress.", image: "/courses/wordpress.jpg" },
  { title: "SEO", description: "Optimize your content to rank higher and reach a wider audience.", image: "/courses/seo.jpg" },
  { title: "Digital Marketing", description: "Learn strategies to grow businesses and engage customers effectively.", image: "/courses/digi.jpg" },
];

// Animation Variants
const fadeInUpDown = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 },
  },
  exit: { opacity: 0, y: -60, transition: { type: "spring", stiffness: 70, damping: 20 } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.2 } },
};

// Carousel Component
const Carousel = ({ courses }: { courses: typeof allCourses }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;

        if (scrollLeft + clientWidth >= scrollWidth) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={carouselRef}
      className="flex gap-6 overflow-x-hidden scroll-smooth snap-x snap-mandatory pb-4"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
    >
      {courses.map((course, index) => (
        <motion.div
          key={index}
          className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 snap-start"
          variants={fadeInUpDown}
        >
          {/* Card Image */}
          <div className="relative w-full h-48">
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="(min-width: 768px) 400px, 90vw"
              className="rounded-t-lg object-cover"
            />
          </div>
          {/* Card Content */}
          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-500 mb-4 uppercase">{course.title}</h3>
            <p className="text-gray-600 mb-6">{course.description}</p>
            <Link
              href="/Courses"
              className="px-6 py-3 bg-yellow-400 text-purple-900 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const CoursesSection = () => {
  // Split courses into two carousels
  const topCourses = allCourses.slice(0, 4); // First 4 courses
  const bottomCourses = allCourses.slice(4); // Last 4 courses

  return (
    <motion.section
      className="bg-gray-50 py-16 px-6 md:px-12"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={fadeInUpDown}
      >
        {/* Section Heading */}
        <motion.h2
          className="text-4xl font-extrabold text-purple-900 text-center mb-4 uppercase"
          variants={fadeInUpDown}
        >
          OUR COURSES
        </motion.h2>
        <motion.p
          className="text-center text-gray-700 mb-12"
          variants={fadeInUpDown}
        >
          Explore our wide range of professional courses and take the next step
          in your journey to success.
        </motion.p>

        {/* Top Carousel */}
        <motion.div className="mb-12" variants={fadeInUpDown}>
          <Carousel courses={topCourses} />
        </motion.div>

        {/* Bottom Carousel */}
        <motion.div variants={fadeInUpDown}>
          <Carousel courses={bottomCourses} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default CoursesSection;
