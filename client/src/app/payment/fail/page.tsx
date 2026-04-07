"use client";

// client/src/app/payment/fail/page.tsx
// Payment failure page — shown when a SSLCommerz sandbox donation fails.

import { useEffect } from "react";
import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function PaymentFailPage() {
  useEffect(() => {
    Swal.fire({
      icon: "error",
      title: "Payment Failed",
      text: "Your donation could not be processed.",
      background: "#141414",
      color: "#ededed",
      confirmButtonColor: "#7C3AED",
      timer: 4000,
      timerProgressBar: true,
    });
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Fail icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 mb-8">
          <XCircle className="w-14 h-14 text-red-400" />
        </div>

        <h1 className="text-3xl font-bold mb-3">Payment Failed</h1>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Something went wrong while processing your donation. No money was charged. You can try again whenever you&apos;re ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/#donate">
            <Button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-transform">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 px-6 py-3 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
