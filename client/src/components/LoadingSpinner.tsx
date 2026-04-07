"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  message?: string;
}

export default function LoadingSpinner({
  size = "md",
  fullScreen = false,
  message,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Main spinning circle with gradient */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-2 border-transparent border-t-primary border-r-secondary animate-spin`}
        />

        {/* Inner pulsing core */}
        <div
          className={`absolute inset-0 rounded-full border border-primary/30 animate-pulse`}
        />

        {/* Glowing center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
        </div>
      </div>

      {/* Loading text with animation */}
      {message && (
        <div className="text-center">
          <p className="text-gray-300 text-sm font-medium">{message}</p>
          <div className="flex gap-1 justify-center mt-2">
            <span className="w-1 h-1 rounded-full bg-primary animate-bounce" />
            <span
              className="w-1 h-1 rounded-full bg-secondary animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <span
              className="w-1 h-1 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        <div className="bg-black/80 border border-white/10 rounded-2xl px-8 py-12 backdrop-blur-xl">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
}
