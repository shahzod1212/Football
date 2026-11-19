import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
  name: "match",
  initialState: {
    matches: [],
    matchesByHome: [],
    matchesByAway: [],
    liveMatches: [],
  },
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },

    addMatch: (state, action) => {
      state.matches.push(action.payload);
    },

    deleteMatch: (state, action) => {
      state.matches = state.matches.filter(
        (match) => match.id !== action.payload,
      );
    },

    setMatchesByHome: (state, action) => {
      state.matchesByHome = action.payload;
    },

    addMatchByHome: (state, action) => {
      state.matchesByHome.push(action.payload);
    },

    deleteMatchByHome: (state, action) => {
      state.matchesByHome = state.matchesByHome.filter(
        (match) => match.id !== action.payload,
      );
    },

    setMatchesByAway: (state, action) => {
      state.matchesByAway = action.payload;
    },

    addMatchByAway: (state, action) => {
      state.matchesByAway.push(action.payload);
    },

    deleteMatchByAway: (state, action) => {
      state.matchesByAway = state.matchesByAway.filter(
        (match) => match.id !== action.payload,
      );
    },
    addLiveMatches: (state, action) => {
      state.liveMatches.push(action.payload);
    },
    removeLiveMatches: (state, action) => {
      state.liveMatches = state.liveMatches.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const {
  setMatches,
  addMatch,
  deleteMatch,
  setMatchesByHome,
  addMatchByHome,
  deleteMatchByHome,
  setMatchesByAway,
  addMatchByAway,
  deleteMatchByAway,
  addLiveMatches,
  removeLiveMatches,
} = matchSlice.actions;

export default matchSlice.reducer;
