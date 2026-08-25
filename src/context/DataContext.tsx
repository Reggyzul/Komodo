import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Destination, TravelPackage, Testimonial } from "../types";
import { FEATURED_DESTINATIONS, POPULAR_PACKAGES, TESTIMONIALS, FAQS } from "../data";
import { supabase } from "../lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FAQ {
  id: string;
  question: string;
  enQuestion: string;
  answer: string;
  enAnswer: string;
}

export interface SiteSettings {
  whatsapp_number: string;
  hero_title_id: string;
  hero_title_en: string;
  hero_subtitle_id: string;
  hero_subtitle_en: string;
  hero_bg_image: string;
  company_name: string;
  company_tagline_id: string;
  company_tagline_en: string;
}

export interface SiteData {
  destinations: Destination[];
  packages: TravelPackage[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  settings: SiteSettings;
}

interface DataContextType {
  data: SiteData;
  loading: boolean;
  refetch: () => Promise<void>;
}

// ─── Default / Fallback Data ──────────────────────────────────────────────────

const defaultSettings: SiteSettings = {
  whatsapp_number: "6282144428975",
  hero_title_id: "Petualangan Hebat Bersama",
  hero_title_en: "Great Adventures With",
  hero_subtitle_id: "KOMODO KAMU merupakan penyedia jasa rental mobil, sewa kapal, open trip, dan private trip Labuan Bajo yang melayani wisatawan lokal maupun mancanegara dengan standar layanan prima dan andal.",
  hero_subtitle_en: "KOMODO KAMU is a provider of car rental, boat charter, open trip, and private trip services in Labuan Bajo, serving local and international tourists with prime and reliable service standards.",
  hero_bg_image: "/assets/padar_island.png",
  company_name: "KOMODO KAMU",
  company_tagline_id: "Tour and Travel",
  company_tagline_en: "Tour and Travel",
};

const staticFaqs: FAQ[] = FAQS.map((f) => ({
  id: f.id,
  question: f.question,
  enQuestion: f.enQuestion,
  answer: f.answer,
  enAnswer: f.enAnswer,
}));

const defaultData: SiteData = {
  destinations: FEATURED_DESTINATIONS,
  packages: POPULAR_PACKAGES,
  testimonials: TESTIMONIALS,
  faqs: staticFaqs,
  settings: defaultSettings,
};

// ─── Context ─────────────────────────────────────────────────────────────────

const DataContext = createContext<DataContextType>({
  data: defaultData,
  loading: true,
  refetch: async () => {},
});

export function useData() {
  return useContext(DataContext);
}

// ─── Helper: map snake_case DB row → camelCase interface ─────────────────────

function mapDestination(row: any): Destination {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    enLocation: row.en_location || row.location,
    image: row.image,
    price: row.price,
    rating: Number(row.rating) || 5.0,
    reviewsCount: Number(row.reviews_count) || 0,
    tag: row.tag || "Wisata",
    enTag: row.en_tag || row.tag || "Tour",
    duration: row.duration || "1 Hari",
    enDuration: row.en_duration || row.duration || "1 Day",
    description: row.description || "",
    enDescription: row.en_description || row.description || "",
  };
}

function mapPackage(row: any): TravelPackage {
  return {
    id: row.id,
    title: row.title,
    enTitle: row.en_title || row.title,
    destination: row.destination,
    enDestination: row.en_destination || row.destination,
    duration: row.duration,
    enDuration: row.en_duration || row.duration,
    price: row.price,
    oldPrice: row.old_price || undefined,
    image: row.image,
    rating: Number(row.rating) || 5.0,
    badge: row.badge || undefined,
    enBadge: row.en_badge || row.badge || undefined,
    description: row.description || "",
    enDescription: row.en_description || row.description || "",
    inclusions: Array.isArray(row.inclusions) ? row.inclusions : [],
    enInclusions: Array.isArray(row.en_inclusions) ? row.en_inclusions : (row.inclusions || []),
  };
}

function mapTestimonial(row: any): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: row.role || "Traveler",
    enRole: row.en_role || row.role || "Traveler",
    image: row.image,
    content: row.content,
    enContent: row.en_content || row.content,
    rating: Number(row.rating) || 5,
    destination: row.destination || "Labuan Bajo",
    enDestination: row.en_destination || row.destination || "Labuan Bajo",
  };
}

