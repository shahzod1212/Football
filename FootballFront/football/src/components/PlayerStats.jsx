import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerStatistic } from "../axios/apis";
import { Trophy, Square } from "lucide-react";

const PlayerStats = () => {
  const { id } = useParams();
  const [playerStats, setPlayerStats] = useState(null);

  async function fetchPlayerStats() {
    try {
      const response = await getPlayerStatistic(Number(id));
      if (response.status === 200) {
        setPlayerStats(response.data);
      }
    } catch (err) {
      alert(err?.message);
    }
  }

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  const stats = [
    {
      label: "Goals",
      value: playerStats?.goals,
      max: 38,
      icon: <Trophy size={16} className="text-[#34D399]" />,
      color: "text-[#34D399]",
      bg: "bg-[#34D399]/10",
      bar: "bg-[#34D399]",
    },
    {
      label: "Yellow cards",
      value: playerStats?.yellowCards,
      max: 38,
      icon: <Square size={16} className="text-[#FBBF24] fill-[#FBBF24]" />,
      color: "text-[#FBBF24]",
      bg: "bg-[#FBBF24]/10",
      bar: "bg-[#FBBF24]",
    },
    {
      label: "Red cards",
      value: playerStats?.redCards,
      max: 38,
      icon: <Square size={16} className="text-[#F87171] fill-[#F87171]" />,
      color: "text-[#F87171]",
      bg: "bg-[#F87171]/10",
      bar: "bg-[#F87171]",
    },
  ];

  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-[#5F6D69] mb-3">
        Statistics
      </p>
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, max, icon, bg, bar }) => (
          <div
            key={label}
            className="bg-[#0E1412] border border-[#1E2826] rounded-xl px-4 py-4 flex flex-col gap-3 hover:border-[#2E3A36] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}
              >
                {icon}
              </div>
              <span className="text-[10px] text-[#5F6D69]">/ {max} games</span>
            </div>
            <p className="text-3xl font-medium text-[#ECF3EF] leading-none">
              {value}
            </p>
            <p className="text-[15px] text-green-500 font-bold">{label}</p>
            <div className="h-[3px] bg-[#1C2421] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${bar}`}
                style={{ width: `${((value ?? 0) / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerStats;
