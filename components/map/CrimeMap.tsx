"use client";

import { Map, APIProvider } from "@vis.gl/react-google-maps";

import { Crime } from "@/types/crime";
import CrimeMapMarkers from "./CrimeMapMarkers";
import CrimeDetailsCard from "../cards/CrimeDetailsCard";
import { useState } from "react";

interface CrimeMapProps {
  crimes: Crime[];
}

const CrimeMap = (props: CrimeMapProps) => {
  // ** Destrcuture props
  const { crimes } = props;

  // ** States
  const [selectedCrime, setSelectedCrime] = useState<Crime | null>(null);

  // ** Constants
  const defaultCenter = { lat: 23.588, lng: 58.3829 };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="w-full h-screen">
        <Map
          defaultZoom={12}
          disableDefaultUI={true}
          gestureHandling={"greedy"}
          defaultCenter={defaultCenter}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
        >
          <CrimeMapMarkers
            crimes={crimes}
            handleMarkerClick={(crime) => setSelectedCrime(crime)}
          />

          {selectedCrime && (
            <CrimeDetailsCard
              crime={selectedCrime}
              handleOnCloseClick={() => setSelectedCrime(null)}
            />
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default CrimeMap;
