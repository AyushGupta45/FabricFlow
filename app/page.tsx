import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";

const Services = dynamic(() =>
  import("@/components/home/Services").then((mod) => ({
    default: mod.Services,
  })),
);
const ImageShowcase = dynamic(() =>
  import("@/components/home/ImageShowcase").then((mod) => ({
    default: mod.ImageShowcase,
  })),
);
const Process = dynamic(() =>
  import("@/components/home/Process").then((mod) => ({ default: mod.Process })),
);
const WhyChooseUs = dynamic(() =>
  import("@/components/home/WhyChooseUs").then((mod) => ({
    default: mod.WhyChooseUs,
  })),
);
const Capabilities = dynamic(() =>
  import("@/components/home/Capabilities").then((mod) => ({
    default: mod.Capabilities,
  })),
);
const Testimonials = dynamic(() =>
  import("@/components/home/Testimonials").then((mod) => ({
    default: mod.Testimonials,
  })),
);
const Quality = dynamic(() =>
  import("@/components/home/Quality").then((mod) => ({ default: mod.Quality })),
);
const CTA = dynamic(() =>
  import("@/components/home/CTA").then((mod) => ({ default: mod.CTA })),
);

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ImageShowcase />
      <Process />
      <WhyChooseUs />
      <Capabilities />
      <Testimonials />
      <Quality />
      <CTA />
    </>
  );
}
