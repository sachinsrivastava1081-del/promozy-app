import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FooterBranding } from "../components/Branding";
import {
  Package,
  Share2,
  TrendingUp,
  Crown,
  Sparkles,
  ArrowRight,
  Eye,
  MousePointer,
  BarChart3,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  const stats = [
    { label: "Total Products", value: "12", icon: Package, color: "from-violet-600 to-purple-600", bg: isDark ? "bg-violet-600/20" : "bg-violet-100" },
    { label: "Total Shares", value: "156", icon: Share2, color: "from-green-600 to-emerald-600", bg: isDark ? "bg-green-600/20" : "bg-green-100" },
    { label: "Total Views", value: "2,456", icon: Eye, color: "from-blue-600 to-cyan-600", bg: isDark ? "bg-blue-600/20" : "bg-blue-100" },
    { label: "Click Rate", value: "8.5%", icon: MousePointer, color: "from-amber-600 to-orange-600", bg: isDark ? "bg-amber-600/20" : "bg-amber-100" },
  ];

  const quickActions = [
    { label: "Add Product", description: "Upload new product", icon: Package, color: "bg-gradient-to-r from-violet-600 to-purple-600", tab: "products" },
    { label: "Share on WhatsApp", description: "Promote instantly", icon: Share2, color: "bg-gradient-to-r from-green-600 to-emerald-600", tab: "products" },
    { label: "View Analytics", description: "Check performance", icon: BarChart3, color: "bg-gradient-to-r from-blue-600 to-cyan-600", tab: "analytics" },
    { label: "Upgrade Plan", description: "Get more features", icon: Crown, color: "bg-gradient-to-r from-amber-600 to-orange-600", tab: "subscription" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Welcome back, {user?.name?.split(" ")[0]}!
            </h1>
            <Sparkles className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
          </div>
          <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            Here's what's happening with your promotions
          </p>
        </div>
        <div className="flex items-center gap-2">
          {user?.subscriptionActive ? (
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold">
              ✓ {user?.subscriptionPlan?.toUpperCase()} PLAN
            </span>
          ) : (
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold">
              ✗ EXPIRED
            </span>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`rounded-2xl p-5 border transition-all hover:shadow-lg hover:scale-105 ${
                isDark
                  ? "bg-slate-900/50 border-purple-800/30"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-gray-400"}`} />
              </div>
              <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {stat.value}
              </p>
              <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className={`rounded-2xl p-6 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className={`p-4 rounded-xl text-left transition-all hover:shadow-lg hover:scale-105 ${action.color} text-white`}
              >
                <Icon className="w-8 h-8 mb-3" />
                <h3 className="font-bold text-lg">{action.label}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* License Info */}
      <div className={`rounded-2xl p-6 border ${isDark ? "bg-purple-950/30 border-purple-800/30" : "bg-purple-50 border-purple-200"}`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
              Your PROMOZY License
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div>
                <p className={`text-xs ${isDark ? "text-purple-400" : "text-gray-500"}`}>License ID</p>
                <p className={`font-mono font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {user?.licenseId}
                </p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? "text-purple-400" : "text-gray-500"}`}>Plan</p>
                <p className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {user?.subscriptionPlan?.toUpperCase()}
                </p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? "text-purple-400" : "text-gray-500"}`}>Status</p>
                <p className={`font-bold ${user?.subscriptionActive ? "text-green-500" : "text-red-500"}`}>
                  {user?.subscriptionActive ? "✓ Active" : "✗ Expired"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`rounded-2xl p-6 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[
            { action: "Product shared on WhatsApp", time: "2 minutes ago", icon: Share2, color: "text-green-500" },
            { action: "New product added", time: "1 hour ago", icon: Package, color: "text-violet-500" },
            { action: "Analytics report generated", time: "3 hours ago", icon: TrendingUp, color: "text-blue-500" },
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? "bg-purple-950/30" : "bg-gray-50"}`}>
                <Icon className={`w-5 h-5 ${activity.color}`} />
                <div className="flex-1">
                  <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    {activity.action}
                  </p>
                  <p className={`text-xs ${isDark ? "text-purple-400" : "text-gray-500"}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding */}
      <FooterBranding size="normal" />
    </div>
  );
}