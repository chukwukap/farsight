const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
const NEYNAR_API_URL = "https://api.neynar.com/v2/farcaster";

if (!NEYNAR_API_KEY) {
  throw new Error("NEYNAR_API_KEY is not set in environment variables");
}

async function neynarFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${NEYNAR_API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      //   api_key: NEYNAR_API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Neynar API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getChannelInfo(channelId: string) {
  return neynarFetch(`/channel?channel_id=${channelId}`);
}

export async function getChannelCasts(channelId: string, cursor?: string) {
  const params = new URLSearchParams({ channel_id: channelId });
  if (cursor) params.append("cursor", cursor);
  return neynarFetch(`/feed?${params.toString()}`);
}

export async function getUser(fid: number) {
  return neynarFetch(`/user?fid=${fid}`);
}
