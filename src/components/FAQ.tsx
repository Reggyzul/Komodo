import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from "lucide-react";
import { useData } from "../context/DataContext";

export default function FAQ({ lang }: { lang: "id" | "en" }) {
  const { data } = useData();
  const faqs = data?.faqs || [];
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const getWhatsAppLink = () => {
    const text = lang === "en"
      ? "Hello KOMODO KAMU, I would like to ask about tour packages and customization options."
      : "Halo KOMODO KAMU, saya ingin bertanya tentang layanan tour dan kustomisasi paket wisata.";
    return `https://wa.me/6282144428975?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="faq" className="py-32 bg-brand-sand text-slate-900 relative overflow-hidden">
      {/* Decorative luxury lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 text-brand-gold px-4 py-1.5 rounded-full mb-4 font-sans text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Help Center & Support" : "Pusat Bantuan & Layanan"}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-light tracking-tight text-slate-950 mb-6">
            {lang === "en" ? (
              <>
                Frequently Asked <span className="italic font-normal text-brand-gold">Questions</span>
              </>
            ) : (
              <>
                Pertanyaan yang <span className="italic font-normal text-brand-gold">Sering Diajukan</span>
              </>
            )}
          </h2>
          <div className="w-16 h-1 bg-brand-gold/30 mx-auto mb-6 rounded-full" />
          <p className="text-slate-600 font-sans font-light text-sm sm:text-base leading-relaxed tracking-wide">
            {lang === "en"
              ? "Need quick information about payment procedures, insurance, route customization, or our guarantees? Find the details below."
              : "Butuh informasi cepat mengenai prosedur pembayaran, asuransi, kustomisasi rute, atau garansi kami? Temukan rincian jawabannya di bawah ini."
            }
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-5" id="faq-accordion-list">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const currentQuestion = lang === "en" && faq.enQuestion ? faq.enQuestion : faq.question;
            const currentAnswer = lang === "en" && faq.enAnswer ? faq.enAnswer : faq.answer;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-[20px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-brand-turquoise/40 shadow-[0_15px_40px_rgba(14,165,164,0.04)]"
                    : "border-slate-200/60 shadow-sm"
                }`}
              >
                {/* Trigger Button Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50 transition-colors duration-300"
                >
                  <span className="font-sans font-bold text-xs sm:text-sm md:text-base text-slate-950 flex items-center pr-4">
                    <HelpCircle className="w-5 h-5 text-brand-turquoise mr-3.5 flex-shrink-0" />
                    {currentQuestion}
                  </span>
                  <span className="text-slate-400 flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-turquoise" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </span>
                </button>

                {/* Answer Content Panel */}
                <div
                  className={`transition-all duration-300 ${
                    isOpen ? "max-h-[500px] border-t border-slate-100" : "max-h-0 pointer-events-none"
                  }`}
                >
                  <div className="p-6 bg-brand-sand/40 text-xs sm:text-sm leading-relaxed text-slate-600 font-sans font-light tracking-wide">
                    {currentAnswer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA - Refactored to Luxury Concierge styling */}
        <div className="mt-16 bg-white rounded-[28px] p-8 sm:p-10 text-center border border-brand-turquoise/10 shadow-[0_20px_50px_rgba(14,165,164,0.04)] relative overflow-hidden" id="faq-bottom-cta">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-turquoise" />
          <h3 className="font-serif font-semibold text-xl text-slate-950 mb-2">
            {lang === "en" ? "Still Have Other Questions?" : "Masih Memiliki Pertanyaan Lain?"}
          </h3>
          <p className="text-slate-500 font-sans text-xs sm:text-sm font-light max-w-xl mx-auto mb-6 leading-relaxed">
            {lang === "en"
              ? "Our personal assistants and special Concierge are ready to handle package customization, visa consultations, and your special accommodation needs directly via WhatsApp."
              : "Asisten pribadi dan Concierge khusus kami siap melayani kustomisasi paket, konsultasi visa, serta kebutuhan akomodasi khusus Anda langsung via WhatsApp."
            }
          </p>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-turquoise text-white hover:text-white font-sans text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
          >
            <span>{lang === "en" ? "Contact Concierge 24/7" : "Hubungi Concierge 24/7"}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
