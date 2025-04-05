import React from 'react';
import { Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import Prince from '../assets/Prince.jpg';
import Anudeep from '../assets/Anudeep.png';

function TeamSection() {
  const team = [
    {
      name: "Anudeep Bayard",
      role: "Founder",
      image: Anudeep,
      quote: "Passionate about empowering students to achieve their dreams",
      social: {
        twitter: "https://twitter.com/xyz",
        facebook: "https://facebook.com/xyz",
        linkedin: "https://linkedin.com/in/xyz",
        email: "xyz@example.com"
      }
    },
    {
      name: "Prince Kumar Singh",
      role: "Co-Founder",
      image: Prince,
      quote: "Dedicated to creating opportunities for the next generation",
      social: {
        twitter: "https://twitter.com/pqr",
        facebook: "https://facebook.com/pqr",
        linkedin: "https://linkedin.com/in/pqr",
        email: "pqr@example.com"
      }
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50" id="team">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            MEET OUR TEAM
          </h2>
          <div className="w-24 h-1 bg-[#005577] mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Meet the passionate individuals behind our mission to transform education and career guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamMemberCard({ member }) {
  return (
    <div className="group">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl overflow-hidden">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/5]">
          <img
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay with Social Icons */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#005577]/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex gap-4 justify-center mb-4">
                <SocialIcon href={member.social.twitter} icon={<Twitter />} label="Twitter" />
                <SocialIcon href={member.social.facebook} icon={<Facebook />} label="Facebook" />
                <SocialIcon href={member.social.linkedin} icon={<Linkedin />} label="LinkedIn" />
                <SocialIcon href={`mailto:${member.social.email}`} icon={<Mail />} label="Email" />
              </div>
              <p className="text-white text-center italic">{member.quote}</p>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="p-6 text-center bg-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
          <div className="inline-block">
            <span className="text-[#005577] font-medium px-4 py-1 rounded-full bg-[#005577]/10">
              {member.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ href, icon, label }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#F5A623] flex items-center justify-center backdrop-blur-sm transition-colors duration-300"
      aria-label={label}
    >
      <div className="text-white w-5 h-5">
        {icon}
      </div>
    </a>
  );
}

export default TeamSection;