import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ProductShareCard from './ProductShareCard';
import { Plus, Search, Grid3X3, List, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  link?: string;
}

export default function ProductListing() {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones Pro',
      price: '₹2,999',
      image: 'https://images.unsplash.com/photo-1505740420928-517a59a89b71?w=400&h=400&fit=crop',
      link: 'https://promozy.app/product/headphones-pro'
    },
    {
      id: '2',
      name: 'Smart Watch Series X',
      price: '₹4,999',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      link: 'https://promozy.app/product/smart-watch-x'
    },
    {
      id: '3',
      name: 'Premium Leather Wallet',
      price: '₹1,499',
      image: 'https://images.unsplash.com/photo-1627123424574-72475359b2f1?w=400&h=400&fit=crop',
      link: 'https://promozy.app/product/leather-wallet'
    },
    {
      id: '4',
      name: 'Wireless Charging Pad',
      price: '₹999',
      image: 'https://images.unsplash.com/photo-1586816879360-004f5c0e51e5?w=400&h=400&fit=crop',
      link: 'https://promozy.app/product/wireless-charger'
    },
    {
      id: '5',
      name: 'Mechanical Gaming Keyboard',
      price: '₹3,499',
      image: 'https://images.unsplash.com/photo-1511467688224-77953c6e6d22?w=400&h=400&fit=crop',
      link: 'https://promozy.app/product/gaming-keyboard'
    },
    {
      id: '6',
      name: 'Portable Bluetooth Speaker',
      price: '₹2,199',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
      link: 'https://promozy.app/product/bluetooth-speaker'
    }
  ]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: newProduct.price.startsWith('₹') ? newProduct.price : `₹${newProduct.price}`,
      image: newProduct.image || 'https://via.placeholder.com/400',
      link: `https://promozy.app/product/${newProduct.name.toLowerCase().replace(/\s+/g, '-')}`
    };
    
    setProducts([product, ...products]);
    setNewProduct({ name: '', price: '', image: '' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            🛒 Product Sharing
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>
            Share products instantly on WhatsApp with one click
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-500/25"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className={`
        flex flex-col sm:flex-row gap-3 p-4 rounded-2xl border
        ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-sm'}
      `}>
        <div className={`
          flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl
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
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`
              p-2.5 rounded-xl transition-colors
              ${viewMode === 'grid'
                ? isDark ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'
                : isDark ? 'bg-slate-800 text-purple-400' : 'bg-gray-100 text-gray-500'
              }
            `}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`
              p-2.5 rounded-xl transition-colors
              ${viewMode === 'list'
                ? isDark ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'
                : isDark ? 'bg-slate-800 text-purple-400' : 'bg-gray-100 text-gray-500'
              }
            `}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductShareCard
              key={product.id}
              productName={product.name}
              productPrice={product.price}
              productImage={product.image}
              productLink={product.link}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`
                flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border
                ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-sm'}
              `}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full sm:w-32 h-32 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </h3>
                <p className={`text-xl font-bold mt-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {product.price}
                </p>
                <button
                  onClick={() => {
                    const message = encodeURIComponent(`🔥 Check this Product\n\n📦 Product Name: ${product.name}\n💰 Price: ${product.price}\n🛒 Buy Now: ${product.link}\n\n👉 Hurry Limited Offer!`);
                    window.open(`https://wa.me/?text=${message}`, '_blank');
                  }}
                  className="mt-3 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.299-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.866 9.866 0 01-5.091-1.396l-.363-.215-3.777.99 1.008-3.683-.238-.375a9.862 9.862 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.894 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Share on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className={`
          text-center py-16 rounded-2xl border
          ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-sm'}
        `}>
          <div className="text-6xl mb-4">📦</div>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No Products Found
          </h3>
          <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>
            Try adjusting your search or add a new product
          </p>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className={`
            relative w-full max-w-md rounded-2xl p-6 z-10
            ${isDark ? 'bg-slate-900 border border-purple-800/30' : 'bg-white border border-gray-200 shadow-xl'}
          `}>
            <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ➕ Add New Product
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
                    w-full px-4 py-3 rounded-xl border outline-none transition-colors
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
                  Price (₹) *
                </label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className={`
                    w-full px-4 py-3 rounded-xl border outline-none transition-colors
                    ${isDark 
                      ? 'bg-slate-800 border-purple-800/50 text-white focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                    }
                  `}
                  placeholder="e.g., 2,999"
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
                    w-full px-4 py-3 rounded-xl border outline-none transition-colors
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
                    flex-1 py-3 rounded-xl font-semibold transition-colors
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
                    flex-1 py-3 rounded-xl font-semibold transition-all
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