import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LicenseProvider } from "./context/LicenseContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPanel from "./pages/AdminPanel";
import SubscriptionPage from "./pages/SubscriptionPage";

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [authPage, setAuthPage] = useState<"login" | "register">("login");

  useEffect(() => {
    if (!user && !isLoading) {
      setCurrentPage("dashboard");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return authPage === "login" ? (
      <LoginPage onSwitchToRegister={() => setAuthPage("register")} />
    ) : (
      <RegisterPage onSwitchToLogin={() => setAuthPage("login")} />
    );
  }

  return (
    <DashboardLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "products" && <ProductsPage />}
      {currentPage === "analytics" && <AnalyticsPage />}
      {currentPage === "settings" && <SettingsPage />}
      {currentPage === "admin" && <AdminPanel />}
      {currentPage === "subscription" && <SubscriptionPage />}
    </DashboardLayout>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Promozy</h1>
        <p className="text-purple-200 mt-2">Loading your dashboard...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LicenseProvider>
          <AppContent />
        </LicenseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}