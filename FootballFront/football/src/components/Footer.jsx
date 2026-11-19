import React from "react";

const columns = [
  {
    title: "Product",
    links: [
      "Dashboards",
      "Alerting",
      "Incident timeline",
      "Integrations",
      "Status pages",
    ],
  },
  {
    title: "Resources",
    links: ["Documentation", "API reference", "Changelog", "Guides"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-[#1E2826] bg-[#0A0F0D] px-6 pt-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34D399]"></span>
              </span>
              <span className="text-lg font-extrabold tracking-tight text-[#ECF3EF]">
                Pulse
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#94A3A0]">
              Real-time monitoring for the infrastructure you can't afford to
              watch manually.
            </p>

            <div className="mt-6">
              <p className="font-mono text-xs tracking-wide text-[#5F6D69]">
                STAY IN THE LOOP
              </p>
              <div className="mt-3 flex max-w-xs items-center overflow-hidden rounded-lg border border-[#1E2826] bg-[#121917]">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-[#ECF3EF] placeholder-[#5F6D69] outline-none"
                />
                <button className="shrink-0 bg-[#FB923C] px-4 py-2.5 text-sm font-semibold text-[#0A0F0D] transition-colors hover:bg-[#fda968]">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs tracking-[0.2em] text-[#5F6D69]">
                {col.title.toUpperCase()}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#94A3A0] transition-colors hover:text-[#34D399]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#1E2826] py-8 sm:flex-row">
          <p className="text-xs text-[#5F6D69]">
            © {new Date().getFullYear()} Pulse, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-[#5F6D69] transition-colors hover:text-[#94A3A0]"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-[#5F6D69] transition-colors hover:text-[#94A3A0]"
            >
              Terms
            </a>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]"></span>
              <span className="font-mono text-xs text-[#5F6D69]">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
