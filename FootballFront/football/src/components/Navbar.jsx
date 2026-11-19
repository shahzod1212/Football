import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "home", icon: "🏠", href: "#" },
  { label: "clubs", icon: "👑", href: "#fixtures" },
  { label: "statistics", icon: "🏆", href: "#league" },
  { label: "squad", icon: "👕", href: "#squad" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#");
  const navigate = useNavigate();

  const handleLink = (href) => {
    setActiveHref(href.href);
    setMenuOpen(false);
    navigate(`/${href.label}`);
  };

  return (
    <>
      {/* ── pitch-stripe accent + sticky wrapper ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0e1a11] border-b-2 border-[#FB923C] shadow-[0_2px_24px_rgba(0,0,0,0.55)]">
        {/* grass-stripe texture bar */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "repeating-linear-gradient(90deg,#1a6b2f 0px,#1a6b2f 18px,transparent 18px,transparent 22px)",
          }}
        />

        {/* ── main row ── */}
        <div className="max-w-[1200px] mx-auto px-5 h-[68px] flex items-center justify-between gap-4">
          {/* LOGO */}
          <a
            href="#"
            onClick={() => handleLink("#")}
            className="flex items-center gap-3 flex-shrink-0 no-underline group"
          >
            {/* badge */}
            <div className="relative w-11 h-11 rounded-full bg-[#1a6b2f] border-2 border-[#FB923C] flex items-center justify-center overflow-hidden">
              {/* shield */}
              <div
                className="absolute inset-[5px] bg-[#e8b800]"
                style={{
                  clipPath: "polygon(50% 0%,100% 35%,82% 100%,18% 100%,0% 35%)",
                }}
              />
              <span className="relative z-10 text-lg leading-none">⚽</span>
            </div>

            {/* wordmark */}
            <div className="flex flex-col leading-none">
              <span
                className="text-[#FB923C] tracking-widest"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.35rem",
                }}
              >
                Shahzod Park
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/40 font-semibold">
                Football Club
              </span>
            </div>
          </a>

          {/* DESKTOP LINKS */}
          <ul className="hidden lg:flex items-center gap-0.5 list-none m-0 p-0">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink(item);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded text-[0.78rem] font-semibold tracking-wider uppercase transition-colors duration-150 no-underline
                    ${
                      activeHref === item.href
                        ? "text-[#e8b800] bg-[#e8b800]/10"
                        : "text-white/70 hover:text-[#e8b800] hover:bg-[#e8b800]/8"
                    }`}
                >
                  <span className="text-base opacity-80">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}

            {/* CTA */}
            <li className="ml-2">
              <a
                onClick={() => navigate("/createMatch")}
                className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#e8b800] text-[#0e1a11] text-[0.78rem] font-bold tracking-widest uppercase no-underline transition-all duration-150 hover:brightness-110 hover:-translate-y-px"
              >
                🏟️ Create Match
              </a>
            </li>
          </ul>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-1.5 rounded border-none bg-transparent cursor-pointer hover:bg-[#e8b800]/10 transition-colors duration-150"
          >
            <span
              className="block h-0.5 bg-[#e8b800] rounded transition-transform duration-300 origin-center"
              style={
                menuOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}
              }
            />
            <span
              className="block h-0.5 bg-[#e8b800] rounded transition-all duration-200"
              style={menuOpen ? { opacity: 0, transform: "scaleX(0)" } : {}}
            />
            <span
              className="block h-0.5 bg-[#e8b800] rounded transition-transform duration-300 origin-center"
              style={
                menuOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : {}
              }
            />
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div
          className={`lg:hidden flex flex-col bg-[#0e1a11] border-t border-[#e8b800]/20 overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-[480px] py-3 px-5 pb-6" : "max-h-0 py-0 px-5"}`}
        >
          {NAV_LINKS.map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => handleLink(href)}
              className={`flex items-center gap-3 py-3 px-2 text-[0.88rem] font-semibold tracking-wider uppercase border-b border-[#e8b800]/15 no-underline transition-all duration-150 last:border-b-0
                ${
                  activeHref === href
                    ? "text-[#e8b800] pl-4"
                    : "text-white/70 hover:text-[#e8b800] hover:pl-4"
                }`}
            >
              <span className="text-lg">{icon}</span>
              {label}
            </a>
          ))}

          {/* Mobile CTA */}
          <a
            href="#shop"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 mt-3 py-3 px-4 rounded bg-[#e8b800] text-[#0e1a11] text-[0.88rem] font-bold tracking-widest uppercase no-underline hover:brightness-110 transition-all duration-150"
          >
            🛒 Shop Now
          </a>
        </div>
      </nav>

      {/* spacer so page content clears the fixed nav */}
      <div className="h-[76px]" />
    </>
  );
}
