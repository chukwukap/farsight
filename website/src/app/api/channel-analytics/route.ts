import { NextResponse, NextRequest } from "next/server";
import { getChannelAnalytics } from "@/services/channelAnalytics";

export const dynamic = "error"; // This will cause an error if the route ends up being dynamic

export async function GET(request: NextRequest) {
  try {
    const channelId = request.nextUrl.searchParams.get("channelId");
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
