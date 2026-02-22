"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS_LEFT = [
  { name: "Services", href: "/#services" },
  { name: "Process", href: "/#process" },
  { name: "Capabilities", href: "/#capabilities" },
  { name: "Quality", href: "/#quality" },
];

const NAV_LINKS_RIGHT = [
  { name: "About", href: "/about" },
  { name: "Track Order", href: "/tracking" },
];

const HEADER_HEIGHT = 72;

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const hash = href.substring(hashIndex + 1);
      const basePath = href.substring(0, hashIndex) || "/";

      if (pathname === basePath || (pathname === "/" && basePath === "/")) {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) {
          const y =
            target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
      }
    },
    [pathname],
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full h-18 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg border-b border-neutral-200/80 shadow-md"
          : "bg-white border-b border-neutral-200 shadow-sm"
      }`}
    >
      <Container className="h-full flex items-center justify-between">
        <Logo />

        <nav
          className="hidden lg:flex items-center gap-1 ml-12"
          aria-label="Main Navigation"
        >
          {NAV_LINKS_LEFT.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="font-sans text-sm font-medium text-[#2F2F2F]/70 hover:text-[#2F2F2F] px-3 py-2 rounded-md hover:bg-neutral-100 transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-1 ml-auto">
          {NAV_LINKS_RIGHT.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-sans text-sm font-medium text-[#2F2F2F]/70 hover:text-[#2F2F2F] px-3 py-2 rounded-md hover:bg-neutral-100 transition-all"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className="ml-3">
            <Button className="bg-light-coral hover:bg-[#e46d6d] text-white font-semibold text-sm px-5 h-10 rounded-lg shadow-sm">
              Get a Quote
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-[#2F2F2F] hover:bg-neutral-100 rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden absolute top-18 left-0 w-full bg-white border-b border-neutral-200 shadow-lg overflow-hidden"
          >
            <nav
              className="flex flex-col px-4 py-4 gap-1"
              aria-label="Mobile Navigation"
            >
              {[...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="font-sans text-base font-medium text-[#2F2F2F] hover:bg-neutral-100 px-4 py-3 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-neutral-200">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full justify-center bg-light-coral hover:bg-[#e46d6d] text-white font-semibold h-11 rounded-lg shadow-sm">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
