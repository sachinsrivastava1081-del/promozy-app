import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface WhatsAppShareButtonProps {
  productName: string;
  productPrice: string;
  productImage: string;
  phoneNumber?: string;
}

export default function WhatsAppShareButton({
  productName,
  productPrice,
  productImage,
  phoneNumber = '919410004817'
}: WhatsAppShareButtonProps) {
  const { isDark } = useTheme();
  const [isSharing, setIsSharing] = useState(false);

  const generateWhatsAppLink = (): string => {
    const message = `Check this product

📦 Product: ${productName}
💰 Price: ${productPrice}

👉 Order now!`;
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const handleShare = () => {
    setIsSharing(true);
    const waLink = generateWhatsAppLink();
    window.open(waLink, '_blank');
    
    setTimeout(() => setIsSharing(false), 1000);
  };

  return (
    <div className={`
      rounded-2xl border overflow-hidden
      ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-lg'}
    `}>
      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className={`
          text-lg font-bold mb-2
          ${isDark ? 'text-white' : 'text-gray-900'}
        `}>
          {productName}
        </h3>

        {/* Price */}
        <p className={`
          text-xl font-bold mb-4
          ${isDark ? 'text-purple-400' : 'text-purple-600'}
        `}>
          {productPrice}
        </p>

        {/* WhatsApp Share Button */}
        <button
          onClick={handleShare}
          disabled={isSharing}
          className={`
            w-full py-3 rounded-xl font-bold text-white
            flex items-center justify-center gap-2
            transition-all duration-200
            ${isSharing 
              ? 'bg-green-600 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95'
            }
          `}
        >
          {isSharing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Opening...</span>
            </>
          ) : (
            <>
              <WhatsAppIcon />
              <span>Share on WhatsApp</span>
            </>
          )}
        </button>
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