"use client"
import React, { useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image

const UserProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "********",
        profilePic: "https://via.placeholder.com/100",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    setFormData({ ...formData, profilePic: event.target.result as string });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfilePicDelete = () => {
        setFormData({ ...formData, profilePic: "" });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg text-center transform transition duration-500 hover:scale-105">
                <div className="mb-4 relative">
                    {formData.profilePic ? (
                        <>
                            <label htmlFor="profilePicInput" className="cursor-pointer">
                                <Image
                                    src={formData.profilePic}
                                    alt="Profile Picture"
                                    width={100}  // ✅ Set appropriate width
                                    height={100} // ✅ Set appropriate height
                                    className="rounded-full mx-auto border-4 border-purple-600 shadow-md hover:shadow-lg"
                                />
                            </label>
                            <button
                                onClick={handleProfilePicDelete}
                                className="mt-2 text-red-500 text-sm hover:underline"
                            >
                                Remove Profile Picture
                            </button>
                        </>
                    ) : (
                        <label
                            htmlFor="profilePicInput"
                            className="w-24 h-24 rounded-full mx-auto border-4 border-dashed border-gray-400 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100"
                        >
                            + Add Picture
                        </label>
                    )}
                    <input
                        id="profilePicInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePicChange}
                    />
                </div>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full p-2 border rounded mb-2 focus:outline-none focus:ring focus:ring-purple-300"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full p-2 border rounded mb-2 focus:outline-none focus:ring focus:ring-purple-300"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="block w-full p-2 border rounded mb-2 focus:outline-none focus:ring focus:ring-purple-300"
                            placeholder="Password"
                        />
                        <button
                            onClick={handleEditClick}
                            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg"
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition duration-300">
                            {formData.name}
                        </h2>
                        <p className="text-gray-600 mt-2">Email: <span className="font-medium text-purple-500">{formData.email}</span></p>
                        <p className="text-gray-600">Password: <span className="font-medium text-purple-500">{formData.password}</span></p>
                        <button
                            onClick={handleEditClick}
                            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg"
                        >
                            Edit Profile
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
