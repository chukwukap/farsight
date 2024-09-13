import { NextResponse } from "next/server";
// import { getChannelAnalytics } from "@/services/channelAnalytics";

// export async function GET(
//   request: Request,
//   { params }: { params: { channelId: string } }
// ) {
//   try {
//     const channelAnalytics = await getChannelAnalytics(params.channelId);
//     return NextResponse.json(channelAnalytics);
//   } catch (error) {
//     console.error("Error fetching channel analytics:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch channel analytics" },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
// request: Request,
// { params }: { params: { channelId: string } }
  return NextResponse.json({ message: "Hello, Next.js!" });
}
