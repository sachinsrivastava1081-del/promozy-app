import { useTheme } from "../context/ThemeContext";
import { useLicense } from "../context/LicenseContext";
import { Button } from "./ui/button";
import { Plus, Share2, Download, Upload } from "lucide-react";

export default function QuickActions() {
  const { isDark } = useTheme();
  const { validateSubscription } = useLicense();

  const actions = [
    { icon: Plus, label: "Add Product", color: "from-violet-500 to-purple-600", action: "products" },
    { icon: Share2, label: "Share Product", color: "from-emerald-500 to-teal-600", action: "products", disabled: !validateSubscription() },
    { icon: Download, label: "Export Data", color: "from-amber-500 to-orange-600", action: "settings" },
    { icon: Upload, label: "Import Products", color: "from-pink-500 to-rose-600", action: "products" },
  ];

  return (
    <div
      className={`rounded-2xl p-5 border ${
        isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        Quick Actions
      </h2>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start gap-3 h-12 ${
                isDark
                  ? "text-purple-200 hover:bg-purple-800/30"
                  : "text-gray-700 hover:bg-gray-100"
              } ${action.disabled ? "opacity-50" : ""}`}
              disabled={action.disabled}
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span>{action.label}</span>
              {action.disabled && (
                <span className="ml-auto text-xs text-amber-500">🔒 Premium</span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}