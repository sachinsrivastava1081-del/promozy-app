import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Package, Share2, TrendingUp, Crown, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { isDark } = useTheme();
  const { user } = useAuth();

  const stats = [
    { label: 'Total Products', value: '24', icon: Package, color: 'purple', change: '+3 this week' },
    { label: 'Shares Today', value: '156', icon: Share2, color: 'green', change: '+23% vs yesterday' },
    { label: 'Click Rate', value: '89%', icon: TrendingUp, color: 'blue', change: '+5% improvement' },
    { label: 'Plan Status', value: user?.plan?.toUpperCase() || 'FREE', icon: Crown, color: 'amber', change: 'Active' },
  ];

  const recentProducts = [
    { name: 'Wireless Headphones', price: '₹2,999', shares: 45 },
    { name: 'Smart Watch Pro', price: '₹4,999', shares: 32 },
    { name: 'Leather Wallet', price: '₹1,499', shares: 28 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className={`
        rounded-2xl p-6 relative overflow-hidden
        bg-gradient-to-r from-purple-600 to-violet-600
      `}>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to Promozy! 🚀
          </h2>
          <p className="text-purple-100 mb-4">
            Your one-stop solution for WhatsApp product promotion
          </p>
          <div className="flex items-center gap-2 text-sm text-purple-200">
            <Sparkles className="w-4 h-4" />
            <span>License ID: {user?.licenseId}</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`
              rounded-2xl p-5 border transition-all duration-200 hover:scale-105
              ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-sm'}
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`
                p-2.5 rounded-xl
                ${stat.color === 'purple' ? 'bg-purple-600/20 text-purple-400' : ''}
                ${stat.color === 'green' ? 'bg-green-600/20 text-green-400' : ''}
                ${stat.color === 'blue' ? 'bg-blue-600/20 text-blue-400' : ''}
                ${stat.color === 'amber' ? 'bg-amber-600/20 text-amber-400' : ''}
              `}>
                <stat.icon className="w-5 h-5" />
              </div>
              <ArrowUpRight className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-gray-400'}`} />
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </p>
            <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>
              {stat.label}
            </p>
            <p className={`text-xs mt-2 ${isDark ? 'text-purple-500' : 'text-gray-400'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className={`
        rounded-2xl border
        ${isDark ? 'bg-slate-900/50 border-purple-800/30' : 'bg-white border-gray-200 shadow-sm'}
      `}>
        <div className={`p-5 border-b ${isDark ? 'border-purple-800/30' : 'border-gray-200'}`}>
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Products
          </h3>
        </div>
        <div className="divide-y divide-purple-800/20">
          {recentProducts.map((product, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </p>
                <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>
                  {product.price}
                </p>
              </div>
              <div className={`text-sm ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>
                {product.shares} shares
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}