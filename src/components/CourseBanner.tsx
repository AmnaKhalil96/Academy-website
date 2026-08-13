"use client";

import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";

type BannerProps = {
  title: string;
  description: string;
  image: string;
};

const Banner = ({ title, description, image }: BannerProps) => {
  const [text] = useTypewriter({
    words: [title], // Only the course title will be shown in the typewriter effect
    loop: true,
    typeSpeed: 70, // Slower typing speed
    deleteSpeed: 50, // Slower deletion speed
    delaySpeed: 2000, // Pause before restarting
  });

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className="w-full h-96 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${image})` }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={stagger}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-70"
        variants={fadeIn}
      ></motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <motion.h1
 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-500 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]"
          variants={fadeIn}
        >
          {text}
          <Cursor cursorStyle="|" cursorColor="#FFD700" />
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl mt-4 max-w-2xl"
          variants={fadeIn}
        >
          {description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex gap-4"
          variants={fadeIn}
        >
          {/* <Link href="#fee-plans"> */}
          <button
          onClick={() => document.getElementById('fee-plans')?.scrollIntoView({ behavior: 'smooth' })}  
           className="bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
            Enroll Now
          </button>
          {/* </Link> */}

          <button
  onClick={() => {
    window.location.href = "https://classroom.google.com/c/YOUR_CLASSROOM_ID"; // Replace with your Google Classroom URL
  }}
  className="bg-white text-purple-900 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
>
  Free Demo
</button>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banner;
