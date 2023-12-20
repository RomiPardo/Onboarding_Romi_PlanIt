import { z } from "zod";

export const favoritedByServiceSchema = z.object({
  id: z.string(),
  isFavorite: z.boolean(),
});

export const filterServiceSchema = z.object({
  cursor: z.string().nullish(),
  category: z.enum(["PRESENT", "CATERING", "MERCHANDISING", "EVENT"]),
  subcategoryFilter: z.array(z.string()),
  order: z.string(),
  limit: z.number().min(1).max(100).nullish(),
  searchFilter: z.string(),
});
