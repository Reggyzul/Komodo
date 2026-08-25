import React, { useState, useMemo } from "react";
import { MapPin, Star, Clock, ArrowRight, Search, Heart, Compass, CompassIcon } from "lucide-react";
import { useData } from "../context/DataContext";
import { Destination } from "../types";

interface DestinationsProps {
  onSelectDestination: (dest: Destination) => void;
  searchTerm: string;
  onClearSearch: () => void;
  featuredLimit?: number;
  lang: "id" | "en";
}

export default function Destinations({ onSelectDestination, searchTerm, onClearSearch, featuredLimit, lang }: DestinationsProps) {
  const { data } = useData();
  const allDestinations = data?.destinations || [];
  const [activeCategory, setActiveCategory] = useState<"all" | "national_park" | "islands" | "land_caves">("all");
  const [innerSearch, setInnerSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Toggle favorite destination
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const activeSearch = searchTerm || innerSearch;

  const filteredDestinations = useMemo(() => {
    return allDestinations.filter((dest) => {
      if (activeCategory === "national_park") {
        const isNP = dest.location.includes("Taman Nasional");
        if (!isNP) return false;
      }
      if (activeCategory === "islands") {
        const isIsland = dest.name.includes("Pulau") || dest.name.includes("Beach") || dest.name.includes("Taka") || dest.name.includes("Kanawa") || dest.name.includes("Manta");
        if (!isIsland) return false;
      }
      if (activeCategory === "land_caves") {
        const isLand = dest.name.includes("Goa") || dest.name.includes("Bukit") || dest.name.includes("Wae") || dest.name.includes("Overland");
        if (!isLand) return false;
      }

      if (activeSearch) {
        const query = activeSearch.toLowerCase();
        return (
          dest.name.toLowerCase().includes(query) ||
          dest.location.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query) ||
          (dest.enLocation && dest.enLocation.toLowerCase().includes(query)) ||
          (dest.enDescription && dest.enDescription.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [activeCategory, activeSearch]);

  const displayedDestinations = useMemo(() => {
    return featuredLimit ? filteredDestinations.slice(0, featuredLimit) : filteredDestinations;
  }, [filteredDestinations, featuredLimit]);

  const categories = [
    { label: lang === "en" ? "All Destinations" : "Semua Destinasi", value: "all" as const },
    { label: lang === "en" ? "National Park" : "Taman Nasional", value: "national_park" as const },
    { label: lang === "en" ? "Islands & Beaches" : "Pulau & Pantai", value: "islands" as const },
    { label: lang === "en" ? "Caves & Hills" : "Goa & Bukit", value: "land_caves" as const }
  ];

  return (
    <section id="destinations" className="py-32 bg-brand-sand text-slate-900 relative overflow-hidden">
      {/* Decorative Luxury Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-gold/5 -translate-x-1/2 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Editorial Design */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 text-brand-gold px-4 py-1.5 rounded-full mb-4 font-sans text-xs font-bold uppercase tracking-widest border border-brand-gold/20">
            <Compass className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
            <span>
              {lang === "en" ? "Sailing & Open Trip Starting from IDR 1,350,000 / pax" : "Sailing & Open Trip Mulai dari Rp 1.350.000 / pax"}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-slate-950 mb-6">
            {lang === "en" ? (
              <>
                Curated <span className="italic font-normal text-brand-gold">Best Explorations</span>
              </>
            ) : (
              <>
                Koleksi <span className="italic font-normal text-brand-gold">Eksplorasi</span> Terbaik
              </>
            )}
          </h2>
          <div className="w-16 h-1 bg-brand-gold/30 mx-auto mb-6 rounded-full" />
          <p className="text-slate-600 font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed tracking-wide">
            {lang === "en"
              ? "From the majesty of tropical islands to the beauty of world heritage civilizations, we present exclusive adventures tailored specifically for your premium comfort."
              : "Dari kemegahan alam tropis kepulauan nusantara hingga keindahan arsitektur warisan peradaban dunia, kami mempersembahkan petualangan eksklusif yang dirancang khusus untuk kenyamanan Anda."
            }
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16" id="destination-filters">
          
          {/* Elegant Category Tabs */}
          <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-200/60 w-full md:w-auto overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-6 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-brand-turquoise text-white shadow-lg shadow-brand-turquoise/20"
                    : "text-slate-500 hover:text-brand-turquoise hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Luxury Filter Search Bar */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
              <Search className="w-4 h-4 text-brand-turquoise" />
            </span>
            <input
              type="text"
              placeholder={lang === "en" ? "Search your dream destination..." : "Cari destinasi impian Anda..."}
              value={activeSearch}
              onChange={(e) => {
                setInnerSearch(e.target.value);
                if (searchTerm) onClearSearch();
              }}
              className="w-full bg-white text-slate-800 text-xs sm:text-sm font-sans pl-11 pr-12 py-3.5 rounded-2xl border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-brand-turquoise/10 focus:border-brand-turquoise transition-all shadow-sm font-medium"
            />
            {activeSearch && (
              <button
                onClick={() => {
                  setInnerSearch("");
                  onClearSearch();
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-bold text-slate-400 hover:text-brand-turquoise font-sans tracking-wide cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Empty state when no destinations match filter */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm max-w-xl mx-auto" id="destinations-empty">
            <div className="p-4 bg-brand-gold/10 inline-flex rounded-full text-brand-gold mb-4 border border-brand-gold/20">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans mb-1">
              {lang === "en" ? "Destination Not Found" : "Destinasi Tidak Ditemukan"}
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm font-light max-w-xs mx-auto mb-6 leading-relaxed">
              {lang === "en"
                ? `We couldn't find destinations matching "${activeSearch}". Please try other keywords.`
                : `Kami tidak dapat menemukan destinasi yang sesuai dengan "${activeSearch}". Silakan cari dengan kata kunci lain.`
              }
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setInnerSearch("");
                onClearSearch();
              }}
              className="px-6 py-3 bg-brand-navy hover:bg-brand-turquoise hover:text-white text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 cursor-pointer"
            >
              {lang === "en" ? "Reset All Filters" : "Reset Semua Filter"}
            </button>
          </div>
        ) : (
          /* Destinations Grid - Redesigned Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10" id="destinations-grid">
            {displayedDestinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                className="group bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(14,165,164,0.08)] border border-slate-200/50 hover:border-brand-turquoise/30 transition-all duration-500 cursor-pointer flex flex-col h-full transform hover:-translate-y-2"
              >
                {/* Image Wrap with custom luxury overlay zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Tag Badge */}
                  <span className="absolute top-5 left-5 bg-brand-navy/90 backdrop-blur-md border border-white/10 text-white font-sans text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                    {lang === "en" && dest.enTag ? dest.enTag : dest.tag}
                  </span>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(dest.id, e)}
                    className="absolute top-5 right-5 p-2.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white text-slate-500 hover:text-rose-500 transition-all shadow-md cursor-pointer transform active:scale-90"
                  >
                    <Heart className={`w-3.5 h-3.5 transition-colors ${favorites.includes(dest.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>

                  {/* Dramatic zoom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Card Content */}
                <div className="p-7 flex flex-col flex-1">
                  {/* Location & Rating */}
                  <div className="flex justify-between items-center text-[11px] mb-4 font-sans font-bold uppercase tracking-wider">
                    <span className="flex items-center text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-brand-turquoise mr-1 flex-shrink-0" />
                      {lang === "en" && dest.enLocation ? dest.enLocation : dest.location}
                    </span>
                    <span className="flex items-center text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-lg border border-brand-gold/10">
                      <Star className="w-3 h-3 fill-brand-gold text-brand-gold mr-1" />
                      {dest.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Destination Title with serif luxury styling */}
                  <h3 className="font-serif font-semibold text-xl text-slate-950 mb-3 group-hover:text-brand-turquoise transition-colors">
                    {dest.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-500 font-sans text-xs sm:text-sm font-light leading-relaxed mb-6 flex-1">
                    {lang === "en" && dest.enDescription ? dest.enDescription : dest.description}
                  </p>

                  {/* Divider line and duration layout */}
                  <div className="border-t border-slate-100 pt-5 mt-auto flex justify-between items-center">
                    <div className="flex items-center space-x-1.5 text-slate-500 font-sans font-bold text-xs">
                      <Clock className="w-3.5 h-3.5 text-brand-turquoise" />
                      <span>{lang === "en" && dest.enDuration ? dest.enDuration : dest.duration}</span>
                    </div>
                    
                    <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-brand-turquoise group-hover:text-brand-navy transition-colors">
                      {lang === "en" ? "Trip Details →" : "Detail Trip →"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
