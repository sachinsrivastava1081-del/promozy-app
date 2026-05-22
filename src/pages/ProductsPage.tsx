import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLicense } from "../context/LicenseContext";
import { Product } from "../types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import ProductCard from "../components/ProductCard";
import { Plus, Search, Package } from "lucide-react";

export default function ProductsPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { validateSubscription, canAccessFeature } = useLicense();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem("promozy-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const saveProducts = (updated: Product[]) => {
    localStorage.setItem("promozy-products", JSON.stringify(updated));
    setProducts(updated);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    const product: Product = {
      id: `product-${Date.now()}`,
      userId: user?.id || "",
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price) || 0,
      imageUrl: newProduct.imageUrl || "",
      category: newProduct.category,
      whatsappMessage: generateWhatsAppMessage(newProduct),
      shareCount: 0,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    saveProducts([...products, product]);
    setNewProduct({ name: "", description: "", price: "", category: "", imageUrl: "" });
    setShowAddModal(false);
  };

  const generateWhatsAppMessage = (product: { name: string; description: string; price: string }) => {
    return `🛍️ *${product.name}*

${product.description}

💰 Price: $${product.price}

📱 Contact us for more details!
Powered by Promozy`;
  };

  const handleShare = (product: Product) => {
    if (!canAccessFeature("whatsapp-share")) {
      alert("⚠️ Premium feature! Please upgrade your subscription to share products.");
      return;
    }

    const message = encodeURIComponent(product.whatsappMessage);
    window.open(`https://wa.me/?text=${message}`, "_blank");

    const updated = products.map((p) =>
      p.id === product.id ? { ...p, shareCount: p.shareCount + 1 } : p
    );
    saveProducts(updated);
  };

  const handleDelete = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    saveProducts(updated);
  };

  const userProducts = products.filter((p) => p.userId === user?.id);
  const filteredProducts = userProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Products
          </h1>
          <p className={`mt-1 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            Manage and promote your products
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-purple-400" : "text-gray-400"}`} />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 ${isDark ? "bg-slate-900/50 border-purple-800/30 text-white" : "bg-white border-gray-200"}`}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div
          className={`rounded-2xl p-12 text-center border ${
            isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <Package className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-purple-400" : "text-gray-400"}`} />
          <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            No products yet
          </h3>
          <p className={`mt-2 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
            Add your first product to start promoting on WhatsApp
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onShare={handleShare}
              onDelete={handleDelete}
              canShare={validateSubscription()}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`w-full max-w-lg rounded-2xl p-6 border ${
              isDark ? "bg-slate-900 border-purple-800/30" : "bg-white border-gray-200"
            }`}
          >
            <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Add New Product
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className={isDark ? "text-purple-200" : ""}>Product Name *</Label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className={isDark ? "bg-slate-800 border-purple-700/50 text-white" : ""}
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label className={isDark ? "text-purple-200" : ""}>Description</Label>
                <Textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className={isDark ? "bg-slate-800 border-purple-700/50 text-white" : ""}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={isDark ? "text-purple-200" : ""}>Price ($) *</Label>
                  <Input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className={isDark ? "bg-slate-800 border-purple-700/50 text-white" : ""}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label className={isDark ? "text-purple-200" : ""}>Category</Label>
                  <Input
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className={isDark ? "bg-slate-800 border-purple-700/50 text-white" : ""}
                    placeholder="Electronics"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={isDark ? "text-purple-200" : ""}>Image URL</Label>
                <Input
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  className={isDark ? "bg-slate-800 border-purple-700/50 text-white" : ""}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="ghost"
                onClick={() => setShowAddModal(false)}
                className={isDark ? "text-purple-200 hover:bg-purple-800/30" : ""}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
              >
                Add Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}