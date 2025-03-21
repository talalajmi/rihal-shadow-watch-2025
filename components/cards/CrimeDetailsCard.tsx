import { Crime } from "@/types/crime";
import { InfoWindow } from "@vis.gl/react-google-maps";
import Image from "next/image";
import React from "react";

interface CrimeDetailCardProps {
  crime: Crime;
  handleOnCloseClick: () => void;
}

// Pending, En Route, On Scene, Under Investigation, Resolved
const crimeStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-gray-500/20 text-gray-700";
    case "En Route":
      return "bg-blue-500/20 text-blue-700";
    case "On Scene":
      return "bg-indigo-500/20 text-indigo-700";
    case "Under Investigation":
      return "bg-orange-500/20 text-orange-700";
    case "Resolved":
      return "bg-green-500/20 text-green-700";
    default:
      return "bg-gray-500/20 text-gray-700";
  }
};

const convertDate = (date: string) => {
  const [year, month, day, hour, minute] = date.split("-");
  return `${day}/${month}/${year} - ${hour}:${minute}`;
};

const CrimeDetailsCard = (props: CrimeDetailCardProps) => {
  // ** Destrcuture props
  const { crime, handleOnCloseClick } = props;

  const crimePosition = { lat: crime.latitude, lng: crime.longitude };

  return (
    <InfoWindow
      className="p-3"
      position={crimePosition}
      onCloseClick={handleOnCloseClick}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gray-100 p-2">
              <Image
                width={24}
                height={24}
                alt="Crime"
                src={`/icons/${crime.crime_type}.png`}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">Crime Details</h3>
              <h3 className="text-gray-400 font-bold">
                {convertDate(crime.report_date_time)}
              </h3>
            </div>
          </div>
          <p className="font-bold text-gray-700">
            <span
              className={`ml-2 py-1 px-2 ${crimeStatusColor(
                crime.report_status
              )} rounded-full`}
            >
              {crime.report_status}
            </span>
          </p>
        </div>
        <hr />
        <p className="font-bold text-gray-700 text-[15px]">
          Report:
          <span className="font-normal ml-1">{crime.report_details}</span>
        </p>
        <p className="font-bold text-gray-700 text-[15px]">
          Type: <span className="font-normal ml-1">{crime.crime_type}</span>
        </p>
      </div>
    </InfoWindow>
  );
};

export default CrimeDetailsCard;
