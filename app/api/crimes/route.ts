import { crimes } from "@/database/crimes";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(crimes);
}
