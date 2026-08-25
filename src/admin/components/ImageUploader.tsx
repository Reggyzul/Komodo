import React, { useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ currentImage, onImageChange, label = "Gambar" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar yang diizinkan (JPG, PNG, WebP)");
      return;
    }
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("cms-images")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("cms-images").getPublicUrl(fileName);
      onImageChange(data.publicUrl);
    } catch (e: any) {
      setError(`Upload gagal: ${e.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleUrlInput = (url: string) => {
    onImageChange(url);
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>

      {/* Preview */}
      {currentImage && (
        <div className="relative group">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl border border-gray-200 bg-gray-100"
            onError={(e) => {
              // Hide broken image; show the container background instead
              (e.target as HTMLImageElement).style.display = "none";
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                parent.classList.add("flex", "items-center", "justify-center");
                const msg = document.createElement("span");
                msg.className = "text-gray-400 text-xs font-medium";
                msg.textContent = "Gambar tidak dapat dimuat";
                parent.appendChild(msg);
              }
            }}
          />
          <div className="absolute inset-0 bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-xs font-medium bg-black/60 px-3 py-1.5 rounded-lg">
              Klik area bawah untuk ganti gambar
            </span>
          </div>
          <button
            type="button"
            onClick={() => onImageChange("")}
            className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload area */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-blue-600">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-medium">Mengupload gambar...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Upload className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">Klik atau seret gambar ke sini</p>
              <p className="text-[10px] text-gray-400 mt-0.5">JPG, PNG, WebP — Maks 5MB</p>
            </div>
          </div>
        )}
      </div>

      {/* URL input as alternative */}
      <div className="flex items-center gap-2">
        <ImageIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={currentImage}
          onChange={(e) => handleUrlInput(e.target.value)}
          placeholder="Atau masukkan URL gambar langsung..."
          className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none text-gray-600 bg-gray-50"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}
