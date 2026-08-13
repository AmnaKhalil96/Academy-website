"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:space-x-12">
        {/* Left Side - Image */}
        <motion.div 
          className="md:w-1/2 flex justify-center mb-8 md:mb-0"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-yellow-400 rounded-lg blur opacity-30"
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
                src="/images/aboutsec.webp"
                alt="About Us"
                width={400}
                height={400}
                className="relative rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div 
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <motion.h2 
            className="text-4xl font-extrabold text-purple-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            About Us
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            At <span className="font-bold text-purple-900">Word Skilled</span>, we are passionate
            about delivering exceptional solutions that empower individuals and businesses alike. 
            With years of expertise and a forward-thinking approach, we turn challenges into 
            opportunities and ideas into groundbreaking results.
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            From design to development, our dedicated team collaborates to bring your visions to life.
            Join us and be a part of a journey toward innovation, creativity, and excellence.
          </motion.p>
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/About" passHref>
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className="inline-block px-6 py-3 bg-yellow-400 text-purple-900 font-semibold rounded-lg shadow-md 
      hover:bg-yellow-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
  >
    
      Learn More
    
  </motion.div>
</Link>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;