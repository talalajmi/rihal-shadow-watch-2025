import { crimes } from "@/database/crimes";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const index = crimes.findIndex((crime) => crime.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Crime not found." }, { status: 404 });
    }
    crimes.splice(index, 1);
    return NextResponse.json(crimes);
  } catch (error) {
    console.error("Error deleting crime:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the crime." },
      { status: 500 }
    );
  }
}
