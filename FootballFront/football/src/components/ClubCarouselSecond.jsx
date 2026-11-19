import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchClubs } from "../axios/apis";
import { useNavigate } from "react-router-dom";

const ClubCarouselSecond = ({ onClub }) => {
  const clubRedux = useSelector((state) => state.club.clubs);
  const [selectedCountry, setSelectedCountry] = useState("Spain");
  const [clubDisplay, setClubDisplay] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.trim() === "") {
      setClubDisplay(
        clubRedux.filter((item) => item.country === selectedCountry),
      );
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await searchClubs(search);
        if (response.status === 200) setClubDisplay(response.data.content);
      } catch (err) {
        alert(err?.message);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, selectedCountry, clubRedux]);

  useEffect(() => {
    if (search.trim() === "") {
      setClubDisplay(
        clubRedux.filter((item) => item.country === selectedCountry),
      );
    }
  }, [selectedCountry]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold tracking-tight text-[#ECF3EF] sm:text-2xl">
          Featured clubs
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {["Spain", "France", "England", "Germany", "Italy"].map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide transition-colors ${
                selectedCountry === country
                  ? "border-[#34D399] bg-[#34D399]/10 text-[#34D399]"
                  : "border-[#1E2826] text-[#94A3A0] hover:border-[#34D399]/40 hover:text-[#34D399]"
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        <span className="font-mono text-xs tracking-wide text-[#5F6D69]">
          SCROLL →
        </span>
      </div>

      <div className="mt-5">
        <div className="relative mb-4">
          <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3A0] text-base pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search club"
            className="w-full rounded-xl border border-[#1E2826] bg-[#0E1412] py-2.5 pl-9 pr-4 text-sm text-[#ECF3EF] placeholder-[#94A3A0] outline-none transition-colors focus:border-[#34D399]/40"
          />
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {clubDisplay.length === 0 ? (
            <p className="text-sm text-[#94A3A0]">No clubs found.</p>
          ) : (
            clubDisplay.map((club) => (
              <div
                onClick={() => {
                  onClub(club);
                }}
                key={club.id}
                className="flex shrink-0 snap-start flex-col items-center gap-3 rounded-2xl border border-[#1E2826] bg-[#0E1412] px-6 py-6 transition-colors hover:border-[#34D399]/40"
                style={{ minWidth: "150px" }}
              >
                {club.logoUrl ? (
                  <img
                    src={club.logoUrl}
                    alt={club.name}
                    className="h-14 w-14 rounded-full bg-[#1C2421] object-contain p-1"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1C2421]">
                    <span className="font-mono text-sm font-semibold text-[#34D399]">
                      {club.shortName}
                    </span>
                  </div>
                )}
                <p className="text-center text-sm font-semibold text-[#ECF3EF]">
                  {club.name}
                </p>
                <span className="rounded-full bg-[#121917] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[#94A3A0]">
                  {club.country}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubCarouselSecond;
