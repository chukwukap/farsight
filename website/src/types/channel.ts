export interface FarcasterChannel {
  id: string;
  dappName: string;
  dappSlug: string;
  channelId: string;
  name: string;
  url: string;
  description: string;
  imageUrl: string;
  followerCount: number;
  createdAtTimestamp: string;
  leadIds: string[];
  moderatorIds: string[];
  isModerationEnabled: boolean;
  participants: {
    participantId: string;
    participant: {
      profileName: string;
    };
  }[];
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
