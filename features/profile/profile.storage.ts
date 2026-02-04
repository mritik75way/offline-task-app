import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile } from "./types";

const PROFILES_KEY = "@profiles:v1";
const CURRENT_PROFILE_KEY = "@current_profile:v1";

export async function saveProfile(profile: Profile) {
  // Save to profiles list
  const profiles = await getAllProfiles();
  const existing = profiles.findIndex((p) => p.id === profile.id);

  if (existing >= 0) {
    profiles[existing] = profile;
  } else {
    profiles.push(profile);
  }

  await AsyncStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  // Set as current profile
  await setCurrentProfile(profile);
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const raw = await AsyncStorage.getItem(CURRENT_PROFILE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (!parsed?.name || !parsed?.email) return null;

    return parsed as Profile;
  } catch {
    return null;
  }
}

export async function getAllProfiles(): Promise<Profile[]> {
  try {
    const raw = await AsyncStorage.getItem(PROFILES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
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
  const profiles = await getAllProfiles();
  const filtered = profiles.filter((p) => p.id !== profileId);
  await AsyncStorage.setItem(PROFILES_KEY, JSON.stringify(filtered));

  const currentProfile = await getProfile();
  if (currentProfile?.id === profileId) {
    await clearProfile();
  }
}
