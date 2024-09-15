"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  CubeTransparentIcon,
  SunIcon,
  MoonIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import useClickOutside from "@/hooks/useClickOutside";
import { useUIStore } from "@/components/providers/storesProvider";
import LoginForm from "@/components/forms/loginForm";
import { useTheme } from "next-themes";

const navItems = [
  {
    name: "Analytics",
    href: "/analytics",
    icon: ChartBarIcon,
    subItems: [
      { name: "Channels", href: "/analytics/channels" },
      { name: "Users", href: "/analytics/users" },
      { name: "Casts", href: "/analytics/casts" },
      { name: "Engagement", href: "/analytics/engagement" },
    ],
  },
  {
    name: "Insights",
    href: "/insights",
    icon: UserGroupIcon,
    subItems: [
      { name: "Trending Topics", href: "/insights/trending" },
      { name: "Influencer Analysis", href: "/insights/influencers" },
      { name: "Content Performance", href: "/insights/content" },
      { name: "Growth Patterns", href: "/insights/growth" },
    ],
  },
  {
    name: "Ecosystem",
    href: "/ecosystem",
    icon: GlobeAltIcon,
    subItems: [
      { name: "Network Overview", href: "/ecosystem/overview" },
      { name: "Apps and Integrations", href: "/ecosystem/apps" },
      { name: "Developer Resources", href: "/ecosystem/developers" },
    ],
  },
  { name: "Pricing", href: "/#pricing", icon: CubeTransparentIcon },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const menuRef = useRef(null);

  const { openModal } = useUIStore((state) => ({
    openModal: state.openModal,
  }));

  useClickOutside(menuRef, () => setIsMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenLoginModal = () => {
    openModal({
      component: LoginForm,
      props: {},
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight flex items-center"
          >
            <span className="text-primary mr-2">Far</span>
            <span className="text-foreground">Sight</span>
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.name}</span>
                </Link>
                {item.subItems && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 py-2 bg-background rounded-md shadow-lg border border-border min-w-[200px]"
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => {}} // Implement search functionality
              className="p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-200"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-200"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={handleOpenLoginModal}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
          <button
            className="lg:hidden p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-2">
                  <Link
                    href={item.href}
                    className="flex items-center text-foreground/80 hover:text-foreground transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    <span>{item.name}</span>
                  </Link>
                  {item.subItems && (
                    <div className="ml-7 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-200"
                >
                  {theme === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={handleOpenLoginModal}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200"
                >
                  Sign in
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
