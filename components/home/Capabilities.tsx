"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { motion, useInView } from "framer-motion";
import { capabilitiesMetrics } from "@/constants";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Capabilities() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
  };

  return (
    <section id="capabilities" className="bg-[#ffdab9]/30 py-[80px]">
      <Container>
        <div className="flex flex-col items-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f08080] mb-3">
            At Scale
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#2F2F2F] text-center">
            Production Capabilities
          </h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          {capabilitiesMetrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center gap-1 py-10 border border-neutral-200 rounded-xl bg-white shadow-sm"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-heading font-bold text-[#f08080] leading-none">
                  {metric.prefix}
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                  />
                </span>
                <span className="text-lg font-heading font-medium text-[#2F2F2F]/40 ml-1">
                  {metric.unit}
                </span>
              </div>
              <p className="font-sans text-sm text-[#2F2F2F]/60 mt-2 font-medium">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
