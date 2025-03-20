import { Crime } from "@/types/crime";
import { InfoWindow } from "@vis.gl/react-google-maps";
import React from "react";

interface CrimeDetailCardProps {
  crime: Crime;
  handleOnCloseClick: () => void;
}

const CrimeDetailsCard = (props: CrimeDetailCardProps) => {
  // ** Destrcuture props
  const { crime, handleOnCloseClick } = props;

  return (
    <InfoWindow
      position={{
        lat: crime.latitude,
        lng: crime.longitude,
      }}
      onCloseClick={handleOnCloseClick}
    >
      <div>
        <h3>Crime Details</h3>
        <p>Report: {crime.report_details}</p>
        <p>Type: {crime.crime_type}</p>
        <p>Date: {crime.report_date_time}</p>
        <p>Status: {crime.report_status}</p>
      </div>
    </InfoWindow>
  );
};

export default CrimeDetailsCard;
