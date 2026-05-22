import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLicense } from "../context/LicenseContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SubscriptionBanner from "../components/SubscriptionBanner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function DashboardLayout({ children, currentPage, onNavigate }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { getLicenseStatus } = useLicense();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const licenseStatus = getLicenseStatus();

  return (
    <div className={`min-h-screen ${isDark ? "bg-slate-950" : "bg-gray-50"}`}>
      <Sidebar
        isOpen={sidebarOpen}
        currentPage={currentPage}
        onNavigate={onNavigate}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        <Header
          user={user}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onLogout={logout}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {licenseStatus !== "active" && (
          <SubscriptionBanner status={licenseStatus} onNavigate={onNavigate} />
        )}
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}