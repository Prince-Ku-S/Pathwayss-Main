import { ArrowRight, Users, Briefcase, Target } from "lucide-react"


function AboutSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50" id="about">
      <div className="container mx-auto px-4">
        {/* Mobile BEGIN YOUR JOURNEY banner - only visible on small screens */}
        <div className="bg-[#005577] text-white p-3 rounded-lg shadow-lg mb-8 text-center md:hidden">
          <span className="text-xl font-bold tracking-wider">BEGIN YOUR JOURNEY</span>
        </div>

        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
          {/* Vertical "BEGIN YOUR JOURNEY" text - only visible on large screens */}
          <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 hidden xl:block">
            <div
              className="bg-[#005577] text-white p-4 rounded-l-lg shadow-lg"
              style={{ writingMode: "vertical-lr", transform: "rotate(-180deg)" }}
            >
              <span className="text-2xl font-bold tracking-wider">BEGIN YOUR JOURNEY</span>
            </div>
          </div>

          {/* Left column with images and overlay */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full lg:w-1/2">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="/images/about-section1.jpg"
                alt="Team collaboration"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#005577] to-transparent opacity-90"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
                Pathwayss: Unleashing Potential, Inspiring Success
              </h2>
              <p className="text-base md:text-lg">
                Connect with recent graduates and seasoned professionals from top-tier companies.
              </p>
            </div>
          </div>

          {/* Right column with text content */}
          <div className="space-y-6 md:space-y-8 w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#005577]">
              BRIDGING ACADEMIA AND INDUSTRY FOR CAREER SUCCESS
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              At Pathwayss, we are dedicated to guiding ambitious college students towards their dream careers. Our
              mentors provide unparalleled insights into the latest industry trends and required skills, helping you
              transform academic knowledge into practical, marketable skills that will set you apart in the job market.
            </p>

            {/* Feature cards - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <FeatureCard
                icon={<Users className="w-8 h-8 md:w-10 md:h-10" />}
                title="Expert Mentorship"
                description="Connect with professionals from top companies"
              />
              <FeatureCard
                icon={<Briefcase className="w-8 h-8 md:w-10 md:h-10" />}
                title="Internship Guidance"
                description="Get insider tips on securing coveted positions"
              />
              <FeatureCard
                icon={<Target className="w-8 h-8 md:w-10 md:h-10" />}
                title="Skill Development"
                description="Learn the most in-demand industry skills"
              />
            </div>

            <div className="pt-4 md:pt-6">
              {/*<a
                href="#contact"
                className="inline-flex items-center text-[#005577] font-semibold hover:text-[#F5A623] transition-colors duration-300"
              >
                Start Your Journey Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#F5A623]">
      <div className="text-[#005577] mb-3 md:mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-[#005577] mb-2">{title}</h3>
      <p className="text-gray-600 text-sm md:text-base">{description}</p>
    </div>
  )
}

export default AboutSection
