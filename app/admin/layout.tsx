"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import {
  LayoutDashboard,
  ShoppingCart,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await logoutAction();
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  ];

  const currentPage = navItems.find((item) => pathname.startsWith(item.href));

  return (
    <div className="h-screen bg-[#faf9f8] flex overflow-hidden">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-white border-r border-neutral-200 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center px-5 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <Logo />
            <Badge variant="secondary" className="uppercase tracking-wide">
              Admin
            </Badge>
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-[#f8ad9d]/15 text-[#f08080]" : "text-[#2F2F2F]/60 hover:bg-neutral-100 hover:text-[#2F2F2F]"}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-neutral-200">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-neutral-200 flex items-center px-4 lg:px-8 gap-3 shrink-0">
          <button
            className="lg:hidden p-1.5 text-[#2F2F2F] hover:bg-neutral-100 rounded-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-1.5 text-sm font-sans">
            <span className="text-[#2F2F2F]/40">Admin</span>
            <ChevronRight size={14} className="text-[#2F2F2F]/30" />
            <span className="text-[#2F2F2F] font-medium">
              {currentPage?.name || "Dashboard"}
            </span>
          </div>
        </header>
        <div className="flex-1 p-4 lg:p-8 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
