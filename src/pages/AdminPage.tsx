import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Branding, { FooterBranding } from "../components/Branding";
import { Shield, Users, Crown, Settings, Sparkles, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function AdminPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  // Only allow admin/owner access
  if (user?.role !== "admin" && user?.role !== "owner") {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertTriangle className={`w-16 h-16 mb-4 ${isDark ? "text-red-400" : "text-red-500"}`} />
        <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Access Denied
        </h2>
        <p className={`mt-2 ${isDark ? "text-purple-300" : "text-gray-600"}`}>
          You don't have permission to access this page.
        </p>
        <FooterBranding size="small" />
      </div>
    );
  }

  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, color: "from-violet-600 to-purple-600" },
    { label: "Active Subscriptions", value: "456", icon: Crown, color: "from-amber-600 to-orange-600" },
    { label: "Total Products", value: "5,678", icon: Shield, color: "from-green-600 to-emerald-600" },
  ];

  const recentActions = [
    { action: "User subscription activated", user: "john@example.com", time: "2 mins ago", status: "success" },
    { action: "New user registered", user: "sarah@example.com", time: "15 mins ago", status: "info" },
    { action: "User blocked", user: "spam@example.com", time: "1 hour ago", status: "warning" },
    { action: "Plan upgraded to Pro", user: "mike@example.com", time: "3 hours ago", status: "success" },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Branding */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Shield className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Admin Panel
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Branding size="small" showTagline={false} showCreator={false} layout="inline" />
            <span className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
              - Secure admin controls
            </span>
          </div>
        </div>
        {user?.role === "owner" && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold">
            <Crown className="w-4 h-4" />
            OWNER ACCESS
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`rounded-2xl p-5 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Actions */}
      <div className={`rounded-2xl p-6 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className={`p-4 rounded-xl text-left transition-all hover:shadow-lg ${isDark ? "bg-purple-950/50 hover:bg-purple-900/50" : "bg-purple-50 hover:bg-purple-100"}`}>
            <Users className={`w-6 h-6 mb-2 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Manage Users</h3>
            <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>View, block users</p>
          </button>
          <button className={`p-4 rounded-xl text-left transition-all hover:shadow-lg ${isDark ? "bg-purple-950/50 hover:bg-purple-900/50" : "bg-purple-50 hover:bg-purple-100"}`}>
            <Crown className={`w-6 h-6 mb-2 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Subscriptions</h3>
            <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>Manage plans</p>
          </button>
          <button className={`p-4 rounded-xl text-left transition-all hover:shadow-lg ${isDark ? "bg-purple-950/50 hover:bg-purple-900/50" : "bg-purple-50 hover:bg-purple-100"}`}>
            <Settings className={`w-6 h-6 mb-2 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Settings</h3>
            <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>Configure app</p>
          </button>
          <button className={`p-4 rounded-xl text-left transition-all hover:shadow-lg ${isDark ? "bg-purple-950/50 hover:bg-purple-900/50" : "bg-purple-50 hover:bg-purple-100"}`}>
            <Shield className={`w-6 h-6 mb-2 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Security</h3>
            <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>Access control</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className={`p-5 border-b ${isDark ? "border-purple-800/30" : "border-gray-200"}`}>
          <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Recent Admin Activity
          </h2>
        </div>
        <div className="divide-y divide-purple-800/20">
          {recentActions.map((item, index) => (
            <div key={index} className={`p-4 flex items-center gap-4 ${isDark ? "hover:bg-purple-900/20" : "hover:bg-gray-50"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.status === "success" ? "bg-green-100 text-green-600" :
                item.status === "warning" ? "bg-amber-100 text-amber-600" :
                "bg-purple-100 text-purple-600"
              }`}>
                {item.status === "success" ? <CheckCircle className="w-4 h-4" /> :
                 item.status === "warning" ? <XCircle className="w-4 h-4" /> :
                 <Sparkles className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  {item.action}
                </p>
                <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                  {item.user}
                </p>
              </div>
              <p className={`text-sm ${isDark ? "text-purple-400" : "text-gray-500"}`}>
                {item.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Owner Notice */}
      {user?.role === "owner" && (
        <div className="rounded-2xl p-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <Crown className="w-6 h-6 text-amber-500" />
            <div>
              <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                Owner Privileges Active
              </h3>
              <p className={`text-sm mt-1 ${isDark ? "text-purple-300" : "text-gray-600"}`}>
                You have full control over PROMOZY. This software is your exclusive property.
                All rights reserved © 2024 SACHIN SRIVASTAVA.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <FooterBranding size="normal" />
    </div>
  );
}