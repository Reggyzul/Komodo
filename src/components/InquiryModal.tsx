import React, { useState, useEffect } from "react";
import { X, Calendar, Users, Send, CheckCircle2, MessageSquare, Phone, Mail, User, Sparkles } from "lucide-react";
import { Destination, TravelPackage } from "../types";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDestination: Destination | null;
  selectedPackage: TravelPackage | null;
}

export default function InquiryModal({ isOpen, onClose, selectedDestination, selectedPackage }: InquiryModalProps) {
  // Form input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [notes, setNotes] = useState("");
  
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset success state on open/close
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const itemTitle = selectedDestination ? selectedDestination.name : (selectedPackage ? selectedPackage.title : "Custom Tour");
  const itemLocation = selectedDestination ? selectedDestination.location : (selectedPackage ? selectedPackage.destination : "");
  const itemPrice = selectedDestination ? selectedDestination.price : (selectedPackage ? selectedPackage.price : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setIsSuccess(true);
  };

  const getWhatsAppLink = () => {
    const text = `Halo tim KOMODO KAMU, saya baru saja mengirimkan Inquiry Pemesanan melalui Website:
    
- *Nama*: ${name}
- *Paket/Destinasi*: ${itemTitle} (${itemLocation})
- *Rencana Tanggal*: ${date || "Menyusul"}
- *Jumlah Peserta*: ${guests} Pax
- *WhatsApp*: ${phone}
- *Catatan Khusus*: ${notes || "-"}

Mohon informasi ketersediaan kuota dan detail harganya. Terima kasih!`;
    return `https://wa.me/6282144428975?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative bg-brand-sand text-slate-900 rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-white/10 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-slate-200/50 flex justify-between items-center bg-white">
          <div>
            <span className="inline-flex items-center space-x-1.5 bg-brand-gold/10 text-brand-gold px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Sesi Layanan Privat</span>
            </span>
            <h3 className="font-serif font-semibold text-xl text-slate-950">Formulir Konsultasi</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition cursor-pointer"
            id="close-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            /* Success Feedback Layout */
            <div className="text-center py-6 space-y-6" id="inquiry-success">
              <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-full inline-flex border border-emerald-500/20 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-serif font-light text-slate-950">Pengajuan Terkirim</h4>
                <p className="text-slate-500 font-sans text-xs sm:text-sm font-light max-w-sm mx-auto leading-relaxed">
                  Terima kasih <strong className="font-medium text-slate-900">{name}</strong>, formulir minat perjalanan <strong className="font-medium text-slate-900">{itemTitle}</strong> Anda telah sukses kami terima.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/60 text-left text-xs text-slate-600 space-y-3 shadow-sm">
                <span className="block font-bold text-slate-800 uppercase tracking-widest text-[9px]">Konfirmasi Rincian</span>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400 font-light">Destinasi:</span>
                  <span className="font-semibold text-slate-950">{itemTitle}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400 font-light">Pax Peserta:</span>
                  <span className="font-semibold text-slate-950">{guests} Pax</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-light">Kontak Pemohon:</span>
                  <span className="font-semibold text-slate-950">{phone}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center space-x-2 bg-brand-navy hover:bg-brand-turquoise text-white hover:text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-xl shadow-md transition duration-300 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Koneksi WhatsApp Concierge</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full text-xs font-bold text-slate-400 hover:text-brand-turquoise py-2 cursor-pointer transition"
                >
                  Selesai & Tutup Jendela
                </button>
              </div>
            </div>
          ) : (
            /* Main Form Fields Layout */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pre-filled product/destination card review snippet */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/60 flex justify-between items-center mb-2 shadow-sm">
                <div>
                  <span className="block text-[9px] text-slate-400 font-sans uppercase font-bold tracking-widest mb-1">Rincian Terpilih</span>
                  <span className="font-serif font-semibold text-base text-slate-950 block">{itemTitle}</span>
                  {itemLocation && <span className="text-xs text-slate-400 font-sans font-light block mt-0.5">{itemLocation}</span>}
                </div>
                {itemPrice && (
                  <div className="text-right">
                    <span className="block text-[8px] text-slate-400 font-sans uppercase font-bold tracking-wider">Mulai Dari</span>
                    <span className="text-sm font-bold text-brand-turquoise font-sans">{itemPrice}</span>
                  </div>
                )}
              </div>

              {/* Full Name input */}
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">Nama Lengkap</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <User className="w-4 h-4 text-brand-turquoise" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap sesuai paspor/identitas"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-900 font-sans text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-brand-turquoise focus:border-brand-turquoise transition"
                  />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Mail className="w-4 h-4 text-brand-turquoise" />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="email@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-900 font-sans text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-brand-turquoise focus:border-brand-turquoise transition"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">No. WhatsApp</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Phone className="w-4 h-4 text-brand-turquoise" />
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="contoh: 08123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-900 font-sans text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-brand-turquoise focus:border-brand-turquoise transition"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Guests Grid */}
              <div className="grid grid-cols-2 gap-5 text-left">
                {/* Travel Date */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">Tanggal Perjalanan</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Calendar className="w-4 h-4 text-brand-turquoise" />
                    </span>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-900 font-sans text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-brand-turquoise focus:border-brand-turquoise transition cursor-pointer"
                    />
                  </div>
                </div>

                {/* Pax Guests */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">Jumlah Peserta (Pax)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Users className="w-4 h-4 text-brand-turquoise" />
                    </span>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-900 font-sans text-xs sm:text-sm rounded-xl pl-10 pr-2 py-3.5 focus:outline-none focus:ring-1 focus:ring-brand-turquoise focus:border-brand-turquoise transition appearance-none cursor-pointer"
                    >
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang (Honeymoon)</option>
                      <option value="3-5">Rombongan Kecil (3-5)</option>
                      <option value="6-10">Rombongan Sedang (6-10)</option>
                      <option value="11+">Group Besar (&gt;10)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">Catatan Tambahan & Layanan Khusus</label>
                <textarea
                  rows={2}
                  placeholder="Akomodasi privat khusus, menu makan alergi, atau info penerbangan tertentu..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-900 font-sans text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-turquoise/20 focus:border-brand-turquoise transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 border border-slate-200 hover:bg-slate-100 text-slate-500 font-sans font-bold uppercase tracking-widest py-4 rounded-xl text-[10px] cursor-pointer transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 flex justify-center items-center space-x-2 bg-brand-navy hover:bg-brand-turquoise text-white font-sans font-bold uppercase tracking-widest py-4 rounded-xl text-[10px] shadow-md transition duration-300 cursor-pointer"
                  id="submit-inquiry-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pengajuan</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
