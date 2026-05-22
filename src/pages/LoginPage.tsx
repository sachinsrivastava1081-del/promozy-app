import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Sparkles, Mail, Lock, Shield } from "lucide-react";

interface LoginPageProps {
  onSwitchToRegister: () => void;
}

export default function LoginPage({ onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950 flex items-center justify-center p-4">

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-purple-800/30 shadow-2xl shadow-purple-500/10 p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Promozy</h1>
            <p className="text-purple-300 mt-2">Promote Faster. Sell Smarter.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-purple-200 text-sm">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-purple-700/50 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-purple-200 text-sm">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-purple-700/50 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:from-violet-700 hover:to-purple-700 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Switch */}
          <div className="mt-6 text-center">
            <p className="text-purple-300 text-sm">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-violet-400 font-semibold"
              >
                Create Account
              </button>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-purple-800/30 text-center">
            <div className="flex items-center justify-center gap-2 text-purple-400 text-sm">
              <Shield className="w-4 h-4" />
              <span>Protected by Private License System</span>
            </div>
          </div>

        </div>

        <p className="text-center text-purple-400 text-xs mt-6">
          © 2024 Promozy. All rights reserved.
        </p>
      </div>
    </div>
  );
}
