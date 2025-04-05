"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Lock, Mail, Key, Eye, EyeOff } from "lucide-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import zxcvbn from "zxcvbn" // Password strength checker

const AuthPage = ({ isLogin: initialIsLogin, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin)
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [errors, setErrors] = useState({ name: "", email: "", password: "" })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLogin(initialIsLogin)
  }, [initialIsLogin])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))

    if (name === "password") {
      setPasswordStrength(zxcvbn(value).score)
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { name: "", email: "", password: "" }

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
      isValid = false
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      })

      const data = await response.json()
      setLoading(false)

      console.log("✅ Login API Response:", data) // Debugging Log

      if (response.ok) {
        if (!data.token) {
          console.error("❌ No token received from backend.")
          toast.error("Login failed. Please try again.")
          return
        }

        // Save user data to localStorage
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        // Save profile image URL if it exists
        if (data.user.profileImage) {
          localStorage.setItem("profileImage", data.user.profileImage)
        }

        onLoginSuccess(data.user, data.token)
        toast.success("Login successful!")
      } else {
        toast.error(data.error || "Login failed. Please try again.")
      }
    } catch (error) {
      setLoading(false)
      console.error("❌ Login Error:", error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setLoading(false)

      if (response.ok) {
        toast.success("OTP sent to your email!")
        setOtpSent(true)
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong. Please try again.")
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (!otp.trim()) {
      toast.error("Please enter OTP")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      })

      const data = await response.json()
      setLoading(false)

      if (response.ok) {
        toast.success("OTP Verified! Please log in.")
        setIsLogin(true)
        setOtpSent(false)
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong. Please try again.")
    }
  }

  const renderPasswordStrength = () => {
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"]
    const strength = strengthLabels[passwordStrength]
    const strengthColor = ["red", "orange", "yellow", "lime", "green"][passwordStrength]

    return (
      <div className="mt-1">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-gray-500">Password Strength</span>
          <span className={`text-xs font-medium text-${strengthColor}-500`}>{strength}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`bg-${strengthColor}-500 h-2.5 rounded-full`}
            style={{ width: `${(passwordStrength + 1) * 20}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005577] to-[#003355] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-center text-3xl font-extrabold text-[#005577]">
          {isLogin ? "Sign in to your account" : otpSent ? "Verify OTP" : "Create your account"}
        </h2>

        <form className="mt-8 space-y-6" onSubmit={isLogin ? handleLogin : otpSent ? handleVerifyOtp : handleSignup}>
          {!isLogin && !otpSent && (
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="appearance-none rounded-md w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#005577] focus:border-[#005577]"
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
          )}

          {!otpSent && (
            <>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none rounded-md w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#005577] focus:border-[#005577]"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none rounded-md w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#005577] focus:border-[#005577]"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                {!isLogin && formData.password && renderPasswordStrength()}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005577] hover:bg-[#004466] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005577]"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>{isLogin ? "Sign In" : "Sign Up"}</>
                )}
              </button>
            </>
          )}

          {otpSent && (
            <>
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="otp"
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="appearance-none rounded-md w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#005577] focus:border-[#005577]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </>
          )}
        </form>

        {!otpSent && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-medium text-[#005577] hover:text-[#004466] focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthPage

