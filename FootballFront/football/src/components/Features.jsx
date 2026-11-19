import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllPlayers } from "../axios/apis";
import { useDispatch, useSelector } from "react-redux";
import { setPlayers } from "../redux/playerSlice";
import { addPlayer } from "../indexedDb/indexeddb";
import { useNavigate } from "react-router-dom";

const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];

const Features = () => {
  const [selectedPosition, setSelectedPosition] = useState("Forward");

  const dispatch = useDispatch();
  const playerRedux = useSelector((state) => state.player.players);
  const [playerDisplay, setPlayerDisplay] = useState([]);
  const navigate = useNavigate();

  async function fetchplayers() {
    try {
      const response = await getAllPlayers();

      if (response.status === 200) {
        dispatch(setPlayers(response.data));
        response.data.map((player) => {
          addPlayer(player);
        });
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }

  useEffect(() => {
    if (playerRedux.length === 0) {
      fetchplayers();
    }
  }, []);

  useEffect(() => {
    setPlayerDisplay(
      playerRedux.filter((player) => player.position === selectedPosition),
    );
  }, [selectedPosition, playerRedux]);

  return (
    <section className="bg-[#0A0F0D] px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.2em] text-[#FB923C]">
            Discover Players
          </p>

          <h2 className="mt-3 text-xl font-extrabold leading-[1.1] tracking-tight text-[#ECF3EF] sm:text-xl lg:text-4xl">
            Discover players across every <br />
            <span className="relative text-[#FB923C]">
              league, position & nation.
              <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-[#FB923C]/30"></span>
            </span>
            <br />
          </h2>
        </div>

        {/* POSITION SELECTOR */}
        <div className="mt-10 flex flex-wrap gap-3">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              className={`rounded-full border px-5 py-2 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedPosition === pos
                  ? "border-emerald-500 bg-emerald-600/20 text-emerald-300 shadow-md shadow-emerald-500/10"
                  : "border-[#243330] bg-[#0E1412] text-[#94A3A0] hover:text-white hover:border-emerald-500/40"
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* FEATURES GRID */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {playerDisplay.length > 0 ? (
            playerDisplay.slice(0, 4).map((player) => (
              <div
                onClick={() => navigate(`/player-statistics/${player.id}`)}
                key={player.id}
                className="group rounded-2xl border border-[#1E2826] bg-[#0E1412] p-5 transition-all hover:-translate-y-1 hover:border-[#243330] hover:shadow-xl hover:shadow-black/30"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-[#243330] bg-[#111816]">
                    <img
                      src={player.photo}
                      alt={player.firstname}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold text-[#ECF3EF]">
                      {player.firstname} {player.lastname}
                    </h3>
                    <p className="text-xs text-green-500">{player.position}</p>
                  </div>

                  <div className="ml-auto flex h-10 w-10 text-green-600 items-center justify-center rounded-lg border border-[#243330] bg-[#111816] text-sm font-bold">
                    {player.number ?? "N/A"}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-[#6F6D69]">
                  <span>{player.nationality}</span>
                  <span>{player.age} yrs</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center rounded-2xl border border-[#1E2826] bg-[#0E1412] py-16 text-center">
              <div className="text-5xl">⚽</div>

              <h3 className="mt-4 text-lg font-semibold text-[#ECF3EF]">
                No players in this position
              </h3>

              <p className="mt-2 max-w-md text-sm text-[#94A3A0]">
                We couldn’t find any players for this role right now. Try
                switching to another position or explore the full squad.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
