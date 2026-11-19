// src/components/ClubsTable.jsx
import React, { useEffect, useState } from "react";
import { getLeagueTable } from "../axios/apis";
import { useDispatch, useSelector } from "react-redux";
import { addTop20 } from "../redux/clubSlice";
import { useNavigate } from "react-router-dom";

const mockClubs = [
  {
    id: 1,
    name: "Real Madrid",
    shortName: "RMA",
    country: "Spain",
    city: "Madrid",
  },
  {
    id: 2,
    name: "Manchester United",
    shortName: "MUN",
    country: "England",
    city: "Manchester",
  },
  {
    id: 3,
    name: "Bayern Munich",
    shortName: "BAY",
    country: "Germany",
    city: "Munich",
  },
  {
    id: 4,
    name: "Paris Saint-Germain",
    shortName: "PSG",
    country: "France",
    city: "Paris",
  },
  {
    id: 5,
    name: "Juventus",
    shortName: "JUV",
    country: "Italy",
    city: "Turin",
  },
];

const ClubsTable = () => {
  const top20Redux = useSelector((state) => state.club.top20);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("Spain");
  async function fetchLeagueTable() {
    try {
      const response = await getLeagueTable(selectedCountry);
      if (response.status === 200) {
        dispatch(addTop20(response.data.content));
      }
    } catch (err) {
      alert(err?.message);
    }
  }

  useEffect(() => {
    if (top20Redux.length === 0) {
      fetchLeagueTable();
    }
  }, []);

  useEffect(() => {
    fetchLeagueTable();
  }, [top20Redux, selectedCountry]);
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-[#1E2826] bg-[#0E1412]">
      {/* Country filter row */}
      <div className="flex flex-wrap gap-2 border-b border-[#1E2826] px-6 py-4">
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

      {/* Table header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h3 className="text-sm font-semibold text-[#ECF3EF]">All clubs</h3>
        <span className="font-mono text-xs text-[#5F6D69]">
          {top20Redux.length} results
        </span>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-y border-[#1E2826] font-mono text-[11px] uppercase tracking-wide text-[#5F6D69]">
            <th className="px-6 py-3 w-12">#</th>
            <th className="px-6 py-3">Club</th>
            <th className="px-6 py-3">Short</th>
            <th className="px-6 py-3">Country</th>
            <th className="px-6 py-3">City</th>
            <th className="px-6 py-3 text-right">League score</th>
          </tr>
        </thead>
        <tbody>
          {top20Redux.map((club, index) => (
            <tr
              onClick={() => navigate(`/club-details/${club.id}`)}
              key={club.id}
              className="border-b border-[#1E2826] text-sm transition-colors last:border-b-0 hover:bg-[#121917]"
            >
              <td className="px-6 py-4 font-mono text-xs text-[#5F6D69]">
                {String(index + 1).padStart(2, "0")}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={club.logoUrl}
                    alt=""
                    className="h-8 w-8 object rounded-full"
                  />

                  <span className="text-[#ECF3EF]">{club.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-xs uppercase text-[#94A3A0]">
                {club.shortName}
              </td>
              <td className="px-6 py-4 text-[#94A3A0]">{club.country}</td>
              <td className="px-6 py-4 text-[#94A3A0]">{club.city}</td>
              <td className="px-6 py-4 text-right font-mono text-sm font-semibold text-[#34D399]">
                {club.leagueScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubsTable;
