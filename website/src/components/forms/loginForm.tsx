import React, { useState } from "react";
import { motion } from "framer-motion";

import { SignInButton } from "@farcaster/auth-kit";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface SignInModalProps {
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        Welcome to FarSight
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        Sign in to access advanced analytics and insights for your Farcaster
        channels.
      </p>

      <div className="space-y-4 flex flex-col items-center">
        <SignInButton
          onSuccess={({ fid, username }) => {
            console.log(`Signed in: ${username} (${fid})`);
            onClose();
          }}
          onError={(error) => {
            console.error("Error signing in:", error);
            setError("An error occurred during sign-in. Please try again.");
          }}
        ></SignInButton>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md flex items-center text-red-800"
        >
          <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      <p className="text-center text-sm text-muted-foreground mt-8">
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
};

export default SignInModal;
