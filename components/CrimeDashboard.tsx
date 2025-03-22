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

interface LocationLatLng {
  lat: number;
  lng: number;
}

export default function CrimeDashboard(props: CrimeDashboardProps) {
  // ** Destructure props
  const { initialCrimes, query, filter } = props;

  // ** States
  const [crimes, setCrimes] = useState(initialCrimes);
  const [isUserSelectingLocation, setIsUserSelectingLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationLatLng | null>(null);

  // ** Filtered crimes
  const filteredCrimes = filterCrimes(crimes, query, filter);

  const handleAddCrime = (newCrime: Crime) => {
    setCrimes((prevCrimes) => [...prevCrimes, newCrime]);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="p-2 absolute top-10 z-10 w-full flex items-center justify-center">
        <div className="w-full md:max-w-[50rem] flex flex-col items-center gap-4 bg-white p-5 rounded-xl shadow-lg">
          <SearchCrimeBar />
          <CategoryFilters />
        </div>
      </div>
      <CrimeMap
        crimes={filteredCrimes}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        isUserSelectingLocation={isUserSelectingLocation}
      />
      <div className="absolute bottom-25 w-full flex items-center justify-center">
        <ReportCrimeDialog
          handleAddCrime={handleAddCrime}
          selectedLocation={selectedLocation}
          isUserSelectingLocation={isUserSelectingLocation}
          setIsUserSelectingLocation={setIsUserSelectingLocation}
        />
      </div>
    </main>
  );
}
