import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PricingSection from "./components/PricingSection";
//import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import ProfilePage from "./pages/ProfilePage";
import ServicesPage from "./pages/ServicesPage";
import AuthPage from "./components/AuthPage";
import BrochurePage from "./pages/BrochurePage";
//import MentorSection from "./components/mentorsection";
import ComingSoonPage from "./pages/ComingSoonPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* ✅ Main Landing Page (Single Page Sections) */}
        <Route
          path="/"
          element={
            <div>
              <MainSection />
              <AboutSection />
              <ServicesSection />
              <PricingSection />
              {/*<TeamSection />*/}
              {/*<MentorSection />*/}
              <ContactSection />
            </div>
          }
        />

        {/* ✅ Standalone Pages */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/dashboard" element={<ProfilePage />} />
        <Route path="/auth" element={<AuthPage isLogin={true} />} />
        <Route path="/resources" element={<BrochurePage />}/>
        <Route path="/comingsoon" element={<ComingSoonPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
