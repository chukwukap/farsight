import ChannelIdPageClient from "./_components/channelIdPageClient";

export default function ChannelPage({
  params,
}: {
  params: { channelId: string };
}) {
  return <ChannelIdPageClient channelId={params.channelId} />;
}
