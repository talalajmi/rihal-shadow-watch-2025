import { Crime } from "@/types/crime";
import { crimes } from "@/database/crimes";
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
    const crimeData = await request.json();
    const newCrime: Crime = {
      id: crimes.length + 1,
      report_status: "Pending",
      report_date_time: getCurrentTimestamp(),
      ...crimeData,
    };
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
