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
      headerContent={<h3 className="text-xl font-bold">Crime Details</h3>}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-2">
          <div className="flex items-center flex-col sm:flex-row gap-2">
            <div className="rounded-full bg-gray-100 p-2">
              <Image
                width={30}
                height={30}
                alt="Crime"
                src={`/icons/${crime.crime_type.toLocaleLowerCase()}.png`}
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold">{crime.crime_type}</h3>
              <h3 className="text-gray-400 font-bold">
                {convertDate(crime.report_date_time)}
              </h3>
            </div>
          </div>
          <div
            className={`font-bold p-2 rounded-full w-full text-center sm:w-fit ${crimeStatusColor(
              crime.report_status
            )}`}
          >
            {crime.report_status}
          </div>
        </div>
        <hr />
        <p className="font-bold text-gray-700 text-[16px]">
          Report:
          <span className="font-normal ml-1">{crime.report_details}</span>
        </p>
      </div>
    </InfoWindow>
  );
};

export default CrimeDetailsCard;
