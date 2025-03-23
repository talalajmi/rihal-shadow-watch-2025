import { Crime } from "@/types/crime";
import { z } from "zod";
import { reportCrimeSchema } from "../validation";

export const getCrimes = async () => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_DEV_URL
      : process.env.NEXT_PUBLIC_API_PROD_URL;

  try {
    const response = await fetch(`${baseUrl}/crimes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch crimes: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Crime[];
  } catch (error) {
    console.error("Error fetching crimes:", error);
    throw error;
  }
};

export const addCrime = async (
  crimeData: z.infer<typeof reportCrimeSchema>
): Promise<Crime> => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_DEV_URL
      : process.env.NEXT_PUBLIC_API_PROD_URL;

  const crime = {
    report_details: crimeData.details,
    crime_type: crimeData.type,
    latitude: crimeData.location.lat,
    longitude: crimeData.location.lng,
  };

  console.log({
    message: "From addCrime action",
    crime: crime,
    baseUrl: baseUrl,
  });

  try {
    const response = await fetch(`${baseUrl}/crimes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crime),
    });

    if (!response.ok) {
      throw new Error(`Failed to add crime: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error adding crime:", error);
    throw error;
  }
};
