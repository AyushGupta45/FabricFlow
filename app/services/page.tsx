"use client";

import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { services } from "@/constants";
import type { Metadata } from "next";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-[#faf9f8] min-h-[calc(100vh-72px)] py-[80px]">
      <Container>
        <div className="flex flex-col items-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f08080] mb-3">
            What We Offer
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#2F2F2F] text-center">
            Our Services
          </h1>
          <p className="font-sans text-base text-[#2F2F2F]/60 mt-4 text-center max-w-xl">
            Complete end-to-end textile processing solutions — from grey fabric
            treatment to finished, export-ready rolls.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="p-8 bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#f8ad9d]/20 flex items-center justify-center">
                      <Icon
                        className="text-[#f08080]"
                        size={22}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-[#2F2F2F]">
                      {service.title}
                    </h3>
                    <p className="text-[#2F2F2F]/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </div>
  );
}
