import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import { Crown, CheckCircle, Zap, Star, Shield, Clock, Users, Sparkles } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
  maxProducts: number;
  maxShares: number;
  active: boolean;
  popular?: boolean;
}

export default function SubscriptionPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Load plans from localStorage (set by admin)
    const savedPlans = localStorage.getItem("promozy-plans");
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    } else {
      // Default plans with INR pricing
      const defaultPlans: Plan[] = [
        {
          id: "plan-starter",
          name: "Starter",
          price: 699,
          interval: "monthly",
          features: ["10 Products", "100 Shares/month", "Basic Analytics", "Email Support", "WhatsApp Integration"],
          maxProducts: 10,
          maxShares: 100,
          active: true,
        },
        {
          id: "plan-pro",
          name: "Pro",
          price: 1999,
          interval: "monthly",
          features: ["Unlimited Products", "Unlimited Shares", "Advanced Analytics", "Priority Support", "Custom Branding", "API Access"],
          maxProducts: -1,
          maxShares: -1,
          active: true,
          popular: true,
        },
        {
          id: "plan-enterprise",
          name: "Enterprise",
          price: 4999,
          interval: "monthly",
          features: ["Everything in Pro", "Dedicated Account Manager", "Custom Integrations", "SLA Guarantee", "White-label Solution", "On-premise Deployment"],
          maxProducts: -1,
          maxShares: -1,
          active: true,
        },
      ];
      setPlans(defaultPlans);
      localStorage.setItem("promozy-plans", JSON.stringify(defaultPlans));
    }
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handleSubscribe = () => {
    if (!selectedPlan) return;
    
    // In real app, this would integrate with Razorpay/Stripe
    alert(`🎉 Subscription Request Sent!\n\nPlan: ${selectedPlan.name}\nAmount: ₹${selectedPlan.price}/month\n\nPlease contact admin to activate your subscription.\n\nOwner Email: owner@promozy.com`);
    setShowPaymentModal(false);
  };

  const activePlans = plans.filter(p => p.active);

  const yearlyDiscount = 20; // 20% discount for yearly

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 mb-4">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className={`text-sm font-medium ${isDark ? "text-violet-300" : "text-violet-600"}`}>
            Upgrade to Premium
          </span>
        </div>
        <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Choose Your Plan
        </h1>
        <p className={`mt-3 text-lg ${isDark ? "text-purple-300" : "text-gray-600"}`}>
          Unlock powerful features to grow your business
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm ${billingCycle === "monthly" ? (isDark ? "text-white font-medium" : "text-gray-900 font-medium") : (isDark ? "text-purple-400" : "text-gray-500")}`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            billingCycle === "yearly" ? "bg-violet-600" : isDark ? "bg-purple-800/50" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
              billingCycle === "yearly" ? "translate-x-8" : "translate-x-1"
            }`}
          />
        </button>
        <span className={`text-sm ${billingCycle === "yearly" ? (isDark ? "text-white font-medium" : "text-gray-900 font-medium") : (isDark ? "text-purple-400" : "text-gray-500")}`}>
          Yearly
        </span>
        {billingCycle === "yearly" && (
          <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
            Save {yearlyDiscount}%
          </span>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePlans.map((plan, index) => {
          const displayPrice = billingCycle === "yearly"
            ? Math.round(plan.price * 12 * (1 - yearlyDiscount / 100))
            : plan.price;
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 border transition-all ${
                isPopular
                  ? isDark
                    ? "bg-gradient-to-b from-violet-950/50 to-purple-950/50 border-violet-500 shadow-xl shadow-violet-500/10"
                    : "bg-gradient-to-b from-violet-50 to-purple-50 border-violet-300 shadow-xl"
                  : isDark
                  ? "bg-slate-900/50 border-purple-800/30"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Star className="w-3 h-3" /> MOST POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    ₹{displayPrice.toLocaleString('en-IN')}
                  </span>
                  <span className={isDark ? "text-purple-300" : "text-gray-500"}>
                    /{billingCycle === "yearly" ? "year" : "month"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className={`text-sm mt-1 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                    ₹{Math.round(displayPrice / 12).toLocaleString('en-IN')}/month (billed annually)
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm ${isDark ? "text-purple-200" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={`grid grid-cols-2 gap-3 mb-6 p-3 rounded-xl ${isDark ? "bg-purple-800/20" : "bg-gray-100"}`}>
                <div className="text-center">
                  <p className={`text-xs ${isDark ? "text-purple-400" : "text-gray-500"}`}>Products</p>
                  <p className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {plan.maxProducts === -1 ? "∞" : plan.maxProducts}
                  </p>
                </div>
                <div className="text-center">
                  <p className={`text-xs ${isDark ? "text-purple-400" : "text-gray-500"}`}>Shares/mo</p>
                  <p className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {plan.maxShares === -1 ? "∞" : plan.maxShares}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full ${
                  isPopular
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
                    : isDark
                    ? "bg-purple-800/50 text-white hover:bg-purple-700/50"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {isPopular ? (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Get Started
                  </>
                ) : (
                  "Choose Plan"
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Features Comparison */}
      <div className={`rounded-2xl p-6 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
        <h2 className={`text-xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-gray-900"}`}>
          Why Choose Promozy?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Instant Sharing</h3>
            <p className={`text-sm mt-1 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
              Share products on WhatsApp with one click
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Secure Platform</h3>
            <p className={`text-sm mt-1 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
              Your data is protected with enterprise security
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Dedicated Support</h3>
            <p className={`text-sm mt-1 ${isDark ? "text-purple-300" : "text-gray-500"}`}>
              24/7 support to help you succeed
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className={`rounded-2xl p-6 border ${isDark ? "bg-slate-900/50 border-purple-800/30" : "bg-white border-gray-200 shadow-sm"}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${isDark ? "bg-purple-800/20" : "bg-gray-50"}`}>
            <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
              Can I change my plan later?
            </h3>
            <p className={`text-sm mt-1 ${isDark ? "text-purple-300" : "text-gray-600"}`}>
              Yes, you can upgrade or downgrade your plan at any time. Contact admin for plan changes.
            </p>
          </div>
          <div className={`p-4 rounded-xl ${isDark ? "bg-purple-800/20" : "bg-gray-50"}`}>
            <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
              What payment methods are accepted?
            </h3>
            <p className={`text-sm mt-1 ${isDark ? "text-purple-300" : "text-gray-600"}`}>
              We accept UPI, credit/debit cards, net banking, and wallet payments through Razorpay.
            </p>
          </div>
          <div className={`p-4 rounded-xl ${isDark ? "bg-purple-800/20" : "bg-gray-50"}`}>
            <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
              Is there a free trial?
            </h3>
            <p className={`text-sm mt-1 ${isDark ? "text-purple-300" : "text-gray-600"}`}>
              Yes! New users get a 7-day free trial of the Pro plan. No credit card required.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl p-6 border ${isDark ? "bg-slate-900 border-purple-800/30" : "bg-white border-gray-200"}`}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                Subscribe to {selectedPlan.name}
              </h2>
            </div>

            <div className={`rounded-xl p-4 mb-6 ${isDark ? "bg-purple-800/20" : "bg-gray-50"}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={isDark ? "text-purple-300" : "text-gray-600"}>Plan</span>
                <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className={isDark ? "text-purple-300" : "text-gray-600"}>Billing</span>
                <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{billingCycle}</span>
              </div>
              <div className="border-t border-purple-800/20 my-2" />
              <div className="flex justify-between items-center">
                <span className={`font-medium ${isDark ? "text-purple-200" : "text-gray-700"}`}>Total</span>
                <span className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  ₹{billingCycle === "yearly"
                    ? Math.round(selectedPlan.price * 12 * (1 - yearlyDiscount / 100)).toLocaleString('en-IN')
                    : selectedPlan.price.toLocaleString('en-IN')}
                  <span className={`text-sm font-normal ${isDark ? "text-purple-300" : "text-gray-500"}`}>
                    /{billingCycle === "yearly" ? "year" : "month"}
                  </span>
                </span>
              </div>
            </div>

            <div className={`rounded-xl p-4 mb-6 border ${isDark ? "bg-amber-950/30 border-amber-800/50" : "bg-amber-50 border-amber-200"}`}>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className={`font-medium ${isDark ? "text-amber-200" : "text-amber-800"}`}>
                    Admin Activation Required
                  </p>
                  <p className={`text-sm mt-1 ${isDark ? "text-amber-300" : "text-amber-700"}`}>
                    After payment, contact admin to activate your subscription. You'll receive your license key via email.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowPaymentModal(false)}
                className={`flex-1 ${isDark ? "text-purple-200" : "text-gray-600"}`}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubscribe}
                className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white"
              >
                Proceed to Pay ₹{billingCycle === "yearly"
                  ? Math.round(selectedPlan.price * 12 * (1 - yearlyDiscount / 100)).toLocaleString('en-IN')
                  : selectedPlan.price.toLocaleString('en-IN')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}