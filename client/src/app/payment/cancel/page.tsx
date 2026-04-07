"use client";

// client/src/app/payment/cancel/page.tsx
// Payment cancellation page — shown when user cancels the SSLCommerz sandbox donation.

import { useEffect } from "react";
import Link from "next/link";
import { Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function PaymentCancelPage() {
  useEffect(() => {
    Swal.fire({
      icon: "info",
      title: "Payment Cancelled",
      text: "No worries — you can donate anytime!",
      background: "#141414",
      color: "#ededed",
      confirmButtonColor: "#7C3AED",
      timer: 3500,
      timerProgressBar: true,
    });
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Info icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-500/10 mb-8">
          <Info className="w-14 h-14 text-blue-400" />
        </div>

        <h1 className="text-3xl font-bold mb-3">Payment Cancelled</h1>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          No worries! No money was charged. You can always come back and support us whenever you feel like it. 💙
        </p>

        <Link href="/">
          <Button className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-transform">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
