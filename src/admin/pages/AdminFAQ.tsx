import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Plus, Pencil, Trash2, X, Save, Loader2, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  id: string; question: string; en_question: string;
  answer: string; en_answer: string; sort_order: number; is_active: boolean;
}

const empty: Omit<FAQ, "id"> = {
  question: "", en_question: "", answer: "", en_answer: "", sort_order: 0, is_active: true,
};

type Toast = { type: "success" | "error"; message: string };

export default function AdminFAQ() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const showToast = (type: Toast["type"], message: string) => {
    setToast({ type, message }); setTimeout(() => setToast(null), 3500);
  };

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
    if (!error && data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) {
        const { error } = await supabase.from("faqs").insert({ ...editing, id: `faq-${Date.now()}` });
        if (error) throw error;
      } else {
        const { id, ...rest } = editing;
        const { error } = await supabase.from("faqs").update({ ...rest, updated_at: new Date().toISOString() }).eq("id", id);
        if (error) throw error;
      }
      showToast("success", isNew ? "FAQ ditambahkan! 🎉" : "FAQ disimpan! ✅");
      setEditing(null); await fetchItems();
    } catch (e: any) { showToast("error", `Gagal: ${e.message}`); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) showToast("error", `Gagal: ${error.message}`);
    else { showToast("success", "FAQ dihapus."); await fetchItems(); }
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
              <div><h3 className="font-bold text-gray-800">Hapus FAQ?</h3></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Batal</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold">Hapus</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-gray-800">Pertanyaan (FAQ)</h2><p className="text-xs text-gray-400">{items.length} pertanyaan</p></div>
        <button onClick={() => { setEditing({ ...empty, id: "" }); setIsNew(true); }}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md">
          <Plus className="w-4 h-4" /><span>Tambah FAQ</span>
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-2xl border border-sky-200 shadow-lg p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800">{isNew ? "➕ Tambah FAQ" : "✏️ Edit FAQ"}</h3>
            <button onClick={() => setEditing(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Pertanyaan (ID)" value={editing.question} onChange={(v) => setEditing({ ...editing, question: v })} required />
            <Field label="Pertanyaan (EN)" value={editing.en_question} onChange={(v) => setEditing({ ...editing, en_question: v })} />
            <Field label="Urutan Tampil" value={String(editing.sort_order)} onChange={(v) => setEditing({ ...editing, sort_order: parseInt(v) || 0 })} type="number" />
            <div />
            <TextArea label="Jawaban (ID)" value={editing.answer} onChange={(v) => setEditing({ ...editing, answer: v })} />
            <TextArea label="Jawaban (EN)" value={editing.en_answer} onChange={(v) => setEditing({ ...editing, en_answer: v })} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEditing(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm">Batal</button>
            <button onClick={handleSave} disabled={saving || !editing.question}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 text-white text-sm font-bold">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-sky-500" /></div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={item.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${item.is_active ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
              <button
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                <span className="flex-1 font-semibold text-sm text-gray-800">{item.question}</span>
                {expanded === item.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expanded === item.id && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 mb-3">{item.answer}</p>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditing(item); setIsNew(false); }}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold">
                      <Pencil className="w-3 h-3" /> Edit
                    </button>
                    <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
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
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-sky-400 focus:ring-1 focus:ring-sky-100 outline-none transition-all" />
    </div>
  );
}
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-sky-400 outline-none resize-none transition-all" />
    </div>
  );
}
