import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/Logo";
import { Linkedin, Instagram, Mail } from "lucide-react";

const FOOTER_LINKS = {
  Services: [
    { name: "All Services", href: "/services" },
    { name: "Dyeing & Finishing", href: "/#services" },
    { name: "Fabric Printing", href: "/#services" },
    { name: "Quality Assurance", href: "/#quality" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "How We Work", href: "/#process" },
    { name: "Order Tracking", href: "/tracking" },
    { name: "Contact Sales", href: "/contact" },
  ],
};

const SOCIALS = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:sales@fabricflow.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-[#E5E5E5] py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Logo variant="white" />
            <p className="font-sans text-sm text-[#E5E5E5]/60 leading-relaxed max-w-xs">
              Leading B2B textile processing. We deliver high-quality materials
              with precision, speed, and reliability.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {SOCIALS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-light-coral flex items-center justify-center text-[#E5E5E5]/70 hover:text-white transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h3 className="font-heading font-semibold text-sm text-white uppercase tracking-wider">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2.5 font-sans text-sm text-[#E5E5E5]/60">
                {links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:text-light-coral transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-semibold text-sm text-white uppercase tracking-wider">
              Contact
            </h3>
            <ul className="flex flex-col gap-2.5 font-sans text-sm text-[#E5E5E5]/60">
              <li>+91 98765 43210</li>
              <li>sales@fabricflow.com</li>
              <li>Plot 45, Phase II Industrial Area</li>
              <li>Textile Hub, Gujarat 395002</li>
            </ul>
            <div className="mt-2 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-[#E5E5E5]/50 w-fit">
              🇮🇳 Made in India
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-[#E5E5E5]/40">
          <p>© {new Date().getFullYear()} FabricFlow. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
