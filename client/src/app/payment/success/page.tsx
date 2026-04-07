"use client";

// client/src/app/payment/success/page.tsx
// Payment success callback page — shown after a successful SSLCommerz sandbox donation.

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Thank you! 🎉",
      text: "Your donation was successful.",
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
        {/* Success icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/10 mb-8">
          <CheckCircle className="w-14 h-14 text-green-400" />
        </div>

        <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          Thank you for your generous support. Your contribution helps us keep FlatMotion growing.
        </p>

        {/* Transaction details */}
        {(tranId || amount) && (
          <div className="rounded-xl bg-[#141414] border border-white/5 p-5 mb-8 text-left">
            {tranId && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Transaction ID</span>
                <span className="text-sm font-mono text-gray-300">{tranId}</span>
              </div>
            )}
            {amount && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Amount</span>
                <span className="text-sm font-semibold text-green-400">৳{amount} BDT</span>
              </div>
            )}
          </div>
        )}

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

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="w-10 h-10 border-2 border-green-400 border-t-transparent rounded-full animate-spin" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
