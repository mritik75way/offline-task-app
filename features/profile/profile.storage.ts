import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile } from "./types";
import { getDb } from "../../shared/db/client";

const CURRENT_PROFILE_KEY = "@current_profile:v1";

export async function saveProfile(profile: Profile) {
  const db = getDb();
  await db.runAsync(
    "INSERT OR REPLACE INTO profiles (id, name, email, imageUri, createdAt) VALUES (?, ?, ?, ?, ?)",
    [profile.id, profile.name, profile.email, profile.imageUri ?? null, profile.createdAt]
  );

  await setCurrentProfile(profile);
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const json = await AsyncStorage.getItem(CURRENT_PROFILE_KEY);
    if (!json) return null;
    return JSON.parse(json) as Profile;
  } catch {
    return null;
  }
}

export async function getAllProfiles(): Promise<Profile[]> {
  try {
    const db = getDb();
    const result = await db.getAllAsync<Profile>("SELECT * FROM profiles ORDER BY createdAt DESC");
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function setCurrentProfile(profile: Profile) {
  await AsyncStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(profile));
}

export async function clearProfile() {
  await AsyncStorage.removeItem(CURRENT_PROFILE_KEY);
}

export async function deleteProfile(profileId: string) {
  const db = getDb();
  await db.runAsync("DELETE FROM profiles WHERE id = ?", [profileId]);

  const currentProfile = await getProfile();
  if (currentProfile?.id === profileId) {
    await clearProfile();
  }
}
