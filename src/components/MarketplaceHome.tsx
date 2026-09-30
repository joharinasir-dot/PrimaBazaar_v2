import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  Utensils,
  Laptop,
  Shirt,
  Building,
  Star,
  Users,
  Award,
  Coffee,
  CheckCircle2,
  Percent,
  TrendingDown,
  FileCheck
} from 'lucide-react';
import { Product } from '../types';

interface MarketplaceHomeProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: 'pasar' | 'detail' | 'iklan' | 'sembang' | 'profil' | 'cobe') => void;
  onOpenCobeModal: () => void;
}

export const MarketplaceHome: React.FC<MarketplaceHomeProps> = ({
  products,
  onSelectProduct,
  onNavigate,
  onOpenCobeModal,
}) => {
  // Real countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 17, seconds: 57 });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHubFilter, setSelectedHubFilter] = useState<string>('all');
  const [recommendationFilter, setRecommendationFilter] = useState<'popular' | 'lowest_price'>('popular');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // Filter products for category and hub
  const filteredProducts = products.filter((prod) => {
    const categoryMatches = selectedCategory === 'all' || prod.category === selectedCategory;
    const hubMatches = selectedHubFilter === 'all' || prod.hub === selectedHubFilter;
    return categoryMatches && hubMatches;
  });

  // Sort daily recommendations
  const sortedRecommendations = [...filteredProducts].sort((a, b) => {
    if (recommendationFilter === 'lowest_price') {
      return a.price - b.price;
    }
    return b.reviewCount - a.reviewCount;
  });

  const flashSaleProducts = products.filter((p) => p.isFlashSale);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* 1. Hero Campaign Banner (Kempen Bazar Pagi Warga MP) */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#002B66] via-[#003882] to-[#001F4D] text-white p-5 sm:p-8 lg:p-10 shadow-lg overflow-hidden border border-blue-900/40">
        {/* Background decorative watermark graphic */}
        <div className="absolute right-3 -bottom-6 opacity-10 pointer-events-none select-none">
          <Utensils className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>KEMPEN BAZAR PAGI WARGA MP</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Sarapan Segar & Barangan Kru TV3, NSTP & REV Media
          </h1>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
            Serahan di Kafeteria Aras Bawah Sri Pentas & Lobi Balai Berita Bangsar. Bebas caj, 100% bayaran terus DuitNow QR rakan sekerja!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                const nasiLemak = products.find((p) => p.id === 'prod_nasi_lemak_kak_ani');
                if (nasiLemak) onSelectProduct(nasiLemak);
              }}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-[#002B66] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Terokai Bazar Hari Ini</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-blue-950/50 px-3 py-2 rounded-xl border border-blue-800/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>4 Tawaran Baru Ditambah Pagi Ini</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Highlight Promotion Cards (Khas Staf Sri Pentas & REV Media / NSTP) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Banner 1: Cafeteria & Nasi Bajet */}
        <div 
          onClick={() => {
            const nasiLemak = products.find((p) => p.id === 'prod_nasi_lemak_kak_ani');
            if (nasiLemak) onSelectProduct(nasiLemak);
          }}
          className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="text-[11px] font-extrabold tracking-wider uppercase opacity-90">
              KHAS STAF SRI PENTAS
            </div>
            <h3 className="text-base sm:text-lg font-bold leading-tight">
              Baucar Kafeteria & Nasi Bajet
            </h3>
            <p className="text-xs text-amber-100">
              Ambil terus di Kafe Aras 2 & 3
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Utensils className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Banner 2: Gajet IT & Pejabat */}
        <div 
          onClick={() => {
            const mxMaster = products.find((p) => p.id === 'prod_logitech_mx_master');
            if (mxMaster) onSelectProduct(mxMaster);
          }}
          className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#003882] to-[#002B66] text-white shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="text-[11px] font-extrabold tracking-wider uppercase text-blue-200">
              REV MEDIA & NSTP
            </div>
            <h3 className="text-base sm:text-lg font-bold leading-tight">
              Gajet IT & Peralatan Pejabat
            </h3>
            <p className="text-xs text-blue-200">
              Disahkan staf & bebas penipuan
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Laptop className="w-6 h-6 text-blue-200" />
          </div>
        </div>
      </div>

      {/* 3. Quick Action Circle Categories (8 circular icon pills) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-slate-200/80">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-2">
          {/* 1. Sarapan Kafe */}
          <button
            onClick={() => setSelectedCategory('makanan')}
            className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 group-hover:scale-105 transition-transform mb-1.5 shadow-2xs">
              <Coffee className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">Sarapan Kafe</span>
          </button>

          {/* 2. Jualan Kilat MP */}
          <button
            onClick={() => {
              const el = document.getElementById('flash-sale-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200 group-hover:scale-105 transition-transform mb-1.5 shadow-2xs">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">Jualan Kilat MP</span>
          </button>

          {/* 3. COD Sri Pentas */}
          <button
            onClick={() => setSelectedHubFilter('sri_pentas')}
            className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 group-hover:scale-105 transition-transform mb-1.5 shadow-2xs">
              <Building className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">COD Sri Pentas</span>
          </button>

          {/* 4. Balai Berita NSTP */}
          <button
            onClick={() => setSelectedHubFilter('balai_berita')}
            className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center border border-red-200 group-hover:scale-105 transition-transform mb-1.5 shadow-2xs">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">Balai Berita NSTP</span>
          </button>

          {/* 5. Pakaian Kru */}
          <button
            onClick={() => setSelectedCategory('pakaian')}
            className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 group-hover:scale-105 transition-transform mb-1.5 shadow-2xs">
              <Shirt className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">Pakaian Kru</span>
          </button>

          {/* 6. Gajet IT Pejabat */}
          <button
            onClick={() => setSelectedCategory('gajet')}
            className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-200 group-hover:scale-105 transition-transform mb-1.5 shadow-2xs">
              <Laptop className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">Gajet IT Pejabat</span>
          </button>

          {/* 7. Penjual Top Staf */}
          <button
            onClick={() => onNavigate('profil')}
            className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 group-hover:scale-105 transition-transform mb-1.5 shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">Penjual Top Staf</span>
          </button>

          {/* 8. Jaminan COBE */}
          <button
            onClick={onOpenCobeModal}
            className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-300 group-hover:scale-105 transition-transform mb-1.5 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">Jaminan COBE</span>
          </button>
        </div>
      </div>

      {/* 4. Flash Sale Section (⚡ JUALAN KILAT MEDIA PRIMA) */}
      <section id="flash-sale-section" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-extrabold text-slate-900 text-lg">
              <Flame className="w-5 h-5 text-orange-600 fill-orange-600" />
              <span>JUALAN KILAT MEDIA PRIMA</span>
            </div>

            {/* Countdown Clock Display */}
            <div className="flex items-center gap-1 font-mono text-xs font-bold">
              <span className="px-2 py-1 bg-slate-900 text-white rounded-md tabular-nums">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-slate-900 font-extrabold">:</span>
              <span className="px-2 py-1 bg-slate-900 text-white rounded-md tabular-nums">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-slate-900 font-extrabold">:</span>
              <span className="px-2 py-1 bg-blue-700 text-white rounded-md tabular-nums">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
          </div>

          <button 
            onClick={() => setSelectedCategory('all')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Tawaran</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Flash Sale Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {flashSaleProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
            >
              {/* Image with discount badge & location pin */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                {item.discountPct && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#ED1C24] text-white text-[11px] font-extrabold shadow-sm">
                    -{item.discountPct}%
                  </span>
                )}
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                      RM {item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                        RM {item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar / Remaining Stock */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-[#ED1C24] h-full rounded-full"
                      style={{ 
                        width: `${Math.max(15, Math.min(90, ((item.totalStock - item.stockLeft) / item.totalStock) * 100))}%` 
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-bold text-blue-900 tracking-wider text-right">
                    {item.flashSaleProgress || `TINGGAL ${item.stockLeft} UNIT`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Kategori Pasaran (Pilihan Lengkap Warga Media Prima) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-blue-100 text-blue-800">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">KATEGORI PASARAN</h3>
              <p className="text-[11px] text-slate-500">Pilihan Lengkap Warga Media Prima</p>
            </div>
          </div>

          {/* Location hub filter dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline font-medium">HAD SERAHAN:</span>
            <select
              value={selectedHubFilter}
              onChange={(e) => setSelectedHubFilter(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 shadow-2xs focus:outline-none focus:border-blue-600"
            >
              <option value="all">Semua Lokasi Serahan</option>
              <option value="sri_pentas">Sri Pentas (Bandar Utama)</option>
              <option value="balai_berita">Balai Berita (Bangsar)</option>
              <option value="rev_media">REV Media Hub (Aras 3)</option>
            </select>
          </div>
        </div>

        {/* 5 Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* All */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
              selectedCategory === 'all'
                ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="text-slate-400 font-mono text-sm">∞</span>
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Semua Barangan</div>
              <div className="text-[10px] text-slate-500">Semua Bahagian</div>
            </div>
          </button>

          {/* Makanan & Minuman */}
          <button
            onClick={() => setSelectedCategory('makanan')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
              selectedCategory === 'makanan'
                ? 'bg-amber-50/80 border-amber-600 ring-2 ring-amber-600/20'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <Utensils className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Makanan & Minuman</div>
              <div className="text-[10px] text-slate-500">Sarapan & Bakeri</div>
            </div>
          </button>

          {/* Elektronik & Gajet */}
          <button
            onClick={() => setSelectedCategory('gajet')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
              selectedCategory === 'gajet'
                ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <Laptop className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Elektronik & Gajet</div>
              <div className="text-[10px] text-slate-500">Aksesori & Komputer</div>
            </div>
          </button>

          {/* Pakaian & Kru TV */}
          <button
            onClick={() => setSelectedCategory('pakaian')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
              selectedCategory === 'pakaian'
                ? 'bg-purple-50/80 border-purple-600 ring-2 ring-purple-600/20'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <Shirt className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Pakaian & Kru TV</div>
              <div className="text-[10px] text-slate-500">Jaket & Baju Korporat</div>
            </div>
          </button>

          {/* Perabot & Pejabat */}
          <button
            onClick={() => setSelectedCategory('pejabat')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
              selectedCategory === 'pejabat'
                ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-600/20'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <Building className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Perabot & Pejabat</div>
              <div className="text-[10px] text-slate-500">Kerusi & Fail</div>
            </div>
          </button>
        </div>
      </section>

      {/* 6. Cadangan Harian Untuk Anda (Daily recommendations) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h3 className="font-extrabold text-slate-900 text-base">CADANGAN HARIAN UNTUK ANDA</h3>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setRecommendationFilter('popular')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                recommendationFilter === 'popular'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paling Popular
            </button>
            <button
              onClick={() => setRecommendationFilter('lowest_price')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                recommendationFilter === 'lowest_price'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Harga Rendah
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sortedRecommendations.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />

                {/* Editor or MPB Badge */}
                {item.isEditorPick && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-white text-[9px] font-extrabold uppercase shadow-2xs">
                    PILIHAN EDITOR
                  </span>
                )}
                {item.isMpbPick && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#ED1C24] text-white text-[9px] font-extrabold uppercase shadow-2xs">
                    PILIHAN WARGA MP
                  </span>
                )}

                {/* Location indicator */}
                <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[9px] flex items-center gap-1 font-medium">
                  <MapPin className="w-2.5 h-2.5 text-amber-400" />
                  <span className="truncate max-w-[120px]">{item.location}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>
                  {item.badge && (
                    <div className="mt-1 text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded inline-block">
                      {item.badge}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-[#002B66] font-mono tabular-nums leading-none">
                      RM {item.price.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {item.seller.nickname} • Terjual {item.reviewCount}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="pt-2 text-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-6 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            Lihat Lebih Banyak Barangan Media Prima
          </button>
        </div>
      </section>

      {/* 7. Media Prima Corporate Trust Badges (4 Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {/* Badge 1 */}
        <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200/60 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-slate-900">100% Staf Sah Media Prima</h5>
            <p className="text-[11px] text-slate-600 mt-0.5">SSO Microsoft Azure syarikat disahkan aktif</p>
          </div>
        </div>

        {/* Badge 2 */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-slate-900">COD Mesra Pejabat</h5>
            <p className="text-[11px] text-slate-600 mt-0.5">Serahan di lobi & kafeteria aras kerja</p>
          </div>
        </div>

        {/* Badge 3 */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-slate-900">Sifar Komisen Jualan</h5>
            <p className="text-[11px] text-slate-600 mt-0.5">DuitNow terus 100% kepada rakan sekerja</p>
          </div>
        </div>

        {/* Badge 4 */}
        <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/60 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-slate-900">Pematuhan Kod Etika (COBE)</h5>
            <p className="text-[11px] text-slate-600 mt-0.5">Dipantau integriti & sumber manusia</p>
          </div>
        </div>
      </div>
    </div>
  );
};
