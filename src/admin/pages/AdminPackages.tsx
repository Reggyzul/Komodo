import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ImageUploader from "../components/ImageUploader";
import { Plus, Pencil, Trash2, X, Save, Loader2, AlertTriangle, Star, ToggleLeft, ToggleRight } from "lucide-react";

interface Package {
  id: string;
  title: string; en_title: string;
  destination: string; en_destination: string;
  duration: string; en_duration: string;
  price: string; old_price: string;
  image: string; rating: number;
  badge: string; en_badge: string;
  description: string; en_description: string;
  inclusions: string[]; en_inclusions: string[];
  sort_order: number; is_active: boolean;
}

const emptyPkg: Omit<Package, "id"> = {
  title: "", en_title: "", destination: "", en_destination: "",
  duration: "", en_duration: "", price: "", old_price: "",
  image: "", rating: 5.0, badge: "", en_badge: "",
  description: "", en_description: "",
  inclusions: [""], en_inclusions: [""],
  sort_order: 0, is_active: true,
};

type Toast = { type: "success" | "error"; message: string };

export default function AdminPackages() {
  const [items, setItems] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Package | null>(null);
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
    const { data, error } = await supabase.from("packages").select("*").order("sort_order");
    if (!error && data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      // Filter out empty inclusions
      const cleaned = {
        ...editing,
        inclusions: editing.inclusions.filter((s) => s.trim() !== ""),
        en_inclusions: editing.en_inclusions.filter((s) => s.trim() !== ""),
      };
      if (isNew) {
        const newId = `pkg-${Date.now()}`;
        const { error } = await supabase.from("packages").insert({ ...cleaned, id: newId });
        if (error) throw error;
      } else {
        const { id, ...rest } = cleaned;
        const { error } = await supabase.from("packages").update({ ...rest, updated_at: new Date().toISOString() }).eq("id", id);
        if (error) throw error;
      }
      showToast("success", isNew ? "Paket berhasil ditambahkan! 🎉" : "Paket berhasil disimpan! ✅");
      setEditing(null);
      await fetchItems();
    } catch (e: any) {
      showToast("error", `Gagal menyimpan: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) showToast("error", `Gagal menghapus: ${error.message}`);
    else { showToast("success", "Paket dihapus."); await fetchItems(); }
    setDeleteId(null);
  };

  const updateInclusion = (lang: "id" | "en", idx: number, val: string) => {
    if (!editing) return;
    if (lang === "id") {
      const arr = [...editing.inclusions]; arr[idx] = val;
      setEditing({ ...editing, inclusions: arr });
    } else {
      const arr = [...editing.en_inclusions]; arr[idx] = val;
      setEditing({ ...editing, en_inclusions: arr });
    }
  };

  const addInclusion = () => {
    if (!editing) return;
    setEditing({ ...editing, inclusions: [...editing.inclusions, ""], en_inclusions: [...editing.en_inclusions, ""] });
  };

  const removeInclusion = (idx: number) => {
    if (!editing) return;
    setEditing({
      ...editing,
      inclusions: editing.inclusions.filter((_, i) => i !== idx),
      en_inclusions: editing.en_inclusions.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.message}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-500" /></div>
              <div><h3 className="font-bold text-gray-800">Hapus Paket?</h3><p className="text-xs text-gray-500">Tindakan ini tidak bisa dibatalkan.</p></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium">Batal</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold">Hapus</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Paket Trip</h2>
          <p className="text-xs text-gray-400">{items.length} paket tersedia</p>
        </div>
        <button onClick={() => { setEditing({ ...emptyPkg, id: "" }); setIsNew(true); }}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md">
          <Plus className="w-4 h-4" /><span>Tambah Paket</span>
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-2xl border border-violet-200 shadow-lg p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800">{isNew ? "➕ Tambah Paket Baru" : "✏️ Edit Paket"}</h3>
            <button onClick={() => setEditing(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <ImageUploader currentImage={editing.image} onImageChange={(url) => setEditing({ ...editing, image: url })} label="Foto Paket" />
            </div>
            <Field label="Judul Paket (ID)" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} required />
            <Field label="Judul Paket (EN)" value={editing.en_title} onChange={(v) => setEditing({ ...editing, en_title: v })} />
            <Field label="Destinasi (ID)" value={editing.destination} onChange={(v) => setEditing({ ...editing, destination: v })} />
            <Field label="Destinasi (EN)" value={editing.en_destination} onChange={(v) => setEditing({ ...editing, en_destination: v })} />
            <Field label="Durasi (ID)" value={editing.duration} onChange={(v) => setEditing({ ...editing, duration: v })} />
            <Field label="Durasi (EN)" value={editing.en_duration} onChange={(v) => setEditing({ ...editing, en_duration: v })} />
            <Field label="Harga" value={editing.price} onChange={(v) => setEditing({ ...editing, price: v })} placeholder="Rp 1.350.000" />
            <Field label="Harga Lama (opsional)" value={editing.old_price} onChange={(v) => setEditing({ ...editing, old_price: v })} placeholder="Rp 1.650.000" />
            <Field label="Badge (ID)" value={editing.badge} onChange={(v) => setEditing({ ...editing, badge: v })} placeholder="Terlaris" />
            <Field label="Badge (EN)" value={editing.en_badge} onChange={(v) => setEditing({ ...editing, en_badge: v })} placeholder="Best Seller" />
            <Field label="Rating (1–5)" value={String(editing.rating)} onChange={(v) => setEditing({ ...editing, rating: parseFloat(v) || 5 })} type="number" />
            <Field label="Urutan Tampil" value={String(editing.sort_order)} onChange={(v) => setEditing({ ...editing, sort_order: parseInt(v) || 0 })} type="number" />
            <TextArea label="Deskripsi (ID)" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} />
            <TextArea label="Deskripsi (EN)" value={editing.en_description} onChange={(v) => setEditing({ ...editing, en_description: v })} />

            {/* Inclusions */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Yang Termasuk (Inclusions)</label>
                <button onClick={addInclusion} className="text-xs text-violet-600 font-bold hover:underline flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Tambah baris
                </button>
              </div>
              <div className="space-y-2">
                {editing.inclusions.map((inc, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input value={inc} onChange={(e) => updateInclusion("id", idx, e.target.value)} placeholder={`Fasilitas ${idx + 1} (ID)`}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:border-violet-400 outline-none" />
                    <input value={editing.en_inclusions[idx] || ""} onChange={(e) => updateInclusion("en", idx, e.target.value)} placeholder={`Facility ${idx + 1} (EN)`}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:border-violet-400 outline-none" />
                    <button onClick={() => removeInclusion(idx)} className="p-2 rounded-lg text-red-400 hover:bg-red-50"><X className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setEditing(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium">Batal</button>
            <button onClick={handleSave} disabled={saving || !editing.title}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white text-sm font-bold">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-violet-500" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${item.is_active ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
              {item.image && <div className="h-36 bg-gray-100 overflow-hidden"><img src={item.image} alt={item.title} className="w-full h-full object-cover" /></div>}
              <div className="p-4">
                {item.badge && <span className="text-[10px] bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full font-semibold">{item.badge}</span>}
                <h4 className="font-bold text-gray-800 text-sm mt-1 leading-snug">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.duration}</p>
                <p className="text-xs font-bold text-emerald-600 mt-1">{item.price}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-400">{item.rating}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setEditing(item); setIsNew(false); }}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-semibold">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500">
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

function Field({ label, value, onChange, placeholder = "", required = false, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-violet-400 focus:ring-1 focus:ring-violet-100 outline-none transition-all" />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-violet-400 focus:ring-1 focus:ring-violet-100 outline-none resize-none transition-all" />
    </div>
  );
}
