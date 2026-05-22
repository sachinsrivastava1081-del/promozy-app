import { useTheme } from "../context/ThemeContext";
import { Product } from "../types";
import { Package, Share2 } from "lucide-react";

interface RecentProductsProps {
  products: Product[];
}

export default function RecentProducts({ products }: RecentProductsProps) {
  const { isDark } = useTheme();

  if (products.length === 0) {
    return (
      <div
        className={`rounded-2xl p-6 border ${
          isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
        }`}
      >
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Recent Products
        </h2>
        <div className={`text-center py-12 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No products yet. Add your first product to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border ${
        isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      <div className="p-5 border-b border-purple-800/20">
        <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
          Recent Products
        </h2>
      </div>
      <div className="divide-y divide-purple-800/20">
        {products.map((product) => (
          <div key={product.id} className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                {product.name}
              </p>
              <p className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-gray-400"}`} />
              <span className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                {product.shareCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}