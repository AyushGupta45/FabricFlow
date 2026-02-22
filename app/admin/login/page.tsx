"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/admin/actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await loginAction(password);
    if (result.success) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError(result.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-7 border border-neutral-200 shadow-sm bg-white rounded-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-powder-blush/20 flex items-center justify-center mb-4">
            <Lock className="text-light-coral" size={24} />
          </div>
          <h1 className="font-heading font-bold text-xl text-[#2F2F2F]">
            Admin Access
          </h1>
          <p className="font-sans text-xs text-[#2F2F2F]/50 mt-1.5">
            Enter password to continue
          </p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && (
            <div className="p-3 text-red-600 bg-red-50 border border-red-200 rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 border-neutral-300 focus-visible:ring-light-coral"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full bg-light-coral hover:bg-[#e46d6d] text-white text-sm font-semibold transition shadow-sm"
          >
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
