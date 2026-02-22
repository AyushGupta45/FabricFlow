import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/LayoutShell";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FabricFlow | Premium B2B Textile Processing",
  description:
    "Scale fabric processing, reactive printing, and dyeing built for consistent bulk B2B manufacturing. Trusted by 200+ manufacturers across India.",
  keywords: [
    "textile processing",
    "fabric printing",
    "reactive dyeing",
    "B2B fabric processing",
    "textile manufacturing",
    "bulk fabric processing",
    "fabric dyeing India",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "FabricFlow | Premium B2B Textile Processing",
    description:
      "Scale fabric processing, reactive printing, and dyeing built for consistent bulk B2B manufacturing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FabricFlow — Premium B2B Textile Processing",
      },
    ],
    type: "website",
    siteName: "FabricFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "FabricFlow | Premium B2B Textile Processing",
    description:
      "Scale fabric processing, reactive printing, and dyeing built for consistent bulk B2B manufacturing.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} antialiased bg-[#fffdfb] text-text-primary font-sans flex flex-col min-h-screen`}
      >
        <LayoutShell>{children}</LayoutShell>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "var(--font-inter)",
            },
          }}
          richColors
        />
      </body>
    </html>
  );
}
