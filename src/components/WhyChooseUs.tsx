import React from "react";
import { DollarSign, Users, Car, Zap, Award, Sparkles } from "lucide-react";

export default function WhyChooseUs({ lang }: { lang: "id" | "en" }) {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6 text-brand-turquoise group-hover:scale-110 transition-transform duration-300" />,
      title: lang === "en" ? "Best Rates" : "Harga Terbaik",
      description: lang === "en" 
        ? "We offer the most competitive, transparent, and honest rates with no hidden fees for all trips and rentals."
        : "Kami menawarkan tarif penawaran paling kompetitif, transparan, dan jujur tanpa biaya tersembunyi untuk seluruh trip dan rental."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-turquoise group-hover:scale-110 transition-transform duration-300" />,
      title: lang === "en" ? "Experienced Drivers" : "Driver Berpengalaman",
      description: lang === "en"
        ? "All our drivers are professionally trained, extremely friendly, and master Flores' winding routes safely."
        : "Seluruh pengemudi kami terlatih secara profesional, sangat ramah, serta menguasai rute jalanan berliku Flores dengan aman."
    },
    {
      icon: <Car className="w-6 h-6 text-brand-turquoise group-hover:scale-110 transition-transform duration-300" />,
      title: lang === "en" ? "Clean & Comfortable Fleet" : "Armada Bersih & Nyaman",
      description: lang === "en"
        ? "Every car and boat is routinely maintained, clean, fresh-smelling, cold-AC equipped, and ready in prime condition."
        : "Setiap mobil dan kapal dirawat berkala secara rutin, bersih, wangi, ber-AC dingin, dan siap meluncur dalam kondisi prima."
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-turquoise group-hover:scale-110 transition-transform duration-300" />,
      title: lang === "en" ? "24/7 Fast Response" : "Fast Response",
      description: lang === "en"
        ? "Our customer concierge service is highly responsive, active for route consultations, car rentals, and booking 24 hours a day."
        : "Layanan customer concierge kami sangat responsif, aktif melayani konsultasi rute, rental mobil, dan booking 24 jam penuh."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-turquoise group-hover:scale-110 transition-transform duration-300" />,
      title: lang === "en" ? "Professional Tour Guides" : "Tour Guide Profesional",
      description: lang === "en"
        ? "Communicative, reliable, and officially licensed local tour guides ready to document your beautiful vacation moments."
        : "Pemandu wisata lokal berlisensi resmi yang komunikatif, andal, dan siap membantu mendokumentasikan momen indah liburan Anda."
    }
  ];

  return (
    <section className="py-32 bg-brand-navy text-white relative overflow-hidden">
      {/* Golden Glowing Orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-turquoise/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Thin elegant horizontal line dividers */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Header Area (Left Col - 4 cols in lg) */}
          <div className="lg:col-span-4 text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/20 px-3.5 py-1.5 rounded-full text-brand-gold text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Our Advantages" : "Keunggulan Kami"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white leading-tight">
              {lang === "en" ? (
                <>
                  Why Choose <span className="italic font-normal text-brand-gold">Komodo Kamu</span>?
                </>
              ) : (
                <>
                  Mengapa Memilih <span className="italic font-normal text-brand-gold">Komodo Kamu</span>?
                </>
              )}
            </h2>
            <div className="w-16 h-1 bg-brand-gold/30 rounded-full" />
            <p className="text-slate-400 font-sans font-light text-sm sm:text-base leading-relaxed tracking-wide">
              {lang === "en"
                ? "As the best local travel partner in Labuan Bajo, we are committed to delivering a safe, comfortable, and unforgettably memorable vacation experience for you."
                : "Sebagai mitra perjalanan lokal terbaik di Labuan Bajo, kami berkomitmen menghadirkan pengalaman berlibur yang aman, nyaman, dan berkesan tak terlupakan bagi Anda."
              }
            </p>
            
            {/* Stats list with golden accents */}
            <div className="pt-6 grid grid-cols-2 gap-6 border-t border-white/5">
              <div className="space-y-1">
                <span className="block font-sans font-extrabold text-4xl text-brand-gold tracking-tight">10k+</span>
                <span className="block text-[10px] font-bold font-sans text-slate-500 uppercase tracking-wider">
                  {lang === "en" ? "Happy Travelers" : "Wisatawan Puas"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-sans font-extrabold text-4xl text-brand-gold tracking-tight">4.9/5</span>
                <span className="block text-[10px] font-bold font-sans text-slate-500 uppercase tracking-wider">
                  {lang === "en" ? "Review Rating" : "Rating Ulasan"}
                </span>
              </div>
            </div>
          </div>

          {/* Benefits Cards Grid (Right Col - 8 cols in lg) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="group bg-white/[0.02] hover:bg-white/[0.04] p-8 rounded-[24px] border border-white/5 hover:border-brand-turquoise/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(14,165,164,0.03)]"
              >
                {/* Glowing Icon Frame */}
                <div className="mb-6 p-3 bg-brand-turquoise/10 inline-block rounded-xl group-hover:bg-brand-turquoise group-hover:text-white transition-all duration-300">
                  {b.icon}
                </div>
                <h3 className="font-serif font-semibold text-lg text-slate-100 mb-3 group-hover:text-brand-turquoise transition-colors">
                  {b.title}
                </h3>
                <p className="text-slate-400 font-sans text-xs sm:text-sm font-light leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
