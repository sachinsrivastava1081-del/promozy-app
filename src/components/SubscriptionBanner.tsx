import { Button } from "./ui/button";
import { AlertTriangle, Crown } from "lucide-react";

interface SubscriptionBannerProps {
  status: "expired" | "free";
  onNavigate: (page: string) => void;
}

export default function SubscriptionBanner({ status, onNavigate }: SubscriptionBannerProps) {
  if (status === "active") return null;

  return (
    <div
      className={`mx-6 mt-4 p-4 rounded-xl border ${
        status === "expired"
          ? "bg-red-950/50 border-red-800/50"
          : "bg-amber-950/50 border-amber-800/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {status === "expired" ? (
            <AlertTriangle className="w-5 h-5 text-red-400" />
          ) : (
            <Crown className="w-5 h-5 text-amber-400" />
          )}
          <div>
            <h3 className={`font-semibold ${status === "expired" ? "text-red-200" : "text-amber-200"}`}>
              {status === "expired" ? "Subscription Expired" : "Free Plan - Limited Access"}
            </h3>
            <p className={`text-sm ${status === "expired" ? "text-red-300" : "text-amber-300"}`}>
              {status === "expired"
                ? "Your subscription has expired. Renew to restore full access."
                : "Upgrade to unlock WhatsApp sharing and premium features."}
            </p>
          </div>
        </div>
        <Button
          onClick={() => onNavigate("subscription")}
          className={`${
            status === "expired"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          } text-white`}
        >
          {status === "expired" ? "Renew Now" : "Upgrade Plan"}
        </Button>
      </div>
    </div>
  );
}