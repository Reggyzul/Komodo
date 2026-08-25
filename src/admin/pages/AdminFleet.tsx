import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ImageUploader from "../components/ImageUploader";
import { Plus, Pencil, Trash2, X, Save, Loader2, AlertTriangle, Users2, Shield, ToggleLeft, ToggleRight, Car } from "lucide-react";
import { DEFAULT_CARS } from "../../data";

interface CarRecord {
  id: string;
  name: string;
  category: string;
  capacity: string;
  en_capacity: string;
  price: string;
  image: string;
  tag: string;
  en_tag: string;
  features: string[];
  en_features: string[];
  sort_order: number;
  is_active: boolean;
}

const emptyCar: Omit<CarRecord, "id"> = {
  name: "",
  category: "Premium MPV",
  capacity: "7 Penumpang",
  en_capacity: "7 Passengers",
  price: "Rp 950.000",
  image: "/assets/innova_reborn.png",
  tag: "Terfavorit",
  en_tag: "Most Favorite",
  features: ["Driver + BBM", "AC Dingin", "Bersih & Wangi"],
  en_features: ["Driver + Fuel", "Cool AC", "Clean & Fresh"],
  sort_order: 1,
  is_active: true,
};

type Toast = { type: "success" | "error"; message: string };

export default function AdminFleet() {
  const [items, setItems] = useState<CarRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CarRecord | null>(null);
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
    try {
      const { data, error } = await supabase.from("fleet").select("*").order("sort_order");
      if (!error && data && data.length > 0) {
        setItems(data);
      } else {
        // Use default cars if database table is empty
        const mapped = DEFAULT_CARS.map((c) => ({
          id: c.id,
          name: c.name,
          category: c.category,
          capacity: c.capacity,
          en_capacity: c.enCapacity || c.capacity,
          price: c.price,
          image: c.image,
          tag: c.tag,
          en_tag: c.enTag || c.tag,
          features: c.features || [],
          en_features: c.enFeatures || c.features || [],
          sort_order: c.sortOrder || 1,
          is_active: c.isActive !== false,
        }));
        setItems(mapped);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const cleaned = {
        ...editing,
        features: editing.features.filter((s) => s.trim() !== ""),
        en_features: editing.en_features.filter((s) => s.trim() !== ""),
      };

      if (isNew) {
        const newId = `car-${Date.now()}`;
        const { error } = await supabase.from("fleet").insert({ ...cleaned, id: newId });
        if (error) throw error;
      } else {
        const { id, ...rest } = cleaned;
        const { error } = await supabase.from("fleet").update({ ...rest, updated_at: new Date().toISOString() }).eq("id", id);
        if (error) throw error;
      }
      showToast("success", isNew ? "Armada mobil berhasil ditambahkan! 🎉" : "Armada mobil berhasil disimpan! ✅");
      setEditing(null);
      await fetchItems();
    } catch (e: any) {
      showToast("error", `Gagal menyimpan: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("fleet").delete().eq("id", id);
    if (error) {
      showToast("error", `Gagal menghapus: ${error.message}`);
    } else {
      showToast("success", "Armada mobil dihapus.");
      await fetchItems();
    }
    setDeleteId(null);
  };

  const handleToggleActive = async (item: CarRecord) => {
    await supabase.from("fleet").update({ is_active: !item.is_active }).eq("id", item.id);
    await fetchItems();
  };

  const updateFeature = (lang: "id" | "en", idx: number, val: string) => {
    if (!editing) return;
    if (lang === "id") {
      const arr = [...editing.features];
      arr[idx] = val;
      setEditing({ ...editing, features: arr });
    } else {
      const arr = [...editing.en_features];
      arr[idx] = val;
      setEditing({ ...editing, en_features: arr });
    }
  };

  const addFeature = () => {
    if (!editing) return;
    setEditing({
      ...editing,
      features: [...editing.features, ""],
      en_features: [...editing.en_features, ""],
    });
  };

  const removeFeature = (idx: number) => {
    if (!editing) return;
    setEditing({
      ...editing,
      features: editing.features.filter((_, i) => i !== idx),
      en_features: editing.en_features.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-5">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
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
                <h3 className="font-bold text-gray-800">Hapus Mobil Ini?</h3>
                <p className="text-xs text-gray-500">Tindakan ini tidak bisa dibatalkan.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Rental Mobil & Armada</h2>
          <p className="text-xs text-gray-400">{items.length} armada mobil terdaftar</p>
        </div>
        <button
          onClick={() => {
            setEditing({ ...emptyCar, id: "" });
            setIsNew(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mobil</span>
        </button>
      </div>

      {/* Edit / Add Form Panel */}
      {editing && (
        <div className="bg-white rounded-2xl border border-blue-200 shadow-lg p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-base">
              {isNew ? "➕ Tambah Armada Mobil Baru" : "✏️ Edit Armada Mobil"}
            </h3>
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
                label="Foto Mobil"
              />
            </div>

            <Field label="Nama Mobil" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} placeholder="Innova Reborn" required />
            <Field label="Kategori" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} placeholder="Premium MPV / SUV / Microbus" />
            <Field label="Kapasitas (ID)" value={editing.capacity} onChange={(v) => setEditing({ ...editing, capacity: v })} placeholder="7 Penumpang" />
            <Field label="Kapasitas (EN)" value={editing.en_capacity} onChange={(v) => setEditing({ ...editing, en_capacity: v })} placeholder="7 Passengers" />
            <Field label="Harga Sewa" value={editing.price} onChange={(v) => setEditing({ ...editing, price: v })} placeholder="Rp 950.000 / Hari" />
            <Field label="Tag / Badge (ID)" value={editing.tag} onChange={(v) => setEditing({ ...editing, tag: v })} placeholder="Terfavorit / Best Value" />
            <Field label="Tag / Badge (EN)" value={editing.en_tag} onChange={(v) => setEditing({ ...editing, en_tag: v })} placeholder="Most Favorite" />
            <Field label="Urutan Tampil (sort_order)" value={String(editing.sort_order)} onChange={(v) => setEditing({ ...editing, sort_order: parseInt(v) || 1 })} type="number" />

            {/* Features List */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Fasilitas & Keunggulan Mobil
                </label>
                <button onClick={addFeature} className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Tambah baris
                </button>
              </div>
              <div className="space-y-2">
                {editing.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      value={feat}
                      onChange={(e) => updateFeature("id", idx, e.target.value)}
                      placeholder={`Fasilitas ${idx + 1} (ID) - cth: AC Double Blower`}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:border-blue-400 outline-none"
                    />
                    <input
                      value={editing.en_features[idx] || ""}
                      onChange={(e) => updateFeature("en", idx, e.target.value)}
                      placeholder={`Facility ${idx + 1} (EN) - e.g. Double Blower AC`}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:border-blue-400 outline-none"
                    />
                    <button onClick={() => removeFeature(idx)} className="p-2 rounded-lg text-red-400 hover:bg-red-50">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setEditing(null)}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !editing.name}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-bold shadow-md"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}

      {/* Grid Display */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                item.is_active ? "border-gray-200" : "border-gray-100 opacity-60"
              }`}
            >
              {item.image && (
                <div className="h-40 bg-gray-100 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  {item.tag && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  )}
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-gray-800 text-base">{item.name}</h4>
                  <div className="flex items-center text-xs text-gray-500 font-semibold bg-gray-100 px-2 py-0.5 rounded-md">
                    <Users2 className="w-3.5 h-3.5 mr-1 text-blue-500" />
                    <span>{item.capacity}</span>
                  </div>
                </div>
                <p className="text-sm font-extrabold text-emerald-600 mb-2">{item.price}</p>
                <div className="space-y-1 mb-3">
                  {item.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center text-xs text-gray-500">
                      <Shield className="w-3 h-3 text-blue-500 mr-1.5 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleToggleActive(item)}
                    className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                      item.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.is_active ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
                    {item.is_active ? "Aktif" : "Nonaktif"}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(item);
                      setIsNew(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="flex items-center justify-center p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                  >
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

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all"
      />
    </div>
  );
}
