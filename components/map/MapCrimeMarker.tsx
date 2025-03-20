import { Crime } from "@/types/crime";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

const MapCrimeMarker = ({
  crimes,
  handleMarkerClick,
}: {
  crimes: Crime[];
  handleMarkerClick: (crime: Crime) => void;
}) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };
  return (
    <>
      {crimes.map((crime) => {
        const { id, latitude, longitude } = crime;
        const crimeLocation = { lat: latitude, lng: longitude };
        return (
          <AdvancedMarker
            key={id}
            position={crimeLocation}
            onClick={() => handleMarkerClick(crime)}
            ref={(marker) => setMarkerRef(marker, id.toString())}
          />
        );
      })}
    </>
  );
};

export default MapCrimeMarker;
