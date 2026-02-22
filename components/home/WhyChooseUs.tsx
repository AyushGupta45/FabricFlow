"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { whyChooseUs } from "@/constants";

export function WhyChooseUs() {
  return (
    <section className="bg-base-bg py-20">
      <Container>
        <div className="flex flex-col items-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-light-coral mb-3">
            Why Us
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#2F2F2F] text-center">
            Why Choose FabricFlow
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyChooseUs.map((usp, i) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-powder-blush/15 flex items-center justify-center mb-5">
                  <Icon
                    className="text-light-coral"
                    size={24}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-heading font-semibold text-lg text-[#2F2F2F] mb-2">
                  {usp.title}
                </h3>
                <p className="font-sans text-sm text-[#2F2F2F]/60 leading-relaxed">
                  {usp.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
