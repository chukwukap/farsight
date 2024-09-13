"use client";
import { motion } from "framer-motion";
import {
  ArrowPathIcon,
  ChartPieIcon,
  LightBulbIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: ArrowPathIcon,
    title: "Connect Your Account",
    description:
      "Seamlessly link your Farcaster account to FarSight with just a few clicks.",
    benefits: [
      "Secure OAuth integration",
      "Real-time data synchronization",
      "Privacy-focused data handling",
    ],
  },
  {
    icon: ChartPieIcon,
    title: "Analyze Your Data",
    description:
      "Our AI-powered analytics engine processes your Farcaster data in real-time.",
    benefits: [
      "Advanced machine learning algorithms",
      "Comprehensive engagement metrics",
      "Customizable dashboards",
    ],
  },
  {
    icon: LightBulbIcon,
    title: "Gain Actionable Insights",
    description:
      "Receive personalized recommendations to grow your Farcaster presence.",
    benefits: [
      "Tailored content suggestions",
      "Optimal posting times",
      "Audience growth strategies",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            How FarSight Works
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg md:text-xl">
            Discover how FarSight transforms your Farcaster data into actionable
            insights with our simple three-step process.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="bg-card p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full mb-6">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                {step.description}
              </p>
              <ul className="space-y-4">
                {step.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-3xl font-semibold mb-6">Ready to get started?</h3>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto text-lg md:text-xl">
            Join thousands of Farcaster users who are already leveraging
            FarSight to boost their online presence and engagement.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Try FarSight Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
