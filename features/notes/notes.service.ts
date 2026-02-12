import { createNoteSchema } from "./notes.schema";
import { getAllNotes, getNotesByUser, saveNote, searchNotes } from "./notes.storage";
import { Note } from "./types";
import { generateId } from "../../shared/utils/id";
import { getProfile } from "../profile/profile.storage";
import { saveImage } from "../../shared/services/files.service";

export async function createNote(input: unknown): Promise<Note> {
  const profile = await getProfile();
  if (!profile) throw new Error("No profile found");

  const parsed = createNoteSchema.parse(input);

  let persistentImageUri = parsed.imageUri;
  if (parsed.imageUri) {
    try {
      persistentImageUri = await saveImage(parsed.imageUri);
    } catch (e) {
      console.warn("Failed to save image permanently, using original URI", e);
    }
  }

  const note: Note = {
    id: generateId(),
    userId: profile.id,
    text: parsed.text,
    imageUri: persistentImageUri,
    location: parsed.location,
    createdAt: Date.now(),
    address: parsed.address,
  };

  await saveNote(note);
  return note;
}

export async function loadNotes(): Promise<Note[]> {
  const profile = await getProfile();
  if (!profile) return [];
  return getNotesByUser(profile.id);
}

export async function searchUserNotes(query: string): Promise<Note[]> {
  const profile = await getProfile();
  if (!profile) return [];
  return searchNotes(profile.id, query);
}
