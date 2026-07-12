import React from "react";
import { CheckCircle2, Clock, MapPin, Star, Sparkles } from "lucide-react";
import { POPULAR_PACKAGES } from "../data";
import { TravelPackage } from "../types";

interface PackagesProps {
  onSelectPackage: (pkg: TravelPackage) => void;
  featuredLimit?: number;
}

export default function Packages({ onSelectPackage, featuredLimit }: PackagesProps) {
  const displayedPackages = featuredLimit ? POPULAR_PACKAGES.slice(0, featuredLimit) : POPULAR_PACKAGES;

  return (
    <section id="packages" className="py-32 bg-brand-sand text-slate-900 relative overflow-hidden">
      {/* Decorative lines for section division */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 text-brand-gold px-4 py-1.5 rounded-full mb-4 font-sans text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Penawaran Spesial</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-slate-950 mb-6">
            Paket Perjalanan <span className="italic font-normal text-brand-gold">Terfavorit</span>
          </h2>
          <div className="w-16 h-1 bg-brand-gold/30 mx-auto mb-6 rounded-full" />
          <p className="text-slate-600 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed tracking-wide">
            Jelajahi keindahan dengan paket perjalanan all-in-one terkurasi lengkap yang mengintegrasikan akomodasi premium, transportasi nyaman, pemandu berpengalaman, dan tiket masuk eksklusif.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10" id="packages-grid">
          {displayedPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(14,165,164,0.08)] border border-slate-200/50 hover:border-brand-turquoise/30 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2 group"
            >
              {/* Cover Image Wrap with Badges */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Sale discount/Bestseller badge */}
                {pkg.badge && (
                  <span className="absolute top-5 left-5 bg-brand-turquoise text-white font-sans text-[10px] font-bold px-3.5 py-1.5 rounded-full shadow-md tracking-widest uppercase">
                    {pkg.badge}
                  </span>
                )}

                {/* Rating Badge */}
                <div className="absolute bottom-5 right-5 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center text-brand-gold font-sans text-xs font-bold shadow-md border border-white/10">
                  <Star className="w-3 h-3 fill-brand-gold text-brand-gold mr-1" />
                  <span>{pkg.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex flex-col flex-1">
                {/* Destination & Duration Header */}
                <div className="flex justify-between items-center text-[10px] mb-4 font-sans font-bold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-brand-turquoise mr-1.5" />
                    {pkg.destination}
                  </span>
                  <span className="flex items-center text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-brand-turquoise mr-1.5" />
                    {pkg.duration}
                  </span>
                </div>

                {/* Package Title */}
                <h3 className="font-serif font-semibold text-xl text-slate-950 mb-3 group-hover:text-brand-turquoise transition-colors">
                  {pkg.title}
                </h3>

                {/* Short description */}
                <p className="text-slate-500 font-sans text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Core inclusions list */}
                <div className="space-y-2.5 mb-8 flex-1">
                  <span className="block text-[9px] font-extrabold text-slate-400 tracking-wider uppercase font-sans mb-2">Fasilitas Termasuk</span>
                  {pkg.inclusions.slice(0, 4).map((inc, index) => (
                    <div key={index} className="flex items-start text-xs text-slate-600 font-sans font-light">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                  {pkg.inclusions.length > 4 && (
                    <span className="block text-[11px] font-sans text-slate-400 pl-6 italic font-medium">
                      + {pkg.inclusions.length - 4} layanan eksklusif lainnya
                    </span>
                  )}
                </div>

                {/* Pricing & Booking CTA */}
                <div className="border-t border-slate-100 pt-6 mt-auto">
                  <div className="flex justify-between items-center">
                    <div>
                      {pkg.oldPrice && (
                        <span className="block text-xs text-slate-400 line-through font-mono mb-0.5">
                          {pkg.oldPrice}
                        </span>
                      )}
                      <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider font-sans mb-0.5">Tarif All-In</span>
                      <span className="font-sans font-extrabold text-base sm:text-lg text-brand-turquoise">{pkg.price}</span>
                    </div>

                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="bg-brand-navy hover:bg-brand-turquoise text-white font-sans text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded-xl transition duration-300 cursor-pointer shadow-md"
                    >
                      Hubungi Agen
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
