"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DonationForm } from "./DonationCard";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DonationModal({ open, onOpenChange }: DonationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-white/10 bg-[#0a0a0a] p-0 overflow-y-auto max-h-[90vh]">
        <div className="bg-gradient-to-b from-primary/10 to-transparent pt-8 px-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-white">
              Support FlatMotion
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Love what we&apos;re building? Your contribution helps us keep the project alive and growing.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* DonationForm for modal */}
        <div className="px-6 pb-8">
          <DonationForm isInModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

