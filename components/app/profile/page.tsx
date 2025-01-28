"use client"; // Required for interactivity (useState, event handlers)

import { useState } from "react";
import { useRouter } from "next/navigation";
import '@/app/globals.css';

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleGoToMainPage = () => {
    router.push("/"); // Redirects to the main page ("/")
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-black text-white"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      {/* Header */}
      <h2 className="text-3xl font-bold text-center mb-8">Edit Profile</h2>

      {/* Form */}
      <div className="w-full max-w-lg p-8 bg-[#1c1c1c] rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Profile Picture Upload */}
          <div className="mb-6 flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border border-gray-600"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-600 file:text-white hover:file:bg-gray-500"
            />
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Your full name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Your email address"
            />
          </div>

          {/* Bio Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              rows={4}
              placeholder="Tell us a little about yourself"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-3 text-lg font-semibold bg-white text-black rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleGoToMainPage}
              className="flex-1 py-3 text-lg font-semibold bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Go to Main Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
