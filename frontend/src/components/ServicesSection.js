import React from "react";
import { useNavigate } from "react-router-dom";
import { Presentation, GraduationCap, Compass, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


function ServicesSection() {
  const navigate = useNavigate();

  const services = [
    {
      id: "workshops",
      icon: <Presentation className="w-16 h-16" />,
      title: "WORKSHOPS",
      subtitle: "AND WEBINARS",
      description: "Interactive sessions and online workshops to enhance your professional skills and knowledge base.",
    },
    {
      id: "internships",
      icon: <GraduationCap className="w-16 h-16" />,
      title: "INTERNSHIP",
      subtitle: "AND JOB ASSISTANCE",
      description: "Comprehensive support in finding and securing internships and job opportunities in your field.",
    },
    {
      id: "career-counseling",
      icon: <Compass className="w-16 h-16" />,
      title: "CAREER",
      subtitle: "COUNSELING",
      description: "Professional guidance to help you make informed decisions about your career path and growth.",
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50" id="services">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#005577]">OUR SERVICES</h2>
          <div className="w-24 h-1 bg-[#F5A623] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering your career journey with expert guidance and opportunities.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="p-8">
                <div className="text-[#005577] mb-6">{service.icon}</div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#005577]">{service.title}</h3>
                  <p className="text-[#F5A623] font-semibold">{service.subtitle}</p>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Learn More Button */}
                <Link
                  to="/services"
                  state={{ scrollToId: "workshops" }} // ✅ Scrolls to the right section
                  className="inline-flex items-center text-[#005577] font-semibold hover:text-[#F5A623] transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>

              </div>
              <div className="h-2 bg-[#F5A623]"></div>
            </div>
          ))}
        </div>

        {/* ✅ FIX: Navigates to ServicesPage & Scrolls to Top */}
        <div className="text-center mt-16">
        <Link
          to="/services"
          className="inline-block bg-[#005577] text-white font-bold py-3 px-8 rounded-full hover:bg-[#F5A623] transition-colors duration-300 transform hover:scale-105"
          target="_blank" // ✅ Opens in a new tab
        >
          Get Started Today
        </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
