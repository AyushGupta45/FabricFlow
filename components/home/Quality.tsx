"use client";

import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { qualityMetrics } from "@/constants";

export function Quality() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  return (
    <section id="quality" className="bg-[#ffdab9]/30 py-[80px]">
      <Container>
        <div className="flex flex-col items-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f08080] mb-3">
            Standards
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#2F2F2F] text-center">
            Quality Control
          </h2>
          <p className="font-sans text-base text-[#2F2F2F]/60 mt-4 text-center max-w-xl">
            Every meter of fabric passes through rigorous checkpoints before
            dispatch.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {qualityMetrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="p-7 bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-lg bg-[#f8ad9d]/20 flex items-center justify-center shrink-0">
                      <Icon
                        className="text-[#f08080]"
                        size={20}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-base font-heading font-semibold text-[#2F2F2F] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#2F2F2F]/55 text-sm font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
