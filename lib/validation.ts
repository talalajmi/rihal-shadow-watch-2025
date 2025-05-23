import { z } from "zod";

export const reportCrimeSchema = z.object({
  details: z
    .string()
    .min(1, "Details must be at least 1 character")
    .max(255, "Details must be at most 255 characters")
    .refine(
      (value) => /^[a-zA-Z0-9\s]+$/.test(value),
      "Details must be alphanumeric and cannot contain special characters"
    ),
  type: z.string().min(1, "Please select a crime type"),
  nationalId: z
    .string()
    .min(8, "National ID must be at least 8 characters")
    .max(8, "National ID must be 8 characters")
    .refine(
      (value) => /^[0-9]+$/.test(value),
      "National ID must be numbers only"
    ),
  location: z.object({
    lat: z
      .number()
      .min(-90, "Latitude must be between -90 and 90 degrees")
      .max(90, "Latitude must be between -90 and 90 degrees")
      .nullable()
      .refine((value) => value !== null, "Latitude is required"),
    lng: z
      .number()
      .min(-180, "Longitude must be between -180 and 180 degrees")
      .max(180, "Longitude must be between -180 and 180 degrees")
      .nullable()
      .refine((value) => value !== null, "Longitude is required"),
  }),
});
