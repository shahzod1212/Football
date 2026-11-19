import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    players: [],
    playersByClub: [],
    number: 0,
  },
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
      state.number = action.payload.length;
    },

    addPlayer: (state, action) => {
      state.players.push(action.payload);
      state.number += 1;
    },

    removePlayer: (state, action) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload,
      );
      state.number = state.players.length;
    },

    addPlayersByClub: (state, action) => {
      state.playersByClub = action.payload;
    },

    // ✅ NEW: clears playersByClub when switching clubs
    clearPlayersByClub: (state) => {
      state.playersByClub = [];
    },
  },
});

export const {
  setPlayers,
  addPlayer,
  removePlayer,
  addPlayersByClub,
  clearPlayersByClub, // ✅ export it
} = playerSlice.actions;

export default playerSlice.reducer;
