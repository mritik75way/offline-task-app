import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "./types";

const NOTES_KEY = "@notes";

export async function getNotesByUser(userId: string): Promise<Note[]> {
  const raw = await AsyncStorage.getItem(NOTES_KEY);
  const notes = raw ? JSON.parse(raw) : [];
  return notes.filter((note: Note) => note.userId === userId);
}

export async function getAllNotes(): Promise<Note[]> {
  const raw = await AsyncStorage.getItem(NOTES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveNotes(notes: Note[]) {
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}
