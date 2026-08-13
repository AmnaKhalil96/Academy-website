import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import Link from "next/link"; // ✅ Import Link

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaEnvelope />,
      href: "mailto:word.skilled.online@gmail.com",
      label: "Email",
      ariaLabel: "Send an email",
    },
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/share/1BMrDYksQ3/?mibextid=qi2Omg",
      label: "Facebook",
      ariaLabel: "Visit our Facebook page",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/word.skilled.online.pk?igsh=YmF3bWVkenE0ZzN6",
      label: "Instagram",
      ariaLabel: "Visit our Instagram profile",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/company/word-skilled/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_companies%3BApw9lPjmQDuaNP3WHbOUWg%3D%3D",
      label: "LinkedIn",
      ariaLabel: "Visit our LinkedIn page",
    },
  ];

  return (
    <footer className="bg-white text-gray-700 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-purple-900 mb-2">WORD SKILLED</h2>
            <p className="text-sm text-gray-500">
              Empowering businesses with innovative solutions. Get in touch with us.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/Courses" className="text-gray-600 hover:text-yellow-500 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-yellow-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>

          </div>

          {/* Social Media Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-yellow-500 transition-all"
                aria-label={link.ariaLabel}
              >
                <span className="text-xl text-purple-900 hover:text-white transition-colors">
                  {link.icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} WORD SKILLED. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
