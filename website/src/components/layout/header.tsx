"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useClickOutside from "@/hooks/useClickOutside";
import { useUIStore } from "@/components/providers/storesProvider";
import LoginForm from "@/components/forms/loginForm";

const navItems = [
  { name: "Analytics", href: "#analytics", icon: ChartBarIcon },
  { name: "Insights", href: "#insights", icon: UserGroupIcon },
  { name: "Ecosystem", href: "#ecosystem", icon: GlobeAltIcon },
  { name: "Pricing", href: "#pricing", icon: CubeTransparentIcon },
];

const productDropdown = [
  { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
  { name: "Reports", href: "/reports", icon: UserGroupIcon },
  { name: "Integrations", href: "/integrations", icon: GlobeAltIcon },
  { name: "API", href: "/api", icon: CubeTransparentIcon },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const menuRef = useRef(null);
  const productDropdownRef = useRef(null);

  const { openModal } = useUIStore((state) => ({
    openModal: state.openModal,
  }));

  useClickOutside(menuRef, () => setIsMenuOpen(false));
  useClickOutside(productDropdownRef, () => setIsProductDropdownOpen(false));

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight flex items-center transition-transform hover:scale-105"
          >
            <span className="text-accent mr-2">Far</span>
            <span
              className={isScrolled ? "text-primary-foreground" : "text-white"}
            >
              Sight
            </span>
          </Link>
          <div className="hidden lg:flex space-x-1">
            <div className="relative group" ref={productDropdownRef}>
              <button
                className={`px-4 py-2 rounded-md flex items-center ${
                  isScrolled
                    ? "text-primary-foreground/80 hover:text-primary-foreground"
                    : "text-white/80 hover:text-white"
                } transition-colors font-medium hover:bg-white/10`}
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              >
                Product
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              <AnimatePresence>
                {isProductDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                  >
                    {productDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <item.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-primary" />
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-md flex items-center ${
                  isScrolled
                    ? "text-primary-foreground/80 hover:text-primary-foreground"
                    : "text-white/80 hover:text-white"
                } transition-colors font-medium hover:bg-white/10`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="secondary"
              className="transition-transform hover:scale-105"
              onClick={handleOpenLoginModal}
            >
              Sign in
            </Button>
          </div>
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isScrolled
                ? "text-primary-foreground hover:bg-primary-foreground/10"
                : "text-white hover:bg-white/10"
            }`}
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
            className="lg:hidden bg-primary border-t border-primary-foreground/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <button
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium text-left flex items-center"
                  onClick={() =>
                    setIsProductDropdownOpen(!isProductDropdownOpen)
                  }
                >
                  Product
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </button>
                <AnimatePresence>
                  {isProductDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col space-y-2"
                    >
                      {productDropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center"
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium flex items-center"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full mb-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleOpenLoginModal}
              >
                Log In
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
