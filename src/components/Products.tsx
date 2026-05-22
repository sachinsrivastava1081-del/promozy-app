import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Product } from '../types';
import { CATEGORIES } from '../utils/constants';
import WhatsAppShareButton from './WhatsAppShareButton';
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  X
} from 'lucide-react';

export default function Products() {
  const { isDark } = useTheme();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      userId: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
      price: 2999,
      image: '',
      category: 'Electronics',
      whatsappMessage: '',
      shareCount: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      userId: '1',
      name: 'Smart Watch Pro',
      description: 'Feature-rich smartwatch with health monitoring, GPS, and 7-day battery life.',
      price: 4999,
      image: '',
      category: 'Electronics',
      whatsappMessage: '',
      shareCount: 32,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      userId: '1',
      name: 'Premium Leather Wallet',
      description: 'Handcrafted genuine leather wallet with RFID protection. Multiple card slots and coin pocket.',
      price: 1499,
      image: '',
      category: 'Fashion',
      whatsappMessage: '',
      shareCount: 18,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    
    const product: Product = {
      id: Date.now().toString(),
      userId: '1',
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      image: '',
      category: newProduct.category,
      whatsappMessage: '',
      shareCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setProducts([...products, product]);
    setNewProduct({ name: '', description: '', price: '', category: 'Electronics' });
    setShowModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Products
          </h1>
          <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>
            Manage and promote your products on WhatsApp
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`
              rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-102
              ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-sm'}
            `}
          >
            <div className={`
              h-40 flex items-center justify-center relative
              ${isDark ? 'bg-slate-800' : 'bg-gray-100'}
            `}>
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <Package className={`w-12 h-12 ${isDark ? 'text-purple-600' : 'text-gray-300'}`} />
              )}
              <div className="absolute top-3 right-3">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-600'}
                `}>
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </h3>
                <span className={`font-bold whitespace-nowrap ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  ₹{product.price.toLocaleString()}
                </span>
              </div>
              
              <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-purple-300' : 'text-gray-500'}`}>
                {product.description}
              </p>
              
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs ${isDark ? 'text-purple-400' : 'text-gray-400'}`}>
                  {product.shareCount} shares
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? 'bg-slate-800 text-purple-400 hover:bg-slate-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-500 hover:bg-red-100'
                    }`}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-purple-800/20">
                <WhatsAppShareButton
                  productName={product.name}
                  productDescription={product.description}
                  productPrice={product.price}
                  variant="primary"
                  size="md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className={`
          text-center py-12 rounded-2xl border
          ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-sm'}
        `}>
          <Package className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-purple-600' : 'text-gray-300'}`} />
          <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No products found
          </h3>
          <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>
            Try adjusting your search or add a new product
          </p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className={`
            relative w-full max-w-md rounded-2xl p-6 z-10
            ${isDark ? 'bg-slate-900 border border-purple-800/30' : 'bg-white border border-gray-200 shadow-xl'}
          `}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Add New Product
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'bg-slate-800 text-purple-400 hover:bg-slate-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
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
                  Description
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  rows={3}
                  className={`
                    w-full px-4 py-2.5 rounded-xl border outline-none transition-colors resize-none
                    ${isDark 
                      ? 'bg-slate-800 border-purple-800/50 text-white focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                    }
                  `}
                  placeholder="Enter product description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-purple-300' : 'text-gray-700'}`}>
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className={`
                      w-full px-4 py-2.5 rounded-xl border outline-none transition-colors
                      ${isDark 
                        ? 'bg-slate-800 border-purple-800/50 text-white focus:border-purple-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }
                    `}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-purple-300' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className={`
                      w-full px-4 py-2.5 rounded-xl border outline-none transition-colors
                      ${isDark 
                        ? 'bg-slate-800 border-purple-800/50 text-white focus:border-purple-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }
                    `}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                onClick={handleAddProduct}
                disabled={!newProduct.name || !newProduct.price}
                className={`
                  w-full py-3 rounded-xl font-semibold transition-all duration-200
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
      )}
    </div>
  );
}