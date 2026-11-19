import { configureStore } from "@reduxjs/toolkit";
import clubReducer from "./clubSlice";
import playerReducer from "./playerSlice";
import matchReducer from "./matchSlice";
const store = configureStore({
  reducer: {
    club: clubReducer,
    player: playerReducer,
    match: matchReducer,
  },
});
export default store;
