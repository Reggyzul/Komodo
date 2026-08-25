import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ImageUploader from "../components/ImageUploader";
import { Save, Loader2, RefreshCw, CheckCircle } from "lucide-react";

interface SettingRow { key: string; value: string; value_en: string; }

const SETTING_LABELS: Record<string, { label: string; labelEn?: string; hint?: string; type?: string }> = {
  whatsapp_number: { label: "Nomor WhatsApp (tanpa +)", hint: "cth: 6282144428975", type: "tel" },
  hero_title_id: { label: "Judul Hero (ID)", hint: "Bagian pertama sebelum nama brand" },
  hero_title_en: { label: "Judul Hero (EN)" },
  hero_subtitle_id: { label: "Subtitle Hero (ID)" },
  hero_subtitle_en: { label: "Subtitle Hero (EN)" },
  hero_bg_image: { label: "Gambar Latar Hero", type: "image" },
  company_name: { label: "Nama Perusahaan", hint: "Tampil di navbar dan footer" },
  company_tagline_id: { label: "Tagline Perusahaan (ID)" },
  company_tagline_en: { label: "Tagline Perusahaan (EN)" },
};

type Toast = { type: "success" | "error"; message: string };

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, SettingRow>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());

  const showToast = (type: Toast["type"], message: string) => {
    setToast({ type, message }); setTimeout(() => setToast(null), 3000);
  };

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("site_settings").select("*");
    if (!error && data) {
      const map: Record<string, SettingRow> = {};
      data.forEach((row) => { map[row.key] = row; });
      // Ensure all known keys exist
      Object.keys(SETTING_LABELS).forEach((key) => {
        if (!map[key]) map[key] = { key, value: "", value_en: "" };
      });
      setSettings(map);
    }
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSave = async (key: string) => {
    const row = settings[key];
    if (!row) return;
    setSaving(key);
    try {
      const { error } = await supabase.from("site_settings").upsert({
        key, value: row.value, value_en: row.value_en, updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      setSavedKeys((prev) => new Set([...prev, key]));
      setTimeout(() => setSavedKeys((prev) => { const next = new Set(prev); next.delete(key); return next; }), 2000);
      showToast("success", "Disimpan! ✅");
    } catch (e: any) { showToast("error", `Gagal: ${e.message}`); }
    finally { setSaving(null); }
  };

  const updateSetting = (key: string, field: "value" | "value_en", val: string) => {
    setSettings((prev) => ({ ...prev, [key]: { ...prev[key], [field]: val } }));
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;
  }

  return (
    <div className="space-y-5">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-gray-800">Pengaturan Website</h2><p className="text-xs text-gray-400">Ubah teks dan konten global website</p></div>
        <button onClick={fetchSettings} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-xs font-medium px-3 py-2 rounded-xl hover:bg-gray-100 border border-gray-200">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(SETTING_LABELS).map(([key, meta]) => {
          const row = settings[key];
          if (!row) return null;
          const isSaving = saving === key;
          const isSaved = savedKeys.has(key);

          return (
            <div key={key} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{meta.label}</h3>
                  {meta.hint && <p className="text-xs text-gray-400 mt-0.5">{meta.hint}</p>}
                </div>
                <button
                  onClick={() => handleSave(key)}
                  disabled={isSaving}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSaved
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  }`}
                >
                  {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : isSaved ? <CheckCircle className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                  {isSaved ? "Tersimpan" : "Simpan"}
                </button>
              </div>

              {meta.type === "image" ? (
                <ImageUploader
                  currentImage={row.value}
                  onImageChange={(url) => updateSetting(key, "value", url)}
                  label=""
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">🇮🇩 Indonesia</label>
                    {row.value.length > 80 ? (
                      <textarea
                        value={row.value}
                        onChange={(e) => updateSetting(key, "value", e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-blue-400 outline-none resize-none transition-all"
                      />
                    ) : (
                      <input
                        type={meta.type || "text"}
                        value={row.value}
                        onChange={(e) => updateSetting(key, "value", e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all"
                      />
                    )}
                  </div>
                  {key !== "whatsapp_number" && (
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">🇬🇧 English</label>
                      {row.value_en.length > 80 ? (
                        <textarea
                          value={row.value_en}
                          onChange={(e) => updateSetting(key, "value_en", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-blue-400 outline-none resize-none transition-all"
                        />
                      ) : (
                        <input
                          type={meta.type || "text"}
                          value={row.value_en}
                          onChange={(e) => updateSetting(key, "value_en", e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all"
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
