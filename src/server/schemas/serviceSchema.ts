import { z } from "zod";

export const favoritedByServiceSchema = z.object({
  id: z.string(),
  userEmail: z.string(),
  isFavorite: z.boolean(),
});

export const isFavoriteServiceSchema = z.object({
  id: z.string(),
  userEmail: z.string(),
});
