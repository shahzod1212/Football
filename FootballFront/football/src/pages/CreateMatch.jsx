import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { createMatch } from "../axios/apis";
import { addLiveMatches, addMatch } from "../redux/matchSlice";

const CreateMatch = () => {
  const clubRedux = useSelector((state) => state.club.clubs);
  const playersRedux = useSelector((state) => state.player.players);
  const dispatch = useDispatch();

  const [homeClubModal, setHomeClubModal] = useState([]);
  const [awayClubModal, setAwayClubModal] = useState([]);

  const [homeClub, setHomeClub] = useState(null);
  const [awayClub, setAwayClub] = useState(null);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [modalTarget, setModalTarget] = useState(null);
  const [home, setHome] = useState("");
  const [openAddedMatch, setOpenAddedMatch] = useState(false);

  const [goalScorerIds, setGoalScorerIds] = useState([]);
  const [yellowCardPlayerIds, setYellowCardPlayerIds] = useState([]);
  const [redCardPlayerIds, setRedCardPlayerIds] = useState([]);
  const [playerModalTarget, setPlayerModalTarget] = useState(null);

  const matchPlayers = playersRedux.filter(
    (p) => p.clubId === homeClub?.id || p.clubId === awayClub?.id,
  );

  function togglePlayer(playerId, list, setList) {
    if (list.includes(playerId)) {
      setList(list.filter((id) => id !== playerId));
    } else {
      setList([...list, playerId]);
    }
  }

  function openModal(target) {
    setModalTarget(target);
  }

  function closeModal() {
    setModalTarget(null);
  }

  function selectClub(club) {
    if (modalTarget === "home") setHomeClub(club);
    else setAwayClub(club);
    closeModal();
  }

  async function handleSubmit() {
    try {
      const payload = {
        homeClubId: homeClub?.id,
        awayClubId: awayClub?.id,
        homeScore: Number(homeScore),
        awayScore: Number(awayScore),
        matchDate,
        goalScorerIds,
        yellowCardPlayerIds,
        redCardPlayerIds,
      };
      const response = await createMatch(payload);
      if (response.status === 200) {
        dispatch(addLiveMatches({ ...response.data, createdAt: Date.now() }));
        dispatch(addMatch(response.data));
        addMatch(response.data);
        setOpenAddedMatch(true);
      }
    } catch (err) {
      alert(err?.message);
    }
  }

  useEffect(() => {
    if (homeClub !== null && awayClub === null) {
      setAwayClubModal(
        clubRedux
          .filter((item) => item.country === homeClub.country)
          .filter((item) => item.id !== homeClub.id),
      );
      setHomeClubModal(clubRedux);
    } else if (homeClub === null && awayClub !== null) {
      setHomeClubModal(
        clubRedux
          .filter((item) => item.country === awayClub.country)
          .filter((item) => item.id !== awayClub.id),
      );
      setAwayClubModal(clubRedux);
    } else if (homeClub !== null && awayClub !== null) {
      setHomeClubModal(clubRedux.filter((item) => item.id !== awayClub.id));
      setAwayClubModal(clubRedux.filter((item) => item.id !== homeClub.id));
    } else {
      setAwayClubModal(clubRedux);
      setHomeClubModal(clubRedux);
    }
  }, [homeClub, awayClub, clubRedux]);

  const playerSections = [
    {
      key: "goals",
      label: "Goal scorers",
      color: "text-[#34D399]",
      activeBg: "bg-[#34D399]/10 border-[#34D399]/30",
      list: goalScorerIds,
      setList: setGoalScorerIds,
    },
    {
      key: "yellow",
      label: "Yellow cards",
      color: "text-[#FBBF24]",
      activeBg: "bg-[#FBBF24]/10 border-[#FBBF24]/30",
      list: yellowCardPlayerIds,
      setList: setYellowCardPlayerIds,
    },
    {
      key: "red",
      label: "Red cards",
      color: "text-[#F87171]",
      activeBg: "bg-[#F87171]/10 border-[#F87171]/30",
      list: redCardPlayerIds,
      setList: setRedCardPlayerIds,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0F0D] font-sans text-[#ECF3EF]">
      <Navbar />

      <section className="px-6 pt-16 pb-24 sm:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          <h1 className="text-2xl font-medium">Create match</h1>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#5F6D69] mb-3">
                Clubs
              </p>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                <div>
                  <p className="text-[11px] text-[#5F6D69] mb-2">Home</p>
                  <button
                    onClick={() => {
                      openModal("home");
                      setHome("home");
                    }}
                    className={`w-full bg-[#0E1412] border rounded-xl px-4 py-3 flex items-center gap-3 transition-colors ${
                      homeClub
                        ? "border-[#34D399]"
                        : "border-[#1E2826] hover:border-[#2E3A36]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1C2421] border border-[#1E2826] flex items-center justify-center text-xs text-[#5F6D69] flex-shrink-0">
                      {homeClub ? homeClub.name.slice(0, 2).toUpperCase() : "?"}
                    </div>
                    <span
                      className={`text-sm ${homeClub ? "text-[#ECF3EF]" : "text-[#5F6D69]"}`}
                    >
                      {homeClub ? homeClub.name : "Select club"}
                    </span>
                  </button>
                </div>

                <p className="text-sm text-[#5F6D69] text-center mt-5">vs</p>

                <div>
                  <p className="text-[11px] text-[#5F6D69] mb-2">Away</p>
                  <button
                    onClick={() => {
                      openModal("away");
                      setHome("away");
                    }}
                    className={`w-full bg-[#0E1412] border rounded-xl px-4 py-3 flex items-center gap-3 transition-colors ${
                      awayClub
                        ? "border-[#34D399]"
                        : "border-[#1E2826] hover:border-[#2E3A36]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1C2421] border border-[#1E2826] flex items-center justify-center text-xs text-[#5F6D69] flex-shrink-0">
                      {awayClub ? awayClub.name.slice(0, 2).toUpperCase() : "?"}
                    </div>
                    <span
                      className={`text-sm ${awayClub ? "text-[#ECF3EF]" : "text-[#5F6D69]"}`}
                    >
                      {awayClub ? awayClub.name : "Select club"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#5F6D69] mb-3">
                Score
              </p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={homeScore}
                  onChange={(e) => setHomeScore(e.target.value)}
                  className="bg-[#0E1412] border border-[#1E2826] rounded-xl px-4 py-3 text-center text-2xl font-medium text-[#ECF3EF] outline-none focus:border-[#34D399] transition-colors"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={awayScore}
                  onChange={(e) => setAwayScore(e.target.value)}
                  className="bg-[#0E1412] border border-[#1E2826] rounded-xl px-4 py-3 text-center text-2xl font-medium text-[#ECF3EF] outline-none focus:border-[#34D399] transition-colors"
                />
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#5F6D69] mb-3">
                Match date
              </p>
              <input
                type="date"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                className="w-full bg-[#0E1412] border border-[#1E2826] rounded-xl px-4 py-3 text-sm text-[#ECF3EF] outline-none focus:border-[#34D399] transition-colors"
              />
            </div>

            {(homeClub || awayClub) && (
              <div className="flex flex-col gap-4">
                <p className="text-[10px] uppercase tracking-widest text-[#5F6D69]">
                  Players
                </p>

                {playerSections.map(
                  ({ key, label, color, activeBg, list, setList }) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <p className={`text-xs font-medium ${color}`}>
                          {label}
                        </p>
                        <span className="text-[10px] text-[#5F6D69]">
                          {list.length} selected
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {matchPlayers.map((player) => (
                          <button
                            key={player.id}
                            onClick={() =>
                              togglePlayer(player.id, list, setList)
                            }
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors text-left ${
                              list.includes(player.id)
                                ? activeBg
                                : "border-[#1E2826] bg-[#0E1412] hover:border-[#2E3A36]"
                            }`}
                          >
                            <div className="w-7 h-7 rounded-full bg-[#1C2421] border border-[#1E2826] flex items-center justify-center font-mono text-[10px] text-[#5F6D69] flex-shrink-0">
                              {player.number}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-[#ECF3EF] truncate">
                                {player.name}
                              </p>
                              <p className="text-[10px] text-[#5F6D69]">
                                {player.position}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-[#34D399] text-[#0A0F0D] font-medium rounded-xl py-3 text-sm hover:opacity-85 transition-opacity"
            >
              Create match
            </button>
          </div>
        </div>
      </section>

      {modalTarget && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0E1412] border border-[#1E2826] rounded-2xl p-5 w-[60%] max-w-4xl mx-auto min-h-[400px] max-h-[70%] flex flex-col gap-4">
            <p className="text-sm font-medium text-[#ECF3EF]">
              {modalTarget === "home" ? "Select home club" : "Select away club"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-y-auto">
              {(home === "home" ? homeClubModal : awayClubModal).map((club) => (
                <button
                  key={club.id}
                  onClick={() => selectClub(club)}
                  className={`flex flex-col items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors text-left ${
                    (modalTarget === "home" ? homeClub : awayClub)?.id ===
                    club.id
                      ? "bg-[#34D399]/10 border-[#34D399]/30"
                      : "border-transparent hover:bg-[#121917] hover:border-[#1E2826]"
                  }`}
                >
                  <img src={club.logoUrl} alt="" className="w-20" />
                  <div className="w-8 h-8 rounded-lg bg-[#1C2421] border border-[#1E2826] flex items-center justify-center text-xs text-[#5F6D69] flex-shrink-0">
                    {club.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-[#ECF3EF]">{club.name}</p>
                    <p className="text-xs text-[#5F6D69]">{club.country}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="border border-[#1E2826] rounded-lg py-2 text-sm text-[#5F6D69] hover:text-[#ECF3EF] hover:border-[#2E3A36] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {openAddedMatch && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0E1412] border border-[#1E2826] rounded-2xl p-8 w-[90%] max-w-md mx-auto flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#34D399]/10 border border-[#34D399]/20 flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#34D399"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-xl font-medium text-[#ECF3EF]">
                Match created
              </h2>
              <p className="text-sm text-[#5F6D69]">
                The match has been added successfully. You can view it on the
                home page.
              </p>
            </div>

            <div className="w-full bg-[#121917] border border-[#1E2826] rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1C2421] border border-[#1E2826] flex items-center justify-center text-[10px] text-[#5F6D69]">
                  {homeClub?.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm text-[#ECF3EF]">{homeClub?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-medium text-[#34D399]">
                  {homeScore}
                </span>
                <span className="text-[#5F6D69]">—</span>
                <span className="font-mono text-lg font-medium text-[#ECF3EF]">
                  {awayScore}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#ECF3EF]">{awayClub?.name}</span>
                <div className="w-7 h-7 rounded-lg bg-[#1C2421] border border-[#1E2826] flex items-center justify-center text-[10px] text-[#5F6D69]">
                  {awayClub?.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setOpenAddedMatch(false)}
                className="flex-1 border border-[#1E2826] rounded-xl py-2.5 text-sm text-[#5F6D69] hover:text-[#ECF3EF] hover:border-[#2E3A36] transition-colors"
              >
                You can view it in home
              </button>
              <a
                href="/"
                className="flex-1 bg-[#34D399] text-[#0A0F0D] font-medium rounded-xl py-2.5 text-sm hover:opacity-85 transition-opacity text-center"
              >
                Go to home
              </a>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CreateMatch;
