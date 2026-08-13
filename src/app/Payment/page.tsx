"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // ✅ Import Image from next/image
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PaymentForm: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<"EasyPaisa" | "JazzCash" | null>(null);

  const MotionImage = motion(Image); // ✅ Wrap next/image with motion


  const [formData, setFormData] = useState({
    depositName: "",
    studentName: "",
    email: "",
    contactNumber: "",
    paymentId: "",
    paymentDateTime: "",
    paymentMethod: "",
    courseEnroll: "",
  });

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const courses = [
    "Python",
    "Graphics Designing",
    "SEO",
    "WordPress",
    "Digital Marketing",
    "HTML and CSS",
    "JavaScript and TypeScript",
    "React and Next.js"
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentProof) {
      setSuccessMessage("Please upload the payment proof.");
      return;
    }

    setLoading(true);
    setSuccessMessage(null);

    try {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const base64File = reader.result?.toString().split(",")[1];

          const payload = {
            ...formData,
            fileName: paymentProof.name,
            fileMimeType: paymentProof.type,
            fileData: base64File,
          };

          const response = await fetch('/api/submit-payment', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = await response.json();

          if (response.ok && result.status === "success") {
            setSuccessMessage("Form submitted successfully!");

            // Reset the form
            setTimeout(() => {
              setSuccessMessage(null);
              setFormData({
                depositName: "",
                studentName: "",
                email: "",
                contactNumber: "",
                paymentId: "",
                paymentDateTime: "",
                paymentMethod: "",
                courseEnroll: "",
              });
              setPaymentProof(null);
              setSelectedMethod(null);
            }, 3000);
          } else {
            throw new Error(result.message || 'Form submission failed');
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setSuccessMessage(`An error occurred: ${error.message}`);
          } else {
            setSuccessMessage("An unknown error occurred.");
          }
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setSuccessMessage("Failed to read the payment proof file. Please try again.");
        setLoading(false);
      };

      reader.readAsDataURL(paymentProof);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSuccessMessage(`An error occurred: ${error.message}`);
      } else {
        setSuccessMessage("An unknown error occurred.");
      }
      setLoading(false);
    }
  };

  const togglePaymentMethod = (method: "EasyPaisa" | "JazzCash") => {
    setSelectedMethod((prevMethod) => (prevMethod === method ? null : method));
    setFormData({ ...formData, paymentMethod: method });
  };

  // Animation Variants
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const useScrollAnimation = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: false,
      threshold: 0.1,
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [controls, inView]);

    return { ref, controls };
  };

  const { ref: formRef, controls: formControls } = useScrollAnimation();
  const { ref: noticeRef, controls: noticeControls } = useScrollAnimation();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-100 flex items-center justify-center p-6"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="max-w-5xl w-full bg-white rounded-lg shadow-xl overflow-hidden"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <div className="p-6 space-y-6">
          <div className="md:flex md:space-x-6 items-start">
            {/* Left Section with Notice */}
            <motion.div
              className="md:w-2/3"
              ref={noticeRef}
              initial="hidden"
              animate={noticeControls}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-extrabold text-purple-900 mb-4">
                Payment Information
              </motion.h2>
              <motion.h3 variants={itemVariants} className="text-xl font-semibold text-red-600 mb-4">Notice</motion.h3>
              <motion.ul variants={containerVariants} className="list-disc pl-5 text-black text-sm space-y-2 mb-6">
                {[
                  "No refund policy.",
                  "Fill the form after completing the payment; otherwise, access will not be provided.",
                  "Access will be granted within 24 to 48 hours.",
                  "Ensure the form is filled out correctly.",
                  "The payment screenshot must be clear."
                ].map((item, index) => (
                  <motion.li key={index} variants={itemVariants}>{item}</motion.li>
                ))}
              </motion.ul>

              {/* Payment Methods */}
              <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { method: "EasyPaisa", logo: "/payment/easy.png", qr: "/payment/EasyQR.jpg" },
                  { method: "JazzCash", logo: "/payment/jazz.png", qr: "/payment/jazzQR.jpg" }
                ].map((item) => (
                  <motion.button
                    key={item.method}
                    onClick={() => togglePaymentMethod(item.method as "EasyPaisa" | "JazzCash")}
                    className={`flex items-center justify-center w-full py-2 border rounded-lg ${selectedMethod === item.method
                      ? "bg-yellow-400"
                      : "bg-gray-200"
                      } transition duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    <Image
                      src={item.logo || "/placeholder.svg"}
                      alt={`${item.method} logo`}
                      width={64} // ✅ Set fixed width
                      height={64} // ✅ Set fixed height
                      className="w-16 h-16 object-contain"
                    />
                  </motion.button>
                ))}
              </motion.div>

              {/* Dynamic Account Information and QR Codes */}
              {selectedMethod && (
                <motion.div
                  className="p-4 border rounded-lg bg-gray-100 space-y-4"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants}>
                    <h4 className="text-lg font-bold text-purple-900 mb-2">
                      {selectedMethod} Account Details
                    </h4>
                    <p className="text-sm text-black">
                      <strong>Account Name:</strong> Word Skilled
                    </p>
                    <p className="text-sm text-black">
                      <strong>Account Number:</strong>{" "}
                      {selectedMethod === "EasyPaisa"
                        ? "0345-XXXXXXX"
                        : "0300-XXXXXXX"}
                    </p>
                    <motion.div className="mt-4">
                      <h4 className="text-lg font-bold text-purple-900 mb-3">
                        {selectedMethod} QR Code
                      </h4>
                      <Image
                        src={selectedMethod === "EasyPaisa" ? "/payment/EasyQR.jpg" : "/payment/jazzQR.jpg"}
                        alt={`${selectedMethod} QR Code`}
                        width={160}  // ✅ Set width
                        height={160} // ✅ Set height
                        className="object-contain"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Right Section with Illustration */}
            <motion.div className="md:w-1/3 flex items-center justify-center sticky top-0" variants={fadeInUp}>
              <MotionImage
                src="/payment/pay.avif"
                alt="Payment Illustration"
                width={300}
                height={300}
                className="w-full max-w-xs object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </div>

          {/* Main Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            ref={formRef}
            initial="hidden"
            animate={formControls}
            variants={containerVariants}
          >
            {/* Form Fields */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Deposit Name", name: "depositName", type: "text", placeholder: "Enter deposit name" },
                { label: "Student Name", name: "studentName", type: "text", placeholder: "Enter student name" },
                { label: "Email Address", name: "email", type: "email", placeholder: "Enter email address" },
                { label: "Contact Number", name: "contactNumber", type: "tel", placeholder: "Enter contact number" },
                { label: "Payment Transaction ID", name: "paymentId", type: "text", placeholder: "Enter payment transaction ID" },
                { label: "Payment Date & Time", name: "paymentDateTime", type: "datetime-local" },
                { label: "Payment Method", name: "paymentMethod", type: "select", options: ["EasyPaisa", "JazzCash"] },
                { label: "Course Enrollment", name: "courseEnroll", type: "select", options: courses }
              ].map((field, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <label htmlFor={`payment-${field.name}`} className="block text-sm font-medium text-purple-900">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <motion.select
                      id={`payment-${field.name}`}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData] || ""}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 transition-shadow"
                      required
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </motion.select>
                  ) : (
                    <motion.input
                      id={`payment-${field.name}`}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData] || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder || ""}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 transition-shadow"
                      required
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Payment Proof */}
            <motion.div variants={itemVariants}>
              <label htmlFor="payment-proof" className="block text-sm font-medium text-purple-900">
                Payment Proof
              </label>
              <motion.input
                id="payment-proof"
                type="file"
                name="paymentProof"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 transition-shadow"
                accept="image/*"
                required
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-purple-900 text-white font-bold py-3 rounded-lg hover:bg-yellow-400 hover:text-purple-900 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Payment"}
            </motion.button>
          </motion.form>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              className="mt-6 text-center font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ color: successMessage.startsWith("Form") ? "green" : "red" }}
            >
              {successMessage}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentForm;

