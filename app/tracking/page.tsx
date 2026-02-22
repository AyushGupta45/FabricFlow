"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const STEPS = [
  "Received",
  "Processing",
  "Printing",
  "QC",
  "Packing",
  "Dispatched",
  "Completed",
];

export default function TrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderId.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to track order");
      } else {
        setStatus(data.status);
      }
    } catch {
      setError("An error occurred while tracking the order.");
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (!status) return "pending";
    const idx = STEPS.indexOf(status);
    return idx === -1 ? "pending" : stepIndex <= idx ? "completed" : "pending";
  };

  return (
    <div className="bg-[#faf9f8] min-h-[calc(100vh-72px)] py-[80px]">
      <Container className="max-w-4xl">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8 md:p-12">
          <div className="flex flex-col items-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f08080] mb-3">
              Order Status
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#2F2F2F] text-center">
              Track Your Order
            </h1>
            <p className="font-sans text-[#2F2F2F]/60 mt-3 text-center max-w-md">
              Enter your Order ID below to view its current processing status.
            </p>
          </div>
          <form
            onSubmit={handleTrack}
            className="flex flex-col sm:flex-row gap-3 mb-12 max-w-2xl mx-auto"
          >
            <Input
              type="text"
              placeholder="Order ID (e.g. FF-A3K7N)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 h-12 text-base rounded-lg border-neutral-300 focus-visible:ring-[#f08080] focus-visible:ring-2 px-4"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-8 bg-[#f08080] hover:bg-[#e46d6d] text-white rounded-lg text-base font-semibold shadow-sm transition"
            >
              {loading ? "Tracking..." : "Track"}
            </Button>
          </form>
          {error && (
            <div className="p-4 mb-8 text-red-600 bg-red-50 border border-red-200 rounded-lg text-center max-w-2xl mx-auto text-sm font-medium">
              {error}
            </div>
          )}
          {status && (
            <div className="mt-16 relative">
              <div className="flex flex-col md:flex-row justify-between relative max-w-4xl mx-auto px-4 md:px-0">
                <div className="hidden md:block absolute top-[24px] left-[5%] right-[5%] h-px bg-neutral-200 z-0" />
                <div className="md:hidden absolute top-6 bottom-6 left-[31px] w-px bg-neutral-200 z-0" />
                <div className="flex flex-col md:flex-row w-full justify-between gap-6 md:gap-0 relative z-10">
                  {STEPS.map((step, index) => {
                    const isCompleted = getStepStatus(index) === "completed";
                    return (
                      <div
                        key={step}
                        className="flex md:flex-col items-center gap-4 md:gap-3 relative w-full md:w-auto flex-1"
                      >
                        {isCompleted && index > 0 && (
                          <>
                            <div className="md:hidden absolute -top-6 left-[27px] w-px h-6 bg-[#f08080] z-0" />
                            <div className="hidden md:block absolute top-[24px] -left-[50%] w-[100%] h-px bg-[#f08080] z-0" />
                          </>
                        )}
                        <div
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-500 relative z-10 ${isCompleted ? "bg-[#f08080] border-[#f08080] text-white" : "bg-white border-neutral-300 text-neutral-400"}`}
                        >
                          {isCompleted ? (
                            <Check strokeWidth={3} className="w-5 h-5" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div
                          className={`md:text-center text-sm ${isCompleted ? "text-[#2F2F2F] font-semibold" : "text-[#2F2F2F]/40 font-medium"}`}
                        >
                          {step}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
