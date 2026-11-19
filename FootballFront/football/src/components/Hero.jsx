import { getAdapter } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setClubs, setNumber } from "../redux/clubSlice";
import { addClub } from "../indexedDb/indexeddb";
import { countClubs, getAllClubs } from "../axios/apis";
import { useNavigate } from "react-router-dom";

const countries = ["Spain", "England", "Germany", "France", "Italy"];

const Hero = () => {
  const [selectedCountry, setSelectedCountry] = useState("Spain");
  const clubRedux = useSelector((state) => state.club.clubs);
  const numberRedux = useSelector((state) => state.club.number);
  const [clubDisplay, setCLubDisplay] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchClubs() {
    try {
      const response = await getAllClubs();

      if (response.status === 200) {
        dispatch(setClubs(response.data.content));
        response.data.content.map((club) => {
          addClub(club);
        });
        toast.success("fetch");
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }
  async function fetchCount() {
    try {
      const response = await countClubs();

      if (response.status === 200) {
        dispatch(setNumber(response.data));
        console.log(response.data);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }

  useEffect(() => {
    if (clubRedux.length === 0) {
      fetchClubs();
      fetchCount();
    }
  }, []);

  useEffect(() => {
    setCLubDisplay(
      clubRedux.filter((item) => item.country === selectedCountry),
    );
  }, [selectedCountry, clubRedux]);
  return (
    <section className="relative bg-[#0A0F0D] px-6 pt-20 pb-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E2826] bg-[#121917] px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34D399]"></span>
            </span>
            <span className="font-mono text-xs tracking-wide text-[#94A3A0]">
              LIVE MATCH COVERAGE
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#ECF3EF] sm:text-5xl lg:text-6xl">
            Follow match.
            <br />
            Never miss a{" "}
            <span className="relative text-[#FB923C]">
              goal.
              <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-[#FB923C]/30"></span>
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[#94A3A0] sm:text-lg">
            Get live scores, match statistics, player performances, fixtures,
            standings, and breaking football news from leagues around the world.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="rounded-lg bg-[#FB923C] px-6 py-3 text-sm font-semibold text-[#0A0F0D] transition-all hover:bg-[#fda968] hover:shadow-lg hover:shadow-[#FB923C]/20">
              Explore Matches
            </button>
            <button className="rounded-lg border border-[#243330] px-6 py-3 text-sm font-semibold text-[#ECF3EF] transition-colors hover:border-[#34D399]/50 hover:text-[#34D399]">
              View Players
            </button>
          </div>

          <div className="mt-12 grid max-w-sm grid-cols-3 gap-6 border-t border-[#1E2826] pt-6">
            {[
              [numberRedux, "stored are presented"],
              ["5+", "football leagues"],
              ["24/7", "live updates"],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-mono text-xl font-semibold text-[#ECF3EF]">
                  {stat}
                </p>
                <p className="text-xs text-[#5F6D69]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: live panel */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[#34D399]/10 via-transparent to-[#FB923C]/10 blur-2xl"></div>
          <div className="relative rounded-2xl border border-[#1E2826] bg-[#0E1412] p-5 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-[#1E2826] pb-4">
              {countries.map((country) => (
                <button
                  onClick={() => setSelectedCountry(country)}
                  className={`${selectedCountry === country ? "bg-emerald-700 border-emerald-700" : "bg-[#0E1412]"} px-4 py-2 rounded borde text-stone-50 font-mono text-xs font-semibold uppercase tracking-wide hover:scale-102`}
                >
                  {country}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between border-b border-[#1E2826] pb-4 pt-2">
              <span className="font-mono text-xs text-[#5F6D69]">
                Top 4 clubs
              </span>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#FB923C]"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#243330]"></span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {clubDisplay.slice(0, 4).map((club) => (
                <div
                  key={club.id}
                  onClick={() => navigate(`/club-details/${club.id}`)}
                  className="flex items-center justify-between rounded-lg bg-[#121917] px-4 py-3 transition-colors hover:bg-[#161D1A]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={club.logoUrl}
                      alt={club.name}
                      className="h-10 w-10 rounded-full bg-[#1C2421] object-cover p-2"
                    />
                    <span className="font-mono text-sm text-[#ECF3EF]">
                      {club.name}
                    </span>
                  </div>

                  <span className="rounded-full bg-[#1C2421] px-2.5 py-1 font-mono text-xs uppercase tracking-wide text-[#34D399]">
                    {club.shortName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