function mapFaq(row: any): FAQ {
  return {
    id: row.id,
    question: row.question,
    enQuestion: row.en_question || row.question,
    answer: row.answer,
    enAnswer: row.en_answer || row.answer,
  };
}

function mapSettings(rows: any[]): SiteSettings {
  const map: Record<string, string> = {};
  if (Array.isArray(rows)) {
    rows.forEach((r) => {
      if (r && r.key) map[r.key] = r.value || "";
    });
  }
  return {
    whatsapp_number: map.whatsapp_number || defaultSettings.whatsapp_number,
    hero_title_id: map.hero_title_id || defaultSettings.hero_title_id,
    hero_title_en: map.hero_title_en || defaultSettings.hero_title_en,
    hero_subtitle_id: map.hero_subtitle_id || defaultSettings.hero_subtitle_id,
    hero_subtitle_en: map.hero_subtitle_en || defaultSettings.hero_subtitle_en,
    hero_bg_image: map.hero_bg_image || defaultSettings.hero_bg_image,
    company_name: map.company_name || defaultSettings.company_name,
    company_tagline_id: map.company_tagline_id || defaultSettings.company_tagline_id,
    company_tagline_en: map.company_tagline_en || defaultSettings.company_tagline_en,
  };
}

// ─── Full-screen loading spinner ─────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-brand-turquoise/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border-4 border-brand-turquoise border-t-transparent animate-spin" />
      </div>
      <p className="text-slate-300 text-sm font-medium tracking-widest uppercase animate-pulse">
        Memuat data...
      </p>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function DataProvider({ children }: { children: ReactNode }) {
  // Check for SSR-injected data first
  const rawSsr = typeof window !== "undefined" ? (window as any).__INITIAL_DATA__ : null;

  const parseSsr = (raw: any): SiteData | null => {
    if (!raw) return null;
    try {
      return {
        destinations: (raw.destinations || []).map(mapDestination),
        packages: (raw.packages || []).map(mapPackage),
        testimonials: (raw.testimonials || []).map(mapTestimonial),
        faqs: (raw.faqs || []).map(mapFaq),
        settings: mapSettings(raw.settings || []),
      };
    } catch {
      return null;
    }
  };

  const ssrParsed = parseSsr(rawSsr);

  const [data, setData] = useState<SiteData>(ssrParsed || defaultData);
  const [loading, setLoading] = useState<boolean>(!ssrParsed);

  const fetchData = async () => {
    try {
      // 1. First, try direct Supabase query (works on Cloudflare Pages, local dev, everywhere)
      const [dRes, pRes, tRes, fRes, sRes] = await Promise.all([
        supabase.from("destinations").select("*").eq("is_active", true).order("sort_order"),
        supabase.from("packages").select("*").eq("is_active", true).order("sort_order"),
        supabase.from("testimonials").select("*").eq("is_active", true).order("created_at"),
        supabase.from("faqs").select("*").eq("is_active", true).order("sort_order"),
        supabase.from("site_settings").select("*"),
      ]);

      const destinations =
        dRes.data && dRes.data.length > 0
          ? dRes.data.map(mapDestination)
          : FEATURED_DESTINATIONS;

      const packages =
        pRes.data && pRes.data.length > 0
          ? pRes.data.map(mapPackage)
          : POPULAR_PACKAGES;

      const testimonials =
        tRes.data && tRes.data.length > 0
          ? tRes.data.map(mapTestimonial)
          : TESTIMONIALS;

      const faqs =
        fRes.data && fRes.data.length > 0
          ? fRes.data.map(mapFaq)
          : staticFaqs;

      const settings =
        sRes.data && sRes.data.length > 0
          ? mapSettings(sRes.data)
          : defaultSettings;

      setData({
        destinations,
        packages,
        testimonials,
        faqs,
        settings,
      });
    } catch (err) {
      console.warn("DataContext: Supabase fetch error, fallback active:", err);
      setData((prev) => prev || defaultData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Direct fetch immediately on mount
    fetchData();

    // Safety timeout: ensure loading screen is dismissed within 2.5s maximum
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  if (loading && !data) {
    return <PageLoader />;
  }

  return (
    <DataContext.Provider value={{ data, loading, refetch: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}
