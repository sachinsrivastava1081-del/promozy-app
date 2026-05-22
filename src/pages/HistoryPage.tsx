import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Product } from "../types";
import Branding, { FooterBranding } from "../components/Branding";
import { Clock, Share2, Package, TrendingUp, Calendar, Filter } from "lucide-react";

export default function HistoryPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<"all" | "shared" | "draft">("all");

  useEffect(() => {
    const savedProducts = localStorage.getItem("promozy-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const filteredProducts = products.filter((p) => {
    if (filter === "shared") return (p.shareCount || 0) > 0;
    if (filter === "draft") return (p.shareCount || 0) === 0;
    return true;
  });

  const totalShares = products.reduce((acc, p) => acc + (p.shareCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header with Branding */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Clock className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Promotion History
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Branding size="small" showTagline={false} showCreator={false} layout="inline" />
            <span className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
              - Track your promotions
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-2xl p-5 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {products.length}
              </p>
              <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                Total Products
              </p>
            </div>
          </div>
        </div>
        <div className={`rounded-2xl p-5 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {totalShares}
              </p>
              <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                Total Shares
              </p>
            </div>
          </div>
        </div>
        <div className={`rounded-2xl p-5 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {products.filter((p) => (p.shareCount || 0) > 0).length}
              </p>
              <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                Promoted
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
        <div className="flex gap-2">
          {["all", "shared", "draft"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                  : isDark
                  ? "bg-purple-950/50 text-purple-300 hover:bg-purple-900/50"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      {filteredProducts.length === 0 ? (
        <div className={`rounded-2xl p-12 text-center border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <Clock className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-purple-400" : "text-purple-300"}`} />
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            No History Yet
          </h3>
          <p className={`mb-4 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            Start promoting products to see your history here
          </p>
          <Branding size="normal" />
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`rounded-xl p-4 flex items-center gap-4 border ${
                isDark
                  ? "bg-slate-900/50 border-purple-800/30 hover:border-purple-600/50"
                  : "bg-white border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
              ) : (
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${isDark ? "bg-purple-950/50" : "bg-purple-100"}`}>
                  <Package className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                </div>
              )}
              <div className="flex-1">
                <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {product.name}
                </h3>
                <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <span className={`text-xs ${isDark ? "text-purple-400" : "text-gray-400"}`}>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                  <span className={`text-xs ${isDark ? "text-purple-400" : "text-gray-400"}`}>
                    <Share2 className="w-3 h-3 inline mr-1" />
                    {product.shareCount || 0} shares
                  </span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                (product.shareCount || 0) > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}>
                {(product.shareCount || 0) > 0 ? "Shared" : "Draft"}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Branding */}
      <FooterBranding size="normal" />
    </div>
  );
}