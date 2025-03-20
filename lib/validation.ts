import { z } from "zod";

export const reportCrimeSchema = z.object({
  details: z
    .string()
    .min(1, "Details must be at least 1 character")
    .max(255, "Details must be at most 255 characters"),
  type: z.string().min(1),
  nationalId: z
    .string()
    .min(1, "National ID must be at least 1 character")
    .max(8, "National ID must be 8 characters"),
  location: z.object({
    lat: z
      .number()
      .min(-90, "Latitude must be at least -90")
      .max(90, "Latitude must be at most 90"),
    lng: z
      .number()
      .min(-90, "Latitude must be at least -90")
      .max(90, "Latitude must be at most 90"),
  }),
});
