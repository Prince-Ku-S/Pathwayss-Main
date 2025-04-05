import React from "react"
import { ArrowRight, Users, Briefcase, Target } from "lucide-react"
import aboutsection1 from '../assets/about-section1.jpg';


function AboutSection() {


  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="about">
      <div className="container mx-auto px-4">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Vertical "BEGIN YOUR JOURNEY" text */}
          <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 hidden xl:block">
            <div
              className="bg-[#005577] text-white p-4 rounded-l-lg shadow-lg"
              style={{ writingMode: "vertical-lr", transform: "rotate(-180deg)" }}
            >
              <span className="text-2xl font-bold tracking-wider">BEGIN YOUR JOURNEY</span>
            </div>
          </div>

          {/* Left column with images and overlay */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={aboutsection1}
                alt="Team collaboration"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#005577] to-transparent opacity-90"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Pathwayss: Unleashing Potential, Inspiring Success</h2>
              <p className="text-lg mb-6">
                Connect with recent graduates and seasoned professionals from top-tier companies.
              </p>
              <a
                href="#learn-more"
                className="inline-flex items-center text-white bg-[#F5A623] px-6 py-3 rounded-full font-semibold hover:bg-[#d48c1f] transition-colors duration-300"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right column with text content */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-[#005577]">
              BRIDGING ACADEMIA AND INDUSTRY FOR CAREER SUCCESS
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              At Pathwayss, we are dedicated to guiding ambitious college students towards their dream careers. Our
              mentors provide unparalleled insights into the latest industry trends and required skills, helping you
              transform academic knowledge into practical, marketable skills that will set you apart in the job market.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Users className="w-10 h-10" />}
                title="Expert Mentorship"
                description="Connect with professionals from top companies"
              />
              <FeatureCard
                icon={<Briefcase className="w-10 h-10" />}
                title="Internship Guidance"
                description="Get insider tips on securing coveted positions"
              />
              <FeatureCard
                icon={<Target className="w-10 h-10" />}
                title="Skill Development"
                description="Learn the most in-demand industry skills"
              />
            </div>
            <div className="pt-6">
              <a
                href="#contact"
                className="inline-flex items-center text-[#005577] font-semibold hover:text-[#F5A623] transition-colors duration-300"
              >
                Start Your Journey Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="text-[#F5A623] mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-[#005577] mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default AboutSection

