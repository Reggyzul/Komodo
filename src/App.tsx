import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import WhyChooseUs from "./components/WhyChooseUs";
import Fleet from "./components/Fleet";
import Packages from "./components/Packages";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import InquiryModal from "./components/InquiryModal";
import { Destination, TravelPackage } from "./types";
import { MessageCircle, ArrowLeft } from "lucide-react";

// Editorial Page Banner for Subpages
const PageBanner = ({ title, subtitle, bgImage, onBack }: { title: string; subtitle: string; bgImage: string; onBack?: () => void }) => {
  return (
    <div className="relative pt-44 pb-28 bg-brand-navy overflow-hidden flex items-center justify-center text-center">
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/90 to-brand-sand" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {onBack && (
          <button 
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-slate-300 hover:text-brand-turquoise mb-6 text-xs font-bold uppercase tracking-widest cursor-pointer group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Kembali Ke Beranda</span>
          </button>
        )}
        <h1 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4">
          {title}
        </h1>
        <div className="w-16 h-1 bg-brand-gold/40 mx-auto mb-4 rounded-full" />
        <p className="font-sans font-medium text-[11px] sm:text-xs text-brand-gold max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  // Navigation state: home, destinations, fleet, packages, testimonials, faq
  const [currentPage, setCurrentPage] = useState<"home" | "destinations" | "fleet" | "packages" | "testimonials" | "faq">("home");

  // Sync state for search query between Hero search bar and Destinations
  const [searchTerm, setSearchTerm] = useState("");

  // Modal Inquiry state
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);

  // Elegant navigate function
  const handleNavigate = (page: "home" | "destinations" | "fleet" | "packages" | "testimonials" | "faq", sectionId?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Triggered when user enters a quick search in Hero
  const handleQuickSearch = (query: string) => {
    setSearchTerm(query);
    // Redirect to destinations tab/page immediately and populate query!
    handleNavigate("destinations");
  };

  // Open modal for destinations
  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setSelectedPackage(null);
    setIsInquiryOpen(true);
  };

  // Open modal for packages
  const handleSelectPackage = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setSelectedDestination(null);
    setIsInquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-sand text-brand-navy antialiased font-sans flex flex-col relative">
      {/* Dynamic Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Dynamic Routing Switch */}
      {currentPage === "home" && (
        <>
          {/* Hero Section */}
          <Hero onQuickSearch={handleQuickSearch} />

          {/* Featured Destinations Section - CURATED PREVIEW */}
          <div id="destinations" className="relative">
            <Destinations
              searchTerm={searchTerm}
              onClearSearch={() => setSearchTerm("")}
              onSelectDestination={handleSelectDestination}
              featuredLimit={3}
            />
            {/* View More Call to Action */}
            <div className="bg-brand-sand pb-24 flex justify-center -mt-16 relative z-20">
              <button
                onClick={() => handleNavigate("destinations")}
                className="group flex items-center space-x-2.5 bg-brand-navy hover:bg-brand-turquoise text-white px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-brand-turquoise/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <span>Eksplor Semua Destinasi</span>
                <span className="text-brand-gold group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <WhyChooseUs />

          {/* VIP Concierge Banner */}
          <section className="py-20 bg-brand-sand relative overflow-hidden text-center">
            <div className="max-w-5xl mx-auto px-4">
              <div className="bg-brand-navy rounded-[36px] p-10 md:p-14 text-white shadow-2xl border border-white/5 relative overflow-hidden gold-glow text-center">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-turquoise/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                  <span className="inline-block bg-brand-gold/15 text-brand-gold px-4 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest border border-brand-gold/20">
                    VIP CONCIERGE SERVICE
                  </span>
                  <h3 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
                    Rancang <span className="italic text-brand-gold">Trip Impian</span> Anda Secara Personal
                  </h3>
                  <p className="font-sans font-light text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                    Konsultasikan jadwal perjalanan, pilihan kapal Phinisi termewah, serta destinasi impian Anda di Labuan Bajo bersama Travel Consultant ahli kami secara langsung, gratis, dan responsif.
                  </p>
                  <div className="pt-4">
                    <a
                      href="https://wa.me/6282144428975?text=Halo%20KOMODO%20KAMU%2C%20saya%20tertarik%20untuk%20konsultasi%20trip%2Frental%20mobil%20di%20Labuan%20Bajo."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center space-x-3 bg-brand-turquoise hover:bg-brand-turquoise/90 text-white px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest shadow-xl shadow-brand-turquoise/25 hover:shadow-brand-turquoise/40 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    >
                      <span>Hubungi Travel Advisor</span>
                      <span className="text-brand-gold group-hover:translate-x-1.5 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {currentPage === "destinations" && (
        <>
          <PageBanner
            title="Katalog Destinasi"
            subtitle="Petualangan Alam Luar Biasa Labuan Bajo, TN Komodo, & Flores"
            bgImage="/assets/padar_island.png"
            onBack={() => handleNavigate("home")}
          />
          <Destinations
            searchTerm={searchTerm}
            onClearSearch={() => setSearchTerm("")}
            onSelectDestination={handleSelectDestination}
          />
        </>
      )}

      {currentPage === "fleet" && (
        <>
          <PageBanner
            title="Rental Mobil Labuan Bajo"
            subtitle="Armada Prima Siap Mengawal Perjalanan Darat & Overland Flores"
            bgImage="/assets/innova_reborn.png"
            onBack={() => handleNavigate("home")}
          />
          <Fleet />
        </>
      )}

      {currentPage === "packages" && (
        <>
          <PageBanner
            title="Paket Premium & Open Trip"
            subtitle="Pilihan Trip Phinisi Live-On-Board dan Overland Terfavorit"
            bgImage="/assets/phinisi_boat.png"
            onBack={() => handleNavigate("home")}
          />
          <Packages onSelectPackage={handleSelectPackage} />
        </>
      )}

      {currentPage === "testimonials" && (
        <>
          <PageBanner
            title="Testimoni Pelanggan"
            subtitle="Kisah Perjalanan Nyata dari Mereka yang Mengarungi Labuan Bajo Bersama Kami"
            bgImage="/assets/kanawa_island.png"
            onBack={() => handleNavigate("home")}
          />
          <Testimonials />
        </>
      )}

      {currentPage === "faq" && (
        <>
          <PageBanner
            title="Tanya Jawab (FAQ)"
            subtitle="Segala Hal yang Perlu Anda Ketahui Tentang Layanan & Perjalanan Kami"
            bgImage="/assets/goa_rangko.png"
            onBack={() => handleNavigate("home")}
          />
          <FAQ />
        </>
      )}



      {/* Footer Details */}
      <Footer onNavigate={handleNavigate} />

      {/* Booking Inquiry Overlay Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        selectedDestination={selectedDestination}
        selectedPackage={selectedPackage}
      />

      {/* Direct Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/6282144428975?text=Halo%20KOMODO%20KAMU%2C%20saya%20tertarik%20dengan%20paket%20tour%20dan%20travel%20Anda."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 bg-brand-turquoise text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer flex items-center justify-center border border-brand-white/10 group"
        aria-label="Contact support on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 font-sans text-xs font-bold transition-all duration-300 whitespace-nowrap">
          Konsultasi Gratis
        </span>
      </a>
    </div>
  );
}
