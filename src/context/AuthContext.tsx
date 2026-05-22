import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isOwner: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// OWNER MASTER CREDENTIALS - PROTECTED
const OWNER_CREDENTIALS = {
  email: "owner@promozy.com",
  password: "Promozy@Owner2024!",
  user: {
    id: "owner-master-001",
    email: "owner@promozy.com",
    name: "Promozy Owner",
    role: "owner" as const,
    licenseId: "PROMOZY-OWNER-MASTER-LICENSE",
    subscriptionActive: true,
    subscriptionPlan: "enterprise",
    subscriptionExpiry: "2099-12-31",
    deviceIds: ["owner-device-master"],
    createdAt: "2024-01-01",
  }
};

// ADMIN CREDENTIALS
const ADMIN_CREDENTIALS = {
  email: "admin@promozy.com",
  password: "Admin@Promozy2024!",
  user: {
    id: "admin-001",
    email: "admin@promozy.com",
    name: "Promozy Admin",
    role: "admin" as const,
    licenseId: "PROMOZY-ADMIN-LICENSE",
    subscriptionActive: true,
    subscriptionPlan: "enterprise",
    subscriptionExpiry: "2099-12-31",
    deviceIds: ["admin-device-001"],
    createdAt: "2024-01-01",
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("promozy-current-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check owner credentials
    if (email === OWNER_CREDENTIALS.email && password === OWNER_CREDENTIALS.password) {
      setUser(OWNER_CREDENTIALS.user);
      localStorage.setItem("promozy-current-user", JSON.stringify(OWNER_CREDENTIALS.user));
      return true;
    }

    // Check admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser(ADMIN_CREDENTIALS.user);
      localStorage.setItem("promozy-current-user", JSON.stringify(ADMIN_CREDENTIALS.user));
      return true;
    }

    // Check regular users
    const savedUsers = localStorage.getItem("promozy-registered-users");
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      const foundUser = users.find((u: { email: string; password: string }) => 
        u.email === email && u.password === password
      );
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("promozy-current-user", JSON.stringify(userWithoutPassword));
        return true;
      }
    }

    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Prevent registration with owner/admin emails
    if (email === OWNER_CREDENTIALS.email || email === ADMIN_CREDENTIALS.email) {
      alert("This email is already registered");
      return false;
    }

    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      email,
      name,
      password,
      role: "user",
      licenseId: `PROMOZY-${Date.now()}-LICENSE`,
      subscriptionActive: false,
      subscriptionPlan: "free",
      deviceIds: [`device-${Date.now()}`],
      createdAt: new Date().toISOString(),
    };

    const savedUsers = localStorage.getItem("promozy-registered-users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Check if email already exists
    if (users.some((u: { email: string }) => u.email === email)) {
      alert("Email already registered");
      return false;
    }

    users.push(newUser);
    localStorage.setItem("promozy-registered-users", JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("promozy-current-user", JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("promozy-current-user");
  };

  const isAdmin = () => user?.role === "admin" || user?.role === "owner";
  const isOwner = () => user?.role === "owner";

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin, isOwner }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}