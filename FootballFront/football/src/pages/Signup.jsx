import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { register } from "../axios/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addUser } from "../indexedDb/indexeddb";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [favPosition, setFavPosition] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setUser } = useContext(AppContext);

  function handleWrite(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function registerUser() {
    try {
      const response = await register(form);

      if (response.status === 201) {
        setUser(response.data);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        addUser(response.data);
        navigate("/home");
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }

  const positions = [
    "⚡ Forward",
    "🎯 Midfielder",
    "🛡️ Defender",
    "🧤 Goalkeeper",
  ];

  return (
    <div className="max-h-screen bg-gradient-to-br from-[#060d06] via-[#0b1a0b] to-[#060d06] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Pitch decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/[0.02] pointer-events-none" />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative scale-85  z-10 w-full max-w-[480px] mx-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-8 py-10 backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-2xl shadow-[0_0_28px_rgba(74,222,128,0.3)] mb-3">
            ⚽
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight">
            Join FootballZone
          </h1>
          <p className="text-white/40 text-[11px] uppercase tracking-widest mt-1">
            Create your free account
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step >= s
                    ? "bg-green-500 text-white shadow-[0_0_12px_rgba(74,222,128,0.4)]"
                    : "bg-white/10 text-white/30"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 2 && (
                <div
                  className={`h-px w-12 transition-all duration-500 ${step > s ? "bg-green-500" : "bg-white/10"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">
                  👤
                </span>
                <input
                  id="username"
                  type="text"
                  onChange={(e) => handleWrite(e)}
                  placeholder="CR7"
                  className="w-full pl-9 pr-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-white text-sm placeholder-white/20 outline-none focus:border-green-400/60 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">
                  ✉
                </span>
                <input
                  id="email"
                  type="email"
                  onChange={(e) => handleWrite(e)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-white text-sm placeholder-white/20 outline-none focus:border-green-400/60 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">
                  🔒
                </span>
                <input
                  id="password"
                  onChange={(e) => handleWrite(e)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full pl-9 pr-10 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-white text-sm placeholder-white/20 outline-none focus:border-green-400/60 transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-xs transition-colors"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-2 py-3.5 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 active:scale-[0.98] rounded-xl text-white text-sm font-bold tracking-wide shadow-[0_4px_20px_rgba(74,222,128,0.25)] transition-all duration-150"
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="space-y-5">
            {/* Favourite position */}
            <div>
              <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-3">
                Your Favourite Position
              </label>
              <div className="grid grid-cols-2 gap-2">
                {positions.map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => setFavPosition(pos)}
                    className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
                      favPosition === pos
                        ? "bg-green-500/20 border-green-400/70 text-green-300 shadow-[0_0_12px_rgba(74,222,128,0.2)]"
                        : "bg-white/[0.04] border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Favourite club */}
            <div>
              <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-1.5">
                Favourite Club
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">
                  🏟️
                </span>
                <input
                  type="text"
                  placeholder="e.g. Real Madrid"
                  className="w-full pl-9 pr-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-white text-sm placeholder-white/20 outline-none focus:border-green-400/60 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-1.5">
                Country
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">
                  🌍
                </span>
                <select className="w-full pl-9 pr-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-white/60 text-sm outline-none focus:border-green-400/60 transition-colors duration-200 appearance-none">
                  <option value="" className="bg-[#0b1a0b]">
                    Select your country
                  </option>
                  <option className="bg-[#0b1a0b]">🇩🇪 Germany</option>
                  <option className="bg-[#0b1a0b]">🇬🇧 United Kingdom</option>
                  <option className="bg-[#0b1a0b]">🇪🇸 Spain</option>
                  <option className="bg-[#0b1a0b]">🇫🇷 France</option>
                  <option className="bg-[#0b1a0b]">🇮🇹 Italy</option>
                  <option className="bg-[#0b1a0b]">🇧🇷 Brazil</option>
                  <option className="bg-[#0b1a0b]">🇦🇷 Argentina</option>
                  <option className="bg-[#0b1a0b]">Other</option>
                </select>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-green-400 cursor-pointer flex-shrink-0"
              />
              <label
                htmlFor="terms"
                className="text-white/35 text-xs leading-relaxed cursor-pointer select-none"
              >
                I agree to the{" "}
                <span className="text-green-400 hover:text-green-300 transition-colors cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-green-400 hover:text-green-300 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 rounded-xl text-white/60 text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={registerUser}
                disabled={!agreed}
                className={`flex-[2] py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-150 active:scale-[0.98] ${
                  agreed
                    ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 text-white shadow-[0_4px_20px_rgba(74,222,128,0.25)]"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 mt-7 mb-5">
          <div className="flex-1 h-px bg-white/[0.07]" />
          <span className="text-white/25 text-xs">OR SIGN UP WITH</span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>

        {/* Social buttons */}
        <div className="flex gap-3">
          {[
            { icon: "🇬", label: "Google" },
            { icon: "🍎", label: "Apple" },
            { icon: "fb", label: "Facebook" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              type="button"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 rounded-xl text-white/50 hover:text-white/80 text-xs font-semibold transition-all duration-150 active:scale-[0.97]"
            >
              <span className="text-base leading-none">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Login link */}
        <p className="text-center text-white/30 text-sm mt-6">
          Already have an account?{" "}
          <span className="text-green-400 font-semibold cursor-pointer hover:text-green-300 transition-colors">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
