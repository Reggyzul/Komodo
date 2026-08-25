import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ImageUploader from "../components/ImageUploader";
import { Plus, Pencil, Trash2, X, Save, Loader2, AlertTriangle, Star } from "lucide-react";

interface Testimonial {
  id: string; name: string; role: string; en_role: string;
  image: string; content: string; en_content: string;
  rating: number; destination: string; en_destination: string;
  is_active: boolean;
}

const empty: Omit<Testimonial, "id"> = {
  name: "", role: "", en_role: "", image: "", content: "", en_content: "",
  rating: 5, destination: "", en_destination: "", is_active: true,
};

type Toast = { type: "success" | "error"; message: string };

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const showToast = (type: Toast["type"], message: string) => {
    setToast({ type, message }); setTimeout(() => setToast(null), 3500);
  };

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("testimonials").select("*").order("created_at");
    if (!error && data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) {
        const { error } = await supabase.from("testimonials").insert({ ...editing, id: `test-${Date.now()}` });
        if (error) throw error;
      } else {
        const { id, ...rest } = editing;
        const { error } = await supabase.from("testimonials").update({ ...rest, updated_at: new Date().toISOString() }).eq("id", id);
        if (error) throw error;
      }
      showToast("success", isNew ? "Testimoni ditambahkan! 🎉" : "Testimoni disimpan! ✅");
      setEditing(null); await fetchItems();
    } catch (e: any) { showToast("error", `Gagal: ${e.message}`); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) showToast("error", `Gagal: ${error.message}`);
    else { showToast("success", "Testimoni dihapus."); await fetchItems(); }
    setDeleteId(null);
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
              <div><h3 className="font-bold text-gray-800">Hapus Testimoni?</h3><p className="text-xs text-gray-500">Tidak bisa dibatalkan.</p></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Batal</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold">Hapus</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-gray-800">Testimoni Pelanggan</h2><p className="text-xs text-gray-400">{items.length} testimoni</p></div>
        <button onClick={() => { setEditing({ ...empty, id: "" }); setIsNew(true); }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md">
          <Plus className="w-4 h-4" /><span>Tambah Testimoni</span>
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-2xl border border-amber-200 shadow-lg p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800">{isNew ? "➕ Tambah Testimoni" : "✏️ Edit Testimoni"}</h3>
            <button onClick={() => setEditing(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <ImageUploader currentImage={editing.image} onImageChange={(url) => setEditing({ ...editing, image: url })} label="Foto Profil Pelanggan" />
            </div>
            <Field label="Nama Pelanggan" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} required />
            <Field label="Rating (1–5)" value={String(editing.rating)} onChange={(v) => setEditing({ ...editing, rating: parseInt(v) || 5 })} type="number" />
            <Field label="Profesi (ID)" value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} placeholder="cth: Keluarga Traveler" />
            <Field label="Profesi (EN)" value={editing.en_role} onChange={(v) => setEditing({ ...editing, en_role: v })} placeholder="cth: Family Traveler" />
            <Field label="Paket yang Dipesan (ID)" value={editing.destination} onChange={(v) => setEditing({ ...editing, destination: v })} />
            <Field label="Paket yang Dipesan (EN)" value={editing.en_destination} onChange={(v) => setEditing({ ...editing, en_destination: v })} />
            <TextArea label="Review (ID)" value={editing.content} onChange={(v) => setEditing({ ...editing, content: v })} />
            <TextArea label="Review (EN)" value={editing.en_content} onChange={(v) => setEditing({ ...editing, en_content: v })} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEditing(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm">Batal</button>
            <button onClick={handleSave} disabled={saving || !editing.name}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white text-sm font-bold">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className={`bg-white rounded-2xl border shadow-sm p-4 ${item.is_active ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
              <div className="flex gap-4">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-gray-200" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">{item.content}</p>
                  <p className="text-[10px] text-amber-600 font-medium mt-1">{item.destination}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setEditing(item); setIsNew(false); }}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold">
                  <Pencil className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
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
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-100 outline-none transition-all" />
    </div>
  );
}
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-amber-400 outline-none resize-none transition-all" />
    </div>
  );
}
