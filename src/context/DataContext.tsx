import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Destination, TravelPackage, Testimonial } from "../types";

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
  data: SiteData | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const DataContext = createContext<DataContextType>({
  data: null,
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
    enLocation: row.en_location,
    image: row.image,
    price: row.price,
    rating: row.rating,
    reviewsCount: row.reviews_count,
    tag: row.tag,
    enTag: row.en_tag,
    duration: row.duration,
    enDuration: row.en_duration,
    description: row.description,
    enDescription: row.en_description,
  };
}

function mapPackage(row: any): TravelPackage {
  return {
    id: row.id,
    title: row.title,
    enTitle: row.en_title,
    destination: row.destination,
    enDestination: row.en_destination,
    duration: row.duration,
    enDuration: row.en_duration,
    price: row.price,
    oldPrice: row.old_price,
    image: row.image,
    rating: row.rating,
    badge: row.badge,
    enBadge: row.en_badge,
    description: row.description,
    enDescription: row.en_description,
    inclusions: row.inclusions || [],
    enInclusions: row.en_inclusions || [],
  };
}

function mapTestimonial(row: any): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    enRole: row.en_role,
    image: row.image,
    content: row.content,
    enContent: row.en_content,
    rating: row.rating,
    destination: row.destination,
    enDestination: row.en_destination,
  };
}

function mapFaq(row: any): FAQ {
  return {
    id: row.id,
    question: row.question,
    enQuestion: row.en_question,
    answer: row.answer,
    enAnswer: row.en_answer,
  };
}

function mapSettings(rows: any[]): SiteSettings {
  const map: Record<string, string> = {};
  rows.forEach((r) => { map[r.key] = r.value || ""; });
  return {
    whatsapp_number: map.whatsapp_number || "6282144428975",
    hero_title_id: map.hero_title_id || "Petualangan Hebat Bersama",
    hero_title_en: map.hero_title_en || "Great Adventures With",
    hero_subtitle_id: map.hero_subtitle_id || "",
    hero_subtitle_en: map.hero_subtitle_en || "",
    hero_bg_image: map.hero_bg_image || "/assets/padar_island.png",
    company_name: map.company_name || "KOMODO KAMU",
    company_tagline_id: map.company_tagline_id || "Tour and Travel",
    company_tagline_en: map.company_tagline_en || "Tour and Travel",
  };
}

// ─── Full-screen loading spinner ─────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center gap-4">
      {/* Animated komodo-wave rings */}
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
  // Check for SSR-injected data first — if present, skip loading entirely
  const rawSsr = (window as any).__INITIAL_DATA__;

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

  // If SSR data exists → use it immediately, no loading flash
  // If no SSR data → stay null/loading until API fetch completes
  const [data, setData] = useState<SiteData | null>(ssrParsed);
  const [loading, setLoading] = useState<boolean>(!ssrParsed);

  const fetchData = async () => {
    if (!loading) setLoading(true);
    try {
      const res = await fetch("/api/data");
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const json = await res.json();

      setData({
        destinations: (json.destinations || []).map(mapDestination),
        packages: (json.packages || []).map(mapPackage),
        testimonials: (json.testimonials || []).map(mapTestimonial),
        faqs: (json.faqs || []).map(mapFaq),
        settings: mapSettings(json.settings || []),
      });
    } catch (err) {
      console.error("DataContext: fetch failed", err);
      // Do NOT fall back to static data — keep data null so UI renders nothing
      // rather than showing stale/mismatched images
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ssrParsed) {
      // SSR already resolved → silently refetch in background after 2s to stay fresh
      const t = setTimeout(() => {
        fetch("/api/data")
          .then((r) => r.ok ? r.json() : null)
          .then((json) => {
            if (!json) return;
            setData({
              destinations: (json.destinations || []).map(mapDestination),
              packages: (json.packages || []).map(mapPackage),
              testimonials: (json.testimonials || []).map(mapTestimonial),
              faqs: (json.faqs || []).map(mapFaq),
              settings: mapSettings(json.settings || []),
            });
          })
          .catch(() => {/* silently ignore background refresh errors */});
      }, 2000);
      return () => clearTimeout(t);
    } else {
      // No SSR data → must fetch before showing anything
      fetchData();
    }
  }, []);

  // Block render until real data arrives
  if (loading || !data) {
    return <PageLoader />;
  }

  return (
    <DataContext.Provider value={{ data, loading, refetch: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}
