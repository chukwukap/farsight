export interface Channel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  followerCount: number;
  castCount: number;
}

export interface Cast {
  hash: string;
  threadHash: string;
  parentHash: string | null;
  author: {
    fid: number;
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
  mentions: string[];
  embeds: unknown[];
}

export interface ChannelAnalytics {
  channel: Channel;
  newFollowers: { date: string; count: number }[];
  castsPerDay: { date: string; count: number }[];
  engagementRate: number;
  topContributors: { username: string; castCount: number }[];
  topCasts: Cast[];
  contentTypeDistribution: { type: string; percentage: number }[];
}
