"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const plans = [
  {
    name: "Starter",
    monthlyPrice: "Free",
    yearlyPrice: "Free",
    features: [
      "Basic analytics",
      "Up to 1,000 followers",
      "Daily data updates",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: "$29",
    yearlyPrice: "$290",
    features: [
      "Advanced analytics",
      "Unlimited followers",
      "Real-time data updates",
      "Priority support",
      "AI-powered insights",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    features: [
      "Custom analytics",
      "Dedicated account manager",
      "API access",
      "24/7 phone support",
      "Custom integrations",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-20 bg-background" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Choose Your Plan
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-12">
          Unlock the full potential of your Farcaster presence with our flexible
          pricing options.
        </p>
        <div className="flex justify-center items-center mb-12">
          <Label htmlFor="pricing-toggle" className="mr-4">
            Monthly
          </Label>
          <Switch
            id="pricing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label htmlFor="pricing-toggle" className="ml-4">
            Yearly (Save 20%)
          </Label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`bg-card p-8 rounded-lg shadow-lg ${
                plan.highlighted
                  ? "border-2 border-primary ring-4 ring-primary ring-opacity-20"
                  : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                <span className="text-lg font-normal text-muted-foreground">
                  /{isYearly ? "year" : "month"}
                </span>
              </p>
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                size="lg"
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
