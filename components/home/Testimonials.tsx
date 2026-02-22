"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS, CLIENT_LOGOS } from "@/constants";

export function Testimonials() {
  return (
    <section className="bg-base-bg py-20">
      <Container>
        <div className="flex flex-col items-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-light-coral mb-3">
            Trusted By Industry Leaders
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#2F2F2F] text-center">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-neutral-200 rounded-xl p-7 shadow-sm flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="text-light-coral fill-light-coral"
                  />
                ))}
              </div>
              <p className="font-sans text-sm text-[#2F2F2F]/70 leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-neutral-100 pt-4">
                <p className="font-heading font-semibold text-sm text-[#2F2F2F]">
                  {t.name}
                </p>
                <p className="font-sans text-xs text-[#2F2F2F]/50 mt-0.5">
                  {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="border-t border-neutral-200 pt-10">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#2F2F2F]/40 mb-6">
            Trusted by 200+ manufacturers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {CLIENT_LOGOS.map((name, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="font-heading font-semibold text-base text-[#2F2F2F]/25 hover:text-[#2F2F2F]/60 transition-colors cursor-default"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
