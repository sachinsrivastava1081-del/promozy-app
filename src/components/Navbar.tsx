import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/button";
import { Sun, Moon, Bell, Crown } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-40 px-6 py-4 border-b ${
        isDark
          ? "bg-slate-950/80 border-purple-800/30 backdrop-blur-xl"
          : "bg-white/80 border-gray-200 backdrop-blur-xl"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className={`font-black text-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent`}>
          PROMOZY
        </h1>

        <div className="flex items-center gap-3">
          {/* Subscription Badge */}
          {user?.subscriptionActive ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold">
              <Crown className="w-3 h-3" />
              {user?.subscriptionPlan?.toUpperCase()}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold">
              EXPIRED
            </div>
          )}

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className={`${isDark ? "text-purple-300 hover:bg-purple-900/50" : "hover:bg-purple-50"}`}
          >
            <Bell className="w-5 h-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`${isDark ? "text-purple-300 hover:bg-purple-900/50" : "hover:bg-purple-50"}`}
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-purple-600" />}
          </Button>

          {/* User Avatar */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              user?.role === "owner"
                ? "bg-gradient-to-br from-amber-500 to-orange-500"
                : user?.role === "admin"
                ? "bg-gradient-to-br from-red-500 to-rose-500"
                : "bg-gradient-to-br from-violet-600 to-purple-600"
            }`}
          >
            {user?.name?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}