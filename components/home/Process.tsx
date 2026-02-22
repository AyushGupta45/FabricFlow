"use client";

import { Container } from "@/components/layout/Container";
import { processSteps } from "@/constants";
import { motion } from "framer-motion";

export function Process() {
  return (
    <section id="process" className="bg-[#ffdab9]/30 py-[80px]">
      <Container>
        <div className="flex flex-col items-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f08080] mb-3">
            How It Works
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#2F2F2F] text-center">
            Processing Workflow
          </h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px bg-neutral-200" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center mb-5 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[#f8ad9d]/15 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <div className="font-heading font-bold text-sm text-[#f08080] mb-2 w-7 h-7 rounded-full bg-[#f8ad9d]/15 flex items-center justify-center">
                  {step.id}
                </div>
                <h3 className="font-heading font-semibold text-base text-[#2F2F2F] mb-1">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-[#2F2F2F]/50">
                  {step.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
