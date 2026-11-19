import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import LiveStatus from "../components/Livestatus";
import Testimonial from "../components/Testimonial";
import CTA from "../components/Cta";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0F0D] font-sans text-[#ECF3EF]">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <LiveStatus />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
