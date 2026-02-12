import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("offline-notes.db");

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      imageUri TEXT,
      createdAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY NOT NULL,
      userId TEXT NOT NULL,
      text TEXT,
      imageUri TEXT,
      location TEXT,
      address TEXT,
      createdAt INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES profiles (id)
    );
  `);
}

export function getDb() {
  return db;
}
