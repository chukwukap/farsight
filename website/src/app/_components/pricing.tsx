import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$9",
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
    price: "$29",
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
    price: "Custom",
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
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`bg-card p-6 rounded-lg shadow-lg ${
                plan.highlighted ? "border-2 border-primary" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                <span className="text-lg font-normal text-muted-foreground">
                  /month
                </span>
              </p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
              >
                Choose Plan
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
