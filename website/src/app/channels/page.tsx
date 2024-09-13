// "use client";

// import { useState, useEffect } from "react";
// import { ChannelAnalytics } from "@/types/";
// // import { LineChart, BarChart, PieChart } from "@/components/Charts";

// export default function ChannelAnalyticsComponent({
//   channelId,
// }: {
//   channelId: string;
// }) {
//   const [analytics, setAnalytics] = useState<ChannelAnalytics | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchAnalytics() {
//       try {
//         setIsLoading(true);
//         const response = await fetch(`/api/channel-analytics/${channelId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch channel analytics");
//         }
//         const data: ChannelAnalytics = await response.json();
//         setAnalytics(data);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "An unknown error occurred"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchAnalytics();
//   }, [channelId]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!analytics) return <div>No data available</div>;

//   return (
//     <div className="channel-analytics">
//       <h1>{analytics.channel.name} Analytics</h1>
//       <div className="analytics-grid">
//         <div className="analytics-card">
//           <h2>Channel Overview</h2>
//           <p>Followers: {analytics.channel.followerCount}</p>
//           <p>Total Casts: {analytics.channel.castCount}</p>
//           <p>Engagement Rate: {analytics.engagementRate.toFixed(2)}</p>
//         </div>
//         <div className="analytics-card">
//           <h2>New Followers Over Time</h2>
//           <LineChart data={analytics.newFollowers} xKey="date" yKey="count" />
//         </div>
//         <div className="analytics-card">
//           <h2>Casts Per Day</h2>
//           <BarChart data={analytics.castsPerDay} xKey="date" yKey="count" />
//         </div>
//         <div className="analytics-card">
//           <h2>Top Contributors</h2>
//           <ul>
//             {analytics.topContributors.map((contributor, index) => (
//               <li key={index}>
//                 {contributor.username}: {contributor.castCount} casts
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="analytics-card">
//           <h2>Content Type Distribution</h2>
//           <PieChart data={analytics.contentTypeDistribution} />
//         </div>
//         <div className="analytics-card">
//           <h2>Top Casts</h2>
//           <ul>
//             {analytics.topCasts.map((cast, index) => (
//               <li key={index}>
//                 <p>{cast.text.substring(0, 100)}...</p>
//                 <p>
//                   Likes: {cast.reactions.likes}, Recasts:{" "}
//                   {cast.reactions.recasts}, Replies: {cast.replies.count}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Channels() {
  return <div>Channels</div>;
}
