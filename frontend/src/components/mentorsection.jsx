"use client"

import './mentorsection.css';
import { useState, useRef } from "react"
import { useEffect } from "react"


// Sample mentor data - replace with your actual data
const mentors = [
  {
    id: 1,
    name: "Riya Sharma",
    photo: "/placeholder.svg?height=400&width=400",
    company: "Amazon",
    companyLogo: "/logos/amazon.png",
    role: "Software Engineer",
    experience: "6+ YOE | Ex-Microsoft",
    bio: "Passionate about helping students understand the mindset behind top tech interviews.",
    topics: ["Resume Building", "Behavioral Interviews", "Personal Branding"],
    linkedin: "https://linkedin.com/in/riya-sharma",
    badges: ["Ex-Microsoft", "HR Interview Expert"],
  },
  {
    id: 2,
    name: "Arjun Patel",
    photo: "/placeholder.svg?height=400&width=400",
    company: "Google",
    companyLogo: "/logos/google.png",
    role: "Senior Software Engineer",
    experience: "8+ YOE",
    bio: "Specializes in technical interview preparation and real-world project discussions.",
    topics: ["Technical Interview Prep", "Real-world Projects", "What Recruiters Want"],
    linkedin: "https://linkedin.com/in/arjun-patel",
    badges: ["Ex-Facebook", "Tech Interview Expert", "8+ YOE"],
  },
  {
    id: 3,
    name: "Neha Gupta",
    photo: "/placeholder.svg?height=400&width=400",
    company: "Microsoft",
    companyLogo: "/logos/microsoft.png",
    role: "Product Manager",
    experience: "5+ YOE | Ex-Flipkart",
    bio: "Helps students navigate the product management landscape and prepare for PM interviews.",
    topics: ["Personal Branding", "Behavioral Interviews", "Resume Building"],
    linkedin: "https://linkedin.com/in/neha-gupta",
    badges: ["Ex-Flipkart", "PM Interview Expert"],
  },
  {
    id: 4,
    name: "Rahul Verma",
    photo: "/placeholder.svg?height=400&width=400",
    company: "Meta",
    companyLogo: "/logos/meta.png",
    role: "Frontend Engineer",
    experience: "7+ YOE",
    bio: "Frontend specialist with expertise in modern web technologies and interview preparation.",
    topics: ["Technical Interview Prep", "Real-world Projects", "Resume Building"],
    linkedin: "https://linkedin.com/in/rahul-verma",
    badges: ["Ex-Google", "Frontend Expert", "7+ YOE"],
  },
  {
    id: 5,
    name: "Priya Malhotra",
    photo: "/placeholder.svg?height=400&width=400",
    company: "JPMC",
    companyLogo: "/logos/jpmorgan.png",
    role: "Technology Lead",
    experience: "10+ YOE | Ex-Goldman Sachs",
    bio: "Fintech expert helping students break into the financial technology sector.",
    topics: ["What Recruiters Want", "Personal Branding", "Behavioral Interviews"],
    linkedin: "https://linkedin.com/in/priya-malhotra",
    badges: ["Ex-Goldman Sachs", "10+ YOE", "Fintech Expert"],
  },
  {
    id: 6,
    name: "Vikram Singh",
    photo: "/placeholder.svg?height=400&width=400",
    company: "Netflix",
    companyLogo: "/logos/netflix.png",
    role: "Senior Backend Engineer",
    experience: "9+ YOE | Ex-Amazon",
    bio: "Specializes in technical interview preparation and system design discussions.",
    topics: ["Technical Interview Prep", "Real-world Projects", "What Recruiters Want"],
    linkedin: "https://linkedin.com/in/vikram-singh",
    badges: ["Ex-Amazon", "Backend Expert", "9+ YOE"],
  },
  {
    id: 7,
    name: "Ananya Desai",
    photo: "/placeholder.svg?height=400&width=400",
    company: "Adobe",
    companyLogo: "/logos/adobe.png",
    role: "UX Designer",
    experience: "6+ YOE | Ex-Airbnb",
    bio: "Passionate about helping students build impressive portfolios and ace design interviews.",
    topics: ["Resume Building", "Personal Branding", "What Recruiters Want"],
    linkedin: "https://linkedin.com/in/ananya-desai",
    badges: ["Ex-Airbnb", "UX Expert"],
  },
  {
    id: 8,
    name: "Karan Mehta",
    photo: "/placeholder.svg?height=400&width=400",
    company: "Uber",
    companyLogo: "/logos/uber.png",
    role: "Engineering Manager",
    experience: "12+ YOE | Ex-LinkedIn",
    bio: "Helps engineers prepare for leadership roles and excel in management interviews.",
    topics: ["Behavioral Interviews", "Personal Branding", "What Recruiters Want"],
    linkedin: "https://linkedin.com/in/karan-mehta",
    badges: ["Ex-LinkedIn", "12+ YOE", "Leadership Expert"],
  },
]

