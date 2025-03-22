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
      return "bg-gray-500/10 text-gray-500";
    case "En Route":
      return "bg-blue-500/10 text-blue-500";
    case "On Scene":
      return "bg-indigo-500/10 text-indigo-500";
    case "Under Investigation":
      return "bg-orange-500/10 text-orange-500";
    case "Resolved":
      return "bg-green-500/10 text-green-500";
    default:
      return "bg-gray-500/10 text-gray-500";
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
      headerContent={<h3 className="text-xl font-bold mb-3">Crime Details</h3>}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-2">
          <div className="flex items-center flex-col sm:flex-row gap-2">
            <div
              className={`rounded-full bg-gray-100 p-2
            ${crimeStatusColor(crime.report_status)}
              `}
            >
              <Image
                width={35}
                height={35}
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
            className={`font-bold px-3 py-2 rounded-full w-full text-center sm:w-fit ${crimeStatusColor(
              crime.report_status
            )}`}
          >
            {crime.report_status}
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-2 items-start">
          <p className="font-bold text-gray-700 text-lg">Report:</p>
          <span className="font-normal text-base">{crime.report_details}</span>
        </div>
      </div>
    </InfoWindow>
  );
};

export default CrimeDetailsCard;
