import { z } from "zod";

export const createProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  imageUri: z.string().optional(),
});
