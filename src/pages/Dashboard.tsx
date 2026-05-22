import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLicense } from "../context/LicenseContext";
import { Product, AnalyticsData } from "../types";
import StatsCard from "../components/StatsCard";
import RecentProducts from "../components/RecentProducts";
import QuickActions from "../components/QuickActions";
import { Package, Share2, TrendingUp, Users } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { validateSubscription } = useLicense();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("promozy-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const userProducts = products.filter((p) => p.userId === user?.id);
  const totalShares = userProducts.reduce((sum, p) => sum + p.shareCount, 0);

  const stats = [
    { label: "Total Products", value: userProducts.length, icon: Package, color: "from-violet-500 to-purple-600" },
    { label: "Total Shares", value: totalShares, icon: Share2, color: "from-emerald-500 to-teal-600" },
    { label: "Conversion Rate", value: "24%", icon: TrendingUp, color: "from-amber-500 to-orange-600" },
    { label: "Active Campaigns", value: userProducts.filter((p) => p.isActive).length, icon: Users, color: "from-pink-500 to-rose-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Dashboard Overview
          </h1>
          <p className={`mt-1 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            Monitor your product promotions and performance
          </p>
        </div>
        {!validateSubscription() && (
          <div className="bg-amber-950/50 border border-amber-800/50 rounded-xl px-4 py-2">
            <p className="text-amber-200 text-sm">
              ⚠️ Upgrade to share products on WhatsApp
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentProducts products={userProducts.slice(0, 5)} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}