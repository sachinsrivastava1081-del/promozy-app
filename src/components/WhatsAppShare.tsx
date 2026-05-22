import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function WhatsAppShare() {
  const { isDark } = useTheme();
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: '₹2,999',
      image: 'https://images.unsplash.com/photo-1505740420928-517a59a89b71?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      price: '₹4,999',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      name: 'Premium Leather Wallet',
      price: '₹1,499',
      image: 'https://images.unsplash.com/photo-1627123424574-72475359b2f1?w=400&h=400&fit=crop'
    }
  ]);

  const handleShare = (product: Product) => {
    // Create message
    const message = `Check this product

📦 Product: ${product.name}
💰 Price: ${product.price}

👉 Order now!`;
    
    // Encode message for URL
    const encodedText = encodeURIComponent(message);
    
    // Create wa.me link (NO API - only wa.me)
    const waLink = `https://wa.me/919410004817?text=${encodedText}`;
    
    // Open WhatsApp
    window.open(waLink, '_blank');
  };

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        🛒 Product Sharing
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`
              rounded-2xl border overflow-hidden
              ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-lg'}
            `}
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />

            {/* Product Details */}
            <div className="p-4">
              {/* Product Name */}
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h3>

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
                  transition-all duration-200 hover:scale-105
                "
              >
                <WhatsAppIcon />
                Share on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
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