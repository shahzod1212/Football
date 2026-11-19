import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllMatches } from "../axios/apis";
import { removeLiveMatches, setMatches } from "../redux/matchSlice";
import { addMatch } from "../indexedDb/indexeddb";

const Bars = ({ color, seed }) => {
  const heights = [40, 70, 30, 90, 55, 75, 35, 60];
  return (
    <div className="flex h-10 items-end gap-[3px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-[5px] rounded-sm"
          style={{
            backgroundColor: color,
            height: `${h}%`,
            animation: `pulse-bar 1.4s ease-in-out infinite`,
            animationDelay: `${(seed + i) * 0.08}s`,
          }}
        ></span>
      ))}
    </div>
  );
};

const LiveStatus = () => {
  const matchRedux = useSelector((state) => state.match.matches);
  const clubRedux = useSelector((state) => state.club.clubs);
  const liveMatchesRedux = useSelector((state) => state.match.liveMatches);
  const dispatch = useDispatch();

  async function fetchMatches() {
    try {
      const response = await getAllMatches();

      if (response.status === 200) {
        dispatch(setMatches(response.data.content));
        response.data.content.map((item) => {
          addMatch(item);
        });
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }

  useEffect(() => {
    if (liveMatchesRedux.length === 0) return;

    const timers = liveMatchesRedux.map((match) => {
      const elapsed = Date.now() - (match.createdAt || Date.now());
      const remaining = Math.max(90 * 60 * 1000 - elapsed, 0);

      return setTimeout(() => {
        dispatch(removeLiveMatches(match.id));
      }, remaining);
    });

    return () => timers.forEach(clearTimeout);
  }, [liveMatchesRedux, dispatch]);
  useEffect(() => {
    if (matchRedux.length === 0) {
      fetchMatches();
    }
  }, []);
  return (
    <section className="bg-[#0A0F0D] px-6 py-24 sm:px-10 lg:px-16">
      <style>{`
        @keyframes pulse-bar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.6; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-green-400">
              LIVE MATCH CENTER
            </p>

            <h2 className="mt-3 text-3xl max-w-xl font-extrabold tracking-tight text-[#ECF3EF] sm:text-4xl">
              This is what real-time{" "}
              <span className="text-[#FB923C]">football matches</span> look
              like.
            </h2>
          </div>

          <span className="font-mono text-xs text-[#5F6D69]">
            updated every day
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveMatchesRedux.map((m, i) => {
            const homeClub = clubRedux.find((c) => c.id === m.homeClubId);
            const awayClub = clubRedux.find((c) => c.id === m.awayClubId);
            console.log(m);

            const homeColor = "#34D399";
            const awayColor = "#FB923C";

            const intensity =
              (m.homeScore || 0) +
              (m.awayScore || 0) +
              (m.goalScorers?.length || 0);

            return (
              <div
                key={m.id}
                className="rounded-2xl border border-[#1E2826] bg-gradient-to-b from-[#0E1412] to-[#0A0F0D] p-6 transition-all hover:-translate-y-1 hover:border-[#243330] hover:shadow-xl hover:shadow-black/30"
              >
                {/* HEADER */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#5F6D69]">
                    {m.matchDate}
                  </span>

                  <span className="text-xs font-mono text-[#34D399]">
                    LIVE MATCH
                  </span>
                </div>

                {/* MATCH MAIN SECTION */}
                <div className="mt-5 flex items-center justify-between gap-4">
                  {/* HOME TEAM */}
                  <div className="flex flex-1 items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full  bg-[#111816]">
                      <img
                        src={homeClub?.logoUrl}
                        alt={homeClub?.name}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#ECF3EF]">
                        {m.homeClubName}
                      </p>
                      <p className="text-xs text-[#5F6D69]">Home</p>
                    </div>
                  </div>

                  {/* SCORE */}
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#ECF3EF]">
                      {m.homeScore} - {m.awayScore}
                    </p>
                    <p className="text-xs text-[#5F6D69]">Full Time</p>
                  </div>

                  {/* AWAY TEAM */}
                  <div className="flex flex-1 items-center justify-end gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#ECF3EF]">
                        {m.awayClubName}
                      </p>
                      <p className="text-xs text-[#5F6D69]">Away</p>
                    </div>

                    <div className="h-12 w-12 overflow-hidden rounded-full   bg-[#111816]">
                      <img
                        src={awayClub?.logoUrl}
                        alt={awayClub?.name}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                  </div>
                </div>

                {/* BARS VISUAL */}
                <div className="mt-5">
                  <Bars color="#34D399" seed={intensity} />
                </div>

                {/* GOALS */}
                {m.goalScorers?.length > 0 && (
                  <div className="mt-5 border-t border-[#1E2826] pt-4">
                    <p className="text-xs font-semibold text-[#34D399]">
                      ⚽ Goal Scorers
                    </p>
                    <p className="text-xs text-[#94A3A0]">
                      {m.goalScorers.join(", ")}
                    </p>
                  </div>
                )}

                {/* YELLOW CARDS */}
                {m.yellowCardPlayers?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-yellow-400">
                      🟨 Yellow Cards
                    </p>
                    <p className="text-xs text-[#94A3A0]">
                      {m.yellowCardPlayers.join(", ")}
                    </p>
                  </div>
                )}

                {/* RED CARDS */}
                {m.redCardPlayers?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-red-500">
                      🟥 Red Cards
                    </p>
                    <p className="text-xs text-[#94A3A0]">
                      {m.redCardPlayers.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LiveStatus;
