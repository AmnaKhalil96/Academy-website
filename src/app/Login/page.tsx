"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { CheckCircle, XCircle } from "lucide-react";
import { updateUserLastLogin } from "@/lib/firebase-utils";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions from double-clicks
    setIsSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Best-effort: record the login timestamp. If this fails (e.g. no
      // database rules for this user yet) it should not block sign-in.
      updateUserLastLogin(userCredential.user.uid).catch((err) =>
        console.error("Error updating last login: ", err)
      );
      setFormStatus("success");

      // Redirect after login
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch {
      setFormStatus("error");
      setErrorMessage("Invalid email or password.");

      // Reset error after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-purple-100"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {formStatus === "success" && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-20 h-20 text-purple-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Login Successful!</h3>
            </motion.div>
          )}

          {formStatus === "error" && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-red-800 mb-4">Login Failed!</h3>
              <p className="text-red-600 font-semibold">{errorMessage}</p>
            </motion.div>
          )}

          {formStatus === "idle" && (
            <>
              <motion.h2
                className="text-2xl font-bold text-purple-900 text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                LOGIN
              </motion.h2>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="login-email" className="sr-only">Email</label>
                <motion.input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-400"
                  required
                  whileFocus={{ boxShadow: "0px 0px 8px rgba(128, 0, 128, 0.5)" }}
                />
                <label htmlFor="login-password" className="sr-only">Password</label>
                <motion.input
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-400"
                  required
                  whileFocus={{ boxShadow: "0px 0px 8px rgba(128, 0, 128, 0.5)" }}
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 text-white font-bold py-2 rounded-md transition-all duration-300 hover:bg-yellow-500 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  whileHover={{ scale: 1.05 }}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </motion.button>
              </motion.form>

              <motion.div
                className="text-center mt-4 text-purple-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Don&apos;t have an account?{" "}
                <motion.span
                  className="cursor-pointer font-bold text-yellow-400"
                  whileHover={{ textDecoration: "underline" }}
                  onClick={() => router.push("/SignUp")}
                >
                  Sign Up
                </motion.span>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
