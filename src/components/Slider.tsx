"use client";
import React, { useState, useEffect } from "react";

const slides = [
  {
    image: "/images/banner1.avif",
    title: "Welcome to Word Skilled",
    description: "Your gateway to professional excellence. Join us on a journey of continuous learning and skill development that will transform your career prospects.",
  },
  {
    image: "/images/s.avif",
    title: "Learn. Grow. Succeed.",
    description: "Access world-class courses, expert mentorship, and hands-on projects. Build the skills that today's employers are looking for.",
  },
  {
    image: "/images/banner3.jpg",
    title: "Empowering Your Skills for a Brighter Future",
    description: "Take control of your career path with our comprehensive learning solutions. Stay ahead in the ever-evolving professional landscape.",
  },
];

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textAnimation, setTextAnimation] = useState(false);

  const goToNextSlide = () => {
    setTextAnimation(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
      setTextAnimation(true);
    }, 300);
  };

  const goToPreviousSlide = () => {
    setTextAnimation(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
      setTextAnimation(true);
    }, 300);
  };

  useEffect(() => {
    setTextAnimation(true);
    const timer = setInterval(goToNextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-6rem)] overflow-hidden">
      <style>
        {`
          @keyframes slideTitle {
            0% {
              opacity: 0;
              transform: translateY(-40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideDescription {
            0% {
              opacity: 0;
              transform: translateX(-30px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animated-title {
            animation: slideTitle 1s ease-out forwards;
          }

          .animated-description {
            animation: slideDescription 1s ease-out 0.5s forwards;
            opacity: 0;
          }

          .slide-overlay {
            background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
          }
        `}
      </style>

      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 relative"
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="slide-overlay absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
              <div className="max-w-4xl text-center">
                <h1
                  className={`text-yellow-400 text-4xl md:text-6xl font-bold mb-6 ${
                    textAnimation ? "animated-title" : "opacity-0"
                  }`}
                >
                  {slide.title}
                </h1>
                <p
                  className={`text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
                    textAnimation ? "animated-description" : "opacity-0"
                  }`}
                >
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
  onClick={goToPreviousSlide}
  className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/50 hover:bg-yellow-400 text-white w-12 h-12 rounded-full items-center justify-center transition-all duration-300 backdrop-blur-sm hidden md:flex"
  aria-label="Previous slide"
>
  <span className="text-2xl">❮</span>
</button>

<button
  onClick={goToNextSlide}
  className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/50 hover:bg-yellow-400 text-white w-12 h-12 rounded-full items-center justify-center transition-all duration-300 backdrop-blur-sm hidden md:flex"
  aria-label="Next slide"
>
  <span className="text-2xl">❯</span>
</button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setTextAnimation(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setTextAnimation(true);
              }, 300);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-yellow-400 w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
