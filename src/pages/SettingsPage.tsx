import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { User, Shield, Bell, Palette, Key } from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Settings
        </h1>
        <p className={`mt-1 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
          Manage your account preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48 flex md:flex-col gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`justify-start ${
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

        <div className="flex-1">
          <div
            className={`rounded-2xl p-6 border ${
              isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            {activeTab === "profile" && (
              <div className="space-y-4">
                <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Profile Information
                </h2>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label className={isDark ? "text-purple-200" : ""}>Full Name</Label>
                    <Input
                      defaultValue={user?.name}
                      className={isDark ? "bg-slate-800 border-purple-700/50 text-white" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className={isDark ? "text-purple-200" : ""}>Email</Label>
                    <Input
                      defaultValue={user?.email}
                      disabled
                      className={isDark ? "bg-slate-800 border-purple-700/50 text-white" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className={isDark ? "text-purple-200" : ""}>License ID</Label>
                    <div className="flex items-center gap-2">
                      <Key className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-gray-400"}`} />
                      <Input
                        value={user?.licenseId}
                        disabled
                        className={`font-mono text-sm ${isDark ? "bg-slate-800 border-purple-700/50 text-purple-300" : ""}`}
                      />
                    </div>
                  </div>
                </div>
                <Button className="mt-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Security Settings
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className={isDark ? "text-purple-200" : ""}>Current Password</Label>
                    <Input
                      type="password"
                      className={isDark ? "bg-slate-800 border-purple-700/50 text-white" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className={isDark ? "text-purple-200" : ""}>New Password</Label>
                    <Input
                      type="password"
                      className={isDark ? "bg-slate-800 border-purple-700/50 text-white" : ""}
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                    Update Password
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  {[
                    { label: "Email notifications", desc: "Receive updates via email" },
                    { label: "Push notifications", desc: "Browser push notifications" },
                    { label: "Weekly reports", desc: "Get weekly analytics summary" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                          {item.label}
                        </p>
                        <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                          {item.desc}
                        </p>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          index === 0 ? "bg-violet-600" : isDark ? "bg-purple-800" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            index === 0 ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-4">
                <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Appearance
                </h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      Dark Mode
                    </p>
                    <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                      Toggle dark/light theme
                    </p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      isDark ? "bg-violet-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        isDark ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}