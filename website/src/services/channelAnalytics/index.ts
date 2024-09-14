import { queryAirstack } from "@/lib/api/airstack";
import {
  FarcasterChannel,
  FarcasterCast,
  ChannelAnalytics,
} from "@/types/channel";
const GET_CHANNEL_CASTS = `
 query FetchChannelCasts($limit: Int, $channelId: String, $cursor: String) {
  FarcasterCasts(input: {blockchain: ALL, filter: {rootParentUrl: {_eq: $channelId}}, limit: $limit, cursor: $cursor}) {
    Cast {
      castedAtTimestamp
      url
      text
      numberOfReplies
      numberOfRecasts
      numberOfLikes
      fid
      castedBy {
        profileName
      }
      channel {
        name
      }
    }
    pageInfo {
      prevCursor
      nextCursor
      hasPrevPage
      hasNextPage
    }
  }
}
`;

const GET_CHANNEL_FOLLOWERS = `
 query FetchChannelFollowers($channelId: String!, $limit: Int = 50, $cursor: String) {
  FarcasterChannelParticipants(
    input: {
      filter: {channelId: {_eq: $channelId}, channelActions: {_eq: follow}}, 
      blockchain: ALL, 
      limit: $limit, 
      cursor: $cursor
    }
  ) {
    pageInfo {
      prevCursor
      nextCursor
      hasPrevPage
      hasNextPage
    }
    FarcasterChannelParticipant {
      id
      dappName
      dappSlug
      channelId
      channelName
      participantId
      lastActionTimestamp
      lastRepliedTimestamp
      lastCastedTimestamp
      lastFollowedTimestamp
      channelActions
      participant {
        id
        chainId
        dappName
        dappSlug
        fnames
        userId
        userAddress
        userCreatedAtBlockTimestamp
        userCreatedAtBlockNumber
        userLastUpdatedAtBlockTimestamp
        userLastUpdatedAtBlockNumber
        userHomeURL
        userRecoveryAddress
        profileName
        profileTokenId
        profileTokenAddress
        profileCreatedAtBlockTimestamp
        profileCreatedAtBlockNumber
        profileLastUpdatedAtBlockTimestamp
        profileLastUpdatedAtBlockNumber
        profileTokenUri
        profileImageContentValue {
          image {
            extraSmall
            small
            medium
            large
            original
          }
          video {
            original
          }
          audio {
            original
          }
          json
          animation_url {
            original
          }
        }
        coverImageContentValue {
          image {
            extraSmall
            small
            medium
            large
            original
          }
          video {
            original
          }
          audio {
            original
          }
          json
          animation_url {
            original
          }
        }
        profileTokenIdHex
        handleTokenAddress
        handleTokenId
        metadataURI
        profileMetadata
        coverImageURI
        twitterUserName
        website
        location
        profileHandle
        isDefault
        identity
        followerTokenAddress
        followingCount
        followerCount
        profileBio
        profileDisplayName
        profileImage
        profileUrl
        userAddressDetails {
          addresses
          
          socialFollowings{
Following{
  followerProfileId
}}
          identity
        }
        updatedAt
        socialCapital {
          socialCapitalScoreRaw
          socialCapitalScore
          socialCapitalRank
        }
      }
    }
  }
}
`;

const GET_CHANNEL_INFO = `
 query GetChannelDetails($channelId: String!) {
  FarcasterChannels(
    input: {blockchain: ALL, filter: {channelId: {_eq: $channelId}}}
  ) {
    FarcasterChannel {
      id
      dappName
      dappSlug
      channelId
      name
      url
      description
      imageUrl
      leadIds
      leadProfiles {
        id
        profileName
        profileBio
        profileDisplayName
        profileImage
        profileUrl
        twitterUserName
        website
        location
        farcasterScore{
          farScore
        }
      }
      moderatorIds
      moderatorProfiles {
        id
        profileName
        profileBio
        profileDisplayName
        profileImage
        profileUrl
        twitterUserName
        website
        location
         farcasterScore {
          farScore
        }
      }
      isModerationEnabled
      createdAtTimestamp
      followerCount
      participants {
        id
        participantId
        lastActionTimestamp
        lastRepliedTimestamp
        lastCastedTimestamp
        lastFollowedTimestamp
        channelActions
        participant {
          id
          profileName
          profileBio
          profileDisplayName
          profileImage
          profileUrl
          twitterUserName
          website
          location
          farcasterScore {
            farScore
          }
        }
      }
    }
  }
}
  `;

