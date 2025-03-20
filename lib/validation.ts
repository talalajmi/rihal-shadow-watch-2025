import { z } from "zod";

export const reportCrimeSchema = z.object({
  details: z
    .string()
    .min(1, "Details must be at least 1 character")
    .max(255, "Details must be at most 255 characters")
    .refine(
      (value) => /^[a-zA-Z0-9\s]+$/.test(value) && /[a-zA-Z]/.test(value),
      "Details must be alphanumeric and cannot be numbers only"
    ),
  type: z.string().min(1, "Please select a crime type"),
  nationalId: z
    .string()
    .min(8, "National ID must be at least 8 character")
    .max(8, "National ID must be 8 characters"),
  location: z.object({
    lat: z
      .number()
      .min(-90, "Latitude must be between -90 and 90 degrees")
      .max(90, "Latitude must be between -90 and 90 degrees")
      .refine(
        (value) => Number.isFinite(value),
        "Latitude must be a valid number"
      ),
    lng: z
      .number()
      .min(-180, "Longitude must be between -180 and 180 degrees")
      .max(180, "Longitude must be between -180 and 180 degrees")
      .refine(
        (value) => Number.isFinite(value),
        "Longitude must be a valid number"
      ),
  }),
});
