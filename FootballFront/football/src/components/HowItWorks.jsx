import React from "react";

const steps = [
  {
    n: "01",
    title: "Discover clubs & players",
    desc: "Explore football clubs, browse squads, and discover players across different leagues, positions, and nationalities in real time.",
  },
  {
    n: "02",
    title: "Create matches & track stats",
    desc: "Set up matches between clubs and analyze player performance, match statistics, and team formations with detailed insights.",
  },
  {
    n: "03",
    title: "Follow transfers & updates",
    desc: "Stay updated with player transfers, club changes, and live football news to keep track of every movement in the football world.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#0E1412] px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-[0.2em] text-[#34D399]">
          THE FLOW
        </p>
        <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight text-[#ECF3EF] sm:text-5xl lg:text-6xl">
          From discovery.
          <br />
          To analysis.
          <br />
          Real-time{" "}
          <span className="relative text-[#FB923C]">
            football insights.
            <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-[#FB923C]/30"></span>
          </span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <span className="font-mono text-5xl font-bold text-[#FB923C]">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#ECF3EF]">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#94A3A0]">
                {s.desc}
              </p>
              {i < steps.length - 1 && (
                <span className="absolute right-[-1.25rem] top-3 hidden text-2xl text-[#243330] sm:block">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
