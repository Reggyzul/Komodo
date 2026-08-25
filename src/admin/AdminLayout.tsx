import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  LayoutDashboard, MapPin, Package, MessageSquare, HelpCircle,
  Settings, LogOut, Menu, X, Compass, ChevronRight
} from "lucide-react";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDestinations from "./pages/AdminDestinations";
import AdminPackages from "./pages/AdminPackages";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminFAQ from "./pages/AdminFAQ";
import AdminSettings from "./pages/AdminSettings";

type AdminPage = "dashboard" | "destinations" | "packages" | "testimonials" | "faq" | "settings";

interface AdminLayoutProps {
  session: any;
  onLogout: () => void;
}

const navItems = [
  { id: "dashboard" as AdminPage, label: "Dashboard", icon: LayoutDashboard, color: "text-blue-600" },
  { id: "destinations" as AdminPage, label: "Destinasi", icon: MapPin, color: "text-emerald-600" },
  { id: "packages" as AdminPage, label: "Paket Trip", icon: Package, color: "text-violet-600" },
  { id: "testimonials" as AdminPage, label: "Testimoni", icon: MessageSquare, color: "text-amber-600" },
  { id: "faq" as AdminPage, label: "FAQ", icon: HelpCircle, color: "text-sky-600" },
  { id: "settings" as AdminPage, label: "Pengaturan", icon: Settings, color: "text-gray-600" },
];

export default function AdminLayout({ session, onLogout }: AdminLayoutProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <AdminDashboard />;
      case "destinations": return <AdminDestinations />;
      case "packages": return <AdminPackages />;
      case "testimonials": return <AdminTestimonials />;
      case "faq": return <AdminFAQ />;
      case "settings": return <AdminSettings />;
      default: return <AdminDashboard />;
    }
  };

  const currentNav = navItems.find((n) => n.id === currentPage);

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? "w-full" : ""}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-100">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Compass className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-gray-800 text-sm leading-none">KOMODO KAMU</div>
          <div className="text-[10px] text-gray-400 font-medium mt-0.5">Admin Dashboard</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-blue-600" : item.color} transition-colors`} />
              <span className="flex-1 text-left">{item.label}</span>
              {active && <ChevronRight className="w-4 h-4 text-blue-400" />}
            </button>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {session?.user?.email?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-700 truncate">
              {session?.user?.email || "Admin"}
            </div>
            <div className="text-[10px] text-green-500 font-medium">● Online</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200 fixed top-0 left-0 h-full z-30 shadow-sm">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-50 w-72 bg-white h-full shadow-2xl flex flex-col">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar mobile />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-gray-800 leading-none">
              {currentNav?.label || "Dashboard"}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">KOMODO KAMU CMS</p>
          </div>
          {/* Quick link to website */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>Lihat Website</span>
            <ChevronRight className="w-3 h-3" />
          </a>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
