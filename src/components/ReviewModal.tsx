import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Upload, 
  ShieldCheck, 
  CheckCircle2, 
  Camera,
  Trash2
} from 'lucide-react';
import { Seller, Review } from '../types';

interface ReviewModalProps {
  seller: Seller;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (reviewData: {
    rating: number;
    text: string;
    tags: string[];
    photo?: string;
  }) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  seller,
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState(
    'Alhamdulillah nasi lemak Kak Ani memang terbaik macam biasa! Sambal sotong cukup rasa pedas manis balance, bungkusan siap tanda nama elok kat kaunter kafe Sri Pentas. Penyelamat sarapan pagi sebelum live Berita 1:30! 🥰❤️'
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Sambal Padu & Sedap',
    'Serahan Tepat Masa',
    'Bungkusan Bersih & Kemas',
    'Mesra Rakan Sekerja',
  ]);
  const [hasPhoto, setHasPhoto] = useState(true);

  if (!isOpen) return null;

  const quickPraiseOptions = [
    { label: 'Sambal Padu & Sedap', icon: '🌶️' },
    { label: 'Serahan Tepat Masa', icon: '⏰' },
    { label: 'Bungkusan Bersih & Kemas', icon: '📦' },
    { label: 'Mesra Rakan Sekerja', icon: '🤗' },
    { label: 'Harga Berpatutan', icon: '💰' },
    { label: 'Komunikasi Pantas', icon: '💬' },
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getRatingDescriptor = (r: number) => {
    switch (r) {
      case 5:
        return '5.0 / 5.0 • Sangat Memuaskan! Sambal Padu & Sedap';
      case 4:
        return '4.0 / 5.0 • Memuaskan & Sedap';
      case 3:
        return '3.0 / 5.0 • Sederhana';
      case 2:
        return '2.0 / 5.0 • Kurang Memuaskan';
      case 1:
        return '1.0 / 5.0 • Perlu Penambahbaikan';
      default:
        return '5.0 / 5.0 • Cemerlang';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview({
      rating,
      text: reviewText,
      tags: selectedTags,
      photo: hasPhoto ? '/src/assets/images/nasi_lemak_sambal_sotong_1790743889517.jpg' : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>Beri Penilaian & Maklum Balas</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Sokong rakan sekerja anda dan bantu warga Media Prima memilih peniaga terbaik
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          {/* Target Seller Mini Card */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-2xs"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-xs truncate">
                  {seller.name} ({seller.nickname})
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-semibold">
                  TV3 Production
                </span>
              </div>
              <div className="text-[11px] text-slate-600 truncate mt-0.5">
                Nasi Lemak Sambal Sotong (Bungkus Daun Pisang) • RM 6.00
              </div>
              <div className="text-[10px] text-slate-500">
                📍 {seller.pickupLocation}
              </div>
            </div>
          </div>

          {/* Star Rating Center Box */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-center space-y-2">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Kualiti Keseluruhan Makanan & Khidmat
            </div>

            {/* Stars */}
            <div className="flex justify-center items-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                  className="p-1 text-slate-300 hover:scale-115 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                      (hoverRating || rating) >= s
                        ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Rating text */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-blue-200 text-xs font-semibold text-blue-900 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{getRatingDescriptor(rating)}</span>
            </div>
          </div>

          {/* Quick Praise Chips */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Pujian Cepat (Pilih mana-mana yang berkenaan)</span>
              <span className="text-[11px] text-slate-500">{selectedTags.length} dipilih</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPraiseOptions.map((opt) => {
                const isSelected = selectedTags.includes(opt.label);
                return (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => toggleTag(opt.label)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#002B66] text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span>{opt.icon}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">
                Ulasan Anda (Kongsi pengalaman bersama rakan sekerja)
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {reviewText.length}/300 aksara
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={300}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 text-xs text-slate-800 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all leading-relaxed"
              placeholder="Tulis ulasan anda mengenai rasa makanan, ketepatan masa, dan bungkusan..."
            />
          </div>

          {/* Photo Upload Attachment */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800">
              Tambah Foto Bungkusan / Makanan (Pilihan)
            </div>
            <div className="flex items-center gap-3">
              {hasPhoto ? (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-300 shadow-2xs group">
                  <img
                    src="/src/assets/images/nasi_lemak_sambal_sotong_1790743889517.jpg"
                    alt="Foto Makanan"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setHasPhoto(false)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-90 hover:opacity-100 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setHasPhoto(true)}
                className="flex-1 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-slate-600 hover:text-blue-700 bg-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4 text-slate-500" />
                <span>Muat Naik Foto Tambahan (Maksimum 3 keping JPG/PNG)</span>
              </button>
            </div>
          </div>

          {/* Integriti Notice */}
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-[11px] text-blue-900 leading-snug">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Integriti Warga MPB:</span> Ulasan ini dipaparkan kepada warga kerja Media Prima dengan nama & jabatan anda yang disahkan melalui <span className="font-semibold">Azure SSO</span> mengikut garis panduan Tatatertib & Tingkah Laku Perniagaan (COBE).
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Nanti Dahulu (Simpan Draf)
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#002B66] hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Hantar Penilaian & Ulasan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
