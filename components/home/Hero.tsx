"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { ArrowRight, Droplets, Factory, Award } from "lucide-react";

const TRUST_ITEMS = [
  { value: "15+", label: "Years Experience" },
  { value: "5L+", label: "Meters / Month" },
  { value: "200+", label: "B2B Clients" },
];

const TRUST_CHIPS = [
  { label: "Reactive Dyeing", icon: Droplets },
  { label: "Bulk Production Ready", icon: Factory },
  { label: "Export Quality", icon: Award },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#faf9f8] py-[80px] overflow-hidden relative"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-[#ffdab9]/20 via-transparent to-[#f8ad9d]/10 pointer-events-none"
      />
      <Container className="grid items-center gap-12 lg:grid-cols-2 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#f8ad9d]/20 text-[#f08080] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full w-fit">
            B2B Textile Processing
          </div>

          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[#2F2F2F] leading-[1.1]">
            From Grey Fabric to{" "}
            <span className="text-[#f08080]">Finished Rolls</span>
          </h1>

          <p className="font-sans text-lg text-[#2F2F2F]/60 max-w-lg leading-relaxed">
            Reliable fabric processing, dyeing and printing built for consistent
            bulk production. Trusted by leading manufacturers across India.
          </p>

          <div className="flex items-center gap-3 mt-2">
            <Link href="/contact">
              <Button className="bg-[#f08080] hover:bg-[#e46d6d] text-white font-semibold px-6 h-12 text-base rounded-lg shadow-sm gap-2">
                Start Processing
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/#process">
              <Button
                variant="outline"
                className="px-6 h-12 text-base rounded-lg border-neutral-300 text-[#2F2F2F] hover:bg-neutral-100 shadow-none"
              >
                View Process
              </Button>
            </Link>
          </div>

          {/* Trust Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {TRUST_CHIPS.map((chip, i) => {
              const Icon = chip.icon;
              return (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 text-[#2F2F2F]/70 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <Icon size={13} className="text-[#f08080]" strokeWidth={2} />
                  {chip.label}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center lg:justify-end relative"
        >
          <div className="absolute -inset-8 bg-gradient-to-br from-[#ffdab9]/40 via-[#f8ad9d]/15 to-transparent rounded-3xl blur-2xl" />
          <motion.div
            style={{ y: imageY }}
            className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10"
          >
            <Image
              src="/textile-factory.png"
              alt="Modern textile processing factory with industrial dyeing machines"
              width={560}
              height={420}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
        </motion.div>
      </Container>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-neutral-200"
        >
          <div className="grid grid-cols-3 gap-8 max-w-lg">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-heading font-bold text-2xl text-[#2F2F2F]">
                  {item.value}
                </span>
                <span className="font-sans text-xs text-[#2F2F2F]/50 uppercase tracking-wider mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
