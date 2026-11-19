import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const examplePlayer = {
  name: "Marcus Bellini",
  number: 10,
  position: "Midfielder",
  nationality: "Italy",
  age: 26,
  height: "1.82m",
  weight: "78kg",
  foot: "Right",
  club: "FC Example United",
  photo: "https://via.placeholder.com/120",
  goals: 14,
  assists: 9,
  matches: 32,
  rating: 8.1,
  yellowCards: 3,
  redCards: 0,
  minutesPlayed: 2760,
  passAccuracy: 87,
  shotsOnTarget: 41,
  form: ["W", "W", "D", "L", "W"],
};

const exampleMatches = [
  {
    home: "FC Example United",
    away: "Rival City FC",
    homeScore: 3,
    awayScore: 1,
    goals: 1,
    assists: 0,
  },
  {
    home: "Northtown SC",
    away: "FC Example United",
    homeScore: 0,
    awayScore: 2,
    goals: 1,
    assists: 1,
  },
  {
    home: "FC Example United",
    away: "Blue Eagles",
    homeScore: 2,
    awayScore: 2,
    goals: 0,
    assists: 1,
  },
  {
    home: "Port FC",
    away: "FC Example United",
    homeScore: 1,
    awayScore: 3,
    goals: 2,
    assists: 0,
  },
  {
    home: "FC Example United",
    away: "Valley United",
    homeScore: 1,
    awayScore: 0,
    goals: 0,
    assists: 1,
  },
];

const ResultBadge = ({ homeScore, awayScore }) => {
  const isWin = homeScore > awayScore;
  const isLoss = homeScore < awayScore;
  return (
    <span
      className={`w-10 h-10 flex items-center justify-center rounded-full border text-xs font-extrabold font-mono transition-transform duration-200 group-hover:scale-110
        ${
          isWin
            ? "bg-green-400/10 text-green-400 border-green-400/30"
            : isLoss
              ? "bg-red-400/10 text-red-400 border-red-400/30"
              : "bg-gray-400/10 text-gray-400 border-gray-400/30"
        }`}
    >
      {isWin ? "W" : isLoss ? "L" : "D"}
    </span>
  );
};

