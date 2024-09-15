"use client";

import React, { useState } from "react";
import ChannelsList from "./channelsList";
import { ChannelSearch } from "./searchChannel";
import { FarcasterChannel } from "@/types/channel";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartBarIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

interface ChannelsPageClientProps {
  initialChannels: FarcasterChannel[];
}

export default function ChannelsPageClient({
  initialChannels,
}: ChannelsPageClientProps) {
  const [channels] = useState<FarcasterChannel[]>(initialChannels);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <section className="bg-gradient-to-r from-primary to-secondary py-12 px-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Discover and Analyze Farcaster Channels
        </h2>
        <div className="max-w-3xl mx-auto">
          <ChannelSearch />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<ChartBarIcon className="h-8 w-8 text-primary" />}
          title="Growth Metrics"
          description="Track follower count trends and engagement rates over time"
        />
        <FeatureCard
          icon={<UsersIcon className="h-8 w-8 text-primary" />}
          title="User Participation"
          description="Identify top contributors and analyze user behavior patterns"
        />
        <FeatureCard
          icon={<ArrowTrendingUpIcon className="h-8 w-8 text-primary" />}
          title="Content Analysis"
          description="Evaluate performance of different content types and topics"
        />
        <FeatureCard
          icon={<LightBulbIcon className="h-8 w-8 text-primary" />}
          title="Actionable Insights"
          description="Get AI-powered recommendations to optimize your channel strategy"
        />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">
          Top Farcaster Channels{" "}
          <span className="text-muted-foreground text-sm font-normal">
            (by follower count)
          </span>
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Explore the most popular channels on Farcaster and gain insights into
          their success strategies.
        </p>
        <ChannelsList channels={channels} />
      </section>

      <section className="bg-muted p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">
          Why Choose FarSight Analytics?
        </h2>
        <ul className="list-disc list-inside space-y-4 text-lg">
          <li>Comprehensive channel performance metrics</li>
          <li>Real-time data updates and historical trend analysis</li>
          <li>Advanced visualizations for easy interpretation</li>
          <li>Comparative analytics with similar channels</li>
          <li>Predictive insights for content strategy optimization</li>
          <li>Integration with other Farcaster ecosystem tools</li>
        </ul>
      </section>
    </motion.div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
