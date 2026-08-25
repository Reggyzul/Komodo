import React, { useState, useMemo } from "react";
import { Users2, Shield, Sparkles, PhoneCall } from "lucide-react";
import { useData } from "../context/DataContext";
import { CarItem } from "../types";

interface FleetProps {
  featuredLimit?: number;
  lang: "id" | "en";
}

export default function Fleet({ featuredLimit, lang }: FleetProps) {
  const { data } = useData();
  const cars = data?.fleet || [];
  const [activeCategory, setActiveCategory] = useState<"all" | "mpv" | "suv" | "bus_grup">("all");

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (car.isActive === false) return false;
      if (activeCategory === "all") return true;
      const catLower = (car.category || "").toLowerCase();
      if (activeCategory === "mpv") return catLower.includes("mpv") || catLower.includes("family");
      if (activeCategory === "suv") return catLower.includes("suv") || catLower.includes("adventure");
      if (activeCategory === "bus_grup") return catLower.includes("microbus") || catLower.includes("bus") || catLower.includes("group");
      return true;
    });
  }, [cars, activeCategory]);

  const displayedCars = useMemo(() => {
    return featuredLimit ? filteredCars.slice(0, featuredLimit) : filteredCars;
  }, [filteredCars, featuredLimit]);

  const getWhatsAppLink = (carName: string) => {
    const text = lang === "en"
      ? `Hello KOMODO KAMU, I am interested in renting the *${carName}* car in Labuan Bajo. Please inform availability dates!`
      : `Halo KOMODO KAMU, saya tertarik untuk menyewa armada mobil *${carName}* di Labuan Bajo. Tolong info ketersediaan tanggalnya ya!`;
    return `https://wa.me/6282144428975?text=${encodeURIComponent(text)}`;
  };

  const categories = [
    { label: lang === "en" ? "All Fleet" : "Semua Armada", value: "all" as const },
    { label: lang === "en" ? "Family / MPV" : "Keluarga / MPV", value: "mpv" as const },
    { label: lang === "en" ? "SUV / Adventure" : "SUV / Adventure", value: "suv" as const },
    { label: lang === "en" ? "Groups & Buses" : "Grup & Bus", value: "bus_grup" as const }
  ];

  return (
    <section id="fleet" className="py-24 bg-brand-sand relative overflow-hidden">
      {/* Background elegant accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-navy/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-navy/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-turquoise/10 border border-brand-turquoise/20 px-4 py-1.5 rounded-full text-brand-turquoise text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {lang === "en" ? "Driver + Fuel Included Starting from IDR 700,000 / Day" : "Lengkap Supir + BBM Mulai dari Rp 700.000 / Hari"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-brand-navy tracking-tight leading-tight">
            {lang === "en" ? (
              <>
                Labuan Bajo <span className="italic font-normal text-brand-turquoise">Car Rental Fleet</span>
              </>
            ) : (
              <>
                Armada <span className="italic font-normal text-brand-turquoise">Rental Mobil</span> Labuan Bajo
              </>
            )}
          </h2>
          <div className="w-20 h-1 bg-brand-turquoise/30 rounded-full mx-auto" />
          <p className="text-slate-600 font-sans font-light text-xs sm:text-sm md:text-base leading-relaxed">
            {lang === "en"
              ? "Premium daily car rental complete with fuel & experienced drivers in Labuan Bajo. Ready to facilitate family vacations, business travel, or Flores overland tours with ultimate comfort."
              : "Sewa mobil harian prima lengkap dengan BBM & supir berpengalaman di Labuan Bajo. Siap mengantar liburan keluarga, perjalanan bisnis, maupun overland Flores dengan kenyamanan paripurna."
            }
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-200/60 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-brand-turquoise text-white shadow-lg shadow-brand-turquoise/20"
                    : "text-slate-500 hover:text-brand-turquoise hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCars.map((car) => {
            const currentCapacity = lang === "en" && car.enCapacity ? car.enCapacity : car.capacity;
            const currentTag = lang === "en" && car.enTag ? car.enTag : car.tag;
            const currentFeatures = lang === "en" && car.enFeatures && car.enFeatures.length > 0 ? car.enFeatures : car.features;

            return (
              <div
                key={car.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/50 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1.5"
              >
                {/* Image Frame */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  {/* Custom Badges */}
                  <span className="absolute top-4 left-4 bg-brand-turquoise text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    {car.category}
                  </span>
                  
                  {currentTag && (
                    <span className="absolute top-4 right-4 bg-brand-gold text-brand-navy text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {currentTag}
                    </span>
                  )}

                  {/* Inclusion tag on image */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="block text-[8px] font-semibold uppercase tracking-wider text-slate-300">
                      {lang === "en" ? "Prime Service" : "Layanan Prima"}
                    </span>
                    <span className="text-sm font-extrabold font-sans text-brand-gold">
                      {lang === "en" ? "Driver & Fuel Included" : "Sudah Termasuk Supir & BBM"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-serif font-bold text-xl text-brand-navy">{car.name}</h3>
                        <p className="text-xs font-bold text-emerald-600 mt-0.5">{car.price}</p>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-semibold">
                        <Users2 className="w-3.5 h-3.5 text-brand-turquoise" />
                        <span>{currentCapacity}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      {currentFeatures.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-1.5 text-xs text-slate-500">
                          <Shield className="w-3 h-3 text-brand-turquoise flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action button */}
                  <a
                    href={getWhatsAppLink(car.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center space-x-2 bg-brand-navy hover:bg-brand-turquoise text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{lang === "en" ? "Rent Car Now" : "Sewa Mobil Sekarang"}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
