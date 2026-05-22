import { useAuth } from "../context/AuthContext";
import { 
  Home, 
  Package, 
  BarChart3, 
  Settings, 
  Shield, 
  CreditCard,
  ChevronLeft,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, currentPage, onNavigate, onToggle }: SidebarProps) {
  const { isAdmin, isOwner } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, roles: ["user", "admin", "owner"] },
    { id: "products", label: "Products", icon: Package, roles: ["user", "admin", "owner"] },
    { id: "analytics", label: "Analytics", icon: BarChart3, roles: ["user", "admin", "owner"] },
    { id: "subscription", label: "Subscription", icon: CreditCard, roles: ["user", "admin", "owner"] },
    { id: "settings", label: "Settings", icon: Settings, roles: ["user", "admin", "owner"] },
    { id: "admin", label: "Admin Panel", icon: Shield, roles: ["admin", "owner"] },
  ];

  const filteredItems = menuItems.filter((item) => {
    if (isOwner()) return true;
    if (isAdmin()) return item.roles.includes("admin") || item.roles.includes("user");
    return item.roles.includes("user");
  });

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-violet-950 via-purple-950 to-indigo-950 border-r border-purple-800/30 transition-all duration-300 z-40 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 border-b border-purple-800/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Promozy</h1>
              <p className="text-xs text-purple-300">Promote Faster. Sell Smarter.</p>
            </div>
          )}
        </div>
      </div>

      <nav className="p-3 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "text-purple-200 hover:bg-purple-800/30 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <button
        onClick={onToggle}
        className="absolute bottom-4 right-0 translate-x-1/2 w-8 h-8 bg-purple-700 hover:bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
      >
        <ChevronLeft className={`w-4 h-4 transition-transform ${!isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className="absolute bottom-16 left-0 right-0 px-3">
        {isOpen && (
          <div className="bg-purple-800/30 rounded-xl p-3 border border-purple-700/30">
            <p className="text-xs text-purple-300 text-center">
              © 2024 Promozy. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}