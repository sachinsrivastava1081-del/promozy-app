import { useTheme } from "../context/ThemeContext";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ label, value, icon: Icon, color }: StatsCardProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl p-5 border transition-all duration-200 hover:scale-105 ${
        isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            {label}
          </p>
          <p className={`text-3xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}