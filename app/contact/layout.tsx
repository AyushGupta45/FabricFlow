import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sales | FabricFlow B2B Processing",
  description:
    "Get in touch with FabricFlow for bulk fabric processing enquiries and facility visits.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
