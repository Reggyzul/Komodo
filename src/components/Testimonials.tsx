import React, { useState } from "react";
import { Star, Quote, Sparkles, X, Maximize2 } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials({ lang }: { lang: "id" | "en" }) {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
    desc: string;
    tag: string;
  } | null>(null);

  const galleryItems = [
    {
      src: "/assets/gallery_waterfall.jpg",
      title: lang === "en" ? "Cunca Wulang Waterfall" : "Air Terjun Cunca Wulang",
      desc: lang === "en" 
        ? "Adventure through Flores' tropical rainforest to witness the exotic waterfall hidden inside a canyon."
        : "Petualangan menembus hutan tropis Flores untuk menyaksikan keindahan air terjun eksotis di tebing ngarai tersembunyi.",
      tag: lang === "en" ? "West Flores" : "Flores Barat"
    },
    {
      src: "/assets/gallery_waerebo_couple.jpg",
      title: lang === "en" ? "Cultural Harmony in Wae Rebo" : "Harmoni Kultural di Wae Rebo",
      desc: lang === "en"
        ? "Wearing traditional Manggarai handwoven ikat clothing with a partner in front of the Mbaru Niang houses."
        : "Mengenakan pakaian adat tenun ikat khas Manggarai bersama pasangan di depan rumah kerucut Mbaru Niang.",
      tag: lang === "en" ? "Cultural Heritage" : "Warisan Budaya"
    },
    {
      src: "/assets/gallery_waerebo_group.jpg",
      title: lang === "en" ? "Warm Togetherness in Wae Rebo" : "Kebersamaan Hangat Wae Rebo",
      desc: lang === "en"
        ? "Moments of warm conversation and friendliness shared with local villagers and fellow explorers inside the traditional village."
        : "Momen ramah tamah dan diskusi hangat bersama penduduk lokal serta sesama penjelajah di dalam desa adat.",
      tag: lang === "en" ? "Local Experience" : "Pengalaman Lokal"
    },
    {
      src: "/assets/gallery_waerebo_village.jpg",
      title: lang === "en" ? "Wae Rebo Traditional Village Above the Clouds" : "Desa Adat di Atas Awan Wae Rebo",
      desc: lang === "en"
        ? "The mystical charm of the seven ancestral Mbaru Niang traditional houses surrounded by mountain valley mist."
        : "Pesona mistis tujuh rumah adat pusaka Mbaru Niang yang dikelilingi kabut tipis lembah pegunungan terpencil.",
      tag: lang === "en" ? "Cultural Adventure" : "Petualangan Kultural"
    },
    {
      src: "/assets/gallery_kelimutu.jpg",
      title: lang === "en" ? "Magical Dawn at Kelimutu Lake" : "Fajar Magis di Danau Kelimutu",
      desc: lang === "en"
        ? "The peak beauty of the sunrise illuminating the legendary three-colored volcanic craters."
        : "Puncak keindahan matahari terbit menyinari kawah vulkanik tiga warna yang penuh legenda.",
      tag: lang === "en" ? "Natural Wonder" : "Keajaiban Alam"
    },
    {
      src: "/assets/gallery_camping.jpg",
      title: lang === "en" ? "Beach Camping in Bajo" : "Berkemah di Pantai Bajo",
      desc: lang === "en"
        ? "Enjoying quiet sunsets and star-filled skies in a beachside tent in the peaceful Labuan Bajo area."
        : "Menikmati senja tenang dan malam bertabur bintang di tenda tepi pantai sunyi kawasan Labuan Bajo.",
      tag: lang === "en" ? "Beach Adventure" : "Petualangan Pantai"
    },
    {
      src: "/assets/gallery_waerebo_walk.jpg",
      title: lang === "en" ? "Trekking Towards Wae Rebo" : "Trekking Menuju Wae Rebo",
      desc: lang === "en"
        ? "A hiking journey climbing Manggarai mountain trails surrounded by lush Flores rainforest canopy."
        : "Perjalanan mendaki menyusuri jalan setapak pegunungan Manggarai dikelilingi hutan hujan Flores.",
      tag: lang === "en" ? "Nature Trekking" : "Trekking Alam"
    },
    {
      src: "/assets/gallery_rainforest_trek.jpg",
      title: lang === "en" ? "Exploring Flores Rainforest" : "Menjelajah Hutan Hujan Flores",
      desc: lang === "en"
        ? "Climbing mossy stone stairs in the middle of a cool, lush tropical forest canopy."
        : "Langkah mendaki menyusuri tangga batu berlumut di tengah rimbunnya kanopi hutan tropis yang sejuk.",
      tag: lang === "en" ? "Jungle Exploration" : "Eksplorasi Rimba"
    },
    {
      src: "/assets/gallery_forest_waterfall.jpg",
      title: lang === "en" ? "Secret Forest Waterfall" : "Air Terjun Hutan Rahasia",
      desc: lang === "en"
        ? "Natural coolness of a hidden crystal clear waterfall flowing among lush Flores greenery."
        : "Kesejukan alami aliran air terjun jernih tersembunyi yang mengalir subur di tengah lebatnya vegetasi Flores.",
      tag: lang === "en" ? "Hidden Gem" : "Hidden Gem"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-brand-navy text-white relative overflow-hidden">
      {/* Decorative luxury gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-turquoise/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Decorative borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Gallery Focus at Top */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-brand-turquoise/10 border border-brand-turquoise/20 px-3 py-1 rounded-full text-brand-turquoise text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Real Trip Documentation" : "Dokumentasi Riil Perjalanan"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-white mb-4 leading-tight">
            {lang === "en" ? (
              <>
                Beautiful Moments of Our Guests' <span className="italic font-normal text-brand-turquoise">Adventures</span>
              </>
            ) : (
              <>
                Momen Indah <span className="italic font-normal text-brand-turquoise">Petualangan</span> Tamu Kami
              </>
            )}
          </h2>
          <div className="w-16 h-0.5 bg-brand-turquoise/30 mx-auto mb-4 rounded-full" />
          <p className="text-slate-400 font-sans font-light text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {lang === "en"
              ? "Here is the authentic travel documentation of our guests while exploring the natural beauty of Flores, Wae Rebo cultural village, Kelimutu craters, and tropical waterfalls."
              : "Berikut adalah dokumentasi perjalanan autentik dari tamu kami selama menjelajahi keindahan alam Flores, desa budaya Wae Rebo, kawah Kelimutu, dan air terjun tropis."
            }
          </p>
        </div>

        {/* Gallery Masonry Grid - Highlighting Photos First */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance] box-border mx-auto mb-20">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(item)}
              className="group relative overflow-hidden rounded-[24px] border border-white/5 bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 break-inside-avoid mb-6 transform hover:-translate-y-1.5 cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <span className="inline-block text-[9px] font-sans font-bold uppercase tracking-wider text-brand-turquoise bg-brand-turquoise/10 px-2.5 py-1 rounded border border-brand-turquoise/10 w-fit mb-2">
                  {item.tag}
                </span>
                <h4 className="font-serif font-bold text-base text-white mb-1.5 flex items-center justify-between">
                  <span>{item.title}</span>
                  <Maximize2 className="w-4 h-4 text-white/65 group-hover:text-white transition-colors flex-shrink-0 ml-2" />
                </h4>
                <p className="text-[11px] text-slate-300 font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Tap to expand hint for touch screens */}
              <div className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 opacity-70 group-hover:opacity-0 transition-opacity duration-300 md:hidden">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Section Divider */}
        <div className="w-full h-px bg-white/5 mb-14" />

        {/* Testimonials Header (Smaller / Tighter) */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-full text-brand-gold text-[9px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{lang === "en" ? "Guest Testimonials" : "Testimoni Tamu"}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-light tracking-tight text-white mb-3">
            {lang === "en" ? (
              <>
                Their <span className="italic font-normal text-brand-gold">Precious</span> Adventure Stories
              </>
            ) : (
              <>
                Cerita Petualangan <span className="italic font-normal text-brand-gold">Berharga</span> Mereka
              </>
            )}
          </h3>
          <p className="text-slate-400 font-sans font-light text-xs max-w-lg mx-auto">
            {lang === "en"
              ? "Sincere reviews from fellow travelers who have entrusted their travel comfort to Komodo Kamu."
              : "Ulasan tulus dari para sahabat traveler yang telah mempercayakan kenyamanan perjalanannya kepada Komodo Kamu."
            }
          </p>
        </div>

        {/* Testimonials Grid (More Compact) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="testimonials-grid">
          {TESTIMONIALS.map((test) => {
            const currentContent = lang === "en" && test.enContent ? test.enContent : test.content;
            const currentRole = lang === "en" && test.enRole ? test.enRole : test.role;
            const currentDestination = lang === "en" && test.enDestination ? test.enDestination : test.destination;

            return (
              <div
                key={test.id}
                className="bg-white/[0.015] hover:bg-white/[0.035] rounded-[24px] p-6 sm:p-7 border border-white/5 hover:border-brand-turquoise/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(14,165,164,0.02)] relative flex flex-col justify-between group"
              >
                {/* Quote Icon overlay decoration */}
                <div className="absolute top-6 right-6 text-white/5 group-hover:text-brand-turquoise/10 transition-colors duration-500">
                  <Quote className="w-8 h-8 fill-white/5 group-hover:fill-brand-turquoise/5" />
                </div>

                <div>
                  {/* Visual Star rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-brand-gold text-brand-gold drop-shadow-[0_0_8px_rgba(200,169,106,0.5)]" />
                    ))}
                  </div>

                  {/* Testimonial Message */}
                  <p className="text-slate-300 font-sans text-xs sm:text-sm font-light leading-relaxed italic mb-6">
                    "{currentContent}"
                  </p>
                </div>

                {/* Profile Details footer */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-3">
                    <img
                      src={test.image}
                      alt={test.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10 shadow-md group-hover:border-brand-turquoise/30 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-100 group-hover:text-brand-turquoise transition-colors duration-300">{test.name}</h4>
                      <span className="text-[8px] text-slate-500 font-sans uppercase font-bold tracking-wider block mt-0.5">{currentRole}</span>
                    </div>
                  </div>

                  {/* Destination tag */}
                  <span className="bg-brand-turquoise/10 text-brand-turquoise font-sans text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-brand-turquoise/10">
                    {currentDestination}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 z-50 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div 
            className="max-w-4xl w-full flex flex-col bg-slate-900 border border-white/10 rounded-[28px] overflow-hidden shadow-2xl animate-fade-in relative z-40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Frame */}
            <div className="relative w-full max-h-[65vh] bg-black/40 overflow-hidden flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[65vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Details Box */}
            <div className="p-6 sm:p-8 bg-slate-900 border-t border-white/5 space-y-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-turquoise bg-brand-turquoise/10 px-3 py-1 rounded border border-brand-turquoise/10 w-fit inline-block">
                {selectedImage.tag}
              </span>
              <h4 className="text-xl sm:text-2xl font-serif text-white font-semibold">
                {selectedImage.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed font-sans">
                {selectedImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
