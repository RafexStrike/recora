"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import DonationModal from "./DonationModal";
import Image from "next/image";

/**
 * Navbar component redesigned to match the modern SaaS aesthetic in the reference.
 * Includes placeholder links for Projects, Templates, and Pricing.
 * Handles active state for the Dashboard link.
 */
export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const navLinks: { name: string, href: string }[] = [
    { name: "Dashboard", href: "/dashboard" },
  ];

  if (user?.role === "ADMIN") {
    navLinks.push({ name: "Admin Panel", href: "/admin" });
  }

  return (
    <>
      <nav className="flex-shrink-0 border-b border-white/5 bg-black/40 backdrop-blur-xl h-16 sm:h-20 flex items-center w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="FlatMotion"
                width={220}
                height={55}
                className="h-20 w-auto"
                priority
              />
            </Link>

            {/* Nav Links - Desktop only */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.name === 'Dashboard' && pathname === '/dashboard');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-all relative py-2 font-outfit",
                      isActive
                        ? "text-white after:absolute after:bottom-[-20px] sm:after:bottom-[-26px] after:left-0 after:right-0 after:h-[2px] after:bg-primary shadow-[0_8px_16px_-4px_rgba(124,58,237,0.3)]"
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {!loading && (
              user ? (
                <>
                  <button
                    onClick={() => setDonationModalOpen(true)}
                    className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-105 active:scale-95"
                  >
                    Donate
                  </button>
                  <div className="flex items-center gap-3 pl-2 border-l border-white/10 ml-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-400 hover:border-primary/50 transition-colors cursor-pointer overflow-hidden">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <button
                      onClick={logout}
                      className="hidden sm:block text-xs font-medium text-gray-500 hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
                  >
                    Get Started
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Donation Modal */}
      <DonationModal open={donationModalOpen} onOpenChange={setDonationModalOpen} />
    </>
  );
}
