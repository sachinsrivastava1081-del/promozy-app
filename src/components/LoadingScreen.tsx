import { useTheme } from "../context/ThemeContext";
import Branding from "./Branding";
import { Sparkles } from "lucide-react";

export default function LoadingScreen() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-white via-purple-50 to-white"
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 text-center">
        {/* Animated Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-10 h-10 text-amber-500 animate-pulse" />
          <h1 className="text-5xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent animate-pulse">
            PROMOZY
          </h1>
          <Sparkles className="w-10 h-10 text-amber-500 animate-pulse" />
        </div>

        {/* Tagline */}
        <p className="text-lg font-semibold text-purple-600 mb-4">
          Promote Faster. Sell Smarter.
        </p>

        {/* Creator */}
        <p className="text-sm text-amber-600 font-bold">
          Created by SACHIN SRIVASTAVA
        </p>

        {/* Loading Animation */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-3 h-3 rounded-full bg-fuchsia-600 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>

        <p className="mt-4 text-sm text-purple-400">
          Loading your dashboard...
        </p>
      </div>
    </div>
  );
}