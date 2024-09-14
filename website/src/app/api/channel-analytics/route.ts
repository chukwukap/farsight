import { NextResponse } from "next/server";
import { getChannelAnalytics } from "@/services/channelAnalytics";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get("channelId");
    if (!channelId) {
      return NextResponse.json(
        { error: "Channel ID is required" },
        { status: 400 }
      );
    }
    const channelAnalytics = await getChannelAnalytics(channelId);
    console.log("channelAnalytics", channelAnalytics);
    return NextResponse.json(channelAnalytics);
  } catch (error) {
    console.error("Error fetching channel analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch channel analytics" },
      { status: 500 }
    );
  }
}
