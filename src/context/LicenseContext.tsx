import { createContext, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface LicenseContextType {
  isValidLicense: () => boolean;
  canAccessFeature: (feature: string) => boolean;
  getLicenseStatus: () => "active" | "expired" | "free";
  validateSubscription: () => boolean;
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

const PREMIUM_FEATURES = ["whatsapp-share", "analytics", "bulk-upload", "priority-support"];

export function LicenseProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const isValidLicense = (): boolean => {
    if (!user) return false;
    if (user.role === "owner") return true;
    return user.subscriptionActive && !user.isBlocked;
  };

  const getLicenseStatus = (): "active" | "expired" | "free" => {
    if (!user) return "free";
    if (user.role === "owner") return "active";
    if (!user.subscriptionActive) return "free";
    if (user.subscriptionExpiry && new Date(user.subscriptionExpiry) < new Date()) return "expired";
    return "active";
  };

  const validateSubscription = (): boolean => {
    if (!user) return false;
    if (user.role === "owner") return true;
    if (user.isBlocked) return false;
    if (!user.subscriptionActive) return false;
    if (user.subscriptionExpiry && new Date(user.subscriptionExpiry) < new Date()) return false;
    return true;
  };

  const canAccessFeature = (feature: string): boolean => {
    if (!user) return false;
    if (user.role === "owner") return true;
    if (user.isBlocked) return false;
    if (!validateSubscription() && PREMIUM_FEATURES.includes(feature)) return false;
    return true;
  };

  return (
    <LicenseContext.Provider
      value={{ isValidLicense, canAccessFeature, getLicenseStatus, validateSubscription }}
    >
      {children}
    </LicenseContext.Provider>
  );
}

export const useLicense = () => {
  const context = useContext(LicenseContext);
  if (!context) throw new Error("useLicense must be used within LicenseProvider");
  return context;
};