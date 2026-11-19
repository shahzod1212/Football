import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PlayerStats from "../components/PlayerStats";

const PlayerPage = () => {
  const playerRedux = useSelector((state) => state.player.players);
  const clubRedux = useSelector((state) => state.club.clubs);
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [club, setClub] = useState(null);
  useEffect(() => {
    setPlayer(playerRedux.find((item) => item.id === Number(id)));
  }, [id, playerRedux]);

  useEffect(() => {
    if (player != null) {
      setClub(clubRedux.find((item) => item.id === player.clubId));
      console.log(player.clubId);
    }
  }, [player, clubRedux]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0F0D] font-sans text-[#ECF3EF]">
      <Navbar />

      <section className="px-6 pt-16 pb-24 sm:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <div className="flex gap-5 items-start">
            <img
              src={player?.photo}
              alt={player?.name}
              className="w-[150px] h-[180px] object-cover rounded-xl border border-[#1E2826] flex-shrink-0"
            />
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="w-fit font-mono text-xs text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/20 rounded px-2.5 py-0.5">
                #{player?.number}
              </span>
              <h1 className="text-2xl font-medium leading-tight">
                {player?.name}
              </h1>
              <span className="w-fit text-xs text-[#60A5FA] bg-[#60A5FA]/10 rounded px-2.5 py-0.5">
                {player?.position}
              </span>
              <div className="flex gap-4 mt-2 text-sm text-[#94A3A0]">
                <span>{player?.nationality}</span>
                <span>{player?.age} yrs</span>
              </div>
            </div>
          </div>

          <hr className="border-[#1E2826]" />

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Height", value: player?.height },
              { label: "Weight", value: player?.weight },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-[#0E1412] border border-[#1E2826] rounded-lg px-4 py-3"
              >
                <p className="text-[10px] uppercase tracking-widest text-[#5F6D69] mb-1">
                  {label}
                </p>
                <p className="text-lg font-medium">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#5F6D69] mb-3">
              Current Club
            </p>
            <div className="flex items-center gap-4  border border-[#1E2826] rounded-xl px-4 py-3 w-fit">
              <img
                src={club?.logoUrl}
                alt={club?.name}
                className="w-11 h-11 rounded-lg object-contain "
              />
              <div>
                <p className="text-sm font-medium text-[#ECF3EF]">
                  {club?.name}
                </p>
                <p className="text-xs text-[#5F6D69] mt-0.5">{club?.country}</p>
              </div>
            </div>
          </div>
        </div>
        <PlayerStats />
      </section>

      <Footer />
    </div>
  );
};

export default PlayerPage;
