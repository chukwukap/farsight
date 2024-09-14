"use client";

import { AuthKitProvider } from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";

export const FarcasterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const config = {
    rpcUrl: "https://mainnet.optimism.io",
    domain: process.env.NEXT_PUBLIC_DOMAIN || "localhost",
    siweUri:
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/login` ||
      "http://localhost:3000/api/login",
  };

  return <AuthKitProvider config={config}>{children}</AuthKitProvider>;
};
