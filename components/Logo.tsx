"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Logo({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "white";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-1 shrink-0 ${className}`}
      aria-label="FabricFlow Home"
    >
      <Image
        src="/logo.svg"
        alt="FabricFlow logo"
        width={32}
        height={32}
        className={variant === "white" ? "brightness-0 invert" : ""}
      />
      <span
        className={`font-heading font-bold text-xl tracking-tight ${variant === "white" ? "text-white" : "text-[#2F2F2F]"}`}
      >
        Fabric
        <span
          className={variant === "white" ? "text-[#f8ad9d]" : "text-[#f08080]"}
        >
          Flow
        </span>
      </span>
    </Link>
  );
}