// Extract unique companies and topics for filters
const allCompanies = Array.from(new Set(mentors.map((mentor) => mentor.company)))
const allTopics = Array.from(new Set(mentors.flatMap((mentor) => mentor.topics)))

export default function MentorSection() {
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [selectedTopics, setSelectedTopics] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false)
  const [showTopicDropdown, setShowTopicDropdown] = useState(false)
  const carouselRef = useRef(null)
  const companyDropdownRef = useRef(null)
  const topicDropdownRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
        setShowCompanyDropdown(false)
      }
      if (topicDropdownRef.current && !topicDropdownRef.current.contains(event.target)) {
        setShowTopicDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const filteredMentors = mentors.filter((mentor) => {
    const companyMatch = selectedCompanies.length === 0 || selectedCompanies.includes(mentor.company)
    const topicMatch = selectedTopics.length === 0 || mentor.topics.some((topic) => selectedTopics.includes(topic))

    // Filter by category
    if (activeFilter === "all") return companyMatch && topicMatch
    if (activeFilter === "faang") {
      const faangCompanies = ["Google", "Meta", "Amazon", "Apple", "Netflix", "JPMC", "Zscaler", "Media.net"]
      return companyMatch && topicMatch && faangCompanies.includes(mentor.company)
    }
    if (activeFilter === "fintech") {
      const fintechCompanies = ["JPMC", "Goldman Sachs", "PayPal", "Stripe"]
      return companyMatch && topicMatch && fintechCompanies.includes(mentor.company)
    }

    return companyMatch && topicMatch
  })

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount =
        direction === "left"
          ? current.scrollLeft - current.offsetWidth / 2
          : current.scrollLeft + current.offsetWidth / 2

      current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const toggleCompany = (company) => {
    setSelectedCompanies((prev) => (prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]))
  }

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  const clearFilters = () => {
    setSelectedCompanies([])
    setSelectedTopics([])
  }

  return (
    <section className="w-full py-16 bg-[#005577]">
      <div className="container px-4 mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Mentors</h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Mentors from FAANG, Fintech, and Top Startups are already onboard to guide you through your tech
            journey.
          </p>
          <div className="w-24 h-1 bg-[#FFA500] mx-auto mt-6"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex bg-[#004466] rounded-md overflow-hidden">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === "all" ? "bg-[#FFA500] text-[#005577]" : "text-white"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All Mentors
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === "faang" ? "bg-[#FFA500] text-[#005577]" : "text-white"
              }`}
              onClick={() => setActiveFilter("faang")}
            >
              FAANG
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === "fintech" ? "bg-[#FFA500] text-[#005577]" : "text-white"
              }`}
              onClick={() => setActiveFilter("fintech")}
            >
              Fintech
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <div className="relative" ref={companyDropdownRef}>
              <button
                className="px-3 py-2 text-sm font-medium bg-[#FFA500] text-[#005577] rounded-md hover:bg-[#FFB700] flex items-center gap-2"
                onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <span className="hidden sm:inline">Filter by Company</span>
                <span className="inline sm:hidden">Company</span>
              </button>
              {showCompanyDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
                  <div className="p-2">
                    {allCompanies.map((company) => (
                      <div key={company} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md">
                        <input
                          type="checkbox"
                          id={`company-${company}`}
                          checked={selectedCompanies.includes(company)}
                          onChange={() => toggleCompany(company)}
                          className="mr-2"
                        />
                        <label htmlFor={`company-${company}`} className="text-sm text-gray-700 cursor-pointer">
                          {company}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={topicDropdownRef}>
              <button
                className="px-3 py-2 text-sm font-medium bg-[#FFA500] text-[#005577] rounded-md hover:bg-[#FFB700] flex items-center gap-2"
                onClick={() => setShowTopicDropdown(!showTopicDropdown)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <span className="hidden sm:inline">Filter by Topic</span>
                <span className="inline sm:hidden">Topic</span>
              </button>
              {showTopicDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
                  <div className="p-2">
                    {allTopics.map((topic) => (
                      <div key={topic} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md">
                        <input
                          type="checkbox"
                          id={`topic-${topic}`}
                          checked={selectedTopics.includes(topic)}
                          onChange={() => toggleTopic(topic)}
                          className="mr-2"
                        />
                        <label htmlFor={`topic-${topic}`} className="text-sm text-gray-700 cursor-pointer">
                          {topic}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCompanies.length > 0 || selectedTopics.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCompanies.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-white">Companies:</span>
                {selectedCompanies.map((company) => (
                  <span
                    key={company}
                    className="px-2 py-1 text-xs rounded-md bg-[#006688] text-white cursor-pointer hover:bg-[#007799]"
                    onClick={() => toggleCompany(company)}
                  >
                    {company} ×
                  </span>
                ))}
              </div>
            )}

            {selectedTopics.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center ml-0 sm:ml-4">
                <span className="text-sm font-medium text-white">Topics:</span>
                {selectedTopics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs rounded-md bg-[#006688] text-white cursor-pointer hover:bg-[#007799]"
                    onClick={() => toggleTopic(topic)}
                  >
                    {topic} ×
                  </span>
                ))}
              </div>
            )}

            <button
              className="px-2 py-1 text-xs text-gray-200 hover:text-white hover:bg-[#006688] rounded-md"
              onClick={clearFilters}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Carousel Navigation */}
        <div className="flex justify-end mb-4 gap-2">
          <button
            className="p-2 rounded-md bg-[#006688] hover:bg-[#007799] text-white"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="p-2 rounded-md bg-[#006688] hover:bg-[#007799] text-white"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Mentors Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto pb-6 gap-6 snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <div key={mentor.id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start">
                <MentorCard mentor={mentor} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-10">
              <p className="text-gray-200">No mentors match your filter criteria. Try adjusting your filters.</p>
            </div>
          )}
        </div>

        {/* Information Section (replacing CTA) */}
        <div className="mt-12 bg-[#004466] rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Learn from Industry Experts</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Our mentors provide valuable insights on resume building, interview preparation, and what recruiters are
            actually looking for in candidates.
          </p>
        </div>
      </div>
    </section>
  )
}

function MentorCard({ mentor }) {
  return (
    <div className="bg-[#006688] rounded-xl shadow-md overflow-hidden border border-[#007799] transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:translate-y-[-5px]">
      <div className="relative">
        <img src={mentor.photo || "/placeholder.svg"} alt={mentor.name} className="w-full h-48 object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#004466]/90 to-transparent p-4">
          <div className="flex items-center gap-2">
            <img
              src={mentor.companyLogo || "/placeholder.svg"}
              alt={mentor.company}
              className="w-6 h-6 rounded-full bg-white p-0.5"
            />
            <span className="text-white font-medium">{mentor.company}</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg mb-1 text-white">{mentor.name}</h3>
        <p className="text-gray-200 text-sm mb-2">{mentor.role}</p>
        <p className="text-gray-300 text-sm mb-3">{mentor.experience}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {mentor.badges.slice(0, 2).map((badge, index) => (
            <span key={index} className="text-xs px-2 py-1 rounded-md bg-[#FFA500] text-[#005577] font-medium">
              {badge}
            </span>
          ))}
          {mentor.badges.length > 2 && (
            <span className="text-xs px-2 py-1 rounded-md bg-[#004466] text-white">+{mentor.badges.length - 2}</span>
          )}
        </div>

        <p className="text-gray-200 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-300 mb-1.5">EXPERTISE AREAS</h4>
          <div className="flex flex-wrap gap-1.5">
            {mentor.topics.map((topic, index) => (
              <span key={index} className="text-xs px-2 py-1 rounded-md border border-gray-500 text-gray-200">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 mt-auto flex items-center justify-between">
        <a
          href={mentor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-200 hover:text-white hover:bg-[#007799] rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </div>
    </div>
  )
}
