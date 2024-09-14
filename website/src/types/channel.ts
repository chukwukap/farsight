export interface FarcasterChannel {
  channelId: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAtTimestamp: string;
  followerCount: number;
  participantsCount: number;
  castsCount: number;
}

export interface FarcasterCast {
  hash: string;
  threadHash: string;
  parentHash: string | null;
  author: {
    fid: string;
    username: string;
    displayName: string;
    pfp: {
      url: string;
    };
  };
  text: string;
  timestamp: string;
  reactions: {
    likes: number;
    recasts: number;
  };
  replies: {
    count: number;
  };
}

export interface ChannelAnalytics {
  channel: FarcasterChannel;
  castsPerDay: { date: string; count: number }[];
  engagementRate: number;
  topContributors: { username: string; castCount: number }[];
  topCasts: FarcasterCast[];
  contentTypeDistribution: { type: string; percentage: number }[];
  mostActiveHours: { hour: number; count: number }[];
  growthTrend: { date: string; followerCount: number }[];
}
