import api from "./axios";

// ==================== AUTH ====================

export const register = (form) => {
  return api.post("/auth/register", form);
};

export const login = (form) => {
  return api.post("/auth/login", form);
};

// ==================== CLUBS ====================

export const createClub = (clubRequest) => {
  return api.post("/api/clubs", clubRequest);
};

export const getClubById = (id) => {
  return api.get(`/api/clubs/${id}`);
};

export const getAllClubs = (page = 0, size = 98) => {
  return api.get("/api/clubs", {
    params: { page, size },
  });
};

export const deleteClub = (id) => {
  return api.delete(`/api/clubs/${id}`);
};

export const getClubsByCountry = (country, page = 0, size = 10) => {
  return api.get("/api/clubs/country", {
    params: { country, page, size },
  });
};

export const getClubsByCity = (city, page = 0, size = 10) => {
  return api.get("/api/clubs/city", {
    params: { city, page, size },
  });
};

export const searchClubs = (keyword, page = 0, size = 10) => {
  return api.get("/api/clubs/search", {
    params: { keyword, page, size },
  });
};

export const existsClubById = (id) => {
  return api.get(`/api/clubs/exists/${id}`);
};

export const countClubs = () => {
  return api.get("/api/clubs/count");
};

export const getLeagueTable = (country, page = 0, size = 20) => {
  return api.get("/api/clubs/league-table", {
    params: { country, page, size },
  });
};

// ==================== PLAYERS ====================

export const createPlayer = (playerRequest) => {
  return api.post("/api/players", playerRequest);
};

export const deletePlayer = (id) => {
  return api.delete(`/api/players/${id}`);
};

export const getAllPlayers = () => {
  return api.get("/api/players");
};

export const getPlayersByNationality = (nationality, page = 0, size = 10) => {
  return api.get("/api/players/nationality", {
    params: { nationality, page, size },
  });
};

export const getPlayersByPosition = (position, page = 0, size = 10) => {
  return api.get("/api/players/position", {
    params: { position, page, size },
  });
};

export const getPlayersByClub = (clubId, page = 0, size = 22) => {
  return api.get(`/api/players/club/${clubId}`, {
    params: { page, size },
  });
};

export const getPlayersByClubAndPosition = (
  clubId,
  position,
  page = 0,
  size = 10,
) => {
  return api.get(`/api/players/club/${clubId}/position`, {
    params: { position, page, size },
  });
};

export const getPlayersByClubAndNationality = (
  clubId,
  nationality,
  page = 0,
  size = 10,
) => {
  return api.get(`/api/players/club/${clubId}/nationality`, {
    params: { nationality, page, size },
  });
};

export const transferPlayer = (transferRequest) => {
  return api.post("/api/players/transfer", transferRequest);
};

// ==================== MATCHES ====================

export const createMatch = (matchRequest) => {
  return api.post("/api/match", matchRequest);
};

export const deleteMatch = (id) => {
  return api.delete(`/api/match/${id}`);
};

export const getAllMatches = (page = 0, size = 10) => {
  return api.get("/api/match", {
    params: { page, size },
  });
};

export const getMatchesByHomeClub = (homeClubId, page = 0, size = 5) => {
  return api.get(`/api/match/home/${homeClubId}`, {
    params: { page, size },
  });
};

export const getMatchesByAwayClub = (awayClubId, page = 0, size = 5) => {
  return api.get(`/api/match/away/${awayClubId}`, {
    params: { page, size },
  });
};

export const getMatchesByDate = (matchDate, page = 0, size = 10) => {
  return api.get("/api/match/date", {
    params: { matchDate, page, size },
  });
};
export const getPlayerStatistic = (playerId) => {
  return api.get(`/api/statistics/${playerId}`);
};

export const getMatchesByClub = (id) => {
  return api.get(`/api/match/${id}`);
};
