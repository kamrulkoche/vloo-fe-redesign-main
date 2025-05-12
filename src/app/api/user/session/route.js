import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const body = await request.json();

    // Get the current session
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Since direct session update is not available in the newer Auth.js,
    // we'll return the data that was sent and let the client handle it
    return NextResponse.json({
      success: true,
      data: body,
    });
  } catch (error) {
    console.error("Session update error:", error);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 },
    );
  }
}
