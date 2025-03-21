import { Crime } from "@/types/crime";
import { useEffect, useRef, useState } from "react";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";

interface CrimeMapMarkersProps {
  crimes: Crime[];
  handleMarkerClick: (crime: Crime) => void;
}

const CrimeMapMarkers = (props: CrimeMapMarkersProps) => {
  // ** Destrcuture props
  const { crimes, handleMarkerClick } = props;

  // ** States
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

  // ** Hooks
  const map = useMap();
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

export default CrimeMapMarkers;
