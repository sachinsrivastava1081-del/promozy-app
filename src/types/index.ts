export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  licenseId: string;
  subscriptionActive: boolean;
  subscriptionPlan: SubscriptionPlan;
  subscriptionExpiry: string | null;
  createdAt: string;
  isBlocked: boolean;
  canShare: boolean;
  deviceIds: string[];
  lastActive?: string;
}

export type UserRole = "owner" | "admin" | "user";
export type SubscriptionPlan = "free" | "starter" | "pro" | "enterprise";

export interface Product {
  id: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  whatsappMessage: string;
  shareCount: number;
  createdAt: string;
  isActive: boolean;
}

export interface PromotionHistory {
  id: string;
  productId: string;
  productName: string;
  sharedAt: string;
  platform: "whatsapp";
  userId: string;
}

export interface SubscriptionPlanData {
  id: SubscriptionPlan;
  name: string;
  price: number;
  features: string[];
  maxProducts: number;
  maxShares: number;
}

export interface AnalyticsData {
  totalProducts: number;
  totalShares: number;
  activeUsers: number;
  revenue: number;
  sharesByDay: { date: string; count: number }[];
  topProducts: { name: string; shares: number }[];
}