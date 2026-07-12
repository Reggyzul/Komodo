import React, { useState } from "react";
import { Search, Calendar, Users, MapPin, ArrowRight, Compass, Sparkles, Navigation } from "lucide-react";

interface HeroProps {
  onQuickSearch: (destination: string) => void;
}

export default function Hero({ onQuickSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [month, setMonth] = useState("");
  const [tripType, setTripType] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      onQuickSearch(searchQuery);
    } else {
      const destSection = document.getElementById("destinations");
      if (destSection) {
        destSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleQuickTag = (tag: string) => {
    setSearchQuery(tag);
    onQuickSearch(tag);
  };

  const trendingDestinations = [
    { name: "Pulau Padar", label: "Panorama Bukit" },
    { name: "Pink Beach", label: "Pasir Merah Muda" },
    { name: "Pulau Komodo", label: "Naga Purba Komodo" },
    { name: "Goa Rangko", label: "Kolam Biru Alami" }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-navy text-white pt-28 pb-20"
    >
      {/* Immersive high-end ambient glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/15 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-turquoise/15 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "4s" }} />

      {/* Hero Cinematic Image background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/padar_island.png"
          alt="Luxury beach paradise travel backdrop"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-transparent to-brand-navy/80" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Masterpiece Editorial Headline */}
        <h1 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-[1.1] max-w-5xl mx-auto" id="hero-title">
          Petualangan Hebat Bersama <br />
          <span className="font-sans font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brand-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            KOMODO KAMU TRAVEL
          </span>
        </h1>

        {/* Highly styled elegant description */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light tracking-wide" id="hero-subtitle">
          KOMODO KAMU merupakan penyedia jasa rental mobil, sewa kapal, open trip, dan private trip Labuan Bajo yang melayani wisatawan lokal maupun mancanegara dengan standar layanan prima dan andal.
        </p>

        {/* Premium Dark Glass Search Widget */}
        <div 
          className="w-full max-w-5xl mx-auto bg-brand-navy/60 backdrop-blur-2xl rounded-3xl p-5 md:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 mb-10 gold-glow hover:border-brand-turquoise/40 transition-all duration-500" 
          id="hero-search-card"
        >
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center md:divide-x md:divide-white/10 gap-5 md:gap-0">
            {/* Destination Input */}
            <div className="flex-2 w-full flex items-center px-4 py-2 space-x-3 text-left">
              <MapPin className="text-brand-turquoise w-5 h-5 flex-shrink-0 animate-bounce" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-widest font-sans mb-0.5">Destinasi</label>
                <input
                  type="text"
                  placeholder="Cari destinasi? (misal: Pulau Padar, Wae Rebo)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm font-semibold text-white placeholder-slate-400 focus:outline-none bg-transparent font-sans"
                />
              </div>
            </div>

            {/* Departure Month Selector */}
            <div className="flex-1 w-full flex items-center px-4 py-2 text-left">
              <Calendar className="text-brand-turquoise w-5 h-5 flex-shrink-0 mr-3" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-widest font-sans mb-0.5">Jadwal</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full text-sm font-semibold text-white focus:outline-none bg-transparent font-sans appearance-none cursor-pointer"
                >
                  <option value="" className="bg-brand-navy text-white">Pilih Waktu</option>
                  <option value="juli" className="bg-brand-navy text-white">Juli 2026</option>
                  <option value="agustus" className="bg-brand-navy text-white">Agustus 2026</option>
                  <option value="september" className="bg-brand-navy text-white">September 2026</option>
                  <option value="oktober" className="bg-brand-navy text-white">Oktober 2026</option>
                  <option value="november" className="bg-brand-navy text-white">November 2026</option>
                  <option value="desember" className="bg-brand-navy text-white">Desember 2026</option>
                </select>
              </div>
            </div>

            {/* Travel Style Selector */}
            <div className="flex-1 w-full flex items-center px-4 py-2 text-left">
              <Compass className="text-brand-turquoise w-5 h-5 flex-shrink-0 mr-3" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-widest font-sans mb-0.5">Gaya Trip</label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full text-sm font-semibold text-white focus:outline-none bg-transparent font-sans appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-brand-navy text-white">Semua Trip</option>
                  <option value="private" className="bg-brand-navy text-white">Private Tour</option>
                  <option value="opentrip" className="bg-brand-navy text-white">Open Group</option>
                  <option value="honeymoon" className="bg-brand-navy text-white">Honeymoon</option>
                  <option value="custom" className="bg-brand-navy text-white">Custom Trip</option>
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="w-full md:w-auto px-2">
              <button
                type="submit"
                className="w-full md:w-auto bg-brand-turquoise hover:bg-brand-turquoise/90 text-white rounded-2xl px-8 py-4 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-brand-turquoise/10 flex items-center justify-center space-x-2 cursor-pointer transform hover:scale-[1.03] active:scale-95"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Cari Paket</span>
              </button>
            </div>
          </form>
        </div>

        {/* Immersive Trending Quick Tags */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4 text-xs font-sans">
          <span className="text-slate-400 font-medium uppercase tracking-widest text-[10px]">Destinasi Populer:</span>
          <div className="flex flex-wrap justify-center gap-2">
            {trendingDestinations.map((dest) => (
              <button
                key={dest.name}
                onClick={() => handleQuickTag(dest.name)}
                className="group px-4 py-2 bg-white/5 hover:bg-brand-turquoise/10 border border-white/5 hover:border-brand-turquoise/30 text-slate-300 hover:text-brand-turquoise rounded-xl transition-all duration-300 cursor-pointer flex items-center space-x-1"
              >
                <Navigation className="w-3 h-3 text-slate-500 group-hover:text-brand-turquoise group-hover:rotate-45 transition-transform" />
                <span className="font-semibold">{dest.name}</span>
                <span className="text-[10px] text-slate-500 group-hover:text-brand-turquoise/70">({dest.label})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Elegant Inline Premium Features */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-sans tracking-wider uppercase font-semibold" id="hero-features">
          <span className="flex items-center space-x-2.5 bg-brand-navy/40 px-5 py-2.5 rounded-2xl border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span>Asuransi Jiwa Terjamin</span>
          </span>
          <span className="flex items-center space-x-2.5 bg-brand-navy/40 px-5 py-2.5 rounded-2xl border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span>Bebas Pilih Jadwal</span>
          </span>
          <span className="flex items-center space-x-2.5 bg-brand-navy/40 px-5 py-2.5 rounded-2xl border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span>Pemandu Berlisensi HPI</span>
          </span>
        </div>
      </div>

      {/* Elegant bottom section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-sand to-transparent pointer-events-none" />
    </section>
  );
}
