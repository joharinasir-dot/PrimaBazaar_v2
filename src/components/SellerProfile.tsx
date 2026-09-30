import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Award, 
  Utensils, 
  Heart, 
  ThumbsUp, 
  AlertTriangle, 
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { Seller, Review, Product } from '../types';

interface SellerProfileProps {
  seller: Seller;
  reviews: Review[];
  activeProducts: Product[];
  onBack: () => void;
  onOpenChat: () => void;
  onOpenReviewModal: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenCobeModal: () => void;
}

export const SellerProfile: React.FC<SellerProfileProps> = ({
  seller,
  reviews,
  activeProducts,
  onBack,
  onOpenChat,
  onOpenReviewModal,
  onSelectProduct,
  onOpenCobeModal,
}) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'products' | 'guidelines'>('reviews');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'food' | 'with_photo'>('all');
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});

  const toggleHelpful = (id: string) => {
    setHelpfulLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredReviews = reviews.filter((r) => {
    if (reviewFilter === 'with_photo') return !!r.photo;
    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200/80 pb-3">
        <button onClick={onBack} className="hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
          <span>Pasar Utama</span>
        </button>
        <span>/</span>
        <span>Warga Penjual Primeworks</span>
        <span>/</span>
        <span className="font-bold text-slate-900">{seller.name} ({seller.nickname})</span>
      </div>

      {/* Main Profile Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#002B66] via-[#003882] to-[#002352] text-white p-5 sm:p-7 shadow-md border border-blue-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Avatar and Bio */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/90 shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {seller.name}
                </h1>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-xs">
                  {seller.nickname}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {seller.statusText}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-blue-200 font-medium">
                {seller.role} • {seller.department}
              </p>

              <div className="flex items-center gap-3 text-xs text-blue-100 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {seller.location}
                </span>
                <span>•</span>
                <span>Ext: <strong>{seller.phoneExt}</strong></span>
                <span>•</span>
                <span className="font-mono text-blue-200">ID Kakitangan: {seller.ssoId}</span>
              </div>

              {/* Badges Row */}
              <div className="pt-2 flex items-center gap-2 flex-wrap text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-blue-900/80 border border-blue-400/30 text-blue-100 font-medium">
                  🏢 Warga MP {seller.yearsOfService} Tahun (Sejak 2012)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 font-medium">
                  🛡️ {seller.cobeCompliance}% Pematuhan COBE
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-400/40 text-amber-200 font-medium">
                  ⭐ Top Seller Kafe & Makanan Pagi
                </span>
              </div>
            </div>
          </div>

          {/* Right Box: Pickup Center & Quick Contact Buttons */}
          <div className="p-4 rounded-xl bg-blue-950/70 border border-blue-800/80 space-y-3 min-w-[280px]">
            <div>
              <div className="text-[10px] font-extrabold text-blue-300 uppercase tracking-wider">
                PUSAT SERAHAN RASMI (COD KAFE)
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                {seller.pickupLocation}
              </div>
              <div className="text-[11px] text-blue-200/80 mt-1 space-y-0.5">
                <div>• {seller.pickupTimeMorning}</div>
                <div>• {seller.pickupTimeNoon}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-800 flex items-center gap-2">
              <button
                onClick={onOpenChat}
                className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Sembang / Tempah</span>
              </button>

              <button
                onClick={() => alert('Nombor WhatsApp dalaman dibuka untuk urusan sarapan staf.')}
                className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Stats, Praises, Live Inventory, Media Units (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Integrity & Reviews Score Box */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Skor Integriti & Ulasan
              </h3>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                Warga Terverifikasi
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                {seller.satisfactionScore}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Berasaskan {seller.totalReviews} Ulasan Rakan Kerja daripada {seller.successfulSales} Jualan Berjaya
                </div>
              </div>
            </div>

            {/* Distribution bars */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 font-mono">5★</span>
                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-700 h-full rounded-full" style={{ width: '94%' }} />
                </div>
                <span className="w-6 text-right font-mono text-slate-400">79</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 font-mono">4★</span>
                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '5%' }} />
                </div>
                <span className="w-6 text-right font-mono text-slate-400">4</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 font-mono">3★</span>
                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '1%' }} />
                </div>
                <span className="w-6 text-right font-mono text-slate-400">1</span>
              </div>
            </div>

            {/* Quick performance indicators */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-center">
                <div className="text-[10px] text-slate-500">Masa Balasan</div>
                <div className="font-bold text-xs text-blue-900 mt-0.5">{seller.responseTime}</div>
                <div className="text-[9px] text-slate-400">98% pantas melalui sembang</div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center">
                <div className="text-[10px] text-slate-500">Pematuhan COBE</div>
                <div className="font-bold text-xs text-emerald-800 mt-0.5">100% Bersih</div>
                <div className="text-[9px] text-slate-400">Sifar rekod tatatertib</div>
              </div>
            </div>
          </div>

          {/* Pujian Warga Media Prima */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4 text-blue-700" />
                <span>Pujian Warga Media Prima</span>
              </h3>
              <span className="text-[10px] text-slate-400">Kekerapan</span>
            </div>

            <div className="space-y-1.5">
              {seller.praiseTags.map((praise, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <span>{praise.icon}</span>
                    <span>{praise.label}</span>
                  </span>
                  <span className="font-bold font-mono text-blue-800 px-1.5 py-0.2 rounded bg-blue-100/70 text-[11px]">
                    {praise.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stok Langsung di Kafe Widget */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span>Stok Langsung di Kafe</span>
              </div>
              <span className="text-[10px] text-amber-700">Kemas kini 15 minit lepas</span>
            </div>

            <div className="flex items-center gap-2.5">
              <img
                src="/src/assets/images/nasi_lemak_sambal_sotong_1790743889517.jpg"
                alt="Nasi Lemak"
                className="w-12 h-12 rounded-lg object-cover border border-amber-300"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs text-slate-900 truncate">
                  Nasi Lemak Sambal Sotong
                </div>
                <div className="text-[10px] text-slate-500">Bungkus Daun Pisang Panas</div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-bold text-xs text-[#002B66] font-mono">RM 6.50</span>
                  <span className="text-[10px] font-extrabold text-red-600">Tinggal 1 Sahaja!</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const nasiLemak = activeProducts.find((p) => p.id === 'prod_nasi_lemak_kak_ani');
                if (nasiLemak) onSelectProduct(nasiLemak);
              }}
              className="w-full py-2 bg-[#002B66] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Tempah Baki Terakhir Ini
            </button>
          </div>

          {/* Rangkaian Pelanggan Unit Media */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 text-xs">
              Rangkaian Pelanggan Unit Media
            </h4>
            <p className="text-[11px] text-slate-500">
              Kak Ani kerap membuat penyerahan pesanan terus kepada rakan sekerja dari unit-unit berikut:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {seller.mediaUnits.map((unit, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                  {unit}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Sections (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Main Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-[#002B66] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Semua Ulasan ({reviews.length})
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#002B66] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Iklan Aktif Kak Ani ({activeProducts.length})
              </button>

              <button
                onClick={() => setActiveTab('guidelines')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'guidelines'
                    ? 'bg-[#002B66] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Garis Panduan COD & Penyerahan
              </button>
            </div>

            <button
              onClick={onOpenReviewModal}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
            >
              + Beri Ulasan Kak Ani
            </button>
          </div>

          {/* Tab 1: Reviews List */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Filter chips */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">TAPIS:</span>
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                      reviewFilter === 'all' ? 'bg-blue-100 text-blue-900' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Semua ({reviews.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('with_photo')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                      reviewFilter === 'with_photo' ? 'bg-blue-100 text-blue-900' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Dengan Gambar Foto (24)
                  </button>
                </div>

                <span className="text-[11px] text-slate-400">Susun: Terkini Dahulu</span>
              </div>

              {/* Reviews Items */}
              <div className="space-y-3">
                {filteredReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=80'}
                          alt={rev.authorName}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                        />
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                            <span>{rev.authorName}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {rev.authorRole} • {rev.authorLocation}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-amber-400 justify-end">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>

                    {/* Item purchased badge */}
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900 font-medium">
                      <span>Barangan Dibeli: <strong>{rev.itemPurchased}</strong></span>
                      <span>•</span>
                      <span className="font-mono font-bold">RM {rev.itemPrice.toFixed(2)} ({rev.paymentMethod})</span>
                    </div>

                    {/* Review text */}
                    <p className="text-xs text-slate-700 leading-relaxed">
                      "{rev.text}"
                    </p>

                    {/* Attached Photo */}
                    {rev.photo && (
                      <div className="w-32 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                        <img
                          src={rev.photo}
                          alt="Foto Ulasan"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Seller Reply Box */}
                    {rev.reply && (
                      <div className="p-3 rounded-xl bg-slate-50 border-l-4 border-blue-600 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-blue-900 flex items-center gap-1">
                            <span>{rev.reply.authorName}</span>
                            <span className="px-1.5 py-0.2 rounded bg-blue-200 text-blue-900 text-[9px] font-extrabold uppercase">
                              {rev.reply.role}
                            </span>
                          </span>
                          <span className="text-slate-400 text-[10px]">{rev.reply.time}</span>
                        </div>
                        <p className="text-slate-600 italic">
                          "{rev.reply.text}"
                        </p>
                      </div>
                    )}

                    {/* Helpful count */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <button
                        onClick={() => toggleHelpful(rev.id)}
                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                          helpfulLiked[rev.id] ? 'text-blue-700 font-bold' : 'hover:text-slate-800'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Membantu ({rev.helpfulCount + (helpfulLiked[rev.id] ? 1 : 0)} Warga MP)</span>
                      </button>
                      <span className="hover:text-blue-700 cursor-pointer">Balas</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Products List */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px]">
                      {prod.location}
                    </span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2">
                        {prod.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {prod.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-base font-extrabold text-[#002B66] font-mono">
                        RM {prod.price.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-blue-700">Lihat Menu &gt;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Guidelines */}
          {activeTab === 'guidelines' && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 text-xs text-slate-700">
              <h3 className="font-bold text-slate-900 text-sm">
                Prosedur Pengambilan Nasi Lemak & Makanan Kak Ani
              </h3>
              <ul className="space-y-2 list-disc list-inside text-slate-600 leading-relaxed">
                <li>Bungkusan nasi lemak disediakan setiap pagi hari bekerja (Isnin hingga Khamis) jam 8:00 PG.</li>
                <li>Sila ambil bungkusan yang telah siap berlabel nama anda di Kaunter Minuman Kafeteria Aras Bawah Sri Pentas.</li>
                <li>Bayaran melalui DuitNow QR amat digalakkan sebelum waktu penyerahan untuk melicinkan operasi kaunter.</li>
                <li>Bagi tempahan pukal atau mesyuarat jabatan (10 bungkus ke atas), sila hubungi sambungan 8421 sekurang-kurangnya 1 hari sebelum.</li>
              </ul>
            </div>
          )}

          {/* Bottom Trust Banner */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#002B66] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="font-bold text-slate-900">
                  Jaminan Komuniti Selamat & Integriti PrimaBazaar
                </div>
                <div className="text-[11px] text-slate-600">
                  Semua transaksi dilindungi oleh Dasar Sumber Manusia MPB dan Kod Etika Kerja (COBE).
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCobeModal}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs cursor-pointer"
              >
                Aduan Etika COBE
              </button>
              <button
                onClick={() => alert('Menghubungkan ke talian HR Helpdesk Media Prima (Ext: 8888)...')}
                className="px-3 py-1.5 rounded-lg bg-[#002B66] hover:bg-blue-900 text-white font-semibold text-xs cursor-pointer"
              >
                Bantuan HR Prima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
