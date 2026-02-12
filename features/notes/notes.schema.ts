import { z } from "zod";

export const createNoteSchema = z.object({
  text: z.string().min(1),
  imageUri: z.string().optional(),
  address: z.string(),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