// const GET_ALL_CHANNELS = `query FetchAllWarpcastChannels {
//   FarcasterChannels(input: {blockchain: ALL, limit: 50}) {
//     FarcasterChannel {
//       id
//       dappName
//       dappSlug
//       channelId
//       name
//       url
//       description
//       imageUrl
//       leadIds
//       leadProfiles {
//         id
//         profileName
//         profileBio
//         profileDisplayName
//         profileImage
//         profileUrl
//         profileTokenAddress
//       }
//       moderatorIds
//       moderatorProfiles {
//         id
//         profileName
//         profileBio
//         profileDisplayName
//         profileImage
//         profileUrl
//         profileHandle
//       }
//       isModerationEnabled
//       createdAtTimestamp
//       followerCount
//       participants {
//         id
//         dappName
//         dappSlug
//         channelId
//         channelName
//         participantId
//         participant {
//           id
//           profileName
//           profileBio
//           profileDisplayName
//           profileImage
//           profileUrl
//           farcasterScore {
//             farRank
//           }
//         }
//         lastActionTimestamp
//         lastRepliedTimestamp
//         lastCastedTimestamp
//         lastFollowedTimestamp
//         channelActions
//       }
//     }
//   }
// }`;

export async function getChannelAnalytics(
  channelId: string
): Promise<ChannelAnalytics> {
  const channelInfo = await getChannelInfo(channelId);

  const casts = await getAllChannelCasts(channelId);

  const followers = await getAllChannelFollowers(channelId);

  const castsPerDay = calculateCastsPerDay(casts);
  const engagementRate = calculateEngagementRate(casts);
  const topContributors = getTopContributors(casts);
  const topCasts = getTopCasts(casts);
  const contentTypeDistribution = getContentTypeDistribution(casts);
  const mostActiveHours = getMostActiveHours(casts);
  const growthTrend = calculateGrowthTrend(followers);

  return {
    channel: channelInfo,
    castsPerDay,
    engagementRate,
    topContributors,
    topCasts,
    contentTypeDistribution,
    mostActiveHours,
    growthTrend,
  };
}

async function getChannelInfo(channelId: string): Promise<FarcasterChannel> {
  const response = await queryAirstack(GET_CHANNEL_INFO, { channelId });
  return response.FarcasterChannels.FarcasterChannel[0];
}

async function getAllChannelCasts(channelId: string): Promise<FarcasterCast[]> {
  const limit = 5; // Adjust this value based on your needs
  const response = await queryAirstack(GET_CHANNEL_CASTS, { channelId, limit });
  return response.FarcasterCasts.Cast;
}
async function getAllChannelFollowers(channelId: string): Promise<unknown[]> {
  const limit = 5; // Adjust this value based on your needs
  const response = await queryAirstack(GET_CHANNEL_FOLLOWERS, {
    channelId,
    limit,
  });
  return response.FarcasterChannelParticipants.FarcasterChannelParticipant;
}

function calculateCastsPerDay(
  casts: FarcasterCast[]
): { date: string; count: number }[] {
  const castsPerDay = casts.reduce((acc, cast) => {
    const date = new Date(cast.timestamp).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(castsPerDay)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function calculateEngagementRate(casts: FarcasterCast[]): number {
  const totalEngagements = casts.reduce(
    (sum, cast) =>
      sum + cast.reactions.likes + cast.reactions.recasts + cast.replies.count,
    0
  );
  return totalEngagements / casts.length;
}

function getTopContributors(
  casts: FarcasterCast[]
): { username: string; castCount: number }[] {
  const contributorMap = new Map<string, number>();
  casts.forEach((cast) => {
    contributorMap.set(
      cast.author.username,
      (contributorMap.get(cast.author.username) || 0) + 1
    );
  });

  return Array.from(contributorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([username, castCount]) => ({ username, castCount }));
}

function getTopCasts(casts: FarcasterCast[]): FarcasterCast[] {
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
  casts: FarcasterCast[]
): { type: string; percentage: number }[] {
  const typeCount = casts.reduce((acc, cast) => {
    const type = cast.text.includes("http") ? "Media" : "Text";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = casts.length;
  return Object.entries(typeCount).map(([type, count]) => ({
    type,
    percentage: (count / total) * 5,
  }));
}

function getMostActiveHours(
  casts: FarcasterCast[]
): { hour: number; count: number }[] {
  const hourCounts = casts.reduce((acc, cast) => {
    const hour = new Date(cast.timestamp).getUTCHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return Object.entries(hourCounts)
    .map(([hour, count]) => ({ hour: parseInt(hour), count }))
    .sort((a, b) => b.count - a.count);
}

function calculateGrowthTrend(
  followers: any[]
): { date: string; followerCount: number }[] {
  const sortedFollowers = followers.sort(
    (a, b) =>
      new Date(a.lastActionTimestamp).getTime() -
      new Date(b.lastActionTimestamp).getTime()
  );

  let followerCount = 0;
  const growthTrend = sortedFollowers.reduce((acc, follower) => {
    followerCount++;
    const date = new Date(follower.lastActionTimestamp)
      .toISOString()
      .split("T")[0];
    acc[date] = followerCount;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(growthTrend)
    .map(([date, count]) => ({ date, followerCount: count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
