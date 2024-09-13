"use client";

import { motion } from "framer-motion";
import {
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  CubeTransparentIcon,
  ArrowRightIcon,
  LightBulbIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: ChartBarIcon,
    title: "Advanced Analytics",
    description:
      "Dive deep into your Farcaster data with powerful, customizable analytics tools. Track your growth, engagement, and reach with ease.",
    cta: "Explore Analytics",
  },
  {
    icon: UserGroupIcon,
    title: "Audience Insights",
    description:
      "Understand your followers and their engagement patterns like never before. Identify your most loyal supporters and discover new opportunities to connect.",
    cta: "Discover Insights",
  },
  {
    icon: GlobeAltIcon,
    title: "Ecosystem Overview",
    description:
      "Get a bird's-eye view of the entire Farcaster ecosystem and your place in it. Compare your performance to others in your niche.",
    cta: "View Ecosystem",
  },
  {
    icon: CubeTransparentIcon,
    title: "Predictive AI",
    description:
      "Leverage AI-powered insights to forecast trends and optimize your content strategy. Stay ahead of the curve with data-driven recommendations.",
    cta: "Unlock Predictions",
  },
  {
    icon: LightBulbIcon,
    title: "Actionable Insights",
    description:
      "Transform your data into actionable insights that drive results. Get clear, concise recommendations tailored to your unique goals.",
    cta: "Get Insights",
  },
  {
    icon: CogIcon,
    title: "Customizable Dashboards",
    description:
      "Create custom dashboards that showcase the metrics that matter most to you. Tailor your FarSight experience to your specific needs.",
    cta: "Customize Dashboards",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16">
            Supercharge your Farcaster presence with FarSight&apos;s
            comprehensive suite of tools
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-card p-8 rounded-2xl shadow-lg flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-primary text-primary-foreground p-4 rounded-full mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                {feature.description}
              </p>
              <motion.button
                className="text-primary font-semibold flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {feature.cta}
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
