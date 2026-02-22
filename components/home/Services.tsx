"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { services } from "@/constants";
import { ArrowRight } from "lucide-react";

export function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  const displayedServices = services.slice(0, 3);

  return (
    <section id="services" className="bg-[#ffdab9]/30 py-20">
      <Container>
        <div className="flex flex-col items-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-light-coral mb-3">
            What We Do
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#2F2F2F] text-center">
            Our Services
          </h2>
          <p className="font-sans text-base text-[#2F2F2F]/60 mt-4 text-center max-w-xl">
            End-to-end textile processing services built for bulk B2B
            manufacturing at scale.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="p-8 bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-powder-blush/20 flex items-center justify-center">
                      <Icon
                        className="text-light-coral"
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
          <motion.div variants={cardVariants}>
            <Link href="/services" className="block h-full">
              <Card className="p-8 bg-linear-to-br from-light-coral to-sweet-salmon border-0 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col items-center justify-center text-center group cursor-pointer min-h-50">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <ArrowRight
                    className="text-white group-hover:translate-x-0.5 transition-transform"
                    size={24}
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-1">
                  See All Services
                </h3>
                <p className="text-white/80 text-sm">Explore our full range</p>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
