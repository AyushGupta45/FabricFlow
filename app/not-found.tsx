import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#faf9f8] flex items-center justify-center py-20">
      <Container className="max-w-lg">
        <div className="flex flex-col items-center text-center">
          <div className="text-8xl font-heading font-bold text-[#f08080]/20 mb-2 select-none">
            404
          </div>
          <h1 className="font-heading font-bold text-3xl text-[#2F2F2F] mb-3">
            Page Not Found
          </h1>
          <p className="font-sans text-base text-[#2F2F2F]/60 mb-8 max-w-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button className="bg-[#f08080] hover:bg-[#e46d6d] text-white font-semibold px-6 h-11 rounded-lg shadow-sm gap-2">
                <Home size={16} /> Go Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="px-6 h-11 rounded-lg border-neutral-300 text-[#2F2F2F] hover:bg-neutral-100 gap-2"
              >
                <ArrowLeft size={16} /> Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
