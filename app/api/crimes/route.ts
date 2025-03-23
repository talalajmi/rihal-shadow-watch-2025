import { crimes } from "@/database/crimes";
import { getCurrentTimestamp } from "@/lib/utils";
import { Crime } from "@/types/crime";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // ** Read the current crimes from the file
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

    // ** Convert form data to Crime type
    const newCrime: Crime = {
      id: crimes.length + 1,
      report_details: formData.report_details,
      crime_type: formData.crime_type,
      report_date_time: getCurrentTimestamp(),
      report_status: "Pending",
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    // ** Add the new crime to the array
    crimes.push(newCrime);

    return NextResponse.json(newCrime);
  } catch (error) {
    console.error("Error adding crime:", error);
    return NextResponse.json(
      { error: "An error occurred while adding the crime." },
      { status: 500 }
    );
  }
}
