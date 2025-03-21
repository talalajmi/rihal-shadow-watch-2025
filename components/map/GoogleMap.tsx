"use client";

import {
  Map,
  APIProvider,
  MapCameraProps,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

import { Crime } from "@/types/crime";
import MapCrimeMarker from "./MapCrimeMarker";
import SearchCrimeBar from "../search/SearchCrimeBar";
import CategoryFilters from "../filters/CategoryFilters";
import CrimeDetailsCard from "../cards/CrimeDetailsCard";
import ReportCrimeDialog from "../dialogs/ReportCrimeDialog";
import { useCallback, useState, useMemo } from "react";

const INITIAL_CAMERA = {
  center: { lat: 23.588, lng: 58.3829 },
  zoom: 12,
};

interface GoogleMapProps {
  crimes: Crime[];
}

const GoogleMap = (props: GoogleMapProps) => {
  // ** Destrcuture props
  const { crimes } = props;

  // ** States
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);
  const [selectedCrime, setSelectedCrime] = useState<Crime | null>(null);

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => setCameraProps(ev.detail),
    []
  );

  const crimeMarkers = useMemo(
    () => (
      <MapCrimeMarker
        crimes={crimes}
        handleMarkerClick={(crime) => setSelectedCrime(crime)}
      />
    ),
    [crimes]
  );

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div style={{ height: "100vh", width: "100%", position: "relative" }}>
        <Map
          {...cameraProps}
          onCameraChanged={handleCameraChange}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
        >
          {crimeMarkers}

          {/* InfoWindow */}
          {selectedCrime && (
            <CrimeDetailsCard
              crime={selectedCrime}
              handleOnCloseClick={() => setSelectedCrime(null)}
            />
          )}
        </Map>
        <div className="absolute flex flex-col gap-5 top-20 z-10 w-full">
          <div className="px-2">
            <SearchCrimeBar />
          </div>
          <CategoryFilters />
        </div>
        <div className="absolute z-10 bottom-5 w-full flex items-center justify-center">
          <ReportCrimeDialog />
        </div>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
