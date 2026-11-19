// src/pages/Squad.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import ClubsCarousel from "../components/ClubsCarousel";
import {
  getMatchesByAwayClub,
  getMatchesByHomeClub,
  getPlayersByClub,
} from "../axios/apis";
import { addPlayersByClub, clearPlayersByClub } from "../redux/playerSlice"; // ✅ import clearPlayersByClub
import { setMatchesByAway, setMatchesByHome } from "../redux/matchSlice";
import { useNavigate } from "react-router-dom";
import ClubCarouselSecond from "../components/ClubCarouselSecond";

const positionAccent = {
  Forward: "bg-[#FB923C]/10 text-[#FB923C]",
  Defender: "bg-[#34D399]/10 text-[#34D399]",
  Midfielder: "bg-[#60A5FA]/10 text-[#60A5FA]",
  Goalkepper: "bg-[#F87171]/10 text-[#F87171]",
};

const Squad = () => {
  const playersByClubRedux = useSelector((state) => state.player.playersByClub);
  const matchesHomeRedux = useSelector((state) => state.match.matchesByHome);
  const matchesAwayRedux = useSelector((state) => state.match.matchesByAway);
  const clubRedux = useSelector((state) => state.club.clubs);
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  const [selectedClub, setSelectedClub] = useState(clubRedux[0]);
  const dispatch = useDispatch();

  async function fetchPlayers(club) {
    try {
      const response = await getPlayersByClub(club.id);
      if (response.status === 200) {
        dispatch(addPlayersByClub(response.data.content));
        console.log("Fetched players:", response.data.content);
      }
    } catch (err) {
      console.error(err?.message);
      alert(err?.message);
    }
  }
  async function fetchMatchesByHomeClub(club) {
    try {
      const response = await getMatchesByHomeClub(club.id);

      if (response.status === 200) {
        dispatch(setMatchesByHome(response.data.content));
      }
    } catch (err) {
      alert(err?.message);
    }
  }
  async function fetchMatchesByAwayClub(club) {
    try {
      const response = await getMatchesByAwayClub(club.id);

      if (response.status === 200) {
        dispatch(setMatchesByAway(response.data.content));
      }
    } catch (err) {
      alert(err?.message);
    }
  }

  function handleClub(club) {
    dispatch(clearPlayersByClub()); // clear stale players immediately
    setSelectedClub(club);
    // No fetch here — useEffect below handles it when selectedClub updates
  }

  useEffect(() => {
    fetchPlayers(selectedClub);
    fetchMatchesByHomeClub(selectedClub);
    fetchMatchesByAwayClub(selectedClub);
  }, [selectedClub]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0F0D] font-sans text-[#ECF3EF]">
      <Navbar />

      <section className="px-6 pt-16 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          {/* Club selector — horizontal scroll */}
          <ClubCarouselSecond onClub={handleClub} />

          {/* Main: squad + last 5 matches */}
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
            {/* Left: squad grid */}
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#ECF3EF]">
                  {selectedClub.name} — squad
                </h2>
                <span className="font-mono text-xs text-[#5F6D69]">
                  {playersByClubRedux?.length} players
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {playersByClubRedux?.length > 0 ? (
                  playersByClubRedux.map((player) => (
                    <div
                      onClick={() => navigate(`/player/${player.id}`)}
                      key={player.id}
                      className="flex items-center justify-between rounded-xl border border-[#1E2826] bg-[#0E1412] px-4 py-3 transition-colors hover:bg-[#121917]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={player.photo}
                          alt=""
                          className="h-10 w-10 object-contain rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[#ECF3EF]">
                            {player.name}
                          </span>
                          <span
                            className={`mt-1 inline-block w-fit rounded-full px-2 py-0.5  font-mono text-[10px] font-semibold uppercase tracking-wide ${positionAccent[player.position]}`}
                          >
                            {player.position}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // ✅ Loading/empty state so the user knows something is happening
                  <p className="col-span-2 font-mono text-sm text-[#5F6D69]">
                    Loading players...
                  </p>
                )}
              </div>
            </div>

            {/* Right: last 5 matches */}
            <div>
              <div className="rounded-2xl border border-[#1E2826] bg-[#0E1412] p-5">
                <div className="flex items-center justify-between border-b border-[#1E2826] pb-4">
                  <span className="font-mono text-xs tracking-wide text-[#5F6D69]">
                    LAST 5 MATCHES
                  </span>
                  <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#34D399]"></span>
                    <span className="h-2 w-2 rounded-full bg-orange-600"></span>
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-around">
                    <div className="flex gap-1 rounded-xl border border-[#1E2826] bg-[#0E1412] p-1">
                      {["Home", "Away"].map((label) => (
                        <button
                          key={label}
                          onClick={() => setActive(label)}
                          className={`rounded-[10px] px-8 py-2 text-sm font-medium transition-colors ${
                            active === label
                              ? "border border-[#1E2826] bg-[#1C2421] text-[#ECF3EF]"
                              : "text-[#5F6D69] hover:text-[#ECF3EF]"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {active === "Home"
                    ? matchesHomeRedux.slice(0, 5).map((match) => (
                        <div
                          key={match.id}
                          className="rounded-lg bg-[#121917] px-4 py-3 transition-colors hover:bg-[#161D1A]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm text-[#ECF3EF]">
                              {match.homeClubName}
                            </span>
                            <span className="font-mono text-sm font-semibold text-[#34D399]">
                              {match.homeScore}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="font-mono text-sm text-[#94A3A0]">
                              {match.awayClubName}
                            </span>
                            <span className="font-mono text-sm font-semibold text-[#94A3A0]">
                              {match.awayScore}
                            </span>
                          </div>
                          <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-[#5F6D69]">
                            {match.matchDate}
                          </p>
                        </div>
                      ))
                    : matchesAwayRedux.slice(0, 5).map((match) => (
                        <div
                          key={match.id}
                          className="rounded-lg bg-[#121917] px-4 py-3 transition-colors hover:bg-[#161D1A]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm text-[#ECF3EF]">
                              {match.homeClubName}
                            </span>
                            <span className="font-mono text-sm font-semibold text-[#34D399]">
                              {match.homeScore}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="font-mono text-sm text-[#94A3A0]">
                              {match.awayClubName}
                            </span>
                            <span className="font-mono text-sm font-semibold text-[#94A3A0]">
                              {match.awayScore}
                            </span>
                          </div>
                          <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-[#5F6D69]">
                            {match.matchDate}
                          </p>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Squad;
