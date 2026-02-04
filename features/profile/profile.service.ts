import { generateId } from "../../shared/utils/id";
import { createProfileSchema } from "./profile.schema";
import { saveProfile } from "./profile.storage";
import { Profile } from "./types";

export async function createProfile(input: unknown) {
  const validated = createProfileSchema.parse(input);
  const profile: Profile = {
    id: generateId(),
    createdAt: Date.now(),
    imageUri: validated.imageUri || "",
    ...validated,
  };
  await saveProfile(profile);
  return profile;
}
