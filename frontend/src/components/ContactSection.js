import React from 'react';
import { Twitter, Facebook, Linkedin, Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
  };

  return (
    <footer className="bg-[#005577] text-white py-16" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">PATHWAYSS</h2>
            <p className="text-gray-300">
              Empowering students through guidance and opportunities. Building careers, shaping futures.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} label="Twitter" />
              <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} label="Facebook" />
              <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
              <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} label="Instagram" />
            </div>
          </div>

          {/* Get in Touch */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">GET IN TOUCH</h3>
            <p className="text-gray-300">
              Have questions? Reach out to us. We're here to help you navigate your career path.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#F5A623]" />
                <span>Bhubaneswar, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F5A623]" />
                <span>+91 7325809151<br />
                      +91 8249343769
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F5A623]" />
                <span>team@pathwayss.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">QUICK LINKS</h3>
            <nav className="space-y-3">
              <QuickLink href="#home" text="Home" />
              <QuickLink href="#about" text="About Us" />
              <QuickLink href="#services" text="Our Services" />
              <QuickLink href="#prices" text="Pricing Plan" />
              {/*<QuickLink href="#" text="Meet The Team" />*/}
              <QuickLink href="#contact" text="Contact Us" />
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">NEWSLETTER</h3>
            <p className="text-gray-300">
              Subscribe to our newsletter for the latest updates and opportunities.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 px-4 py-2 rounded-l bg-white/10 border border-white/20 focus:outline-none focus:border-[#F5A623] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#F5A623] text-white rounded-r hover:bg-[#d48c1f] transition-colors"
                >
                  SIGN UP
                </button>
              </div>
              <p className="text-sm text-gray-400 italic">
                We respect your privacy and never share your details.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Pathways. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F5A623] flex items-center justify-center transition-colors duration-300"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

function QuickLink({ href, text }) {
  return (
    <a 
      href={href}
      className="flex items-center gap-2 text-gray-300 hover:text-[#F5A623] transition-colors group"
    >
      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      {text}
    </a>
  );
}

export default ContactSection;