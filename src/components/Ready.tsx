"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image"; // ✅ Import Next.js Image component
import { Sparkles, ArrowRight, BookOpen, Star, Trophy } from "lucide-react";


const InteractiveSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    { icon: BookOpen, title: "Expert-Led Courses", description: "Learn from industry professionals" },
    { icon: Star, title: "Personalized Learning", description: "Go at your own pace" },
    { icon: Trophy, title: "Earn Certificates", description: "Get recognized for your achievements" },
  ];

  const router = useRouter();

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

  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 py-20 px-4"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
      variants={staggerContainer}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.purple.100),transparent)] opacity-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUpDown}
            className="w-full lg:w-1/2"
          >
            <div className="relative group">
              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src="/images/Ready.avif"
                    alt="Students learning"
                    width={800} // ✅ Set proper dimensions
                    height={450} // ✅ Maintain aspect ratio
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 to-purple-600/30 rounded-2xl blur-2xl"
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={fadeInUpDown}
            className="w-full lg:w-1/2 space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <motion.div
                variants={fadeInUpDown}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 0.9, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="text-yellow-400 w-6 h-6" />
                </motion.div>
                <span className="text-purple-900 font-semibold">Transform Your Future</span>
              </motion.div>

              <motion.h2
                variants={fadeInUpDown}
                className="text-4xl md:text-5xl font-bold text-gray-900"
              >
                Unlock Your Full{" "}
                <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  Potential
                </span>
              </motion.h2>

              <motion.p
                variants={fadeInUpDown}
                className="text-lg text-gray-600"
              >
                Join our community of learners and achieve your goals with our
                comprehensive courses designed for your success.
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpDown}
                  onHoverStart={() => setActiveFeature(index)}
                  onHoverEnd={() => setActiveFeature(null)}
                  className={`relative group ${activeFeature === index ? "bg-purple-100" : "bg-white/80"
                    }`}
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="p-2 rounded-lg bg-purple-100 text-purple-900"
                      >
                        <feature.icon className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-purple-900 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <motion.span
                className="relative z-10 cursor-pointer"
                whileHover={{ x: 5 }}
                onClick={() => router.push("/Courses")} // ✅ Navigate to Courses page
              >
                Start Learning Today
              </motion.span>
              <motion.div
                className="w-5 h-5 relative z-10"
                whileHover={{ x: 5 }}
              >
                <ArrowRight />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );

};

export default InteractiveSection;
