import React from "react";

const CTA = () => {
  return (
    <section className="bg-[#0A0F0D] px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#1E2826] bg-gradient-to-br from-[#0E1412] via-[#0E1412] to-[#16201B] px-8 py-16 text-center sm:px-16">
        <p className="font-mono text-xs tracking-[0.2em] text-[#34D399]">
          READY FOR THE GAME
        </p>

        <h2 className="mx-auto mt-4 max-w-xl text-3xl font-extrabold tracking-tight text-[#ECF3EF] sm:text-4xl">
          Build your football world in{" "}
          <span className="text-[#FB923C]">minutes.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-md text-[#94A3A0]">
          No delays. No complexity. Just explore clubs, players, and matches in
          real-time and manage everything in one place.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-lg bg-[#FB923C] px-7 py-3 text-sm font-semibold text-[#0A0F0D] transition-all hover:bg-[#fda968] hover:shadow-lg hover:shadow-[#FB923C]/20">
            Explore players
          </button>

          <button className="rounded-lg border border-[#243330] px-7 py-3 text-sm font-semibold text-[#ECF3EF] transition-colors hover:border-[#34D399]/50 hover:text-[#34D399]">
            View live matches
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
