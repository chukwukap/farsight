import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { FarcasterChannel } from "@/types/channel";

interface ChannelsListProps {
  channels: FarcasterChannel[];
}

export default function ChannelsList({ channels }: ChannelsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="bg-card text-card-foreground rounded-lg border border-border p-6"
        >
          <div className="flex items-center mb-4">
            <Image
              unoptimized
              src={channel.imageUrl}
              alt={channel.name}
              width={48}
              height={48}
              className="rounded-full mr-4"
            />
            <h2 className="text-xl font-semibold">{channel.name}</h2>
          </div>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {channel.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {channel.followerCount.toLocaleString()} followers
            </span>
            <Link href={`/analytics/channels/${channel.channelId}`}>
              <Button variant="outline" size="sm" className="flex items-center">
                <ChartBarIcon className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Created:{" "}
              {new Date(channel.createdAtTimestamp).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
            <p>
              Moderation: {channel.isModerationEnabled ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
