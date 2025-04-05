"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, GraduationCap, Briefcase, Target, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

function MainSection() {
  const scrollRef = useRef(null)

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("services")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Parallax effect for background elements
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const parallaxElements = document.querySelectorAll(".parallax")

      parallaxElements.forEach((element) => {
        const speed = element.getAttribute("data-speed")
        element.style.transform = `translateY(${scrollY * speed}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  const featureVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (item) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: item * 0.1 + 0.6,
      },
    }),
  }

  const features = [
    {
      icon: <GraduationCap className="w-12 h-12 mb-4 text-[#F5A623]" />,
      title: "Expert Guidance",
      description: "Personalized career advice from industry professionals",
    },
    {
      icon: <Briefcase className="w-12 h-12 mb-4 text-[#F5A623]" />,
      title: "Internship Opportunities",
      description: "Access to exclusive internships and job placements",
    },
    {
      icon: <Target className="w-12 h-12 mb-4 text-[#F5A623]" />,
      title: "Skill Development",
      description: "Workshops and webinars to enhance your professional skills",
    },
  ]

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#005577] to-[#003355] py-20"
      id="home"
      ref={scrollRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-4 -top-4 w-64 h-64 bg-[#F5A623] rounded-full mix-blend-multiply filter blur-xl opacity-20 parallax"
          data-speed="0.05"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        ></motion.div>
        <motion.div
          className="absolute -right-4 -bottom-4 w-64 h-64 bg-[#F5A623] rounded-full mix-blend-multiply filter blur-xl opacity-20 parallax"
          data-speed="0.1"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        ></motion.div>
        <motion.div
          className="absolute left-1/2 top-1/2 w-64 h-64 bg-[#F5A623] rounded-full mix-blend-multiply filter blur-xl opacity-20 parallax"
          data-speed="0.07"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        ></motion.div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
          variants={itemVariants}
        >
          Empowering Your{" "}
          <span className="text-[#F5A623] relative">
            Career Journey
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-[#F5A623]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 1 }}
            ></motion.span>
          </span>
        </motion.h1>

        <motion.p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto" variants={itemVariants}>
          Unlock your potential with real-world insights and expert guidance to secure your dream career.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          variants={itemVariants}
        >
          <motion.a
            href="#services"
            className="bg-[#F5A623] text-[#005577] font-bold py-4 px-10 rounded-full hover:bg-white transition-colors duration-300 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToNextSection();
            }}
          >
            Explore Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
  
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/services"
              className="bg-transparent text-white font-bold py-4 px-10 rounded-full border-2 border-white hover:bg-white hover:text-[#005577] transition-colors duration-300 shadow-lg inline-block"
              target="_blank" // Opens in a new tab
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>


        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-xl p-8 hover:bg-opacity-10 transition-all duration-300 border border-white border-opacity-10"
              custom={index}
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}>
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-8 h-8 text-white opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default MainSection

