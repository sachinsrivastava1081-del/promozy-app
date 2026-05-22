import { useTheme } from "../context/ThemeContext";
import { Product } from "../types";
import { Button } from "./ui/button";
import { Share2, Trash2, Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onShare: (product: Product) => void;
  onDelete: (productId: string) => void;
  canShare: boolean;
}

export default function ProductCard({ product, onShare, onDelete, canShare }: ProductCardProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-all duration-200 hover:scale-102 ${
        isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      <div className="h-40 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Package className="w-12 h-12 text-white/50" />
        )}
      </div>
      <div className="p-4">
        <h3 className={`font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>
          {product.name}
        </h3>
        <p className={`text-sm mt-1 line-clamp-2 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
          {product.description || "No description"}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            ${product.price.toFixed(2)}
          </span>
          <span className={`text-sm ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            {product.shareCount} shares
          </span>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => onShare(product)}
            disabled={!canShare}
            className={`flex-1 ${
              canShare
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white`}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="ghost"
            onClick={() => onDelete(product.id)}
            className={`${isDark ? "text-red-400 hover:bg-red-950/50" : "text-red-500 hover:bg-red-50"}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}