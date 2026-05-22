import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { User } from "../types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Shield, Users, Package, Crown, Ban, CheckCircle, Search, AlertTriangle } from "lucide-react";

interface ManagedUser extends User {
  email: string;
  name: string;
  role: string;
  subscriptionActive: boolean;
  subscriptionPlan: string;
  isBlocked: boolean;
  canShare: boolean;
  createdAt: string;
}

export default function AdminPanel() {
  const { user, isAdmin, isOwner } = useAuth();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem("promozy-all-users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const demoUsers: ManagedUser[] = [
        {
          id: "user-1",
          email: "john@example.com",
          name: "John Doe",
          role: "user",
          licenseId: "PROMOZY-001-LICENSE",
          subscriptionActive: true,
          subscriptionPlan: "pro",
          isBlocked: false,
          canShare: true,
          createdAt: "2024-01-15",
          deviceIds: ["device-001"],
        },
        {
          id: "user-2",
          email: "jane@example.com",
          name: "Jane Smith",
          role: "user",
          licenseId: "PROMOZY-002-LICENSE",
          subscriptionActive: false,
          subscriptionPlan: "free",
          isBlocked: false,
          canShare: false,
          createdAt: "2024-02-20",
          deviceIds: ["device-002"],
        },
        {
          id: "user-3",
          email: "mike@example.com",
          name: "Mike Johnson",
          role: "user",
          licenseId: "PROMOZY-003-LICENSE",
          subscriptionActive: true,
          subscriptionPlan: "starter",
          isBlocked: true,
          canShare: false,
          createdAt: "2024-03-10",
          deviceIds: ["device-003"],
        },
      ];
      setUsers(demoUsers);
      localStorage.setItem("promozy-all-users", JSON.stringify(demoUsers));
    }
  }, []);

  if (!isAdmin()) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className={`text-center p-8 rounded-2xl border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <Shield className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-purple-400" : "text-gray-400"}`} />
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Access Denied
          </h2>
          <p className={`mt-2 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            You don't have permission to access this page
          </p>
        </div>
      </div>
    );
  }

  const handleToggleBlock = (userId: string) => {
    if (!isOwner()) {
      alert("Only the owner can block/unblock users");
      return;
    }
    const updated = users.map((u) =>
      u.id === userId ? { ...u, isBlocked: !u.isBlocked, canShare: u.isBlocked ? false : u.canShare } : u
    );
    setUsers(updated);
    localStorage.setItem("promozy-all-users", JSON.stringify(updated));
  };

  const handleActivateSubscription = (userId: string, plan: string) => {
    if (!isOwner()) {
      alert("Only the owner can activate subscriptions");
      return;
    }
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    const updated = users.map((u) =>
      u.id === userId
        ? { ...u, subscriptionActive: true, subscriptionPlan: plan, canShare: true, subscriptionExpiry: expiryDate.toISOString() }
        : u
    );
    setUsers(updated);
    localStorage.setItem("promozy-all-users", JSON.stringify(updated));
  };

  const handleDeactivateSubscription = (userId: string) => {
    if (!isOwner()) {
      alert("Only the owner can deactivate subscriptions");
      return;
    }
    const updated = users.map((u) =>
      u.id === userId ? { ...u, subscriptionActive: false, canShare: false } : u
    );
    setUsers(updated);
    localStorage.setItem("promozy-all-users", JSON.stringify(updated));
  };

  const handleCreateAdmin = (email: string) => {
    if (!isOwner()) {
      alert("Only the owner can create admin accounts");
      return;
    }
    const newAdmin: ManagedUser = {
      id: `admin-${Date.now()}`,
      email,
      name: email.split("@")[0],
      role: "admin",
      licenseId: `PROMOZY-ADMIN-${Date.now()}`,
      subscriptionActive: true,
      subscriptionPlan: "enterprise",
      isBlocked: false,
      canShare: true,
      createdAt: new Date().toISOString(),
      deviceIds: ["device-admin"],
    };
    const updated = [...users, newAdmin];
    setUsers(updated);
    localStorage.setItem("promozy-all-users", JSON.stringify(updated));
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "from-violet-500 to-purple-600" },
    { label: "Active Subscriptions", value: users.filter((u) => u.subscriptionActive).length, icon: Crown, color: "from-emerald-500 to-teal-600" },
    { label: "Blocked Users", value: users.filter((u) => u.isBlocked).length, icon: Ban, color: "from-red-500 to-rose-600" },
    { label: "Total Products", value: 156, icon: Package, color: "from-amber-500 to-orange-600" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Shield },
    { id: "users", label: "User Management", icon: Users },
    { id: "subscriptions", label: "Subscriptions", icon: Crown },
    { id: "security", label: "Security", icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Admin Panel
          </h1>
          <p className={`mt-1 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            {isOwner() ? "👑 Owner Access - Full Control" : "🛡️ Admin Access - Limited Control"}
          </p>
        </div>
        {isOwner() && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-950/50 border border-amber-800/50 rounded-lg">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-amber-200 text-sm font-medium">Owner Mode Active</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-violet-600 text-white"
                  : isDark
                  ? "text-purple-200 hover:bg-purple-800/30"
                  : ""
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`rounded-2xl p-5 border ${
                  isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>{stat.label}</p>
                    <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-purple-400" : "text-gray-400"}`} />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${isDark ? "bg-slate-900/50 border-purple-800/30 text-white" : "bg-white border-gray-200"}`}
              />
            </div>
          </div>

          <div
            className={`rounded-2xl border overflow-hidden ${
              isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDark ? "bg-purple-800/20" : "bg-gray-50"}>
                  <tr>
                    <th className={`px-4 py-3 text-left text-sm font-medium ${isDark ? "text-purple-200" : "text-gray-500"}`}>User</th>
                    <th className={`px-4 py-3 text-left text-sm font-medium ${isDark ? "text-purple-200" : "text-gray-500"}`}>Role</th>
                    <th className={`px-4 py-3 text-left text-sm font-medium ${isDark ? "text-purple-200" : "text-gray-500"}`}>Plan</th>
                    <th className={`px-4 py-3 text-left text-sm font-medium ${isDark ? "text-purple-200" : "text-gray-500"}`}>Status</th>
                    <th className={`px-4 py-3 text-left text-sm font-medium ${isDark ? "text-purple-200" : "text-gray-500"}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-800/20">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className={u.isBlocked ? "opacity-50" : ""}>
                      <td className="px-4 py-3">
                        <div>
                          <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{u.name}</p>
                          <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>{u.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            u.role === "owner"
                              ? "bg-amber-950/50 text-amber-300"
                              : u.role === "admin"
                              ? "bg-violet-950/50 text-violet-300"
                              : isDark
                              ? "bg-purple-800/30 text-purple-200"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={isDark ? "text-purple-200" : "text-gray-700"}>{u.subscriptionPlan}</span>
                      </td>
                      <td className="px-4 py-3">
                        {u.isBlocked ? (
                          <span className="flex items-center gap-1 text-red-400 text-sm">
                            <Ban className="w-4 h-4" /> Blocked
                          </span>
                        ) : u.subscriptionActive ? (
                          <span className="flex items-center gap-1 text-emerald-400 text-sm">
                            <CheckCircle className="w-4 h-4" /> Active
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Inactive</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {isOwner() && u.role !== "owner" && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleToggleBlock(u.id)}
                                className={u.isBlocked ? "text-emerald-400" : "text-red-400"}
                              >
                                {u.isBlocked ? "Unblock" : "Block"}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setSelectedUser(u)}
                                className={isDark ? "text-purple-200" : ""}
                              >
                                Manage
                              </Button>
                            </>
                          )}
                          {!isOwner() && (
                            <span className={`text-sm ${isDark ? "text-purple-400" : "text-gray-400"}`}>
                              Owner only
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "subscriptions" && (
        <div className="space-y-4">
          {isOwner() && (
            <div className={`rounded-2xl p-4 border ${isDark ? "bg-amber-950/30 border-amber-800/50" : "bg-amber-50 border-amber-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className={`font-semibold ${isDark ? "text-amber-200" : "text-amber-800"}`}>Owner Controls</h3>
              </div>
              <p className={`text-sm ${isDark ? "text-amber-300" : "text-amber-700"}`}>
                As the owner, you can activate, deactivate, or modify any user's subscription. Users cannot create their own subscriptions.
              </p>
            </div>
          )}

          <div className="grid gap-4">
            {filteredUsers.filter((u) => u.role !== "owner").map((u) => (
              <div
                key={u.id}
                className={`rounded-2xl p-4 border ${
                  isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{u.name}</p>
                    <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>{u.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        u.subscriptionActive
                          ? "bg-emerald-950/50 text-emerald-300"
                          : "bg-gray-800/50 text-gray-400"
                      }`}
                    >
                      {u.subscriptionPlan}
                    </span>
                  </div>
                </div>
                {isOwner() && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleActivateSubscription(u.id, "pro")}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                    >
                      Activate Pro
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleActivateSubscription(u.id, "starter")}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                    >
                      Activate Starter
                    </Button>
                    {u.subscriptionActive && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeactivateSubscription(u.id)}
                        className="text-red-400 hover:bg-red-950/50"
                      >
                        Deactivate
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="space-y-6">
          <div className={`rounded-2xl p-6 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Security & License Controls
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/30">
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>License Verification System</p>
                  <p className={`text-sm ${isDark ? "text-emerald-300" : "text-emerald-600"}`}>All users must have valid licenses to access premium features</p>
                </div>
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/30">
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Subscription Validation</p>
                  <p className={`text-sm ${isDark ? "text-emerald-300" : "text-emerald-600"}`}>Expired subscriptions automatically lock premium features</p>
                </div>
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/30">
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Owner-Only Admin Creation</p>
                  <p className={`text-sm ${isDark ? "text-emerald-300" : "text-emerald-600"}`}>Only the owner can create new admin accounts</p>
                </div>
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/30">
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Protected API Access</p>
                  <p className={`text-sm ${isDark ? "text-emerald-300" : "text-emerald-600"}`}>All API calls require valid authentication</p>
                </div>
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>

          {isOwner() && (
            <div className={`rounded-2xl p-6 border ${isDark ? "bg-amber-950/30 border-amber-800/50" : "bg-amber-50 border-amber-200"}`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-amber-200" : "text-amber-800"}`}>
                Owner Security Controls
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Prevent Unauthorized Resale</p>
                    <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>Software protected as private property</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Anti-Clone Protection</p>
                    <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>Prevents code misuse and cloning</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Copyright Protection</p>
                    <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>© 2024 Promozy. All rights reserved.</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl p-6 border ${isDark ? "bg-slate-900 border-purple-800/30" : "bg-white border-gray-200"}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Manage User: {selectedUser.name}
            </h2>
            <div className="space-y-4">
              <div>
                <Label className={isDark ? "text-purple-200" : ""}>Email</Label>
                <p className={isDark ? "text-purple-300" : "text-gray-600"}>{selectedUser.email}</p>
              </div>
              <div>
                <Label className={isDark ? "text-purple-200" : ""}>License ID</Label>
                <p className={`font-mono text-sm ${isDark ? "text-purple-300" : "text-gray-600"}`}>{selectedUser.licenseId}</p>
              </div>
              <div>
                <Label className={isDark ? "text-purple-200" : ""}>Current Plan</Label>
                <p className={isDark ? "text-purple-300" : "text-gray-600"}>{selectedUser.subscriptionPlan}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="ghost" onClick={() => setSelectedUser(null)} className={isDark ? "text-purple-200" : ""}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}