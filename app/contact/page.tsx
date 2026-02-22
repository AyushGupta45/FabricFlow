"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    requirement: "",
    meterQuantity: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit enquiry.");
      toast.success("Enquiry sent successfully!", {
        description:
          "We've received your requirements. Our sales team will connect with you shortly.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        requirement: "",
        meterQuantity: "",
      });
    } catch (err: any) {
      toast.error("Failed to send enquiry", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#faf9f8] min-h-[calc(100vh-72px)] py-[80px]">
      <Container>
        <div className="flex flex-col items-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f08080] mb-3">
            Get In Touch
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#2F2F2F] text-center">
            Contact Sales
          </h1>
          <p className="font-sans text-base text-[#2F2F2F]/60 mt-4 text-center max-w-xl">
            Discuss your bulk processing requirements or schedule a facility
            visit.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-heading font-semibold text-2xl text-[#2F2F2F] mb-4">
                Let&apos;s Talk Production
              </h2>
              <p className="font-sans text-base text-[#2F2F2F]/60 leading-relaxed">
                We specialize in scale processing delivering strictly on
                deadline. Let our team analyze your grey fabric specifications
                to provide a precise quotation.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: Phone,
                  label: "Call Us",
                  lines: ["+91 98765 43210", "+91 99887 76655"],
                },
                { icon: Mail, label: "Email", lines: ["sales@fabricflow.com"] },
                {
                  icon: MapPin,
                  label: "Facility",
                  lines: [
                    "Plot 45, Phase II Industrial Area",
                    "Textile Hub, Gujarat - 395002",
                  ],
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#f8ad9d]/20 flex items-center justify-center shrink-0">
                    <item.icon
                      className="text-[#f08080]"
                      size={18}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-[#2F2F2F] mb-1">
                      {item.label}
                    </h3>
                    {item.lines.map((line, j) => (
                      <p
                        key={j}
                        className="font-sans text-sm text-[#2F2F2F]/60"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Card className="p-7 border border-neutral-200 shadow-sm bg-white rounded-xl">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-heading font-semibold text-xl text-[#2F2F2F] mb-2">
                  Send an Enquiry
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#2F2F2F]/70 uppercase tracking-wider">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-11 border-neutral-300 focus-visible:ring-[#f08080]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#2F2F2F]/70 uppercase tracking-wider">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                      className="h-11 border-neutral-300 focus-visible:ring-[#f08080]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#2F2F2F]/70 uppercase tracking-wider">
                      Company
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="h-11 border-neutral-300 focus-visible:ring-[#f08080]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#2F2F2F]/70 uppercase tracking-wider">
                      Phone
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-11 border-neutral-300 focus-visible:ring-[#f08080]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#2F2F2F]/70 uppercase tracking-wider">
                      Volume (Meters) *
                    </label>
                    <Input
                      name="meterQuantity"
                      value={formData.meterQuantity}
                      onChange={handleChange}
                      placeholder="e.g. 10000"
                      required
                      className="h-11 border-neutral-300 focus-visible:ring-[#f08080]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#2F2F2F]/70 uppercase tracking-wider">
                    Requirement *
                  </label>
                  <Textarea
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange as any}
                    required
                    placeholder="Fabric type, processing needed..."
                    className="min-h-[100px] resize-none border-neutral-300 focus-visible:ring-[#f08080]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 mt-2 bg-[#f08080] hover:bg-[#e46d6d] text-white text-sm font-semibold transition shadow-sm"
                >
                  {loading ? "Sending..." : "Send Enquiry"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
