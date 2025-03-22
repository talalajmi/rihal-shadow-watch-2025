"use client";

import { useState } from "react";
import { Crime } from "@/types/crime";
import { filterCrimes } from "@/lib/utils";

import CrimeMap from "@/components/map/CrimeMap";
import SearchCrimeBar from "@/components/search/SearchCrimeBar";
import CategoryFilters from "@/components/filters/CategoryFilters";
import ReportCrimeDialog from "@/components/dialogs/ReportCrimeDialog";

interface CrimeDashboardProps {
  initialCrimes: Crime[];
  query?: string;
  filter?: string;
}

export default function CrimeDashboard(props: CrimeDashboardProps) {
  // ** Destructure props
  const { initialCrimes, query, filter } = props;

  // ** States
  const [crimes, setCrimes] = useState(initialCrimes);

  // ** Filtered crimes
  const filteredCrimes = filterCrimes(crimes, query, filter);

  const handleAddCrime = (newCrime: Crime) => {
    setCrimes((prevCrimes) => [...prevCrimes, newCrime]);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="p-2 absolute top-15 z-10 w-full flex items-center justify-center">
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4 bg-white p-5 rounded-xl shadow-lg">
          <SearchCrimeBar />
          <CategoryFilters />
        </div>
      </div>
      <CrimeMap crimes={filteredCrimes} />
      <div className="absolute bottom-15 w-full flex items-center justify-center">
        <ReportCrimeDialog handleAddCrime={handleAddCrime} />
      </div>
    </main>
  );
}
