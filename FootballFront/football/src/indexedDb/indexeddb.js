const DB_Name = "SportDB";
const DB_Version = 1;

let dbInstance = null;

function openDatabase() {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_Name, DB_Version);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("users")) {
        const userStore = db.createObjectStore("users", { keyPath: "id" });
        userStore.createIndex("email", "email", { unique: true });
        userStore.createIndex("username", "username", { unique: true });
      }

      if (!db.objectStoreNames.contains("clubs")) {
        const clubStore = db.createObjectStore("clubs", { keyPath: "id" });
        clubStore.createIndex("name", "name", { unique: true });
        clubStore.createIndex("shortName", "shortName", { unique: true });
      }

      if (!db.objectStoreNames.contains("players")) {
        const playerStore = db.createObjectStore("players", { keyPath: "id" });
        playerStore.createIndex("name", "name", { unique: false });
        playerStore.createIndex("firstName", "firstName", { unique: false });
      }

      if (!db.objectStoreNames.contains("matches")) {
        const matchStore = db.createObjectStore("matches", { keyPath: "id" });
        matchStore.createIndex("homeClubName", "homeClubName", {
          unique: false,
        });
        matchStore.createIndex("awayClubName", "awayClubName", {
          unique: false,
        });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

function runTransaction(storeName, mode, executor) {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      let result;

      executor(store, (value) => {
        result = value;
      });

      tx.oncomplete = () => {
        resolve(result);
      };
      tx.onerror = (event) => {
        reject(event.target.error);
      };
    });
  });
}

// ════════════════════════════════════════════════
// USERS — single-user store, no id needed
// ════════════════════════════════════════════════

export function addUser(user) {
  return runTransaction("users", "readwrite", (store, done) => {
    const clearReq = store.clear();

    clearReq.onsuccess = () => {
      const addReq = store.add(user);

      addReq.onsuccess = () => done(user);
    };
  });
}

export function getUser() {
  return runTransaction("users", "readonly", (store, done) => {
    const req = store.getAll();
    req.onsuccess = () => done(req.result[0] || null);
  });
}

export function deleteUser() {
  return runTransaction("users", "readwrite", (store, done) => {
    const req = store.clear();
    req.onsuccess = () => done(true);
  });
}

// ════════════════════════════════════════════════
// CLUBS — many records
// ════════════════════════════════════════════════

export function addClub(club) {
  return runTransaction("clubs", "readwrite", (store, done) => {
    const req = store.add(club);
    req.onsuccess = () => done(club);
  });
}

export function getClub(id) {
  return runTransaction("clubs", "readonly", (store, done) => {
    const req = store.get(id);
    req.onsuccess = () => done(req.result || null);
  });
}

export function getAllClubs() {
  return runTransaction("clubs", "readonly", (store, done) => {
    const req = store.getAll();
    req.onsuccess = () => done(req.result || []);
  });
}

export function getClubByName(name) {
  return runTransaction("clubs", "readonly", (store, done) => {
    const req = store.index("name").get(name);
    req.onsuccess = () => done(req.result || null);
  });
}

export function updateClub(club) {
  return runTransaction("clubs", "readwrite", (store, done) => {
    const req = store.put(club);
    req.onsuccess = () => done(club);
  });
}

export function deleteClub(id) {
  return runTransaction("clubs", "readwrite", (store, done) => {
    const req = store.delete(id);
    req.onsuccess = () => done(id);
  });
}

// ════════════════════════════════════════════════
// PLAYERS — many records
// ════════════════════════════════════════════════

export function addPlayer(player) {
  return runTransaction("players", "readwrite", (store, done) => {
    const req = store.add(player);
    req.onsuccess = () => done(player);
  });
}

export function getPlayer(id) {
  return runTransaction("players", "readonly", (store, done) => {
    const req = store.get(id);
    req.onsuccess = () => done(req.result || null);
  });
}

export function getAllPlayers() {
  return runTransaction("players", "readonly", (store, done) => {
    const req = store.getAll();
    req.onsuccess = () => done(req.result || []);
  });
}

export function getPlayersByName(name) {
  return runTransaction("players", "readonly", (store, done) => {
    const req = store.index("name").getAll(name);
    req.onsuccess = () => done(req.result || []);
  });
}

export function getPlayersByFirstName(firstName) {
  return runTransaction("players", "readonly", (store, done) => {
    const req = store.index("firstName").getAll(firstName);
    req.onsuccess = () => done(req.result || []);
  });
}

export function updatePlayer(player) {
  return runTransaction("players", "readwrite", (store, done) => {
    const req = store.put(player);
    req.onsuccess = () => done(player);
  });
}

export function deletePlayer(id) {
  return runTransaction("players", "readwrite", (store, done) => {
    const req = store.delete(id);
    req.onsuccess = () => done(id);
  });
}

// ════════════════════════════════════════════════
// MATCHES — many records
// ════════════════════════════════════════════════

export function addMatch(match) {
  return runTransaction("matches", "readwrite", (store, done) => {
    const req = store.add(match);
    req.onsuccess = () => done(match);
  });
}

export function getMatch(id) {
  return runTransaction("matches", "readonly", (store, done) => {
    const req = store.get(id);
    req.onsuccess = () => done(req.result || null);
  });
}

export function getAllMatches() {
  return runTransaction("matches", "readonly", (store, done) => {
    const req = store.getAll();
    req.onsuccess = () => done(req.result || []);
  });
}

export function getMatchesByHomeClubName(homeClubName) {
  return runTransaction("matches", "readonly", (store, done) => {
    const req = store.index("homeClubName").getAll(homeClubName);
    req.onsuccess = () => done(req.result || []);
  });
}

export function getMatchesByAwayClubName(awayClubName) {
  return runTransaction("matches", "readonly", (store, done) => {
    const req = store.index("awayClubName").getAll(awayClubName);
    req.onsuccess = () => done(req.result || []);
  });
}

export function updateMatch(match) {
  return runTransaction("matches", "readwrite", (store, done) => {
    const req = store.put(match);
    req.onsuccess = () => done(match);
  });
}

export function deleteMatch(id) {
  return runTransaction("matches", "readwrite", (store, done) => {
    const req = store.delete(id);
    req.onsuccess = () => done(id);
  });
}
