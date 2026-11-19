import React from "react";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./security/ProtectedRoute";
import ClubPage from "./pages/ClubPage";
import StatisticPage from "./pages/StatisticPage";
import Squad from "./pages/Squard";
import PlayerPage from "./pages/PlayerPage";
import CreateMatch from "./pages/CreateMatch";
import ClubDetailesPage from "./pages/ClubDetailesPage";
import PlayerDetailPage from "./pages/PlayerDetailPage";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubs"
          element={
            <ProtectedRoute>
              <ClubPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <StatisticPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/squad"
          element={
            <ProtectedRoute>
              <Squad />
            </ProtectedRoute>
          }
        />
        <Route
          path="/player/:id"
          element={
            <ProtectedRoute>
              <PlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createMatch"
          element={
            <ProtectedRoute>
              <CreateMatch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/club-details/:id"
          element={
            <ProtectedRoute>
              <ClubDetailesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/player-statistics/:id"
          element={
            <ProtectedRoute>
              <PlayerDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
