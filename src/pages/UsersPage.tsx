import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Branding, { FooterBranding } from "../components/Branding";
import { Button } from "../components/ui/button";
import { Users, Crown, Shield, CheckCircle, XCircle, Edit, Trash2, AlertTriangle } from "lucide-react";

export default function UsersPage() {
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

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", plan: "PRO", status: "active", products: 15, shares: 234 },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", plan: "STARTER", status: "active", products: 8, shares: 56 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", plan: "FREE", status: "active", products: 2, shares: 10 },
    { id: 4, name: "Emily Brown", email: "emily@example.com", plan: "PRO", status: "blocked", products: 0, shares: 0 },
    { id: 5, name: "Alex Wilson", email: "alex@example.com", plan: "STARTER", status: "expired", products: 5, shares: 45 },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Branding */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              User Management
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Branding size="small" showTagline={false} showCreator={false} layout="inline" />
            <span className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
              - Manage all users
            </span>
          </div>
        </div>
        {user?.role === "owner" && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold">
            <Crown className="w-4 h-4" />
            OWNER
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`rounded-2xl p-4 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>1,234</p>
          <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>Total Users</p>
        </div>
        <div className={`rounded-2xl p-4 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <p className={`text-2xl font-bold text-green-500`}>987</p>
          <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>Active</p>
        </div>
        <div className={`rounded-2xl p-4 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <p className={`text-2xl font-bold text-amber-500`}>456</p>
          <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>Premium</p>
        </div>
        <div className={`rounded-2xl p-4 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <p className={`text-2xl font-bold text-red-500`}>23</p>
          <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>Blocked</p>
        </div>
      </div>

      {/* Users Table */}
      <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className={`p-5 border-b ${isDark ? "border-purple-800/30" : "border-gray-200"}`}>
          <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            All Users
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDark ? "bg-purple-950/50" : "bg-gray-50"}`}>
              <tr>
                <th className={`text-left p-4 text-sm font-semibold ${isDark ? "text-purple-300" : "text-gray-600"}`}>User</th>
                <th className={`text-left p-4 text-sm font-semibold ${isDark ? "text-purple-300" : "text-gray-600"}`}>Plan</th>
                <th className={`text-left p-4 text-sm font-semibold ${isDark ? "text-purple-300" : "text-gray-600"}`}>Status</th>
                <th className={`text-left p-4 text-sm font-semibold ${isDark ? "text-purple-300" : "text-gray-600"}`}>Products</th>
                <th className={`text-left p-4 text-sm font-semibold ${isDark ? "text-purple-300" : "text-gray-600"}`}>Shares</th>
                <th className={`text-left p-4 text-sm font-semibold ${isDark ? "text-purple-300" : "text-gray-600"}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-800/20">
              {users.map((u) => (
                <tr key={u.id} className={`${isDark ? "hover:bg-purple-900/20" : "hover:bg-gray-50"}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{u.name}</p>
                        <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      u.plan === "PRO" ? "bg-purple-100 text-purple-600" :
                      u.plan === "STARTER" ? "bg-amber-100 text-amber-600" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {u.plan}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1 text-sm ${
                      u.status === "active" ? "text-green-500" :
                      u.status === "blocked" ? "text-red-500" :
                      "text-amber-500"
                    }`}>
                      {u.status === "active" ? <CheckCircle className="w-4 h-4" /> :
                       u.status === "blocked" ? <XCircle className="w-4 h-4" /> :
                       <XCircle className="w-4 h-4" />}
                      {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                    </span>
                  </td>
                  <td className={`p-4 ${isDark ? "text-white" : "text-gray-900"}`}>{u.products}</td>
                  <td className={`p-4 ${isDark ? "text-white" : "text-gray-900"}`}>{u.shares}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className={`p-2 rounded-lg ${isDark ? "hover:bg-purple-800/50 text-purple-300" : "hover:bg-gray-100 text-gray-600"}`}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className={`p-2 rounded-lg ${isDark ? "hover:bg-purple-800/50 text-purple-300" : "hover:bg-gray-100 text-gray-600"}`}>
                        <Shield className="w-4 h-4" />
                      </button>
                      {user?.role === "owner" && (
                        <button className={`p-2 rounded-lg ${isDark ? "hover:bg-red-900/50 text-red-400" : "hover:bg-red-50 text-red-500"}`}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Branding */}
      <FooterBranding size="normal" />
    </div>
  );
}