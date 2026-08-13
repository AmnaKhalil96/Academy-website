"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, UserCircle, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from "next/navigation"; // ✅ Correct import for Next.js 13/14



const courses = [
  { name: "Digital Marketing", slug: "digital-marketing" },
  { name: "Graphics Designing", slug: "graphic-designing" },
  { name: "SEO", slug: "seo" },
  { name: "Python", slug: "python" },
  { name: "HTML and CSS", slug: "html-css" },
  { name: "JavaScript and TypeScript", slug: "javascript-typescript" },
  { name: "React and Next.js", slug: "react-nextjs" },
  { name: "WordPress", slug: "wordpress" },
];

const Navbar = () => {
  const router = useRouter(); // ✅ Initialize router
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const { isLoggedIn, logout } = useAuth();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout(); // ✅ Firebase/Session Logout
    setIsProfileDropdownOpen(false); // ✅ Profile dropdown close karo
    setIsOpen(false); // ✅ Mobile menu bhi close karo
    router.push("/"); // ✅ Seedha home page pe redirect ho jaaye
  };


  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${isTransparent ? "bg-transparent" : "bg-purple-50/80 shadow-lg"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Word Skilled Logo"
                  width={70}
                  height={80}
                  className="object-contain -mt-6"
                  priority
                />
                <span className="absolute left-20 top-1/2 -translate-y-1/2 text-purple-900 font-bold text-2xl md:text-3xl whitespace-nowrap">
                  WORD SKILLED
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/"
                className="text-purple-900 hover:text-yellow-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/About"
                className="text-purple-900 hover:text-yellow-400 transition-colors"
              >
                About
              </Link>
              {/* Courses Section */}
              <div className="relative">
                <Link
                  href="/Courses"
                  className="text-purple-900 hover:text-yellow-400 transition-colors"
                >
                  Courses
                </Link>
                <button
                  ref={dropdownButtonRef}
                  className="ml-1 text-purple-900 hover:text-yellow-400 transition-colors inline-flex items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg py-2 border border-purple-100"
                  >
                    {courses.map((course) => (
                      <Link
                        key={course.slug}
                        href={`/${course.slug}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {course.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/contact"
                className="text-purple-900 hover:text-yellow-400 transition-colors"
              >
                Contact
              </Link>
              {!isLoggedIn ? (
                <div className="flex items-center">
                  <Link
                    href="/Login"
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all shadow-md"
                  >
                    Login/Sign Up
                  </Link>
                </div>
              ) : (
                <div className="relative flex items-center space-x-4">
                  <button
                    onClick={() => {
                      window.location.href = "https://classroom.google.com/c/YOUR_CLASSROOM_ID"; // Replace with your Google Classroom URL
                    }}
                    className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-yellow-300 hover:text-purple-900 transition-all shadow-md flex items-center"
                  >
                    <LayoutDashboard className="h-5 w-5 mr-2" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="text-purple-900 hover:text-yellow-400 transition-colors"
                  >
                    <UserCircle className="h-8 w-8" />
                  </button>
                  {isProfileDropdownOpen && (
                    <div
                      ref={profileDropdownRef}
                      className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg py-2 border border-purple-100"
                    >
                      <Link
                        href="/Profile"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <UserCircle className="h-5 w-5 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={async () => {
                          await handleLogout(); // ✅ Pehle logout function call hoga
                          router.push("/"); // ✅ Logout ke baad direct home page pe redirect hoga
                        }}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </button>

                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-purple-900"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-purple-50 pb-6">
            <Link href="/" className="block px-4 py-2" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/About" className="block px-4 py-2" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <div className="px-4">
              <div className="flex items-center justify-between">
                <Link
                  href="/Courses"
                  className="text-purple-900"
                  onClick={() => setIsOpen(false)}
                >
                  Courses
                </Link>
                <button
                  className="text-purple-900"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
              </div>
              {isDropdownOpen && (
                <div className="mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg py-2 border border-purple-100">
                  {courses.map((course) => (
                    <Link
                      key={course.slug}
                      href={`/${course.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-900 transition-colors duration-200"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      {course.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/contact" className="block px-4 py-2" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            {!isLoggedIn ? (
              <div className="px-4 mt-2">
                <Link
                  href="/Login"
                  className="block px-4 py-2 bg-yellow-400 text-white rounded-md text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login/Sign Up
                </Link>
              </div>
            ) : (
              <div className="px-4 mt-2 space-y-2">
                <button
                  onClick={() => {
                    window.location.href = "https://classroom.google.com/c/YOUR_CLASSROOM_ID"; // Replace with your Google Classroom URL
                  }}
                  className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-yellow-300 hover:text-purple-900 transition-all shadow-md flex items-center"
                >
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Dashboard
                </button>
                <Link
                  href="/Profile"
                  className="block px-4 py-2 text-purple-900 hover:bg-purple-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center">
                    <UserCircle className="h-5 w-5 mr-2" />
                    Profile
                  </div>
                </Link>
                <button
                  onClick={async () => {
                    await handleLogout();
                    router.push("/"); // ✅ Logout ke baad direct home page pe redirect hoga
                  }}
                  className="w-full px-4 py-2 text-purple-900 hover:bg-purple-50 rounded-md flex items-center justify-center transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>

              </div>
            )}
          </div>
        )}
      </nav>

      {/* Spacer to prevent overlapping */}
      <div className="pt-24 bg-purple-50"></div>
    </>
  );
};

export default Navbar;

