import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import { Product } from '../types';

export default function ProductShare() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', description: '' });

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: '₹2,999',
      image: 'https://images.unsplash.com/photo-1505740420928-517a59a89b71?w=400&h=400&fit=crop',
      description: 'Premium wireless headphones with noise cancellation',
      userId: 'user-1',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      price: '₹4,999',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      description: 'Advanced smartwatch with health tracking',
      userId: 'user-1',
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'Premium Leather Wallet',
      price: '₹1,499',
      image: 'https://images.unsplash.com/photo-1627123424574-72475359b2f1?w=400&h=400&fit=crop',
      description: 'Genuine leather wallet with RFID protection',
      userId: 'user-1',
      createdAt: new Date()
    },
    {
      id: '4',
      name: 'Wireless Charging Pad',
      price: '₹999',
      image: 'https://images.unsplash.com/photo-1586816879360-004f5c0e51e5?w=400&h=400&fit=crop',
      description: 'Fast wireless charging for all devices',
      userId: 'user-1',
      createdAt: new Date()
    },
    {
      id: '5',
      name: 'Mechanical Keyboard',
      price: '₹3,499',
      image: 'https://images.unsplash.com/photo-1511467688224-77953c6e6d22?w=400&h=400&fit=crop',
      description: 'RGB mechanical keyboard with blue switches',
      userId: 'user-1',
      createdAt: new Date()
    },
    {
      id: '6',
      name: 'Portable Speaker',
      price: '₹2,199',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
      description: 'Waterproof portable Bluetooth speaker',
      userId: 'user-1',
      createdAt: new Date()
    }
  ]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    
    setProducts([
      {
        id: Date.now().toString(),
        name: newProduct.name,
        price: newProduct.price.startsWith('₹') ? newProduct.price : `₹${newProduct.price}`,
        image: newProduct.image || 'https://via.placeholder.com/400',
        description: newProduct.description,
        userId: user?.id || 'unknown',
        createdAt: new Date()
      },
      ...products
    ]);
    
    setNewProduct({ name: '', price: '', image: '', description: '' });
    setShowAddModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleShare = (product: Product) => {
    // Create message
    const message = `🔥 Check this Product

📦 Product Name: ${product.name}
💰 Price: ${product.price}
📝 Description: ${product.description || 'Premium quality product'}

👉 Hurry Limited Offer!`;
    
    // Encode message for URL
    const encodedText = encodeURIComponent(message);
    
    // Create wa.me link (NO API - only wa.me)
    const waLink = `https://wa.me/919410004817?text=${encodedText}`;
    
    // Open WhatsApp
    window.open(waLink, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            🛒 Product Sharing
          </h1>
          <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>
            Share products on WhatsApp with one click
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className={`
        flex items-center gap-2 px-4 py-3 rounded-xl
        ${isDark ? 'bg-slate-800' : 'bg-gray-100'}
      `}>
        <Search className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`
            bg-transparent border-none outline-none flex-1
            ${isDark ? 'text-white placeholder-purple-400' : 'text-gray-900 placeholder-gray-400'}
          `}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`
              rounded-2xl border overflow-hidden group
              ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-lg'}
            `}
          >
            {/* Product Image */}
            <div className="aspect-square overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4">
              {/* Product Name */}
              <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h3>

              {/* Description */}
              {product.description && (
                <p className={`text-sm mb-2 line-clamp-2 ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>
                  {product.description}
                </p>
              )}

              {/* Price */}
              <p className={`text-xl font-bold mb-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {product.price}
              </p>

              {/* WhatsApp Share Button - wa.me ONLY */}
              <button
                onClick={() => handleShare(product)}
                className="
                  w-full py-3 rounded-xl font-bold text-white
                  flex items-center justify-center gap-2
                  bg-green-500 hover:bg-green-600
                  transition-all duration-200 hover:scale-105 active:scale-95
                "
              >
                <WhatsAppIcon />
                <span>Share on WhatsApp</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className={`
          text-center py-12 rounded-2xl border
          ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-sm'}
        `}>
          <p className={isDark ? 'text-purple-400' : 'text-gray-500'}>
            No products found. Add your first product to get started!
          </p>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div className={`
            relative w-full max-w-md rounded-2xl p-6 z-10
            ${isDark ? 'bg-slate-900 border border-purple-800/30' : 'bg-white border border-gray-200 shadow-xl'}
          `}>
            <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Add New Product
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-purple-300' : 'text-gray-700'}`}>
                  Product Name *
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className={`
                    w-full px-4 py-2.5 rounded-xl border outline-none transition-colors
                    ${isDark 
                      ? 'bg-slate-800 border-purple-800/50 text-white focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                    }
                  `}
                  placeholder="Enter product name"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-purple-300' : 'text-gray-700'}`}>
                  Price *
                </label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className={`
                    w-full px-4 py-2.5 rounded-xl border outline-none transition-colors
                    ${isDark 
                      ? 'bg-slate-800 border-purple-800/50 text-white focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                    }
                  `}
                  placeholder="e.g., ₹2,999"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-purple-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  rows={2}
                  className={`
                    w-full px-4 py-2.5 rounded-xl border outline-none transition-colors resize-none
                    ${isDark 
                      ? 'bg-slate-800 border-purple-800/50 text-white focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                    }
                  `}
                  placeholder="Brief product description"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-purple-300' : 'text-gray-700'}`}>
                  Image URL
                </label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className={`
                    w-full px-4 py-2.5 rounded-xl border outline-none transition-colors
                    ${isDark 
                      ? 'bg-slate-800 border-purple-800/50 text-white focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                    }
                  `}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`
                    flex-1 py-2.5 rounded-xl font-semibold transition-colors
                    ${isDark 
                      ? 'bg-slate-800 text-purple-300 hover:bg-slate-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  disabled={!newProduct.name || !newProduct.price}
                  className={`
                    flex-1 py-2.5 rounded-xl font-semibold transition-all
                    ${newProduct.name && newProduct.price
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.299-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.866 9.866 0 01-5.091-1.396l-.363-.215-3.777.99 1.008-3.683-.238-.375a9.862 9.862 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.894 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}