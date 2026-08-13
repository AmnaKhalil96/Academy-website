"use client";

import React from "react";
import { motion } from "framer-motion";

const PathToSuccess: React.FC = () => {
  const steps = [
    {
      title: "Step 1: Set Your Goals",
      description: "Define clear and achievable goals to start your journey to success.",
      icon: "🎯",
      glowColor: "from-purple-500 to-purple-700",
    },
    {
      title: "Step 2: Learn & Grow",
      description: "Acquire new skills and knowledge through continuous learning.",
      icon: "📚",
      glowColor: "from-indigo-500 to-blue-600",
    },
    {
      title: "Step 3: Take Action",
      description: "Apply what you've learned and take consistent steps forward.",
      icon: "🚀",
      glowColor: "from-green-500 to-teal-600",
    },
    {
      title: "Step 4: Achieve & Reflect",
      description: "Celebrate your achievements and reflect on your progress.",
      icon: "🏆",
      glowColor: "from-pink-500 to-red-600",
    },
  ];

  return (
    <section className="py-16 bg-purple-50 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-purple-900 mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        >
          PATH TO SUCCESS
        </motion.h2>
        <div className="relative">
          {/* Connecting Line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-300 hidden lg:block"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.3 }}
          ></motion.div>
          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center lg:relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  bounce: 0.4
                }}
              >
                {/* Icon with Hover Glow */}
                <motion.div
                  className={`relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r ${step.glowColor} text-white text-3xl shadow-lg mb-4`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-purple-300 opacity-0"
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  <motion.span
                    animate={{ 
                      y: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    {step.icon}
                  </motion.span>
                </motion.div>
                {/* Title and Description */}
                <motion.h3 
                  className="text-xl font-semibold text-purple-900 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PathToSuccess;