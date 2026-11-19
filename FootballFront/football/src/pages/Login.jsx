import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
import { login } from "../axios/apis";
import { addUser } from "../indexedDb/indexeddb";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  function handleWrite(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function loginUser() {
    try {
      const response = await login(form);

      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        toast.success("Successfully login " + response.data.user.username);
        addUser(response.data);
        navigate("/home");
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }
  return (
    <div className="max-h-screen bg-gradient-to-br from-[#060d06] via-[#0b1a0b] to-[#060d06] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Pitch centre-circle decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-white/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.03] pointer-events-none" />

      {/* Glow blob behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px] mx-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-10 py-12 backdrop-blur-md">
        {/* Crest / logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-3xl shadow-[0_0_32px_rgba(74,222,128,0.3)] mb-4">
            ⚽
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-white/40 text-[11px] uppercase tracking-widest mt-1">
            FootballZone · Member Portal
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">
              ✉
            </span>
            <input
              id="email"
              onChange={(e) => handleWrite(e)}
              type="email"
              placeholder="you@example.com"
              className="w-full pl-9 pr-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-white text-sm placeholder-white/20 outline-none focus:border-green-400/60 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-white/50 text-[11px] font-semibold uppercase tracking-widest">
              Password
            </label>
            <span className="text-green-400 text-xs font-medium cursor-pointer hover:text-green-300 transition-colors">
              Forgot password?
            </span>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">
              🔒
            </span>
            <input
              id="password"
              onChange={(e) => handleWrite(e)}
              type="password"
              placeholder="Enter your password"
              className="w-full pl-9 pr-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-white text-sm placeholder-white/20 outline-none focus:border-green-400/60 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2 mb-7">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 accent-green-400 cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-white/40 text-sm cursor-pointer select-none"
          >
            Keep me signed in
          </label>
        </div>

        {/* Sign In button */}
        <button
          type="button"
          onClick={loginUser}
          className="w-full py-3.5 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 active:scale-[0.98] rounded-xl text-white text-sm font-bold tracking-wide shadow-[0_4px_20px_rgba(74,222,128,0.3)] transition-all duration-150"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/[0.08]" />
          <span className="text-white/25 text-xs">OR</span>
          <div className="flex-1 h-px bg-white/[0.08]" />
        </div>

        {/* Register */}
        <p className="text-center text-white/35 text-sm">
          New to FootballZone?{" "}
          <span className="text-green-400 font-semibold cursor-pointer hover:text-green-300 transition-colors">
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
