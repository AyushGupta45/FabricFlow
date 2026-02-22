"use client";

import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/card";
import { CERTIFICATIONS, FACILITY_STATS } from "@/constants";
import { motion } from "framer-motion";
import { Building2, Users, Target, Factory, Clock } from "lucide-react";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div className="bg-bg-secondary min-h-[calc(100vh-72px)]">
      {/* Hero Section */}
      <section className="py-20 bg-linear-to-b from-[#ffdab9]/20 to-bg-secondary">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-light-coral mb-3">
              About FabricFlow
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#2F2F2F] leading-[1.1]">
              Precision Textile Processing,{" "}
              <span className="text-light-coral">Built for Scale</span>
            </h1>
            <p className="font-sans text-lg text-[#2F2F2F]/60 mt-6 leading-relaxed max-w-2xl">
              Founded over 15 years ago, FabricFlow has grown from a small
              dyeing unit into one of Gujarat&apos;s most trusted B2B textile
              processing facilities — serving 200+ manufacturers with consistent
              quality and on-time delivery.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-15">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Card className="p-8 bg-white border border-neutral-200 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-powder-blush/20 flex items-center justify-center">
                    <Target
                      className="text-light-coral"
                      size={20}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h2 className="font-heading font-bold text-xl text-[#2F2F2F]">
                    Our Mission
                  </h2>
                </div>
                <p className="text-[#2F2F2F]/60 text-sm leading-relaxed">
                  To deliver world-class textile processing with uncompromising
                  quality, enabling manufacturers to scale production without
                  worrying about consistency, colour accuracy, or delivery
                  timelines.
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Card className="p-8 bg-white border border-neutral-200 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-powder-blush/20 flex items-center justify-center">
                    <Building2
                      className="text-light-coral"
                      size={20}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h2 className="font-heading font-bold text-xl text-[#2F2F2F]">
                    Our Vision
                  </h2>
                </div>
                <p className="text-[#2F2F2F]/60 text-sm leading-relaxed">
                  To become India&apos;s most reliable textile processing
                  partner — recognized for innovation in dyeing technology,
                  sustainable practices, and customer-first operations.
                </p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-15 bg-[#ffdab9]/15">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col items-center mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-light-coral mb-3">
              Quality Standards
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#2F2F2F] text-center">
              Certifications & Compliance
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Card className="p-8 bg-white border border-neutral-200 shadow-sm h-full text-center">
                    <div className="w-14 h-14 rounded-xl bg-powder-blush/20 flex items-center justify-center mx-auto mb-4">
                      <Icon
                        className="text-light-coral"
                        size={24}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-[#2F2F2F] mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-[#2F2F2F]/60 text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Facility Stats */}
      <section className="py-15">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col items-center mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-light-coral mb-3">
              Our Facility
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#2F2F2F] text-center">
              State-of-the-Art Infrastructure
            </h2>
            <p className="font-sans text-base text-[#2F2F2F]/60 mt-4 text-center max-w-xl">
              Our facility in Gujarat&apos;s textile hub is equipped with modern
              machinery and a skilled workforce for high-volume processing.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FACILITY_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="p-6 bg-white border border-neutral-200 shadow-sm text-center">
                  <div className="font-heading font-bold text-3xl text-light-coral">
                    {stat.value}
                  </div>
                  <div className="font-heading font-medium text-sm text-[#2F2F2F]/70 mt-1">
                    {stat.unit}
                  </div>
                  <div className="font-sans text-xs text-[#2F2F2F]/40 uppercase tracking-wider mt-2">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team/Values */}
      <section className="py-15 bg-[#ffdab9]/15">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-light-coral mb-3 block">
                Our Team
              </span>
              <h2 className="font-heading font-bold text-3xl text-[#2F2F2F] mb-4">
                People Behind the Process
              </h2>
              <p className="font-sans text-base text-[#2F2F2F]/60 leading-relaxed mb-6">
                Our team of 120+ skilled professionals — from machine operators
                to quality inspectors — ensure every meter of fabric meets the
                highest standards. With decades of combined experience in
                textile processing, we bring expertise and dedication to every
                order.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Users, text: "120+ Skilled Workers" },
                  { icon: Clock, text: "15+ Years Experience" },
                  { icon: Factory, text: "24/7 Operations" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2 bg-white border border-neutral-200 text-[#2F2F2F]/70 text-xs font-medium px-3 py-2 rounded-full"
                    >
                      <Icon size={14} className="text-light-coral" />
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-lg ring-1 ring-neutral-200">
                <Image
                  src="/textile-factory.png"
                  alt="FabricFlow processing facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
