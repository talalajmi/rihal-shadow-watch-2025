import fs from "node:fs";
import path from "node:path";
import { Crime } from "@/types/crime";
import { NextResponse } from "next/server";

const getCurrentTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}-${hours}-${minutes}`;
};

export async function GET() {
  try {
    // ** Define the path to the crimes.json file
    const filePath = path.join(process.cwd(), "database", "crimes.json");

    // ** Read the file
    const fileContents = fs.readFileSync(filePath, "utf8");

    // ** Parse the JSON data - note we're accessing the crimes array property
    const data = JSON.parse(fileContents);
    const crimes = data.crimes;

    return NextResponse.json(crimes);
  } catch (error) {
    console.error("Error fetching crimes:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching crimes." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // ** Get the form data from the request
    const formData = await request.json();

    //  ** Read the current crimes from the file
    const filePath = path.join(process.cwd(), "database", "crimes.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    // ** Convert form data to Crime type
    const newCrime: Crime = {
      id: data.crimes.length + 1,
      report_details: formData.report_details,
      crime_type: formData.crime_type,
      report_date_time: getCurrentTimestamp(),
      report_status: "Pending",
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    // ** Add the new crime to the array
    data.crimes.push(newCrime);

    // ** Write the updated object back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(newCrime);
  } catch (error) {
    console.error("Error adding crime:", error);
    return NextResponse.json(
      { error: "An error occurred while adding the crime." },
      { status: 500 }
    );
  }
}
