// const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
// const BASE_URL = "https://api.neynar.com/v2";

// async function neynarFetch(endpoint: string, options = {}) {
//   const url = `${BASE_URL}${endpoint}`;
//   const response = await fetch(url, {
//     ...options,
//     headers: {
//       ...options.headers,
//       api_key: NEYNAR_API_KEY,
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`Neynar API error: ${response.statusText}`);
//   }

//   return response.json();
// }

// export async function getChannelInfo(channelId: string) {
//   return neynarFetch(`/farcaster/channel?channel_id=${channelId}`);
// }

// export async function getChannelCasts(channelId: string, cursor?: string) {
//   return neynarFetch(
//     `/farcaster/feed?channel_id=${channelId}&cursor=${cursor || ""}`
//   );
// }
