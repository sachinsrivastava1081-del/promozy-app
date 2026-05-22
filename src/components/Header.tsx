import { User } from "../types";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface HeaderProps {
  user: User | null;
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onToggleSidebar: () => void;
}

export default function Header({ user, isDark, onToggleTheme, onLogout, onToggleSidebar }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-30 border-b ${isDark ? "bg-slate-950/95 border-purple-800/30" : "bg-white/95 border-gray-200"}`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-lg ${isDark ? "hover:bg-purple-800/30 text-purple-200" : "hover:bg-gray-100 text-gray-600"}`}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Welcome back, {user?.name || "User"}!
            </h2>
            <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
              {user?.role === "owner" ? "👑 Owner" : user?.role === "admin" ? "🛡️ Admin" : "👤 User"} • License: {user?.licenseId?.slice(0, 20)}...
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className={isDark ? "text-purple-200 hover:bg-purple-800/30" : "text-gray-600 hover:bg-gray-100"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`relative ${isDark ? "text-purple-200 hover:bg-purple-800/30" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          <div className={`flex items-center gap-3 pl-3 border-l ${isDark ? "border-purple-800/30" : "border-gray-200"}`}>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{user?.name}</p>
              <p className={`text-xs ${isDark ? "text-purple-300" : "text-gray-500"}`}>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}