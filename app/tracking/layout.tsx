import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Order | FabricFlow B2B Processing",
  description: "Track the real-time processing status of your fabric batches.",
};

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
