import { createNoteSchema } from "./notes.schema";
import { getAllNotes, getNotesByUser, saveNotes } from "./notes.storage";
import { Note } from "./types";
import { generateId } from "../../shared/utils/id";
import { getProfile } from "../profile/profile.storage";

export async function createNote(input: unknown): Promise<Note> {
  const profile = await getProfile();
  if (!profile) throw new Error("No profile found");

  const parsed = createNoteSchema.parse(input);

  const note: Note = {
    id: generateId(),
    userId: profile.id,
    text: parsed.text,
    imageUri: parsed.imageUri,
    location: parsed.location,
    createdAt: Date.now(),
    address: parsed.address
  };

  const allNotes = await getAllNotes();
  const updated = [note, ...allNotes];

  await saveNotes(updated);
  return note;
}

export async function loadNotes(): Promise<Note[]> {
  const profile = await getProfile();
  if (!profile) return [];
  return getNotesByUser(profile.id);
}
