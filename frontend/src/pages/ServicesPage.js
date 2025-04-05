"use client"

import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import {
  Presentation,
  GraduationCap,
  Compass,
  FileText,
  Users,
  Zap,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react"
import { motion } from "framer-motion"

const ServicesPage = () => {
  const location = useLocation()
  const servicesRef = useRef(null)

  useEffect(() => {
    // Scroll to a specific section when coming from "Learn More"
    if (location.state?.scrollToId) {
      const element = document.getElementById(location.state.scrollToId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }) // Default scroll to top
    }
  }, [location])

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const services = [
    {
      id: "workshops",
      icon: <Presentation className="w-16 h-16 text-[#005577]" />,
      title: "Workshops and Webinars",
      description: "Interactive sessions and online workshops to enhance your professional skills and knowledge base.",
      features: [
        "Live sessions with experts from top tech companies",
        "Resume-building and personal branding techniques",
        "Hiring trends in MNCs and how to adapt",
        "Networking opportunities with professionals",
      ],
      idealFor: [
        "College students looking to understand industry requirements",
        "Freshers preparing for job applications and internships",
      ],
    },
    {
      id: "internships",
      icon: <GraduationCap className="w-16 h-16 text-[#005577]" />,
      title: "Internship and Job Assistance",
      description: "Comprehensive support in finding and securing internships and job opportunities in your field.",
      features: [
        "Personalized career recommendations based on skillset",
        "Exclusive job and internship listings for candidates",
        "Step-by-step guidance for securing internships at top MNCs",
        "LinkedIn Premium access for improved job search",
      ],
      idealFor: [
        "Students looking for internships in tech and management",
        "Freshers aiming for placements in top MNCs",
      ],
    },
    {
      id: "career-counseling",
      icon: <Compass className="w-16 h-16 text-[#005577]" />,
      title: "Career Counseling",
      description: "Professional guidance to help you make informed decisions about your career path and growth.",
      features: [
        "Personalized mentorship sessions with industry professionals",
        "Strategic career planning based on market trends",
        "Guidance on selecting the right skills and certifications",
        "Mock interviews and soft skills training",
      ],
      idealFor: [
        "Students confused about career paths in tech or consulting",
        "Professionals looking for career transitions or upskilling",
      ],
    },
    {
      id: "resume-linkedin",
      icon: <FileText className="w-16 h-16 text-[#005577]" />,
      title: "Resume and LinkedIn Profile Enhancement",
      description: "Optimize your resume and LinkedIn profile to stand out among thousands of applicants.",
      features: [
        "Professional resume formatting and structuring",
        "Optimization of LinkedIn profiles for better opportunities",
        "ATS-friendly resume creation",
        "Cover letter writing assistance",
      ],
      idealFor: [
        "Students preparing for internship/job applications",
        "Professionals looking for career growth opportunities",
      ],
    },
    {
      id: "mock-interviews",
      icon: <Users className="w-16 h-16 text-[#005577]" />,
      title: "Technical and Behavioral Mock Interviews",
      description:
        "Simulate real-world interview scenarios to improve your performance in technical and behavioral rounds.",
      features: [
        "Live mock interviews conducted by experts from MNCs",
        "Technical interview preparation for various roles",
        "Behavioral interview training to enhance communication",
        "Instant feedback and performance improvement strategies",
      ],
      idealFor: [
        "Students preparing for FAANG/MNC job interviews",
        "Professionals transitioning to a new role or company",
      ],
    },
    {
      id: "soft-skills",
      icon: <Zap className="w-16 h-16 text-[#005577]" />,
      title: "Soft Skills and Personality Development",
      description: "Enhance your communication, leadership, and teamwork abilities for career success.",
      features: [
        "Effective communication workshops",
        "Public speaking and confidence-building sessions",
        "Time management and productivity techniques",
        "Teamwork and leadership skills development",
      ],
      idealFor: [
        "Students preparing for job interviews and internships",
        "Young professionals looking to improve managerial skills",
      ],
    },
  ]

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const companyLogos = [
    {
      name: "Google",
      logo: "/images/google-logo.png",
      color: "#4285F4",
    },
    {
      name: "Microsoft",
      logo: "/images/microsoft-logo.png",
      color: "#00A4EF",
    },
    {
      name: "J.P.Morgan",
      logo: "/images/jpmorgan-logo.png",
      color: "#007CC3",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-r from-[#004466] to-[#006699] text-white py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Your <span className="text-[#F5A623]">Career Growth</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Pathwayss offers expert guidance and opportunities to bridge the gap between college and industry.
            </p>
            <motion.a
              href="#services"
              onClick={(e) => {
                e.preventDefault()
                scrollToServices()
              }}
              className="bg-[#F5A623] text-[#005577] font-bold py-3 px-8 rounded-full hover:bg-white transition-colors duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Services
              <ChevronDown className="ml-2 w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M0,50 Q50,0 100,50 Q50,100 0,50 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
          </svg>
        </motion.div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        ))}
      </motion.section>

      {/* Experts Section */}
      <motion.section
        className="py-20 bg-white"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#005577] relative"
            variants={fadeIn}
          >
            Learn from Industry Experts
            <motion.div
              className="absolute left-1/2 -bottom-4 h-1 w-24 bg-[#F5A623] -translate-x-1/2"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.h2>

          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {companyLogos.map((company, index) => (
              <motion.div
                key={company.name}
                className="text-center"
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="w-32 h-32 mb-4 mx-auto rounded-full flex items-center justify-center p-4"
                  style={{
                    boxShadow: `0 10px 30px -10px ${company.color}40`,
                    background: `linear-gradient(135deg, white 0%, #f8f8f8 100%)`,
                  }}
                  whileHover={{
                    boxShadow: `0 15px 30px -10px ${company.color}60`,
                    scale: 1.05,
                  }}
                >
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} Logo`}
                    className="w-24 h-24 object-contain"
                  />
                </motion.div>
                <motion.p className="font-semibold text-gray-700 text-lg" variants={fadeIn}>
                  {company.name}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        id="services"
        ref={servicesRef}
        className="py-24 bg-gray-50"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#005577]" variants={fadeIn}>
            Our Services
          </motion.h2>
          <motion.p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg" variants={fadeIn}>
            Comprehensive career development services designed to help you succeed in today's competitive job market.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                id={service.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-8">
                  <motion.div
                    className="mb-6 text-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-[#005577] text-center">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">{service.description}</p>
                  <motion.a
                    href={`#${service.id}-details`}
                    className="inline-flex items-center text-[#005577] font-semibold hover:text-[#F5A623] transition-colors duration-300 w-full justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.a>
                </div>
                <div className="h-2 bg-[#F5A623]"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Detailed Services Sections */}
      {services.map((service, index) => (
        <motion.section
          key={service.id}
          id={`${service.id}-details`}
          className={`py-24 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <motion.h2 className="text-4xl font-bold mb-16 text-[#005577] text-center md:text-left" variants={fadeIn}>
              {service.title}
            </motion.h2>

            <div className="flex flex-wrap items-center">
              <motion.div className="w-full lg:w-1/2 mb-12 lg:mb-0" variants={fadeIn} custom={1}>
                <motion.div
                  className="bg-gradient-to-br from-[#004466] to-[#006699] h-80 rounded-xl flex items-center justify-center shadow-lg overflow-hidden relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-10 rounded-full shadow-lg z-10"
                  >
                    <div className="text-[#005577] transform scale-150">{service.icon}</div>
                  </motion.div>

                  {/* Background elements */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                      opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <circle cx="20" cy="20" r="15" fill="none" stroke="white" strokeWidth="0.5" />
                      <circle cx="80" cy="80" r="15" fill="none" stroke="white" strokeWidth="0.5" />
                      <path d="M20,50 Q50,20 80,50 Q50,80 20,50 Z" fill="none" stroke="white" strokeWidth="0.5" />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="w-full lg:w-1/2 lg:pl-16"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.p className="text-xl text-gray-700 mb-8" variants={fadeIn}>
                  {service.description}
                </motion.p>

                <motion.h3 className="text-2xl font-semibold mb-6 text-[#005577]" variants={fadeIn}>
                  Key Features
                </motion.h3>

                <motion.ul className="space-y-4 mb-8" variants={staggerContainer}>
                  {service.features.map((feature, idx) => (
                    <motion.li key={idx} className="flex items-start" variants={cardVariants} custom={idx}>
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.h3 className="text-2xl font-semibold mb-6 text-[#005577]" variants={fadeIn}>
                  Ideal For
                </motion.h3>

                <motion.ul className="space-y-4" variants={staggerContainer}>
                  {service.idealFor.map((ideal, idx) => (
                    <motion.li key={idx} className="flex items-start" variants={cardVariants} custom={idx}>
                      <div className="w-5 h-5 rounded-full bg-[#F5A623] mr-3 mt-1 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700">{ideal}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* Why Choose Pathwayss Section */}
      <motion.section
        className="py-24 bg-gray-100"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-6 text-[#005577]" variants={fadeIn}>
            Why Choose Pathwayss?
          </motion.h2>

          <motion.p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg" variants={fadeIn}>
            We provide comprehensive career development services with a personalized approach
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              "Guidance from top industry professionals",
              "Personalized approach to career goals",
              "Access to exclusive opportunities",
              "Real-world insights into hiring trends",
              "Practical training for interviews",
              "Comprehensive skill development",
            ].map((reason, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8"
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Check className="w-6 h-6 text-green-600" />
                </motion.div>
                <p className="text-lg font-semibold text-gray-800 text-center">{reason}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-24 bg-gradient-to-r from-[#004466] to-[#006699] text-white text-center relative overflow-hidden"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="10" cy="10" r="10" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="90" cy="90" r="10" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="90" cy="10" r="10" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="10" cy="90" r="10" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-8" variants={fadeIn}>
            Ready to Build a Future-Proof Career?
          </motion.h2>
          <motion.p className="text-xl mb-12 max-w-2xl mx-auto" variants={fadeIn}>
            Join Pathwayss today and get expert guidance to succeed in your career journey.
          </motion.p>
          {/*<motion.a
            href="/contact"
            className="bg-[#F5A623] text-[#005577] font-bold py-4 px-10 rounded-full hover:bg-white transition-colors duration-300 inline-block text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeIn}
          >
            Get Started Now
          </motion.a>*/}
        </div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        ))}
      </motion.section>
    </div>
  )
}

export default ServicesPage

