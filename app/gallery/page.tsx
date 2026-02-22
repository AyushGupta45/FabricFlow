"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "@/constants";

export default function GalleryPage() {
  // Group images into pairs for the alternating row layout
  const rows: (typeof GALLERY_IMAGES)[] = [];
  for (let i = 0; i < GALLERY_IMAGES.length; i += 2) {
    rows.push(GALLERY_IMAGES.slice(i, i + 2));
  }

  return (
    <div className="bg-[#faf9f8] min-h-[calc(100vh-72px)] py-[80px]">
      <Container>
        <div className="flex flex-col items-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f08080] mb-3">
            Our Facility
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#2F2F2F] text-center">
            Gallery
          </h1>
          <p className="font-sans text-base text-[#2F2F2F]/60 mt-4 text-center max-w-xl">
            A visual tour of our 50,000 sq. ft. processing facility — from grey
            fabric intake to finished roll dispatch.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {rows.map((pair, rowIndex) => {
            // Even rows: [1fr, 2fr] — small then large
            // Odd rows:  [2fr, 1fr] — large then small
            const isEvenRow = rowIndex % 2 === 0;

            return (
              <div
                key={rowIndex}
                className={`grid gap-5 grid-cols-1 lg:grid-cols-3`}
              >
                {pair.map((img, colIndex) => {
                  // On large screens: alternate which image gets 2 cols
                  const isWide = isEvenRow ? colIndex === 1 : colIndex === 0;

                  return (
                    <motion.div
                      key={rowIndex * 2 + colIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{
                        duration: 0.5,
                        delay: colIndex * 0.1,
                      }}
                      className={`group relative overflow-hidden rounded-xl shadow-md ring-1 ring-neutral-200 cursor-pointer ${
                        isWide ? "lg:col-span-2" : "lg:col-span-1"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={900}
                        height={500}
                        className="w-full h-[260px] sm:h-[300px] lg:h-[340px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="inline-block font-heading font-semibold text-white text-sm tracking-wide px-2.5 py-1 rounded-md bg-black/30 backdrop-blur-sm">
                          {img.caption}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
