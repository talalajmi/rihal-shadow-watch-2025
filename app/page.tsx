import GoogleMap from "@/components/map/GoogleMap";
import { Crime } from "@/types/crime";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { query = "", category = "" } = await searchParams;

  const response = await fetch(
    `
  ${
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_DEV_URL
      : process.env.NEXT_PUBLIC_API_PROD_URL
  }/crimes`,
    {
      cache: "no-store", // Ensures fresh data is fetched
    }
  );
  const crimes = await response.json();
  console.log(crimes);
  const filteredCrimes = crimes.filter((crime: Crime) => {
    const matchesQuery =
      crime.report_details.toLowerCase().includes(query.toLowerCase()) ||
      crime.crime_type.toLowerCase().includes(query.toLowerCase()) ||
      crime.report_date_time.includes(query) ||
      crime.id.toString() === query;

    const matchesCategory = category
      ? crime.crime_type.toLowerCase() === category.toLowerCase()
      : true;

    return matchesQuery && matchesCategory;
  });

  return (
    <main className="min-h-screen flex justify-center items-center flex-col space-y-8">
      <GoogleMap crimes={filteredCrimes} />
    </main>
  );
}
