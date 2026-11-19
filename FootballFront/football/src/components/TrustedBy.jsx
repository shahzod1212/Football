import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getLeagueTable } from "../axios/apis";
import { useDispatch, useSelector } from "react-redux";
import { setTop5 } from "../redux/clubSlice";

const companies = [
  "NORTHWIND",
  "VERTEX",
  "ORBITAL",
  "GRIDLOCK",
  "HALCYON",
  "FERRO",
];
const countries = ["Spain", "England", "Germany", "France", "Italy"];

const TrustedBy = () => {
  const [selectedCountry, setSelectedCountry] = useState("Spain");
  const dispatch = useDispatch();
  const top5Redux = useSelector((state) => state.club.top5);
  async function fetchTop5() {
    try {
      const response = await getLeagueTable(selectedCountry);

      if (response.status === 200) {
        dispatch(setTop5(response.data.content));
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }
  useEffect(() => {
    if (top5Redux.length === 0) {
      fetchTop5();
    }
  }, []);

  useEffect(() => {
    fetchTop5();
  }, [selectedCountry]);
  return (
    <section className="border-y border-[#1E2826] bg-[#0A0F0D] px-6 py-12 sm:px-10 lg:px-16">
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3 border-b border-[#1E2826] pb-8">
        {countries.map((country) => (
          <button
            onClick={() => setSelectedCountry(country)}
            className={`${
              selectedCountry === country
                ? "border-emerald-500 bg-emerald-600/20 text-emerald-300 shadow-lg shadow-emerald-500/10"
                : "border-[#243330] bg-[#111816]/80 backdrop-blur-sm text-[#94A3A0]"
            } rounded-full border px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:text-white`}
          >
            {country}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-6xl rounded-3xl border border-[#1E2826] bg-gradient-to-b from-[#111816] to-[#0A0F0D] px-8 py-10">
        <p className="mb-8 text-center font-mono text-xs tracking-[0.3em] text-[#5F6D69]">
          TOP 5 Of EVERY LEAGUE
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {top5Redux.slice(0, 5).map((name) => (
            <span
              key={name.id}
              className=" font-mono text-sm font-semibold tracking-widest text-[#6F7D79] transition-all duration-300 hover:scale-110 hover:text-[#ECF3EF]"
            >
              {name.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
