import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ImageUploader from "../components/ImageUploader";
import { Plus, Pencil, Trash2, X, Save, Loader2, AlertTriangle, Star, ToggleLeft, ToggleRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  location: string;
  en_location: string;
  image: string;
  price: string;
  rating: number;
  reviews_count: number;
  tag: string;
  en_tag: string;
  duration: string;
  en_duration: string;
  description: string;
  en_description: string;
  sort_order: number;
  is_active: boolean;
}

const emptyDest: Omit<Destination, "id"> = {
  name: "", location: "", en_location: "", image: "", price: "",
  rating: 5.0, reviews_count: 0, tag: "", en_tag: "", duration: "",
  en_duration: "", description: "", en_description: "",
  sort_order: 0, is_active: true,
};

type Toast = { type: "success" | "error"; message: string };

export default function AdminDestinations() {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Destination | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const showToast = (type: Toast["type"], message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("destinations").select("*").order("sort_order");
    if (!error && data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) {
        const newId = `dest-${Date.now()}`;
        const { error } = await supabase.from("destinations").insert({ ...editing, id: newId });
        if (error) throw error;
      } else {
        const { id, ...rest } = editing;
        const { error } = await supabase.from("destinations").update({ ...rest, updated_at: new Date().toISOString() }).eq("id", id);
        if (error) throw error;
      }
      showToast("success", isNew ? "Destinasi berhasil ditambahkan! 🎉" : "Destinasi berhasil disimpan! ✅");
      setEditing(null);
      await fetchItems();
    } catch (e: any) {
      showToast("error", `Gagal menyimpan: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("destinations").delete().eq("id", id);
    if (error) { showToast("error", `Gagal menghapus: ${error.message}`); }
    else { showToast("success", "Destinasi dihapus."); await fetchItems(); }
    setDeleteId(null);
  };

  const handleToggleActive = async (item: Destination) => {
    await supabase.from("destinations").update({ is_active: !item.is_active }).eq("id", item.id);
    await fetchItems();
  };

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.message}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Hapus Destinasi?</h3>
                <p className="text-xs text-gray-500">Tindakan ini tidak bisa dibatalkan.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">Batal</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Destinasi Wisata</h2>
          <p className="text-xs text-gray-400">{items.length} destinasi tersedia</p>
        </div>
        <button
          onClick={() => { setEditing({ ...emptyDest, id: "" }); setIsNew(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Destinasi</span>
        </button>
      </div>

      {/* Edit / Add Form Panel */}
      {editing && (
        <div className="bg-white rounded-2xl border border-blue-200 shadow-lg p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-base">{isNew ? "➕ Tambah Destinasi Baru" : "✏️ Edit Destinasi"}</h3>
            <button onClick={() => setEditing(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Image */}
            <div className="md:col-span-2">
              <ImageUploader
                currentImage={editing.image}
                onImageChange={(url) => setEditing({ ...editing, image: url })}
                label="Gambar Destinasi"
              />
            </div>

            <Field label="Nama Destinasi (ID)" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} required />
            <Field label="Harga (contoh: Mulai Rp 1.350.000)" value={editing.price} onChange={(v) => setEditing({ ...editing, price: v })} />
            <Field label="Lokasi (ID)" value={editing.location} onChange={(v) => setEditing({ ...editing, location: v })} />
            <Field label="Lokasi (EN)" value={editing.en_location} onChange={(v) => setEditing({ ...editing, en_location: v })} />
            <Field label="Tag / Label (ID)" value={editing.tag} onChange={(v) => setEditing({ ...editing, tag: v })} placeholder="cth: Terpopuler" />
            <Field label="Tag / Label (EN)" value={editing.en_tag} onChange={(v) => setEditing({ ...editing, en_tag: v })} placeholder="cth: Most Popular" />
            <Field label="Durasi (ID)" value={editing.duration} onChange={(v) => setEditing({ ...editing, duration: v })} placeholder="cth: Satu Hari" />
            <Field label="Durasi (EN)" value={editing.en_duration} onChange={(v) => setEditing({ ...editing, en_duration: v })} placeholder="cth: One Day" />
            <Field label="Rating (1–5)" value={String(editing.rating)} onChange={(v) => setEditing({ ...editing, rating: parseFloat(v) || 5 })} type="number" />
            <Field label="Jumlah Ulasan" value={String(editing.reviews_count)} onChange={(v) => setEditing({ ...editing, reviews_count: parseInt(v) || 0 })} type="number" />
            <Field label="Urutan Tampil (sort_order)" value={String(editing.sort_order)} onChange={(v) => setEditing({ ...editing, sort_order: parseInt(v) || 0 })} type="number" />

            <TextArea label="Deskripsi (ID)" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} />
            <TextArea label="Deskripsi (EN)" value={editing.en_description} onChange={(v) => setEditing({ ...editing, en_description: v })} />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setEditing(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">Batal</button>
            <button onClick={handleSave} disabled={saving || !editing.name} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-bold shadow-md">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${item.is_active ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
              {item.image && (
                <div className="h-36 bg-gray-100 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-gray-800 text-sm leading-snug">{item.name}</h4>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">{item.tag}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{item.location}</p>
                <p className="text-xs font-semibold text-emerald-600">{item.price}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-500">{item.rating} · {item.reviews_count} ulasan</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => handleToggleActive(item)} className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${item.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {item.is_active ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
                    {item.is_active ? "Aktif" : "Nonaktif"}
                  </button>
                  <button onClick={() => { setEditing(item); setIsNew(false); }} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="flex items-center justify-center p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Shared Field Components ──────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder = "", required = false, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all" />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none resize-none transition-all" />
    </div>
  );
}
