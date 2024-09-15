import { Suspense } from "react";
import ChannelIdPageClient from "./_components/channelIdPageClient";
import LoadingFallback from "@/components/loadingScreen";

export default function ChannelPage({
  params,
}: {
  params: { channelId: string };
}) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="pt-32">
        <ChannelIdPageClient channelId={params.channelId} />
      </div>
    </Suspense>
  );
}
