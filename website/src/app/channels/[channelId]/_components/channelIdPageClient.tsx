import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUIStore } from "@/components/providers/storesProvider";
import { getChannelAnalytics } from "@/services/channelAnalytics";
import dynamic from "next/dynamic";
import { ChannelAnalytics } from "@/types/channel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  ShareIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  MessageSquareIcon,
} from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Skeleton } from "@/components/ui/skeleton";
import DataDisclaimerModal from "@/components/modals/dataDisclaimerModal";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChannelIdPageClient: React.FC<{ channelId: string }> = ({
  channelId,
}) => {
  const [analytics, setAnalytics] = useState<ChannelAnalytics | null>(null);
  const setLoading = useUIStore((state) => state.setLoading);
  const openModal = useUIStore((state) => state.openModal);
  const closeModal = useUIStore((state) => state.closeModal);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const data = await getChannelAnalytics(channelId);
        setAnalytics(data);
        openModal({
          component: DataDisclaimerModal,
          props: { onClose: closeModal },
        });
      } catch (error) {
        console.error("Error fetching channel analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [channelId, setLoading, openModal, closeModal]);

  if (!analytics) return <AnalyticsSkeleton />;

  const followerGrowthOptions = {
    chart: {
      type: "area" as const,
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    stroke: { curve: "smooth" as const, width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: "datetime" as const,
      labels: {
        style: {
          colors: "var(--color-muted-foreground)",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "var(--color-muted-foreground)",
        },
      },
    },
    tooltip: { x: { format: "dd MMM yyyy" } },
    colors: ["var(--color-primary)"],
  };

  const engagementOptions = {
    chart: {
      type: "bar" as const,
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Likes", "Comments", "Recasts", "Quotes"],
      labels: {
        style: {
          colors: "var(--color-muted-foreground)",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "var(--color-muted-foreground)",
        },
      },
    },
    colors: ["var(--color-secondary)"],
  };

  const contentTypeOptions = {
    chart: {
      type: "pie" as const,
      fontFamily: "inherit",
    },
    labels: ["Text", "Media", "Links"],
    colors: [
      "var(--color-primary)",
      "var(--color-secondary)",
      "var(--color-accent)",
    ],
    legend: {
      position: "bottom" as const,
      labels: {
        colors: "var(--color-foreground)",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {analytics.channel.name} Analytics
        </h1>
        <div className="flex space-x-4">
          <DateRangePicker />
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="outline">
            <ShareIcon className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Followers"
          value={analytics.channel.followerCount}
          change={
            analytics.growthTrend[analytics.growthTrend.length - 1]
              .followerCount - analytics.growthTrend[0].followerCount
          }
          icon={<UsersIcon />}
        />
        <StatCard
          title="Engagement Rate"
          value={`${(analytics.engagementRate * 100).toFixed(2)}%`}
          change={2.5}
          icon={<MessageSquareIcon />}
        />
        <StatCard
          title="Total Casts"
          value={analytics.castsPerDay.reduce((sum, day) => sum + day.count, 0)}
          change={
            analytics.castsPerDay[analytics.castsPerDay.length - 1].count -
            analytics.castsPerDay[0].count
          }
          icon={<MessageSquareIcon />}
        />
        <StatCard
          title="Active Contributors"
          value={analytics.topContributors.length}
          change={2}
          icon={<UsersIcon />}
        />
      </div>

      <Tabs defaultValue="growth" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth">Follower Growth</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content">Content Analysis</TabsTrigger>
          <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
        </TabsList>
        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                options={followerGrowthOptions}
                series={[
                  {
                    name: "Followers",
                    data: analytics.growthTrend.map((day) => [
                      new Date(day.date).getTime(),
                      day.followerCount,
                    ]),
                  },
                ]}
                type="area"
                height={350}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                options={engagementOptions}
                series={[
                  {
                    data: [
                      analytics.topCasts.reduce(
                        (sum, cast) => sum + cast.reactions.likes,
                        0
                      ),
                      analytics.topCasts.reduce(
                        (sum, cast) => sum + cast.replies.count,
                        0
                      ),
                      analytics.topCasts.reduce(
                        (sum, cast) => sum + cast.reactions.recasts,
                        0
                      ),
                      0,
                    ],
                  },
                ]}
                type="bar"
                height={350}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  options={contentTypeOptions}
                  series={analytics.contentTypeDistribution.map(
                    (type) => type.percentage
                  )}
                  type="pie"
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Most Active Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  options={{
                    ...followerGrowthOptions,
                    xaxis: {
                      categories: analytics.mostActiveHours.map(
                        (hour) => hour.hour
                      ),
                      labels: {
                        style: {
                          colors: "var(--color-muted-foreground)",
                        },
                      },
                    },
                    yaxis: {
                      labels: {
                        style: {
                          colors: "var(--color-muted-foreground)",
                        },
                      },
                    },
                  }}
                  series={[
                    {
                      name: "Casts",
                      data: analytics.mostActiveHours.map((hour) => hour.count),
                    },
                  ]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="contributors">
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Username</th>
                      <th className="text-left py-2">Cast Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.topContributors.map((contributor, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{contributor.username}</td>
                        <td className="py-2">{contributor.castCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
}> = ({ title, value, change, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p
        className={`text-xs ${
          change >= 0 ? "text-green-500" : "text-red-500"
        } flex items-center`}
      >
        {change >= 0 ? (
          <TrendingUpIcon className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDownIcon className="w-4 h-4 mr-1" />
        )}
        {Math.abs(change)}
      </p>
    </CardContent>
  </Card>
);

const AnalyticsSkeleton: React.FC = () => (
  <div className="container mx-auto px-4 py-8 space-y-8">
    <Skeleton className="h-10 w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32" />
      ))}
    </div>
    <Skeleton className="h-[400px]" />
  </div>
);

export default ChannelIdPageClient;
