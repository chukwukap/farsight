"use client";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Farcaster Influencer",
    content:
      "FarSight has revolutionized how I understand my audience. The insights are invaluable and have helped me create content that truly resonates with my followers.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Samantha Lee",
    role: "Community Manager",
    content:
      "The ecosystem overview feature has been a game-changer for our community management strategy. We've identified key partnerships and growth opportunities that we would have otherwise missed.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Michael Chen",
    role: "Content Creator",
    content:
      "I can't imagine managing my Farcaster presence without FarSight. The predictive AI has significantly improved our content strategy and helped us stay ahead of the curve.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function Testimonials() {
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
            What Our Users Say
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16">
            Don&apos;t just take our word for it - see what FarSight users have
            to say!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-card p-8 rounded-2xl shadow-lg flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="mb-6 flex-grow">{testimonial.content}</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
