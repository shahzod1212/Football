import { createSlice } from "@reduxjs/toolkit";

const clubSlice = createSlice({
  name: "clubs",
  initialState: {
    clubs: [],
    number: 0,
    top5: [],
    top20: [],
    search: [],
  },
  reducers: {
    // ── CLUBS ──────────────────────────────
    setClubs: (state, action) => {
      state.clubs = action.payload;
    },
    addClub: (state, action) => {
      state.clubs.push(action.payload);
    },
    deleteClub: (state, action) => {
      state.clubs = state.clubs.filter((club) => club.id !== action.payload);
    },

    // ── NUMBER (a count from the backend, unrelated to clubs.length) ──
    setNumber: (state, action) => {
      state.number = action.payload;
    },
    increaseNumber: (state) => {
      state.number += 1;
    },

    // ── TOP 5 ──────────────────────────────
    setTop5: (state, action) => {
      state.top5 = action.payload;
    },
    addToTop5: (state, action) => {
      state.top5.push(action.payload);
    },

    // ── SEARCH ─────────────────────────────
    addToSearch: (state, action) => {
      state.search.push(action.payload);
    },
    clearSearch: (state) => {
      state.search = [];
    },
    addTop20: (state, action) => {
      state.top20 = action.payload;
    },
  },
});

export const {
  setClubs,
  addClub,
  deleteClub,
  setNumber,
  increaseNumber,
  setTop5,
  addToTop5,
  addToSearch,
  clearSearch,
  addTop20,
} = clubSlice.actions;

export default clubSlice.reducer;
