// src/pages/ClubPage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClubsCarousel from "../components/ClubsCarousel";
import ClubsTable from "../components/ClubsTable";
import RecentMatches from "../components/RecentMatches";

const ClubPage = () => {
  function handleClub() {}
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0F0D] font-sans text-[#ECF3EF]">
      <Navbar />

      <section className="px-6 pt-16 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Left: clubs carousel + table */}
          <div className="min-w-0">
            <ClubsCarousel onClub={handleClub} />
            <ClubsTable />
          </div>

          {/* Right: last 5 matches */}
          <div>
            <RecentMatches />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClubPage;
