"use client";

import { useState, useEffect } from "react";
import { ChannelAnalytics } from "@/types/channel";
import { LineChart, BarChart, PieChart } from "@/components/charts";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChannelIdPageClient({
  channelId,
}: {
  channelId: string;
}) {
  const [analytics, setAnalytics] = useState<ChannelAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/channel-analytics?channelId=${channelId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch channel analytics");
        }
        const data: ChannelAnalytics = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnalytics();
  }, [channelId]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!analytics) return <NoDataState />;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {analytics?.channel.name} Analytics
          </h1>
          <Link href="/channels">
            <Button variant="outline" className="flex items-center">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Channels
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Followers" value={analytics.channel.followerCount} />
          <StatCard
            title="Participants"
            value={analytics.channel.participants.length}
          />
          <StatCard title="Total Casts" value={analytics?.castsPerDay.length} />
          <StatCard
            title="Engagement Rate"
            value={`${analytics.engagementRate?.toFixed(2)}%`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChartCard title="Casts Per Day">
            <LineChart
              data={analytics.castsPerDay}
              xKey="date"
              yKey="count"
              title="Casts Per Day"
            />
          </ChartCard>
          <ChartCard title="Top Contributors">
            <BarChart
              data={analytics.topContributors}
              xKey="username"
              yKey="castCount"
              title="Top Contributors"
            />
          </ChartCard>
          <ChartCard title="Content Type Distribution">
            <PieChart
              data={analytics.contentTypeDistribution}
              title="Content Type Distribution"
            />
          </ChartCard>
          <ChartCard title="Most Active Hours">
            <BarChart
              data={analytics.mostActiveHours}
              xKey="hour"
              yKey="count"
              title="Most Active Hours"
            />
          </ChartCard>
          <ChartCard title="Follower Growth">
            <LineChart
              data={analytics.growthTrend}
              xKey="date"
              yKey="followerCount"
              title="Follower Growth"
            />
          </ChartCard>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Top Casts</h2>
          <div className="space-y-4">
            {analytics.topCasts.map((cast, index) => (
              <motion.div
                key={index}
                className="bg-card shadow rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-card-foreground mb-2">
                  {cast.text.substring(0, 100)}...
                </p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Likes: {cast.reactions.likes}</span>
                  <span>Recasts: {cast.reactions.recasts}</span>
                  <span>Replies: {cast.replies.count}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <motion.div
    className="bg-card shadow rounded-lg p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
      {title}
    </h3>
    <p className="text-3xl font-bold text-foreground">
      {value?.toLocaleString()}
    </p>
  </motion.div>
);

const ChartCard = ({
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    className="bg-card shadow rounded-lg p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const LoadingState = () => (
  <div className="flex items-center justify-center h-screen">
    <ArrowPathIcon className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const ErrorState = ({ error }: { error: string }) => (
  <div className="text-center py-10 text-destructive">
    <h2 className="text-2xl font-bold mb-2">Error</h2>
    <p>{error}</p>
  </div>
);

const NoDataState = () => (
  <div className="text-center py-10 text-muted-foreground">
    <h2 className="text-2xl font-bold mb-2">No Data Available</h2>
    <p>There is no analytics data available for this channel.</p>
  </div>
);
