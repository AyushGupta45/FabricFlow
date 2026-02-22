"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="bg-[#2C2C2C] py-[80px]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">
              Ready to Scale Your Production?
            </h2>
            <p className="font-sans text-base text-white/60 max-w-lg">
              Send us your fabric specifications and volume requirements. Our
              team will provide a detailed processing quotation within 24 hours.
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <Button className="bg-[#f08080] hover:bg-[#e46d6d] text-white font-semibold px-8 h-12 text-base rounded-lg shadow-sm gap-2">
              Contact Sales <ArrowRight size={16} />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
