"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Building2, School, Users } from "lucide-react"
import { Link } from "react-router-dom";

import "../components/comingsoon.css";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Email submitted:", email)
    setSubmitted(true)
    setEmail("")
    // Reset the submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      {/* Navigation */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center text-[#005577] hover:text-[#F5A623] transition-colors">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
        <div className="text-[#005577] font-bold text-xl">Pathwayss</div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-4 py-12">
        {/* Left side content */}
        <div className="w-full md:w-1/2 max-w-2xl mx-auto md:pr-8 mb-12 md:mb-0">
          <div className="relative mb-6">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#F5A623]/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#005577]/20 rounded-full blur-xl"></div>

            <h1 className="text-5xl md:text-6xl font-bold text-[#005577] mb-6 relative">
              Coming Soon!
              <div className="absolute -top-1 -right-1 w-12 h-12 bg-[#F5A623]/30 rounded-full -z-10"></div>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              We're focusing on partnerships to deliver maximum impact.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-[#F5A623]">
            <p className="text-gray-600 text-lg mb-6">
              We are currently partnering with colleges and placement cells to deliver our industry-leading guidance.
              Individual registrations will start soon. Meanwhile, explore our services and stay tuned for updates.
            </p>

            <div className="space-y-4 mb-8">
              <FeatureItem
                icon={<School className="h-5 w-5 text-[#005577]" />}
                text="Partnering with top colleges across India"
              />
              <FeatureItem
                icon={<Building2 className="h-5 w-5 text-[#005577]" />}
                text="Working with placement cells to enhance student outcomes"
              />
              <FeatureItem
                icon={<Users className="h-5 w-5 text-[#005577]" />}
                text="Preparing for individual mentorship programs"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
              <h3 className="font-semibold text-[#005577] mb-3 flex items-center">
                <Bell className="mr-2 h-5 w-5 text-[#F5A623]" />
                Get notified when we launch
              </h3>

              {submitted ? (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg">
                  Thanks! We'll notify you when individual registrations open.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#005577]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#005577] text-white rounded-lg hover:bg-[#004466] transition-colors"
                  >
                    Notify Me
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Right side illustration */}
        <div className="w-full md:w-1/2 max-w-lg">
          <div className="relative">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#F5A623]/20 rounded-full blur-xl -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#005577]/20 rounded-full blur-xl -z-10"></div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="h-48 bg-[#005577] relative">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-5 left-10 w-20 h-20 rounded-full border-4 border-white/30"></div>
                  <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full border-4 border-white/30"></div>
                  <div className="absolute top-20 right-20 w-12 h-12 rounded-full border-4 border-white/30"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="font-bold text-3xl mb-2">Pathwayss</div>
                    <div className="text-white/80">Unleashing Potential</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-semibold text-gray-800">College Partnerships</div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Active</div>
                </div>

                <div className="space-y-4">
                  <div className="h-8 bg-gray-100 rounded-md w-full"></div>
                  <div className="h-8 bg-gray-100 rounded-md w-3/4"></div>
                  <div className="h-8 bg-gray-100 rounded-md w-5/6"></div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Individual Registration</div>
                    <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Coming Soon</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#F5A623] rounded-full flex items-center justify-center shadow-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-4 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Pathwayss. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#005577]/10 flex items-center justify-center">{icon}</div>
      <p className="text-gray-700">{text}</p>
    </div>
  )
}
