"use client";
import Link from "next/link";
import { TwitterIcon, GithubIcon, LinkedinIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const quickLinks = ["Features", "How It Works", "Pricing"];
const legalLinks = ["Privacy Policy", "Terms of Service"];
const socialLinks = [
  { icon: TwitterIcon, href: "https://twitter.com/farsight" },
  { icon: GithubIcon, href: "https://github.com/farsight" },
  { icon: LinkedinIcon, href: "https://linkedin.com/company/farsight" },
];

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-primary">FarSight</h3>
            <p className="text-muted-foreground mb-6">
              Empowering Farcaster users with advanced analytics and insights.
            </p>
            <Button variant="outline" className="w-full">
              Get Started
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary">Connect</h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Stay updated with our latest features and announcements.
            </p>
          </motion.div>
        </div>
        <motion.div
          className="pt-8 border-t border-border text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            &copy; {new Date().getFullYear()} FarSight. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
