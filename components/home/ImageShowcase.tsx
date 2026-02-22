"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "@/constants";
import { Images } from "lucide-react";

export function ImageShowcase() {
  const showcaseImages = GALLERY_IMAGES.slice(0, 3);

  return (
    <section className="bg-base-bg py-20">
      <Container>
        <div className="flex flex-col items-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-light-coral mb-3">
            Our Facility
          </span>

          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#2F2F2F] text-center">
            Inside the Manufacturing Floor
          </h2>

          <p className="font-sans text-base text-[#2F2F2F]/60 mt-4 text-center max-w-xl">
            From raw grey fabric to finished rolls — see our facility in action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {showcaseImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-xl shadow-md ring-1 ring-neutral-200 cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={300}
                className="w-full h-70 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="font-heading font-semibold text-white text-sm tracking-wide">
                  {img.caption}
                </span>
              </div>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: showcaseImages.length * 0.12,
            }}
          >
            <Link href="/gallery" className="block h-full">
              <div className="h-70 rounded-xl bg-linear-to-br from-light-coral to-sweet-salmon shadow-md flex flex-col items-center justify-center text-center group cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <Images className="text-white" size={24} strokeWidth={1.5} />
                </div>

                <span className="font-heading font-semibold text-white text-base mb-1">
                  View Full Gallery
                </span>

                <span className="text-white/80 text-sm">
                  Explore our facility
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
