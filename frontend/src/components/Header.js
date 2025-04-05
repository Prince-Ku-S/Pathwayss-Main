"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/Pathwayss_Logo1.png"
import AuthPage from "./AuthPage"
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState("login")
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
      localStorage.removeItem("user")
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLoginSuccess = useCallback((userData, token) => {
    if (!token) {
      console.error("❌ No token received during login.")
      toast.error("Login failed. Please try again.")
      return
    }

    console.log("✅ Saving token:", token)

    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))

    // ✅ Store Profile Image if available
    if (userData.profileImage) {
      localStorage.setItem("profileImage", userData.profileImage)
    }

    setUser(userData)
    setShowAuth(false)
    toast.success("Login successful!")
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("profileImage") //  Remove stored profile image
    setUser(null)
    toast.info("Logged out successfully!")
    navigate("/")
  }, [navigate])

  const navItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "SERVICES", href: "#services" },
    { name: "PRICING", href: "#prices" },
    //{ name: "TEAM", href: "#team" },
    { name: "CONTACT", href: "#contact" },
    { name: "RESOURCES", href: "/resources" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${scrolled ? "shadow-md" : ""}`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src={logo || "/placeholder.svg"} alt="Pathwayss Logo" className="h-10 w-auto md:h-12" />
                <span className="text-xl font-bold text-[#005577]">PATHWAYSS</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <ul className="flex space-x-6">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        className="nav-link text-[#005577] hover:text-[#F5A623] transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="nav-link text-[#005577] hover:text-[#F5A623] transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-[#005577] rounded-md hover:bg-[#004466] transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                    <ChevronDown
                      className={`ml-2 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-48">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-4 h-4 inline mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsDropdownOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setAuthMode("login")
                      setShowAuth(true)
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#005577] rounded-md hover:bg-[#004466] transition-colors duration-200"
                  >
                    LOGIN
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("signup")
                      setShowAuth(true)
                    }}
                    className="px-4 py-2 text-sm font-medium text-[#005577] bg-white border border-[#005577] rounded-md hover:bg-[#005577] hover:text-white transition-colors duration-200"
                  >
                    SIGN UP
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#005577] hover:text-[#F5A623] transition-colors duration-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-2 pb-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        className="block py-2 text-[#005577] hover:text-[#F5A623] transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="block py-2 text-[#005577] hover:text-[#F5A623] transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
                {user ? (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        className="block py-2 text-[#005577] hover:text-[#F5A623] transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="block w-full text-left py-2 text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          setAuthMode("login")
                          setShowAuth(true)
                          setIsOpen(false)
                        }}
                        className="block w-full text-left py-2 text-[#005577] hover:text-[#F5A623] transition-colors duration-200"
                      >
                        LOGIN
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setAuthMode("signup")
                          setShowAuth(true)
                          setIsOpen(false)
                        }}
                        className="block w-full text-left py-2 text-[#005577] hover:text-[#F5A623] transition-colors duration-200"
                      >
                        SIGN UP
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </nav>
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#005577]">{authMode === "login" ? "Login" : "Sign Up"}</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => setShowAuth(false)}
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <AuthPage isLogin={authMode === "login"} onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Header

