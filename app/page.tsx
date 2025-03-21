import { getCrimes } from "@/lib/actions/crime.action";
import CrimeDashboard from "@/components/CrimeDashboard";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { query = "", filter = "" } = await searchParams;

  const crimes = await getCrimes();

  return (
    <CrimeDashboard initialCrimes={crimes} query={query} filter={filter} />
  );
}
