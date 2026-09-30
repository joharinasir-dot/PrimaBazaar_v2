import React, { useState } from 'react';
import { 
  ChevronRight, 
  Bookmark, 
  Share2, 
  MapPin, 
  Clock, 
  Thermometer, 
  Package, 
  Star, 
  CheckCircle2, 
  Plus, 
  Minus, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  Building, 
  FileText, 
  Sparkles, 
  Utensils,
  ExternalLink,
  ChevronLeft,
  Navigation
} from 'lucide-react';
import { Product, Review } from '../types';

interface ProductDetailProps {
  product: Product;
  reviews: Review[];
  onBack: () => void;
  onOpenDuitNow: (product: Product, quantity: number, addOns: string[], total: number) => void;
  onOpenChat: (product: Product) => void;
  onOpenSellerProfile: () => void;
  onOpenReviewModal: () => void;
  onOpenCafeteriaMap: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  reviews,
  onBack,
  onOpenDuitNow,
  onOpenChat,
  onOpenSellerProfile,
  onOpenReviewModal,
  onOpenCafeteriaMap,
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [specialNote, setSpecialNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Calculate pricing with add-ons
  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const found = product.addOns?.find((a) => a.id === addOnId);
    return sum + (found ? found.price : 0);
  }, 0);

  const unitTotal = product.price + addOnsTotal;
  const grandTotal = unitTotal * quantity;

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button 
            onClick={onBack}
            className="hover:text-blue-700 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Laman Utama</span>
          </button>
          <span>/</span>
          <span className="hover:text-slate-800">{product.categoryLabel}</span>
          <span>/</span>
          <span className="hover:text-slate-800">Sarapan Pagi</span>
          <span>/</span>
          <span className="font-bold text-slate-900 truncate max-w-[200px]">{product.title}</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Baki Pesanan Pagi: {product.stockLeft} Bungkus Sahaja</span>
          </div>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-1 font-medium transition-colors cursor-pointer ${
              isSaved ? 'text-amber-600 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
            <span>{isSaved ? 'Disimpan' : 'Simpan Iklan'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery, Story, Contents, Floor Plan, Reviews (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Photo Card */}
          <div className="space-y-3">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Badges on top */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
                  Masak Segar Pagi Ini [5:30 PG]
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[11px] font-extrabold uppercase shadow-xs">
                  {product.badge || 'Paling Laris di Sri Pentas'}
                </span>
              </div>

              {/* Bottom bar on image */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-white flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Kakitangan Media Prima Berhad Sah</span>
                </div>
                <div className="font-mono text-slate-300">
                  ID Iklan: {product.adId}
                </div>
              </div>
            </div>

            {/* Thumbnails row */}
            <div className="flex items-center gap-2.5">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIdx === idx
                      ? 'border-blue-700 ring-2 ring-blue-100 scale-102'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              <button
                onClick={onOpenSellerProfile}
                className="w-24 h-16 rounded-xl border border-dashed border-blue-300 bg-blue-50/60 hover:bg-blue-100 text-blue-800 text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-blue-600" />
                <span>Dapur Kak Ani</span>
              </button>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                Staf TV3 Production
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                Halal 100% Muslim Warga MPB
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Kadar Kepuasan</div>
              <div className="text-base font-extrabold text-amber-500 flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating} / 5.0</span>
              </div>
              <div className="text-[10px] text-slate-400">{product.reviewCount} Ulasan Rakan</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Waktu Ambilan</div>
              <div className="text-xs font-bold text-slate-900 mt-1">
                8:00 – 9:30 PG
              </div>
              <div className="text-[10px] text-slate-400">Sebelum Siaran Berita</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Status Suhu</div>
              <div className="text-xs font-bold text-emerald-700 mt-1 flex items-center justify-center gap-1">
                <Thermometer className="w-3.5 h-3.5" />
                <span>Masih Suam</span>
              </div>
              <div className="text-[10px] text-slate-400">Bekas Thermal Bag</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Penyediaan</div>
              <div className="text-xs font-bold text-blue-900 mt-1">
                Terhad 30 Pkt
              </div>
              <div className="text-[10px] text-slate-400">Eksklusif Sri Pentas</div>
            </div>
          </div>

          {/* Kisah Resipi & Jaminan Kualiti Makanan */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Kisah Resipi & Jaminan Kualiti Makanan</span>
            </h3>

            <div className="text-xs text-slate-600 leading-relaxed space-y-2.5 whitespace-pre-line">
              {product.recipeStory}
            </div>

            {/* Contents checklist */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                KANDUNGAN 1 BUNGKUSAN LENGKAP:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.contents?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons checkboxes */}
            {product.addOns && product.addOns.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="text-xs font-bold text-slate-800">
                  Pilihan Tambahan (Add-Ons Kakitangan):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.addOns.map((addOn) => {
                    const isChecked = selectedAddOns.includes(addOn.id);
                    return (
                      <button
                        type="button"
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-blue-50/80 border-blue-600 text-blue-900 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{addOn.label}</span>
                        </div>
                        <span className="font-mono text-blue-700 font-bold">
                          +RM {addOn.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Lokasi Penyerahan Sah Warga & Floor Plan */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                  LOKASI PENYERAHAN SAH WARGA
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>Kafeteria Aras Bawah Sri Pentas</span>
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 font-bold text-[10px]">
                Zon Pengambilan A1
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Sila ambil bungkusan yang telah siap berlabel nama anda di <strong className="text-slate-800">Meja Sudut Kaunter Minuman Panas (bersebelahan Kaunter Kopi Pak Ali)</strong>. Kak Ani atau wakil unit produksi berada di lokasi dari 8:00 PG hingga 9:30 PG sebelum persiapan konti bermula.
            </p>

            {/* Clickable Floor Plan Preview Container */}
            <div 
              onClick={onOpenCafeteriaMap}
              className="relative rounded-xl overflow-hidden border border-slate-300 bg-slate-900 p-4 text-white shadow-2xs hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                <span className="font-semibold">Pelan Tapak Kafeteria Sri Pentas (Bandar Utama)</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Titik Ambilan Aktif Pagi Ini
                </span>
              </div>

              {/* Floor Plan Diagram Box */}
              <div className="grid grid-cols-12 gap-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-[10px]">
                <div className="col-span-5 space-y-2">
                  <div className="p-1.5 rounded bg-slate-700/80 text-center font-medium text-slate-300">
                    Pintu Lobi Utama / Pintu Pusing
                  </div>
                  <div className="p-2 rounded bg-slate-700/50 text-center text-slate-400">
                    Meja Makan Krew A
                  </div>
                  <div className="p-2 rounded bg-slate-700/50 text-center text-slate-400">
                    Meja Makan Krew B
                  </div>
                </div>

                <div className="col-span-7 flex flex-col justify-between">
                  <div className="flex gap-2">
                    <div className="p-1.5 flex-1 rounded bg-slate-700/40 text-center text-slate-400">
                      Gerai Mee Tarik
                    </div>
                    <div className="p-1.5 flex-1 rounded bg-slate-700/40 text-center text-slate-400">
                      Nasi Campur Kak Yam
                    </div>
                  </div>

                  {/* Golden Target Box */}
                  <div className="mt-2 p-2.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-600/30 border border-amber-400 text-center space-y-0.5">
                    <div className="font-extrabold text-amber-300 text-[11px]">
                      Kaunter Air Panas
                    </div>
                    <div className="text-[10px] font-bold text-white uppercase tracking-wider">
                      ★ MEJA SERAHAN KAK ANI ★
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Prompt */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-blue-300 transition-colors">
                <span className="flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-blue-400" />
                  <span>Klik untuk besarkan pelan tapak berinteraktif</span>
                </span>
                <span className="font-bold text-blue-400">Buka Pelan &gt;</span>
              </div>
            </div>
          </div>

          {/* Maklum Balas Rakan Sekerja (Reviews) Preview */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Maklum Balas Rakan Sekerja
                </h3>
                <p className="text-[11px] text-slate-500">
                  Disahkan daripada emel rasmi @mediaprima.com.my
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-extrabold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5 (84 Penilaian)</span>
                </div>
              </div>
            </div>

            {/* List of Reviews */}
            <div className="space-y-3">
              {reviews.slice(0, 3).map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-xs">
                        {rev.authorName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                          <span>{rev.authorName}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {rev.authorRole} • {rev.authorLocation}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{rev.text}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                    <span>{rev.date} • {rev.pickupLocation}</span>
                    <span>{rev.helpfulCount} rakan menyokong</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={onOpenReviewModal}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
              >
                + Beri Penilaian Baru
              </button>

              <button
                onClick={onOpenSellerProfile}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
              >
                Lihat Semua 84 Ulasan Lengkap &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Contiguous Purchase Box (5 cols on desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-5">
            {/* Price section */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#002B66] font-mono tabular-nums">
                  RM {product.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500">/ satu bungkusan</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Jimat ~RM2.50 berbanding kafeteria luar sekitar Bandar Utama</span>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Kuantiti Bungkusan:</span>
                <span className="text-amber-600 font-semibold text-[11px]">
                  Tinggal {product.stockLeft} bungkus shj
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-extrabold font-mono text-slate-900 w-6 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stockLeft, quantity + 1))}
                    disabled={quantity >= product.stockLeft}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Jumlah Perkiraan:</div>
                  <div className="text-base font-extrabold text-[#002B66] font-mono tabular-nums">
                    RM {grandTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Special request note */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Nota Pesanan / Permintaan Khas:</span>
                <span className="text-[10px] text-slate-400 font-normal">Pilihan</span>
              </label>
              <textarea
                rows={2}
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="Cth: Sambal kurangkan pedas, tulis nama: Haziq Bilik Edit 4"
                className="w-full p-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-100 outline-none"
              />
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-1">
              {/* Primary CTA: DuitNow */}
              <button
                onClick={() => onOpenDuitNow(product, quantity, selectedAddOns, grandTotal)}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Bayar Terus via DuitNow QR (RM {grandTotal.toFixed(2)})</span>
              </button>

              {/* Secondary CTA: Sembang */}
              <button
                onClick={() => onOpenChat(product)}
                className="w-full py-2.5 px-4 bg-[#002B66] hover:bg-[#001D47] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Bincang & Tempah Melalui Pesanan Dalaman</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Pesanan ditutup automatik jam 8:45 PG atau setelah kuota 30 habis.</span>
            </div>

            {/* Penjual Disahkan Warga Media Prima Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px]">
                  PENJUAL DISAHKAN WARGA MEDIA PRIMA
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  SSO Aktif
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-slate-900 truncate">
                    {product.seller.name} ({product.seller.nickname})
                  </div>
                  <div className="text-[11px] text-slate-600 truncate">
                    {product.seller.role}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    🏢 {product.seller.location} • Ext: {product.seller.phoneExt}
                  </div>
                </div>
              </div>

              {/* Staff Credentials Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-lg border border-slate-200/80">
                <div>
                  <span className="text-slate-400 text-[10px] block">No. Kakitangan SSO:</span>
                  <span className="font-bold text-slate-800 font-mono">{product.seller.ssoId}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Masa Balasan Sembang:</span>
                  <span className="font-bold text-emerald-700">{product.seller.responseTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Tempoh Perkhidmatan:</span>
                  <span className="font-bold text-slate-800">{product.seller.yearsOfService} Tahun di MPB</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Pematuhan COBE:</span>
                  <span className="font-bold text-emerald-700">{product.seller.cobeCompliance}% Sah Disemak</span>
                </div>
              </div>

              <button
                onClick={onOpenSellerProfile}
                className="w-full text-center text-xs font-bold text-blue-700 hover:text-blue-900 pt-1 cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Lihat 4 Menu Lain Dari {product.seller.nickname}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Jaminan Komuniti PrimaBazaar MPB Card */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs space-y-1.5 text-blue-950">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Jaminan Komuniti PrimaBazaar MPB</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Semua transaksi tertakluk kepada Kod Etika & Tingkah Laku Media Prima Berhad (COBE). Platform ini adalah kemudahan komuniti dalaman tanpa komisen luar demi menyokong ukhuwah dan kemudahan rakan sekerja.
              </p>
              <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Sifar Komisen Pihak Ketiga
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Semakan HR Terpelihara
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
