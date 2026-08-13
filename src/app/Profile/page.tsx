"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase"; // ✅ Firebase auth import kiya
import { onAuthStateChanged } from "firebase/auth";

// Animation Variants
const bounceAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { type: "spring", stiffness: 200, damping: 10 } 
    }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

const UserProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "********",
        profilePic: "",
    });

    useEffect(() => {
        // ✅ Firebase se current user ka data fetch karna
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setFormData({
                    name: user.displayName || "No Name",
                    email: user.email || "",
                    password: "********",
                    profilePic: user.photoURL || "",
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div 
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg text-center"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
            >
                {/* Profile Picture Section */}
                <motion.div 
                    className="mb-4 relative"
                    initial="hidden"
                    animate="visible"
                    variants={bounceAnimation} // ✅ Jumping Animation
                >
                    {formData.profilePic ? (
                        <motion.img
                            src={formData.profilePic}
                            alt="Profile Picture"
                            className="w-24 h-24 rounded-full mx-auto border-4 border-purple-900 shadow-md"
                            whileHover={{ scale: 1.1 }} // ✅ Hover effect
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full mx-auto border-4 border-dashed border-gray-400 flex items-center justify-center text-gray-500">
                            <span className="text-sm">No Picture</span>
                        </div>
                    )}
                </motion.div>

                {/* Profile Data */}
                {isEditing ? (
                    <>
                        <motion.input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full p-2 border rounded mb-2"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        />
                        <motion.input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="block w-full p-2 border rounded mb-2 bg-gray-200"
                            disabled
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        />
                        <motion.button
                            onClick={handleEditClick}
                            className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded shadow-md"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Save
                        </motion.button>
                    </>
                ) : (
                    <>
                        <motion.h2 
                            className="text-2xl font-bold text-gray-800"
                            initial="hidden"
                            animate="visible"
                            variants={bounceAnimation} // ✅ Jumping Animation
                        >
                            {formData.name}
                        </motion.h2>
                        <motion.p 
                            className="text-gray-600 mt-2"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Email: <span className="font-medium text-purple-900">{formData.email}</span>
                        </motion.p>
                        <motion.p 
                            className="text-gray-600 mt-2"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Password: <span className="font-medium text-purple-900">********</span>
                        </motion.p>
                        <motion.button
                            onClick={handleEditClick}
                            className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded shadow-md"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Edit Profile
                        </motion.button>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default UserProfile;
