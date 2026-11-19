import React from "react";

const Testimonial = () => {
  return (
    <section className="bg-[#0E1412] px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-5xl text-[#FB923C]/40">"</span>

        <p className="mt-2 text-2xl font-medium leading-snug text-[#ECF3EF] sm:text-3xl">
          This platform completely changed how we scout players and track
          matches. We now discover talent faster and analyze games in real-time.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#34D399]/15 font-mono text-sm font-semibold text-[#34D399]">
            FC
          </span>

          <div className="text-left">
            <p className="text-sm font-semibold text-[#ECF3EF]">
              Elite Football Scout Team
            </p>
            <p className="font-mono text-xs text-[#5F6D69]">
              Talent Analysis & Recruitment Division
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
