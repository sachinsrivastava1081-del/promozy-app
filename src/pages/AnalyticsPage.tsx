import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLicense } from "../context/LicenseContext";
import { Product } from "../types";
import { BarChart3, TrendingUp, Share2, Package, Calendar } from "lucide-react";
export default function AnalyticsPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { canAccessFeature } = useLicense();
  const [products, setProducts] = useState<Product[]>([]);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    const savedProducts = localStorage.getItem("promozy-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const userProducts = products.filter((p) => p.userId === user?.id);
  const totalShares = userProducts.reduce((sum, p) => sum + p.shareCount, 0);
  const avgSharesPerProduct = userProducts.length > 0 ? (totalShares / userProducts.length).toFixed(1) : "0";

  const chartData = [
    { day: "Mon", shares: 12 },
    { day: "Tue", shares: 19 },
    { day: "Wed", shares: 8 },
    { day: "Thu", shares: 25 },
    { day: "Fri", shares: 32 },
    { day: "Sat", shares: 28 },
    { day: "Sun", shares: 15 },
  ];

  const maxShares = Math.max(...chartData.map((d) => d.shares));

  if (!canAccessFeature("analytics")) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className={`text-center p-8 rounded-2xl border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <BarChart3 className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-purple-400" : "text-gray-400"}`} />
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Premium Feature
          </h2>
          <p className={`mt-2 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            Upgrade to access detailed analytics and insights
          </p>
         <button className="mt-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded">
  Upgrade Now
</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Analytics
          </h1>
          <p className={`mt-1 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            Track your promotion performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          {["7d", "30d", "90d"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "ghost"}
              onClick={() => setTimeRange(range)}
              className={timeRange === range ? "bg-violet-600 text-white" : isDark ? "text-purple-200" : ""}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Shares", value: totalShares, icon: Share2, color: "from-violet-500 to-purple-600" },
          { label: "Products", value: userProducts.length, icon: Package, color: "from-emerald-500 to-teal-600" },
          { label: "Avg Shares/Product", value: avgSharesPerProduct, icon: TrendingUp, color: "from-amber-500 to-orange-600" },
          { label: "Active Days", value: 28, icon: Calendar, color: "from-pink-500 to-rose-600" },
        ].map((stat, index) => {
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

      <div
        className={`rounded-2xl p-6 border ${
          isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
        }`}
      >
        <h2 className={`text-lg font-semibold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
          Shares Over Time
        </h2>
        <div className="h-64 flex items-end justify-between gap-4">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-violet-600 to-purple-500 rounded-t-lg transition-all duration-300"
                style={{ height: `${(data.shares / maxShares) * 100}%` }}
              />
              <span className={`text-xs mt-2 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                {data.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`rounded-2xl p-6 border ${
          isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
        }`}
      >
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Top Performing Products
        </h2>
        <div className="space-y-3">
          {userProducts
            .sort((a, b) => b.shareCount - a.shareCount)
            .slice(0, 5)
            .map((product, index) => (
              <div
                key={product.id}
                className={`flex items-center gap-4 p-3 rounded-xl ${
                  isDark ? "bg-purple-800/20" : "bg-gray-50"
                }`}
              >
                <span className={`text-lg font-bold ${isDark ? "text-purple-400" : "text-gray-400"}`}>
                  #{index + 1}
                </span>
                <div className="flex-1">
                  <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    {product.name}
                  </p>
                  <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                    {product.category || "Uncategorized"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-gray-400"}`} />
                  <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {product.shareCount}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