const PlayerDetailPage = () => {
  const [activeTab, setActiveTab] = useState("bio");
  const player = examplePlayer;

  return (
    <div className="min-h-screen bg-[#0A0F0D] text-[#ECF3EF] font-sans overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#0E1412] via-[#0A1F14] to-[#0A0F0D] border-b border-[#1E2826] px-6 pt-12 pb-9">
        <div className="max-w-[1100px] mx-auto">
          {/* Two-column hero: left = photo + name, right = form + quick numbers */}
          <div className="flex items-stretch gap-8 flex-wrap">
            {/* Left */}
            <div className="flex items-center gap-6 flex-1 min-w-[260px]">
              <div className="relative shrink-0">
                <div className="w-28 h-28 rounded-2xl bg-[#1C2421] border-2 border-[#1E2826] flex items-center justify-center">
                  <img
                    src={player.photo}
                    alt=""
                    className="w-24 h-24 rounded-2xl object-contain"
                  />
                </div>
                {/* shirt number badge */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#34D399] flex items-center justify-center">
                  <span className="text-[#0A0F0D] text-[11px] font-black font-mono">
                    {player.number}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/20 px-3 py-1 rounded-full">
                    {player.nationality}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FB923C] bg-[#FB923C]/10 border border-[#FB923C]/20 px-3 py-1 rounded-full">
                    {player.position}
                  </span>
                </div>
                <h1 className="text-4xl font-black text-[#ECF3EF] leading-tight tracking-tight">
                  {player.name}
                </h1>
                <p className="text-[#5F6D69] text-xs font-mono mt-1">
                  {player.club}
                </p>
              </div>
            </div>

            {/* Right: form + trio of hero numbers */}
            <div className="flex flex-col gap-4 items-end justify-center">
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-[#5F6D69] text-[10px] font-mono uppercase tracking-widest">
                  Last 5
                </span>
                <div className="flex gap-1.5">
                  {player.form.map((result, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold font-mono border
                        ${
                          result === "W"
                            ? "bg-green-400/10 text-green-400 border-green-400/30"
                            : result === "D"
                              ? "bg-gray-400/10 text-gray-400 border-gray-400/30"
                              : "bg-red-400/10 text-red-400 border-red-400/30"
                        }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero trio */}
              <div className="flex gap-3">
                {[
                  {
                    label: "Goals",
                    value: player.goals,
                    color: "text-[#34D399]",
                  },
                  {
                    label: "Assists",
                    value: player.assists,
                    color: "text-[#FB923C]",
                  },
                  {
                    label: "Rating",
                    value: player.rating,
                    color: "text-purple-400",
                  },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="bg-[#0E1412] border border-[#1E2826] rounded-xl px-4 py-3 text-center min-w-[64px]"
                  >
                    <p
                      className={`text-[22px] font-black font-mono leading-none ${color}`}
                    >
                      {value}
                    </p>
                    <p className="text-[#5F6D69] text-[10px] font-mono uppercase tracking-widest mt-1">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1100px] mx-auto px-6 py-8 pb-20">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-[#1E2826]">
          {["bio", "matches", "stats"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-[#34D399] text-[#34D399]"
                  : "border-transparent text-[#5F6D69] hover:text-[#94A3A0]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── BIO tab: two-column layout ── */}
        {activeTab === "bio" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal info card */}
            <div className="bg-[#0E1412] border border-[#1E2826] rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[#1E2826]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5F6D69]">
                  Personal
                </span>
              </div>
              <div className="divide-y divide-[#1E2826]">
                {[
                  { label: "Full Name", value: player.name },
                  { label: "Age", value: player.age },
                  { label: "Nationality", value: player.nationality },
                  { label: "Height", value: player.height },
                  { label: "Weight", value: player.weight },
                  { label: "Preferred Foot", value: player.foot },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <span className="text-[#5F6D69] text-xs font-mono uppercase tracking-widest">
                      {label}
                    </span>
                    <span className="text-[#ECF3EF] text-sm font-bold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career info card */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#0E1412] border border-[#1E2826] rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-[#1E2826]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5F6D69]">
                    Career
                  </span>
                </div>
                <div className="divide-y divide-[#1E2826]">
                  {[
                    { label: "Club", value: player.club },
                    { label: "Position", value: player.position },
                    { label: "Shirt No.", value: `#${player.number}` },
                    {
                      label: "Minutes Played",
                      value: `${player.minutesPlayed}'`,
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between px-5 py-3"
                    >
                      <span className="text-[#5F6D69] text-xs font-mono uppercase tracking-widest">
                        {label}
                      </span>
                      <span className="text-[#ECF3EF] text-sm font-bold">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discipline row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0E1412] border border-[#1E2826] rounded-xl px-5 py-4 flex flex-col gap-1">
                  <span className="text-[#5F6D69] text-[10px] font-mono uppercase tracking-widest">
                    Yellow Cards
                  </span>
                  <span className="text-yellow-400 text-[26px] font-extrabold leading-none">
                    {player.yellowCards}
                  </span>
                </div>
                <div className="bg-[#0E1412] border border-[#1E2826] rounded-xl px-5 py-4 flex flex-col gap-1">
                  <span className="text-[#5F6D69] text-[10px] font-mono uppercase tracking-widest">
                    Red Cards
                  </span>
                  <span className="text-red-400 text-[26px] font-extrabold leading-none">
                    {player.redCards}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MATCHES tab ── */}
        {activeTab === "matches" && (
          <div className="flex flex-col gap-3">
            {exampleMatches.map((match, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#0E1412] border border-[#1E2826] rounded-xl px-5 py-4 hover:border-[#34D399]/30 transition-colors cursor-pointer group"
              >
                <ResultBadge
                  homeScore={match.homeScore}
                  awayScore={match.awayScore}
                />

                <div className="flex-1 flex items-center gap-3 min-w-0">
                  <span className="text-sm font-bold text-white group-hover:text-green-300 transition-colors truncate">
                    {match.home}
                  </span>
                  <span className="text-[10px] font-black tracking-widest text-gray-500 px-2 py-0.5 rounded border border-dashed border-gray-600 shrink-0">
                    vs
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-green-300 transition-colors truncate">
                    {match.away}
                  </span>
                </div>

                {/* Score */}
                <div className="text-xl font-black font-mono text-[#34D399] shrink-0">
                  {match.homeScore} – {match.awayScore}
                </div>

                {/* Player contribution */}
                <div className="flex gap-2 shrink-0">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
                    ⚽ {match.goals}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20">
                    🅰 {match.assists}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── STATS tab: big number cards + bar chart rows ── */}
        {activeTab === "stats" && (
          <div className="flex flex-col gap-8">
            {/* Big stat cards */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
              {[
                {
                  label: "Goals",
                  value: player.goals,
                  color: "text-[#34D399]",
                },
                {
                  label: "Assists",
                  value: player.assists,
                  color: "text-blue-400",
                },
                {
                  label: "Matches",
                  value: player.matches,
                  color: "text-[#ECF3EF]",
                },
                {
                  label: "Rating",
                  value: player.rating,
                  color: "text-purple-400",
                },
                {
                  label: "Shots on Target",
                  value: player.shotsOnTarget,
                  color: "text-[#FB923C]",
                },
                {
                  label: "Pass Acc.",
                  value: `${player.passAccuracy}%`,
                  color: "text-yellow-400",
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="bg-[#0E1412] border border-[#1E2826] rounded-xl px-5 py-4 flex flex-col gap-1"
                >
                  <span className="text-[#5F6D69] text-[10px] font-mono uppercase tracking-widest">
                    {label}
                  </span>
                  <span
                    className={`text-[26px] font-extrabold leading-none ${color}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Performance bars */}
            <div className="bg-[#0E1412] border border-[#1E2826] rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[#1E2826]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5F6D69]">
                  Performance Breakdown
                </span>
              </div>
              <div className="px-5 py-4 flex flex-col gap-5">
                {[
                  {
                    label: "Goals",
                    value: player.goals,
                    max: 30,
                    color: "bg-[#34D399]",
                    track: "bg-[#34D399]/10",
                    text: "text-[#34D399]",
                  },
                  {
                    label: "Assists",
                    value: player.assists,
                    max: 20,
                    color: "bg-blue-400",
                    track: "bg-blue-400/10",
                    text: "text-blue-400",
                  },
                  {
                    label: "Shots on Target",
                    value: player.shotsOnTarget,
                    max: 80,
                    color: "bg-orange-400",
                    track: "bg-orange-400/10",
                    text: "text-orange-400",
                  },
                  {
                    label: "Pass Accuracy",
                    value: player.passAccuracy,
                    max: 100,
                    color: "bg-yellow-400",
                    track: "bg-yellow-400/10",
                    text: "text-yellow-400",
                    suffix: "%",
                  },
                  {
                    label: "Matches Played",
                    value: player.matches,
                    max: 38,
                    color: "bg-purple-400",
                    track: "bg-purple-400/10",
                    text: "text-purple-400",
                  },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-[#94A3A0]">
                        {stat.label}
                      </span>
                      <span
                        className={`text-sm font-bold font-mono ${stat.text}`}
                      >
                        {stat.value}
                        {stat.suffix ?? ""}
                      </span>
                    </div>
                    <div
                      className={`h-1.5 ${stat.track} rounded-full overflow-hidden`}
                    >
                      <div
                        className={`h-full ${stat.color} rounded-full transition-all duration-500`}
                        style={{
                          width: `${Math.min((stat.value / stat.max) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PlayerDetailPage;
