import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum CrimeType {
  Assault = "assault",
  Robbery = "robbery",
  Homicide = "homicide",
  Kidnapping = "kidnapping",
}
