"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { User, Mail, Calendar, GraduationCap, Camera, Loader, Edit3, Award, Briefcase, Save } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [yearOfGraduation, setYearOfGraduation] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [updating, setUpdating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState("profile") // "profile" or "edit"
  const fileInputRef = useRef(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  useEffect(() => {
    fetchUserProfile()

    // Load Profile Image from localStorage
    const storedProfileImage = localStorage.getItem("profileImage")
    if (storedProfileImage) {
      setProfileImage(storedProfileImage)
    }
  }, [])

  const fetchUserProfile = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("https://pathwayss-backend.onrender.com/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch profile")
      }

      const text = await response.text()
      const data = text ? JSON.parse(text) : {}

      setUser(data)
      setName(data.name || "")
      setEmail(data.email || "")
      setAge(data.age || "")
      setYearOfGraduation(data.yearOfGraduation || "")
      setProfileImage(data.profileImage || "")

      // Save profile image URL to localStorage
      if (data.profileImage) {
        localStorage.setItem("profileImage", data.profileImage)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast.error("Error loading profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setUpdating(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("https://pathwayss-backend.onrender.com/api/user/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, age, yearOfGraduation, profileImage }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const data = await response.json()
      setUser(data.user)
      if (data.user?.profileImage) {
        localStorage.setItem("profileImage", data.user.profileImage)
      }
      toast.success("Profile updated successfully!")
      setActiveTab("profile") // Switch back to profile view after update
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setUpdating(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("profileImage", file)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No token found")
      }

      const response = await fetch("https://pathwayss-backend.onrender.com/api/user/upload-profile-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      setProfileImage(data.imageUrl)

      // Store updated profile image in localStorage
      localStorage.setItem("profileImage", data.imageUrl)

      toast.success("Profile image updated successfully!")
    } catch (error) {
      console.error("Image Upload Error:", error)
      toast.error("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#005577] to-[#003355] flex items-center justify-center pt-20">
        <div className="text-center">
          <motion.div
            animate={{
              rotate: 360,
              transition: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="inline-block"
          >
            <Loader className="w-16 h-16 text-white" />
          </motion.div>
          <motion.p
            className="text-white mt-4 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading your profile...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005577] to-[#003355] flex items-center justify-center p-4 py-20 mt-16">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#004466] to-[#006699] p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">My Profile</h1>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "profile"
                  ? "bg-white text-[#005577]"
                  : "bg-transparent text-white border border-white hover:bg-white/10"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Profile
              </span>
            </button>
            <button
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "edit"
                  ? "bg-white text-[#005577]"
                  : "bg-transparent text-white border border-white hover:bg-white/10"
              }`}
              onClick={() => setActiveTab("edit")}
            >
              <span className="flex items-center">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "profile" ? (
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative group">
                    <div className="rounded-full overflow-hidden border-4 border-[#005577] shadow-lg h-48 w-48 bg-gray-100">
                      <img
                        src={profileImage || "https://via.placeholder.com/150?text=Profile"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={triggerFileInput}
                      className="absolute bottom-2 right-2 bg-white rounded-full p-3 cursor-pointer shadow-md hover:bg-gray-100 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <Camera className="w-5 h-5 text-[#005577]" />
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </button>
                  </div>
                  {uploading && <p className="text-sm mt-2 text-[#005577] animate-pulse">Uploading...</p>}
                  <h2 className="text-2xl font-bold mt-4 text-[#005577]">{name || "Your Name"}</h2>
                  <p className="text-gray-500">{email || "your.email@example.com"}</p>

                  {/* Quick stats */}
                  <div className="mt-6 w-full">
                    <div className="flex justify-around text-center">
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="text-lg font-semibold text-[#005577]">{age || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Graduated</p>
                        <p className="text-lg font-semibold text-[#005577]">{yearOfGraduation || "-"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Edit button for mobile */}
                  <button
                    className="mt-6 bg-[#005577] text-white py-2 px-6 rounded-md hover:bg-[#004466] transition duration-300 flex items-center md:hidden w-full justify-center"
                    onClick={() => setActiveTab("edit")}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>

                <div className="md:w-2/3">
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-[#005577] mb-6 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 text-[#F5A623] mr-2" />
                          <h4 className="font-semibold text-gray-700">Age</h4>
                        </div>
                        <p className="text-lg">{age || "Not specified"}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center mb-2">
                          <GraduationCap className="w-5 h-5 text-[#F5A623] mr-2" />
                          <h4 className="font-semibold text-gray-700">Graduation Year</h4>
                        </div>
                        <p className="text-lg">{yearOfGraduation || "Not specified"}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center mb-2">
                          <Award className="w-5 h-5 text-[#F5A623] mr-2" />
                          <h4 className="font-semibold text-gray-700">Achievements</h4>
                        </div>
                        <p className="text-lg">{user?.achievements || "No achievements added yet"}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center mb-2">
                          <Briefcase className="w-5 h-5 text-[#F5A623] mr-2" />
                          <h4 className="font-semibold text-gray-700">Experience</h4>
                        </div>
                        <p className="text-lg">{user?.experience || "No experience added yet"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Edit button for desktop */}
                  <button
                    className="mt-4 bg-[#005577] text-white py-2 px-6 rounded-md hover:bg-[#004466] transition duration-300 flex items-center hidden md:flex"
                    onClick={() => setActiveTab("edit")}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-[#005577] mb-6 flex items-center">
                <Edit3 className="w-6 h-6 mr-2" />
                Edit Your Profile
              </h3>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative group">
                    <div className="rounded-full overflow-hidden border-4 border-[#005577] shadow-lg h-48 w-48 bg-gray-100">
                      <img
                        src={profileImage || "https://via.placeholder.com/150?text=Profile"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={triggerFileInput}
                      className="absolute bottom-2 right-2 bg-white rounded-full p-3 cursor-pointer shadow-md hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Camera className="w-5 h-5 text-[#005577]" />
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </button>
                  </div>
                  {uploading && <p className="text-sm mt-2 text-[#005577] animate-pulse">Uploading...</p>}
                </div>

                <div className="md:w-2/3">
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005577] transition-colors duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          id="email"
                          value={email}
                          readOnly
                          className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-100"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005577] transition-colors duration-200"
                            placeholder="Your age"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="graduation" className="block text-sm font-medium text-gray-700 mb-1">
                          Year of Graduation
                        </label>
                        <div className="relative">
                          <GraduationCap
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="number"
                            id="graduation"
                            value={yearOfGraduation}
                            onChange={(e) => setYearOfGraduation(e.target.value)}
                            className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005577] transition-colors duration-200"
                            placeholder="Graduation year"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setActiveTab("profile")}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#005577] text-white rounded-md hover:bg-[#004466] transition-colors flex items-center justify-center"
                        disabled={updating}
                      >
                        {updating ? (
                          <>
                            <Loader className="animate-spin mr-2" size={20} />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ProfilePage

