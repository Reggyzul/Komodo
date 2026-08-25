import React, { useState, useEffect } from "react";
import { Menu, X, PhoneCall } from "lucide-react";

interface NavbarProps {
  currentPage: "home" | "destinations" | "fleet" | "packages" | "testimonials" | "faq";
  onNavigate: (page: "home" | "destinations" | "fleet" | "packages" | "testimonials" | "faq", sectionId?: string) => void;
  lang: "id" | "en";
  setLang: (lang: "id" | "en") => void;
}

export default function Navbar({ currentPage, onNavigate, lang, setLang }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentPage === "home") {
        const sections = ["home", "destinations", "fleet", "packages", "testimonials", "faq"];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
              setActiveSection(section);
              break;
            }
          }
        }
      } else {
        setActiveSection(currentPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run initially to set active section
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === "home" || id === "destinations" || id === "fleet" || id === "packages" || id === "testimonials" || id === "faq") {
      onNavigate(id as "home" | "destinations" | "fleet" | "packages" | "testimonials" | "faq");
    } else {
      onNavigate("home", id);
    }
  };

  const navLinks = [
    { name: lang === "en" ? "Home" : "Beranda", id: "home" },
    { name: lang === "en" ? "Destinations" : "Destinasi", id: "destinations" },
    { name: lang === "en" ? "Car Rental" : "Rental Mobil", id: "fleet" },
    { name: lang === "en" ? "Premium Packages" : "Paket Premium", id: "packages" },
    { name: lang === "en" ? "Testimonials" : "Testimoni", id: "testimonials" },
    { name: lang === "en" ? "FAQ" : "FAQ", id: "faq" }
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#040814]/90 backdrop-blur-xl border-b border-white/5 py-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-6 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Serif luxury feel */}
          <div
            onClick={() => handleLinkClick("home")}
            className="flex flex-col items-start cursor-pointer group"
            id="nav-logo"
          >
            <span className="font-serif font-light text-lg sm:text-xl tracking-[0.2em] uppercase text-white leading-none">
              KOMODO <span className="text-brand-gold font-normal">KAMU</span>
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.35em] font-bold font-sans uppercase text-slate-400 group-hover:text-brand-gold transition-colors duration-300 block mt-1">
              Tour and Travel
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 font-sans text-xs uppercase tracking-widest font-semibold">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-all duration-300 relative py-1 cursor-pointer tracking-widest ${
                  activeSection === link.id
                    ? "text-brand-turquoise font-bold animate-pulse"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-brand-turquoise rounded-full transition-all duration-300 ${
                    activeSection === link.id ? "w-8" : "w-0 hover:w-4"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Call to Action Button & Language Switcher */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l border-white/10 pl-4 h-5 text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400 mr-1">
              <button
                onClick={() => setLang("id")}
                className={`cursor-pointer transition-colors duration-300 hover:text-white ${
                  lang === "id" ? "text-brand-gold font-extrabold underline decoration-brand-gold underline-offset-4" : ""
                }`}
              >
                ID
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => setLang("en")}
                className={`cursor-pointer transition-colors duration-300 hover:text-white ${
                  lang === "en" ? "text-brand-gold font-extrabold underline decoration-brand-gold underline-offset-4" : ""
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="https://wa.me/6282144428975?text=Halo%20KOMODO%20KAMU%2C%20saya%20tertarik%20untuk%20konsultasi%20trip%2Frental%20mobil%20di%20Labuan%20Bajo."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 bg-brand-turquoise hover:bg-brand-turquoise/90 text-white px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-turquoise/10 hover:shadow-brand-turquoise/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              id="nav-ai-btn"
            >
              <PhoneCall className="w-4 h-4 text-white animate-pulse" />
              <span>{lang === "en" ? "Contact Us" : "Hubungi Kami"}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#040814]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl font-sans" id="mobile-menu-dropdown">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 pb-4 mb-2">
              <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-slate-500">{lang === "en" ? "Language" : "Bahasa"}</span>
              <div className="flex items-center space-x-3 text-[10px] font-sans font-bold uppercase tracking-widest">
                <button
                  onClick={() => { setLang("id"); setIsMobileMenuOpen(false); }}
                  className={`cursor-pointer px-3 py-1.5 rounded-lg border transition-colors ${
                    lang === "id"
                      ? "bg-brand-gold/15 border-brand-gold text-brand-gold font-extrabold"
                      : "border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => { setLang("en"); setIsMobileMenuOpen(false); }}
                  className={`cursor-pointer px-3 py-1.5 rounded-lg border transition-colors ${
                    lang === "en"
                      ? "bg-brand-gold/15 border-brand-gold text-brand-gold font-extrabold"
                      : "border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeSection === link.id
                    ? "bg-brand-turquoise/10 text-brand-turquoise font-bold border-l-2 border-brand-turquoise pl-3"
                    : "text-slate-300 hover:bg-brand-white/5 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 px-2">
              <a
                href="https://wa.me/6282144428975?text=Halo%20KOMODO%20KAMU%2C%20saya%20tertarik%20untuk%20konsultasi%20trip%2Frental%20mobil%20di%20Labuan%20Bajo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center space-x-2 bg-brand-turquoise text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-turquoise/20"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>{lang === "en" ? "Consult Now" : "Konsultasi Sekarang"}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
