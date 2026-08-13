"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { createUserProfile } from "@/lib/firebase-utils";

const countryCodes = [
  { code: "+92", country: "Pakistan", length: 11 },
  { code: "+91", country: "India", length: 10 },
  { code: "+1", country: "USA", length: 10 },
  { code: "+44", country: "UK", length: 10 },
  { code: "+971", country: "UAE", length: 9 },
  { code: "+86", country: "China", length: 11 },
  { code: "+81", country: "Japan", length: 10 },
  { code: "+82", country: "South Korea", length: 10 },
  { code: "+966", country: "Saudi Arabia", length: 9 },
  { code: "+20", country: "Egypt", length: 10 },
  { code: "+90", country: "Turkey", length: 10 },
  { code: "+98", country: "Iran", length: 10 },
  { code: "+880", country: "Bangladesh", length: 10 },
  { code: "+94", country: "Sri Lanka", length: 10 },
  { code: "+95", country: "Myanmar", length: 9 },
  { code: "+977", country: "Nepal", length: 10 },
  { code: "+93", country: "Afghanistan", length: 9 },
  { code: "+61", country: "Australia", length: 9 },
  { code: "+64", country: "New Zealand", length: 9 },
  { code: "+49", country: "Germany", length: 10 },
  { code: "+33", country: "France", length: 9 },
  { code: "+39", country: "Italy", length: 10 },
  { code: "+34", country: "Spain", length: 9 },
  { code: "+7", country: "Russia", length: 10 },
  { code: "+55", country: "Brazil", length: 11 },
];


const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "+92",
    phoneNumber: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error" | "email-exists">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the allowed phone number length for the selected country
  const selectedCountry = countryCodes.find((c) => c.code === formData.countryCode);
  const maxPhoneLength = selectedCountry ? selectedCountry.length : 10;

  // ✅ Handle Input Change with Validations
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // ✅ Email Validation (must be a valid email format)
    if (name === "email") {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrorMessage("Invalid email format.");
      } else {
        setErrorMessage("");
      }
    }

    // ✅ Phone Number Validation (Only digits & fixed length)
    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value)) {
        setErrorMessage("Phone number should only contain digits.");
        return;
      }
      if (value.length > maxPhoneLength) {
        return; // Prevent typing beyond allowed length
      } 
      if (value.length < maxPhoneLength) {
        setErrorMessage(`Phone number must be exactly ${maxPhoneLength} digits.`);
      } else {
        setErrorMessage("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle Country Code Selection
  const handleCountryCodeSelect = (code: string) => {
    setFormData({ ...formData, countryCode: code, phoneNumber: "" }); // Reset phone number when changing country
    setIsDropdownOpen(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions from double-clicks
    setFormStatus("idle");
    setErrorMessage("");

    // ✅ Password Validation (Minimum 6 characters)
    if (formData.password.length < 6) {
      setFormStatus("error");
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    // ✅ Password Match Validation
    if (formData.password !== formData.confirmPassword) {
      setFormStatus("error");
      setErrorMessage("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
  
      const user = userCredential.user;
  
      await createUserProfile(user, {
        name: formData.name,
        phoneNumber: `${formData.countryCode} ${formData.phoneNumber}`,
      });
  
      setFormStatus("success");
  
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: unknown) {
      const authError = err as AuthError;
      if (authError.code === "auth/email-already-in-use") {
        setFormStatus("email-exists");
        setErrorMessage("An account with this email already exists.");
      } else if (authError.code === "auth/weak-password") {
        setFormStatus("error");
        setErrorMessage("Password must be at least 6 characters long.");
      } else {
        setFormStatus("error");
        setErrorMessage("Failed to create an account. Please try again.");
      }
  
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-purple-100"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
     <motion.div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <AnimatePresence mode="wait">
          {formStatus === "success" ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-20 h-20 text-purple-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Account Created Successfully!</h3>
            </motion.div>
          ) : formStatus === "email-exists" ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-red-800 mb-4">Email Already in Use</h3>
              <p className="text-red-600 font-semibold">
                You have already registered with this email.
              </p>
            </motion.div>
          ) : (
<>
      <motion.div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <motion.h1 className="text-2xl font-bold text-center text-purple-900 mb-4">
          SIGN-UP
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-purple-900">Name</label>
            <motion.input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full p-3 border rounded outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-400"
              required
              whileFocus={{ boxShadow: "0px 0px 8px rgba(128, 0, 128, 0.5)" }}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-900">Email</label>
            <motion.input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-3 border rounded outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-400"
              required
              whileFocus={{ boxShadow: "0px 0px 8px rgba(128, 0, 128, 0.5)" }}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-purple-900">Phone Number</label>
            <div className="flex gap-2">
              {/* Country Code Dropdown */}
              <div className="relative w-1/3">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  aria-label={`Country code, currently ${formData.countryCode}`}
                  className="p-3 border rounded flex items-center justify-between w-full"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {formData.countryCode} <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {isDropdownOpen && (
                  <motion.ul
                    className="absolute left-0 right-0 bg-white border rounded-md mt-1 shadow-md max-h-40 overflow-auto z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {countryCodes.map(({ code, country }) => (
                      <li
                        key={code}
                        className="p-2 hover:bg-purple-100 cursor-pointer"
                        onClick={() => handleCountryCodeSelect(code)}
                      >
                        {code} - {country}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>

              {/* Phone Number Input */}
              <motion.input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block flex-1 p-3 border rounded outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-400"
                required
                whileFocus={{ boxShadow: "0px 0px 8px rgba(128, 0, 128, 0.5)" }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-purple-900">Password</label>
            <motion.input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full p-3 border rounded outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-400"
              required
              whileFocus={{ boxShadow: "0px 0px 8px rgba(128, 0, 128, 0.5)" }}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-purple-900">Confirm Password</label>
            <motion.input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full p-3 border rounded outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-400"
              required
              whileFocus={{ boxShadow: "0px 0px 8px rgba(128, 0, 128, 0.5)" }}
            />
          </div>


          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-white font-bold py-2 rounded-md transition-all duration-300 hover:bg-yellow-500 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            whileHover={{ scale: 1.05 }}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-sm text-purple-900">
          Already have an account?{" "}
          <motion.span
            className="text-yellow-400 cursor-pointer font-medium"
            whileHover={{ textDecoration: "underline" }}
            onClick={() => router.push("/Login")}
          >
            Login
          </motion.span>
        </p>
      </motion.div>
      </>
          )}
        </AnimatePresence>

        {formStatus === "error" && (
          <motion.p
            className="text-red-600 text-center font-semibold mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {errorMessage}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SignUpForm;
