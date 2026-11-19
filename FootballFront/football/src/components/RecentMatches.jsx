// src/components/RecentMatches.jsx
import React from "react";
import { useSelector } from "react-redux";

const RecentMatches = () => {
  const matches = useSelector((state) => state.match.matches);
  const clubsRedux = useSelector((state) => state.club.clubs);
  return (
    <div className="rounded-2xl border border-[#1E2826] bg-[#0E1412] p-5">
      <div className="flex items-center justify-between border-b border-[#1E2826] pb-4">
        <span className="font-mono text-xs tracking-wide text-[#5F6D69]">
          LAST 5 MATCHES
        </span>
        <span className="h-2 w-2 rounded-full bg-[#34D399]"></span>
      </div>

      <div className="mt-4 space-y-3">
        {matches.slice(0, 5).map((match) => {
          const homeClub = clubsRedux.find((i) => i.id === match.homeClubId);
          const awayClub = clubsRedux.find((i) => i.id === match.awayClubId);

          return (
            <div
              key={match.id}
              className="rounded-xl border border-[#1E2826] bg-[#121917] px-4 py-4 transition-colors hover:bg-[#161D1A]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {homeClub?.logoUrl ? (
                    <img
                      src={homeClub.logoUrl}
                      alt={match.homeClubName}
                      className="h-7 w-7 rounded-full bg-[#1C2421] object-cover"
                    />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C2421] font-mono text-[9px] text-[#34D399]">
                      {homeClub?.shortName ?? "?"}
                    </span>
                  )}
                  <span className="font-mono text-sm text-[#ECF3EF]">
                    {match.homeClubName}
                  </span>
                </div>
                <span className="font-mono text-sm font-semibold text-[#34D399]">
                  {match.homeScore}
                </span>
              </div>

              <div className="my-2 border-t border-[#1E2826]" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {awayClub?.logoUrl ? (
                    <img
                      src={awayClub.logoUrl}
                      alt={match.awayClubName}
                      className="h-7 w-7 rounded-full bg-[#1C2421] object-cover"
                    />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C2421] font-mono text-[9px] text-[#94A3A0]">
                      {awayClub?.shortName ?? "?"}
                    </span>
                  )}
                  <span className="font-mono text-sm text-[#94A3A0]">
                    {match.awayClubName}
                  </span>
                </div>
                <span className="font-mono text-sm font-semibold text-[#94A3A0]">
                  {match.awayScore}
                </span>
              </div>

              <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-[#5F6D69]">
                {match.date}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentMatches;
