import { Crime } from "@/types/crime";
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
  Theft = "theft",
}

export const categories = [
  {
    categoryName: "Assault",
    icon: "/icons/assault.png",
    type: CrimeType.Assault,
  },
  {
    categoryName: "Robbery",
    icon: "/icons/robbery.png",
    type: CrimeType.Robbery,
  },
  {
    categoryName: "Homicide",
    icon: "/icons/homicide.png",
    type: CrimeType.Homicide,
  },
  {
    categoryName: "Kidnapping",
    icon: "/icons/kidnapping.png",
    type: CrimeType.Kidnapping,
  },
  {
    categoryName: "Theft",
    icon: "/icons/theft.png",
    type: CrimeType.Theft,
  },
];

export function filterCrimes(
  crimes: Crime[],
  query: string = "",
  filter: string = ""
): Crime[] {
  return crimes.filter((crime) => {
    const matchesQuery =
      crime.report_details.toLowerCase().includes(query.toLowerCase()) ||
      crime.crime_type.toLowerCase().includes(query.toLowerCase()) ||
      crime.report_date_time.includes(query) ||
      crime.id.toString() === query;

    const matchesFilter = filter
      ? crime.crime_type.toLowerCase() === filter.toLowerCase()
      : true;

    return matchesQuery && matchesFilter;
  });
}
