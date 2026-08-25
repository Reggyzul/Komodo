import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { LayoutDashboard, MapPin, Package, MessageSquare, HelpCircle, TrendingUp, Activity } from "lucide-react";

interface Stats {
  destinations: number;
  packages: number;
  testimonials: number;
  faqs: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ destinations: 0, packages: 0, testimonials: 0, faqs: 0 });
  const [loading, setLoading] = useState(true);
  const [keepAliveStatus, setKeepAliveStatus] = useState<"idle" | "ok" | "error">("idle");

  useEffect(() => {
    const fetchStats = async () => {
      const [d, p, t, f] = await Promise.all([
        supabase.from("destinations").select("id", { count: "exact" }),
        supabase.from("packages").select("id", { count: "exact" }),
        supabase.from("testimonials").select("id", { count: "exact" }),
        supabase.from("faqs").select("id", { count: "exact" }),
      ]);
      setStats({
        destinations: d.count || 0,
        packages: p.count || 0,
        testimonials: t.count || 0,
        faqs: f.count || 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const handleKeepAlive = async () => {
    setKeepAliveStatus("idle");
    const res = await fetch("/api/keep-alive");
    setKeepAliveStatus(res.ok ? "ok" : "error");
    setTimeout(() => setKeepAliveStatus("idle"), 3000);
  };

  const cards = [
    { label: "Destinasi", value: stats.destinations, icon: MapPin, color: "bg-emerald-500", bg: "bg-emerald-50" },
    { label: "Paket Trip", value: stats.packages, icon: Package, color: "bg-violet-500", bg: "bg-violet-50" },
    { label: "Testimoni", value: stats.testimonials, icon: MessageSquare, color: "bg-amber-500", bg: "bg-amber-50" },
    { label: "FAQ", value: stats.faqs, icon: HelpCircle, color: "bg-sky-500", bg: "bg-sky-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <LayoutDashboard className="w-6 h-6" />
          <h2 className="text-lg font-bold">Selamat datang di Dashboard! 👋</h2>
        </div>
        <p className="text-blue-100 text-sm">
          Kelola semua konten website KOMODO KAMU dari sini. Semua perubahan langsung tampil di website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`${card.bg} rounded-2xl p-5 border border-white`}>
              <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              {loading ? (
                <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mb-1" />
              ) : (
                <div className="text-2xl font-bold text-gray-800">{card.value}</div>
              )}
              <div className="text-xs text-gray-500 font-medium">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Quick tips */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-gray-800">Cara Menggunakan Dashboard</h3>
        </div>
        <div className="space-y-3 text-sm text-gray-600">
          {[
            "🗺️ Menu Destinasi → Tambah, edit, atau hapus destinasi wisata",
            "📦 Menu Paket Trip → Kelola paket tour dengan gambar dan harga",
            "💬 Menu Testimoni → Tambah review pelanggan baru",
            "❓ Menu FAQ → Update jawaban pertanyaan yang sering ditanya",
            "⚙️ Menu Pengaturan → Ubah teks hero, nomor WhatsApp, dan lainnya",
            "🖼️ Upload Gambar → Klik area upload atau seret file gambar ke kotak upload",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
              <span className="text-sm leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Keep-alive manual trigger */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-gray-800">Sistem Keep-Alive Supabase</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Server secara otomatis ping Supabase setiap 6 hari agar tidak dinonaktifkan karena tidak aktif.
          Anda juga bisa ping manual di sini.
        </p>
        <button
          onClick={handleKeepAlive}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            keepAliveStatus === "ok"
              ? "bg-green-100 text-green-700 border border-green-200"
              : keepAliveStatus === "error"
              ? "bg-red-100 text-red-700 border border-red-200"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"
          }`}
        >
          {keepAliveStatus === "ok" ? "✅ Berhasil! Supabase aktif" : keepAliveStatus === "error" ? "❌ Gagal ping" : "🔄 Ping Supabase Sekarang"}
        </button>
      </div>
    </div>
  );
}
