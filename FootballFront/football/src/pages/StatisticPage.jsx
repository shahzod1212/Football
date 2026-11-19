// src/pages/StatisticPage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const topScorers = [
  { id: 1, name: "Kylian Marsau", club: "PSG", value: 27 },
  { id: 2, name: "Erling Bratt", club: "Man City", value: 24 },
  { id: 3, name: "Vinicius Adeyemi", club: "Real Madrid", value: 21 },
  { id: 4, name: "Harry Solberg", club: "Bayern Munich", value: 19 },
  { id: 5, name: "Lautaro Vance", club: "Inter Milan", value: 17 },
];

const mostYellowCards = [
  { id: 1, name: "Sergio Manat", club: "Atletico Madrid", value: 12 },
  { id: 2, name: "Declan Royce", club: "Arsenal", value: 11 },
  { id: 3, name: "Marco Ferrante", club: "Juventus", value: 10 },
  { id: 4, name: "Wilfried Doku", club: "Dortmund", value: 9 },
  { id: 5, name: "Theo Brandt", club: "PSG", value: 8 },
];

const mostRedCards = [
  { id: 1, name: "Bruno Castel", club: "Sevilla", value: 3 },
  { id: 2, name: "Kalvin Otieno", club: "Lyon", value: 2 },
  { id: 3, name: "Diego Maral", club: "Boca", value: 2 },
  { id: 4, name: "Pavel Husek", club: "Slavia Praha", value: 1 },
  { id: 5, name: "Andre Loftus", club: "Celtic", value: 1 },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Leaderboard = ({ title, data, accent, suffix }) => (
  <div className="rounded-2xl border border-[#1E2826] bg-[#0E1412] p-5">
    <div className="flex items-center justify-between border-b border-[#1E2826] pb-4">
      <span className="font-mono text-xs tracking-wide text-[#5F6D69]">
        {title}
      </span>
      <span className={`h-2 w-2 rounded-full ${accent.dot}`}></span>
    </div>

    <div className="mt-4 space-y-2">
      {data.map((player, index) => (
        <div
          key={player.id}
          className="flex items-center justify-between rounded-lg bg-[#121917] px-4 py-3 transition-colors hover:bg-[#161D1A]"
        >
          <div className="flex items-center gap-3">
            <span className="w-5 font-mono text-xs text-[#5F6D69]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1C2421] font-mono text-[11px] font-semibold text-[#ECF3EF]">
              {initials(player.name)}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#ECF3EF]">
                {player.name}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wide text-[#5F6D69]">
                {player.club}
              </span>
            </div>
          </div>

          <span
            className={`rounded-full px-2.5 py-1 font-mono text-xs font-semibold ${accent.badge}`}
          >
            {player.value}
            {suffix ?? ""}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const StatisticPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0F0D] font-sans text-[#ECF3EF]">
      <Navbar />

      <section className="px-6 pt-16 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs tracking-[0.2em] text-[#34D399]">
            SEASON STATS
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight text-[#ECF3EF] sm:text-5xl">
            Who's leading.
            <br />
            Who's{" "}
            <span className="relative text-[#FB923C]">
              testing the ref.
              <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-[#FB923C]/30"></span>
            </span>
          </h1>
          <p className="mt-4 max-w-md text-[#94A3A0]">
            Top scorers, most-booked players, and the players seeing red the
            most — updated across every match in the league.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Leaderboard
              title="TOP SCORERS"
              data={topScorers}
              suffix=" goals"
              accent={{
                dot: "bg-[#34D399]",
                badge: "bg-[#34D399]/10 text-[#34D399]",
              }}
            />
            <Leaderboard
              title="MOST YELLOW CARDS"
              data={mostYellowCards}
              suffix=" yc"
              accent={{
                dot: "bg-[#FB923C]",
                badge: "bg-[#FB923C]/10 text-[#FB923C]",
              }}
            />
            <Leaderboard
              title="MOST RED CARDS"
              data={mostRedCards}
              suffix=" rc"
              accent={{
                dot: "bg-[#F87171]",
                badge: "bg-[#F87171]/10 text-[#F87171]",
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StatisticPage;
