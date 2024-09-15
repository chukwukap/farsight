import React from "react";
import { getTopChannels } from "@/services/channelAnalytics";
import ChannelsPageClient from "./_components/channelsPageClient";

export const metadata = {
  title: "Farcaster Channel Analytics | FarSight",
  description:
    "Discover, analyze, and optimize Farcaster channels with comprehensive analytics and insights.",
};

export default async function ChannelsPage() {
  const channels = await getTopChannels(50);

  return (
    <div className="container mx-auto px-4 pb-0 pt-20">
      <h1 className="text-4xl font-bold mb-4 text-center pt-10">
        Farcaster Channel Analytics
      </h1>
      <p className="text-xl text-center text-muted-foreground mb-8">
        Unlock the potential of your Farcaster channels with data-driven
        insights
      </p>
      <ChannelsPageClient initialChannels={channels} />
    </div>
  );
}
