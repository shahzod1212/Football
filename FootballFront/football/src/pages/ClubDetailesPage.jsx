import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { getMatchesByClub } from "../axios/apis";
import { useSelector } from "react-redux";

const StatCard = ({ label, value, sub }) => (
  <div className="bg-[#0E1412] border border-[#1E2826] rounded-xl px-5 py-4 flex flex-col gap-1">
    <span className="text-[#5F6D69] text-[10px] font-mono uppercase tracking-widest">
      {label}
    </span>

    <span className="text-[#ECF3EF] text-[26px] font-extrabold leading-none">
      {value}
    </span>

    {sub && <span className="text-[#94A3A0] text-[11px]">{sub}</span>}
  </div>
);

const ClubDetailesPage = () => {
  const clubRedux = useSelector((state) => state.club.clubs);
  const playersRedux = useSelector((state) => state.player.players);
  const [activeTab, setActiveTab] = useState("squad");
  const [lastMatches, setLastMatches] = useState([]);
  const [playersDisplay, setPlayersDisplay] = useState([]);
  const [club, setClub] = useState(null);
  const { id } = useParams();
  console.log(id);

  async function fetchMatchesByClub() {
    try {
      const response = await getMatchesByClub(id);

      if (response.status === 200) {
        setLastMatches(response.data);
      }
    } catch (err) {
      alert(err?.message);
    }
  }
  useEffect(() => {
    if (clubRedux.length !== 0) {
      const foundClub = clubRedux.find((item) => item.id === Number(id));
      setPlayersDisplay(
        playersRedux.filter((player) => player.clubId === Number(id)),
      );

      setClub(foundClub);
    }
  }, [clubRedux, id]);

  useEffect(() => {
    fetchMatchesByClub();
  }, [id]);

  if (!club) return null;

  return (
    <div className="min-h-screen bg-[#0A0F0D] text-[#ECF3EF] font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#0E1412] via-[#0A1F14] to-[#0A0F0D] border-b border-[#1E2826] px-6 pt-12 pb-9">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-7 flex-wrap">
            {/* Logo */}
            <div className="w-24 h-24 rounded-full bg-[#1C2421] border-2 border-[#1E2826] flex items-center justify-center shrink-0">
              <img
                src={club.logoUrl}
                alt=""
                className="w-20 h-20 rounded-full object-contain"
              />
            </div>

            {/* Club Info */}
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/20 px-3 py-1 rounded-full">
                  {club.country}
                </span>
              </div>

              <h1 className="text-4xl font-black text-[#ECF3EF] leading-tight tracking-tight">
                {club.name}
              </h1>

              <div className="flex gap-5 mt-2.5 flex-wrap">
                {[
                  { label: "Founded", value: club.foundedYear },
                  { label: "Stadium", value: club.stadium },
                  { label: "City", value: club?.city },
                  { label: "Coach", value: club?.coach },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <span className="text-[#5F6D69] text-[10px] font-mono uppercase">
                      {label}{" "}
                    </span>
                    <span className="text-[#94A3A0] text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Last 5 */}
            <div className="flex flex-col items-end gap-2">
              <span className="text-[#5F6D69] text-[10px] font-mono uppercase tracking-widest">
                Last 5
              </span>

              <div className="flex gap-1.5">
                {club.matchesResults?.map((result, i) => (
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
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-6 py-8 pb-20">
        {/* Stats */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3 mb-9">
          <StatCard label="Points" value={club.leagueScore} />
          <StatCard label="Win Rate" value={`${club.winRate}%`} />
          <StatCard label="Goals For" value={club.goalScored} />
          <StatCard label="Goals Against" value={club.goalAgainst} />
          <StatCard label="Clean Sheets" value={club.cleanSheets} />
          <StatCard label="Matches" value={club.matchesResults?.length} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[#1E2826]">
          {["squad", "matches", "stats"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-[#34D399] text-[#34D399]"
                  : "border-transparent text-[#5F6D69]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Squad */}
        {activeTab === "squad" && (
          <div className="flex flex-col gap-2">
            {playersDisplay.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-4 bg-[#0E1412] border border-[#1E2826] rounded-xl px-4 py-3 hover:border-[#34D399]/30 transition-colors cursor-pointer"
              >
                <span className="text-[#1E2826] font-mono text-sm font-bold w-7 text-right">
                  #{player.number}
                </span>
                <img
                  src={player.photo}
                  alt=""
                  className="w-20 h-20 rounded-full object-contain"
                />

                <div className="flex-1">
                  <p className="m-0 text-sm font-bold text-[#FB923C] text-xl">
                    {player.name}
                  </p>
                </div>

                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30 uppercase">
                  {player.position}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Matches */}
        {activeTab === "matches" && (
          <div className="flex flex-col gap-3">
            {lastMatches.map((match, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#0E1412] border border-[#1E2826] rounded-xl px-5 py-4"
              >
                <div className="flex-1 flex items-center gap-5 p-3 rounded-xl transition-all duration-200 hover:bg-white/5 hover:shadow-md cursor-pointer group">
                  <span
                    className={`w-10 h-10 flex items-center justify-center rounded-full border text-xs font-extrabold font-mono transition-transform duration-200 group-hover:scale-110
      ${
        match.homeScore > match.awayScore
          ? "bg-green-400/10 text-green-400 border-green-400/30"
          : match.homeScore < match.awayScore
            ? "bg-red-400/10 text-red-400 border-red-400/30"
            : "bg-gray-400/10 text-gray-400 border-gray-400/30"
      }`}
                  >
                    {match.homeScore > match.awayScore
                      ? "W"
                      : match.homeScore < match.awayScore
                        ? "L"
                        : "D"}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white group-hover:text-green-300 transition-colors duration-200">
                      {match.homeClubName}
                    </span>
                    <span className="text-[10px] font-black tracking-widest text-gray-500 px-2 py-0.5 rounded border border-dashed border-gray-600">
                      vs
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-green-300 transition-colors duration-200">
                      {match.awayClubName}
                    </span>
                  </div>
                </div>
                <div className="text-xl font-black font-mono text-[#34D399]">
                  {match.homeScore} - {match.awayScore}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats tab */}
        {activeTab === "stats" && (
          <div className="flex flex-col gap-4">
            {[
              {
                label: "Goals Scored",
                value: club.goalScored,
                color: "bg-green-400",
                text: "text-green-400",
                track: "bg-green-400/10",
              },
              {
                label: "Goals Against",
                value: club.goalAgainst,
                color: "bg-red-400",
                text: "text-red-400",
                track: "bg-red-400/10",
              },
              {
                label: "League Score",
                value: club.leagueScore,
                color: "bg-blue-400",
                text: "text-blue-400",
                track: "bg-blue-400/10",
              },
              {
                label: "Win Rate",
                value: club.winRate,
                color: "bg-yellow-400",
                text: "text-yellow-400",
                track: "bg-yellow-400/10",
              },
              {
                label: "Clean Sheets",
                value: club.cleanSheets,
                color: "bg-purple-400",
                text: "text-purple-400",
                track: "bg-purple-400/10",
              },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-[#94A3A0]">{stat.label}</span>
                  <span className={`text-sm font-bold font-mono ${stat.text}`}>
                    {stat.value}
                  </span>
                </div>
                <div
                  className={`h-1.5 ${stat.track} rounded-full overflow-hidden`}
                >
                  <div
                    className={`h-full ${stat.color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(stat.value, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ClubDetailesPage;
