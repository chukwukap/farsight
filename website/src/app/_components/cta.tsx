"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { useUIStore } from "@/components/providers/storesProvider";
import LoginForm from "@/components/forms/loginForm";

export default function CTA() {
  const { openModal } = useUIStore((state) => ({
    openModal: state.openModal,
  }));

  const handleOpenLoginModal = () => {
    openModal({
      component: LoginForm,
      props: {},
    });
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Supercharge Your Farcaster Presence?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of creators who are already leveraging
            FarSight&apos;s powerful analytics.
          </p>
          <Button
            size="lg"
            className="bg-accent text-primary hover:bg-accent/90"
            onClick={handleOpenLoginModal}
          >
            <RocketLaunchIcon className="w-6 h-6 mr-2" />
            Get Started Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
