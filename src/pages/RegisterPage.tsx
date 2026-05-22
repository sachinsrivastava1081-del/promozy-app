import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../context/AuthContext";
import { Sparkles, Mail, Lock, User, Shield } from "lucide-react";

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

export default function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await register(email, password, name);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-purple-800/30 shadow-2xl shadow-purple-500/10 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Join Promozy</h1>
            <p className="text-purple-300 mt-2">Start promoting your products today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-200">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-11 bg-slate-800/50 border-purple-700/50 text-white placeholder:text-purple-400 focus:border-violet-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 bg-slate-800/50 border-purple-700/50 text-white placeholder:text-purple-400 focus:border-violet-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 bg-slate-800/50 border-purple-700/50 text-white placeholder:text-purple-400 focus:border-violet-500"
                  required
                />
              </div>
            </div>

            <div className="bg-amber-950/30 border border-amber-800/30 rounded-xl p-3">
              <p className="text-amber-200 text-sm">
                ⚠️ New accounts start with Free plan. Upgrade to unlock WhatsApp sharing.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-6 text-lg font-semibold shadow-lg shadow-purple-500/25"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-300">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-violet-400 hover:text-violet-300 font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-purple-800/30">
            <div className="flex items-center justify-center gap-2 text-purple-400 text-sm">
              <Shield className="w-4 h-4" />
              <span>Protected by Private License System</span>
            </div>
          </div>
        </div>

        <p className="text-center text-purple-400 text-xs mt-6">
          © 2024 Promozy. All rights reserved. Private property.
        </p>
      </div>
    </div>
  );
}