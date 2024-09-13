import { getChannelInfo, getChannelCasts, getUser } from "@/lib/api/neynar";
import { Channel, ChannelAnalytics, Cast } from "@/types/";

export async function getChannelAnalytics(
  channelId: string
): Promise<ChannelAnalytics> {
  const channelInfo = await getChannelInfo(channelId);
  const casts = await fetchAllChannelCasts(channelId);

  const channel: Channel = {
    id: channelInfo.channel.id,
    name: channelInfo.channel.name,
    description: channelInfo.channel.description,
    imageUrl: channelInfo.channel.image_url,
    createdAt: channelInfo.channel.created_at,
    followerCount: channelInfo.channel.follower_count,
    castCount: channelInfo.channel.cast_count,
  };

  const newFollowers = calculateNewFollowers(casts);
  const castsPerDay = calculateCastsPerDay(casts);
  const engagementRate = calculateEngagementRate(casts);
  const topContributors = await getTopContributors(casts);
  const topCasts = getTopCasts(casts);
  const contentTypeDistribution = getContentTypeDistribution(casts);

  return {
    channel,
    newFollowers,
    castsPerDay,
    engagementRate,
    topContributors,
    topCasts,
    contentTypeDistribution,
  };
}

async function fetchAllChannelCasts(channelId: string): Promise<Cast[]> {
  let allCasts: Cast[] = [];
  let cursor: string | undefined;

  do {
    const response = await getChannelCasts(channelId, cursor);
    allCasts = allCasts.concat(response.casts);
    cursor = response.next?.cursor;
  } while (cursor);

  return allCasts;
}

function calculateNewFollowers(
  casts: Cast[]
): { date: string; count: number }[] {
  // Implement logic to calculate new followers over time
  // This is a placeholder implementation
  return casts.reduce((acc, cast) => {
    const date = new Date(cast.timestamp).toISOString().split("T")[0];
    const existingEntry = acc.find(
      (entry: { date: string }) => entry.date === date
    );
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, [] as { date: string; count: number }[]);
}

function calculateCastsPerDay(
  casts: Cast[]
): { date: string; count: number }[] {
  return casts.reduce((acc, cast) => {
    const date = new Date(cast.timestamp).toISOString().split("T")[0];
    const existingEntry = acc.find(
      (entry: { date: string }) => entry.date === date
    );
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, [] as { date: string; count: number }[]);
}

function calculateEngagementRate(casts: Cast[]): number {
  const totalEngagements = casts.reduce(
    (sum, cast) =>
      sum + cast.reactions.likes + cast.reactions.recasts + cast.replies.count,
    0
  );
  return totalEngagements / casts.length;
}

async function getTopContributors(
  casts: Cast[]
): Promise<{ username: string; castCount: number }[]> {
  const contributorMap = new Map<number, number>();
  casts.forEach((cast) => {
    contributorMap.set(
      cast.author.fid,
      (contributorMap.get(cast.author.fid) || 0) + 1
    );
  });

  const sortedContributors = Array.from(contributorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const topContributors = await Promise.all(
    sortedContributors.map(async ([fid, count]) => {
      const user = await getUser(fid);
      return { username: user.username, castCount: count };
    })
  );

  return topContributors;
}

function getTopCasts(casts: Cast[]): Cast[] {
  return casts
    .sort(
      (a, b) =>
        b.reactions.likes +
        b.reactions.recasts +
        b.replies.count -
        (a.reactions.likes + a.reactions.recasts + a.replies.count)
    )
    .slice(0, 5);
}

function getContentTypeDistribution(
  casts: Cast[]
): { type: string; percentage: number }[] {
  const typeCount = casts.reduce((acc, cast) => {
    const type = cast.embeds.length > 0 ? "Media" : "Text";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = casts.length;
  return Object.entries(typeCount).map(([type, count]) => ({
    type,
    percentage: ((count as number) / total) * 100,
  }));
}
