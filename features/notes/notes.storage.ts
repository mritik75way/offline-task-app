import { Note } from "./types";
import { getDb } from "../../shared/db/client";

export async function getNotesByUser(userId: string): Promise<Note[]> {
  try {
    const db = getDb();
    const result = await db.getAllAsync<Note>(
      "SELECT * FROM notes WHERE userId = ? ORDER BY createdAt DESC",
      [userId]
    );
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getAllNotes(): Promise<Note[]> {
  try {
    const db = getDb();
    return await db.getAllAsync<Note>("SELECT * FROM notes ORDER BY createdAt DESC");
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function saveNote(note: Note) {
  const db = getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO notes (id, userId, text, imageUri, location, address, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      note.id,
      note.userId,
      note.text,
      note.imageUri ?? null,
      note.location ? JSON.stringify(note.location) : null,
      note.address ?? null,
      note.createdAt,
    ]
  );
}

export async function saveNotes(notes: Note[]) {
    for (const note of notes) {
        await saveNote(note);
    }
}

export async function searchNotes(userId: string, query: string): Promise<Note[]> {
  try {
    const db = getDb();
    const result = await db.getAllAsync<Note>(
      "SELECT * FROM notes WHERE userId = ? AND text LIKE ? ORDER BY createdAt DESC",
      [userId, `%${query}%`]
    );
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}
