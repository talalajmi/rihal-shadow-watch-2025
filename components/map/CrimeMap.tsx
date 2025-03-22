"use client";

import {
  Map,
  APIProvider,
  MapMouseEvent,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

import { Crime } from "@/types/crime";
import CrimeMapMarkers from "./CrimeMapMarkers";
import CrimeDetailsCard from "../cards/CrimeDetailsCard";
import { useState } from "react";

interface CrimeMapProps {
  crimes: Crime[];
  isUserSelectingLocation: boolean;
  setSelectedLocation: (location: { lat: number; lng: number }) => void;
  selectedLocation?: { lat: number; lng: number } | null;
}

const CrimeMap = (props: CrimeMapProps) => {
  // ** Destrcuture props
  const {
    crimes,
    isUserSelectingLocation,
    setSelectedLocation,
    selectedLocation,
  } = props;

  // ** States
  const [selectedCrime, setSelectedCrime] = useState<Crime | null>(null);

  // ** Constants
  const defaultCenter = { lat: 23.588, lng: 58.3829 };

  // ** Handle select location
  const handleSelectLocation = (event: MapMouseEvent) => {
    if (isUserSelectingLocation) {
      if (event.detail.latLng) {
        setSelectedLocation({
          lat: event.detail.latLng.lat,
          lng: event.detail.latLng.lng,
        });
      }
    }
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="w-full h-screen">
        <Map
          defaultZoom={12}
          disableDefaultUI={true}
          gestureHandling={"greedy"}
          defaultCenter={defaultCenter}
          onClick={handleSelectLocation}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
        >
          <CrimeMapMarkers
            crimes={crimes}
            handleMarkerClick={(crime) => setSelectedCrime(crime)}
          />

          {/* InfoWindow */}
          {selectedCrime && (
            <CrimeDetailsCard
              crime={selectedCrime}
              handleOnCloseClick={() => setSelectedCrime(null)}
            />
          )}

          {/* Selected Location Marker */}
          {selectedLocation && isUserSelectingLocation ? (
            <AdvancedMarker draggable position={selectedLocation} />
          ) : null}
        </Map>
      </div>
    </APIProvider>
  );
};

export default CrimeMap;
