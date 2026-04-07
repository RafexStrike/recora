"use client";

// client/src/components/DonationCard.tsx
// A polished "Support the Project" donation card with SSLCommerz sandbox integration.

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initDonation } from "@/lib/api";
import { Heart, Coffee, Sparkles, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const PRESET_AMOUNTS = [100, 250, 500];

interface DonationFormProps {
  isInModal?: boolean;
}

export function DonationForm({ isInModal = false }: DonationFormProps) {
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useCustom, setUseCustom] = useState(false);

  const activeAmount = useCustom ? Number(customAmount) || 0 : amount;

  const handlePresetClick = (val: number) => {
    setAmount(val);
    setUseCustom(false);
    setCustomAmount("");
  };

  const handleCustomFocus = () => {
    setUseCustom(true);
  };

  const handleDonate = async () => {
    // Validation
    if (!name.trim()) {
      Swal.fire({ icon: "warning", title: "Name required", text: "Please enter your name.", background: "#141414", color: "#ededed", confirmButtonColor: "#7C3AED" });
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({ icon: "warning", title: "Valid email required", text: "Please enter a valid email address.", background: "#141414", color: "#ededed", confirmButtonColor: "#7C3AED" });
      return;
    }
    if (activeAmount <= 0) {
      Swal.fire({ icon: "warning", title: "Invalid amount", text: "Please enter a positive donation amount.", background: "#141414", color: "#ededed", confirmButtonColor: "#7C3AED" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await initDonation({ amount: activeAmount, name: name.trim(), email: email.trim() });
      const gatewayUrl = res?.data?.gatewayUrl;

      if (gatewayUrl) {
        // Redirect to SSLCommerz sandbox gateway
        window.location.href = gatewayUrl;
      } else {
        throw new Error("No gateway URL received.");
      }
    } catch (err: any) {
      console.error("[DonationCard] Error:", err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.message || "Could not initiate payment. Please try again.",
        background: "#141414",
        color: "#ededed",
        confirmButtonColor: "#7C3AED",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={isInModal ? "" : "w-full max-w-xl mx-auto"}>
      {!isInModal && (
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 mb-5">
            <Coffee className="w-8 h-8 text-orange-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3">
            Support{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
              FlatMotion
            </span>
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
            Love what we&apos;re building? Buy us a coffee to help keep the project alive and growing. Every contribution counts!
          </p>
        </div>
      )}

      {/* Card */}
      <div className={`rounded-2xl border border-white/5 p-6 sm:p-8 shadow-xl hover:border-pink-500/20 transition-colors ${isInModal ? "bg-white/5" : "bg-[#141414]"}`}>
        {/* Amount Presets */}
        <label className="block text-sm font-medium text-gray-300 mb-3">
          <Heart className="w-4 h-4 inline mr-1.5 text-pink-400" />
          Choose an amount (BDT)
        </label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {PRESET_AMOUNTS.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handlePresetClick(val)}
              className={`py-3 rounded-xl font-semibold text-lg transition-all border ${
                !useCustom && amount === val
                  ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white border-transparent shadow-lg shadow-pink-500/20"
                  : "bg-white/5 text-gray-300 border-white/10 hover:border-pink-500/30 hover:bg-white/10"
              }`}
            >
              ৳{val}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-5">
          <Input
            type="number"
            placeholder="Custom amount..."
            min={1}
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setUseCustom(true); }}
            onFocus={handleCustomFocus}
            className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 text-lg ${
              useCustom ? "ring-2 ring-pink-500/50 border-pink-500/30" : ""
            }`}
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Your name</label>
          <Input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Your email</label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11"
          />
        </div>

        {/* Donate Button */}
        <Button
          onClick={handleDonate}
          disabled={isLoading}
          className="w-full h-13 text-lg font-bold rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Preparing payment...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Donate ৳{activeAmount > 0 ? activeAmount : "..."}
            </span>
          )}
        </Button>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-500 mt-4">
          🔒 Secure sandbox payment via SSLCommerz. No real money is charged.
        </p>
      </div>
    </div>
  );
}

export default function DonationCard() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20 border-t border-white/5">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 mb-5">
            <Coffee className="w-8 h-8 text-orange-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3">
            Support{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
              FlatMotion
            </span>
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
            Love what we&apos;re building? Buy us a coffee to help keep the project alive and growing. Every contribution counts!
          </p>
        </div>

        <DonationForm isInModal={false} />
      </div>
    </section>
  );
}

