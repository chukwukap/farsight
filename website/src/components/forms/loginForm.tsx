"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FarcasterIcon } from "@/components/ui/icons";
import { SignInButton } from "@farcaster/auth-kit";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFarcasterSignIn = async () => {
    console.log("Signing in with Farcaster. I'm being called");
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-8 bg-background rounded-lg border-2 border-gray-100">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary">Welcome to FarSight</h2>
        <p className="text-muted-foreground mt-2">
          Sign in to access your account
        </p>
      </div>

      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full h-12 text-lg font-medium"
          onClick={handleFarcasterSignIn}
          disabled={isLoading}
        >
          <FarcasterIcon className="mr-2 h-5 w-5" />
          Sign in with Farcaster
        </Button>
        <SignInButton
          onSuccess={({ fid, username }) =>
            console.log(`Hello, ${username}! Your fid is ${fid}.`)
          }
        />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        By signing in, you agree to our{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
