"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useUIStore } from "@/components/providers/storesProvider";
import LoginForm from "@/components/forms/loginForm";

export default function Hero() {
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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-secondary dark:from-background dark:to-card">
      <div className="container mx-auto px-4 relative z-10 text-center text-primary-foreground dark:text-foreground">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Unlock the Power of{" "}
          <span className="text-accent dark:text-accent">
            Farcaster Analytics
          </span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Gain deep insights into your Farcaster presence and the entire
          ecosystem with AI-powered analytics
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90"
            onClick={handleOpenLoginModal}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            disabled
            className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/20 dark:text-foreground dark:border-foreground dark:hover:bg-foreground/20"
          >
            Watch Demo
          </Button>
        </motion.div>
        <Stats />
      </div>
    </section>
  );
}

function Stats() {
  const [stats, setStats] = useState({
    users: 0,
    insights: 0,
    dataPoints: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => ({
        users: Math.min(prevStats.users + 17, 10000),
        insights: Math.min(prevStats.insights + 89, 500000),
        dataPoints: Math.min(prevStats.dataPoints + 1234, 10000000),
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {[
        {
          icon: UserGroupIcon,
          label: "Active Users",
          value: stats.users.toLocaleString(),
        },
        {
          icon: ChartBarIcon,
          label: "Insights Generated",
          value: stats.insights.toLocaleString(),
        },
        {
          icon: GlobeAltIcon,
          label: "Data Points Analyzed",
          value: stats.dataPoints.toLocaleString(),
        },
      ].map((stat, index) => (
        <div key={index} className="flex flex-col items-center">
          <stat.icon className="w-12 h-12 mb-4 text-accent dark:text-accent-foreground" />
          <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
          <p className="text-lg text-primary-foreground/80 dark:text-foreground/80">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
