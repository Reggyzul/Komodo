import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Globe } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: "home" | "destinations" | "fleet" | "packages" | "testimonials" | "faq", sectionId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-slate-300 font-sans relative border-t border-white/5 pt-20 pb-12">
      
      {/* Decorative ambient background blur */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center group cursor-pointer w-fit">
              <div className="relative p-2.5 rounded-full bg-brand-navy/60 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(14,165,164,0.1)]">
                <img
                  src="/assets/logo_komodo.png"
                  alt="Komodo Kamu Logo"
                  className="h-16 sm:h-20 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-slate-400 font-sans text-xs sm:text-sm font-light leading-relaxed">
              KOMODO KAMU merupakan penyedia jasa rental mobil, sewa kapal, open trip, dan private trip Labuan Bajo yang melayani wisatawan lokal maupun mancanegara.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="https://instagram.com/KOMODOKAMU" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-slate-400 hover:text-brand-turquoise hover:border-brand-turquoise/30 hover:bg-brand-turquoise/10 transition-all duration-300">
                <Instagram className="w-4 h-4" />
                <span className="text-[10px] font-bold font-sans">KOMODOKAMU</span>
              </a>
              <a href="https://tiktok.com/@KAKA_BETA" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-slate-400 hover:text-brand-turquoise hover:border-brand-turquoise/30 hover:bg-brand-turquoise/10 transition-all duration-300">
                <Globe className="w-4 h-4" />
                <span className="text-[10px] font-bold font-sans">KAKA BETA</span>
              </a>
            </div>
          </div>

          {/* Useful Links Column */}
          <div className="space-y-5 text-left">
            <h4 className="font-serif font-semibold text-base text-white uppercase tracking-wider">Halaman Utama</h4>
            <div className="w-8 h-0.5 bg-brand-gold/30 rounded-full" />
            <ul className="space-y-3 text-xs sm:text-sm">
              {["Beranda", "Destinasi", "Rental Mobil", "Paket Populer", "Testimoni", "FAQ"].map((link) => {
                const idsMap: { [key: string]: "home" | "destinations" | "fleet" | "packages" | "testimonials" | "faq" } = {
                  "Beranda": "home",
                  "Destinasi": "destinations",
                  "Rental Mobil": "fleet",
                  "Paket Populer": "packages",
                  "Testimoni": "testimonials",
                  "FAQ": "faq"
                };
                return (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const targetId = idsMap[link];
                        if (onNavigate) {
                          onNavigate(targetId);
                        } else {
                          const el = document.getElementById(targetId);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-slate-400 hover:text-brand-turquoise cursor-pointer font-sans transition-all duration-300 text-left"
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-5 text-left">
            <h4 className="font-serif font-semibold text-base text-white uppercase tracking-wider">Kontak & Basecamp</h4>
            <div className="w-8 h-0.5 bg-brand-gold/30 rounded-full" />
            <ul className="space-y-4 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-brand-turquoise mr-3.5 flex-shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed text-slate-400">Gang Pengadilan Desa Gorontalo, Labuan Bajo, NTT, Indonesia</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-brand-turquoise mr-3.5 flex-shrink-0" />
                <span className="font-sans text-slate-400">+62 821-4442-8975 (Sammy)</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-brand-turquoise mr-3.5 flex-shrink-0" />
                <span className="font-sans text-slate-400 text-xs truncate">danielsami26121987@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-5 text-left">
            <h4 className="font-serif font-semibold text-base text-white uppercase tracking-wider">Newsletter Wisata</h4>
            <div className="w-8 h-0.5 bg-brand-gold/30 rounded-full" />
            <p className="text-slate-400 font-sans text-xs font-light leading-relaxed">
              Dapatkan info promo, rilis rute privat baru di Labuan Bajo & Flores, diskon eksklusif, serta panduan wisata gratis.
            </p>

            {isSubscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl p-4 flex items-start space-x-2 text-xs">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 animate-bounce" />
                <div>
                  <span className="block font-bold font-sans">Terima Kasih!</span>
                  <span className="font-sans">Kupon diskon promo kami kirim ke email Anda.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative mt-2">
                <input
                  type="email"
                  required
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 text-white font-sans text-xs rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:ring-1 focus:ring-brand-turquoise focus:border-brand-turquoise transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-2 rounded-lg bg-brand-turquoise hover:bg-brand-turquoise/90 text-white transition cursor-pointer"
                  id="newsletter-subscribe-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Lower Footer Bottom Bar */}
        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} KOMODO KAMU TOUR AND TRAVEL. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex space-x-6">
            <a href="#faq" className="hover:text-brand-turquoise transition-colors duration-300">Kebijakan Privasi</a>
            <a href="#faq" className="hover:text-brand-turquoise transition-colors duration-300">Syarat & Ketentuan</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
