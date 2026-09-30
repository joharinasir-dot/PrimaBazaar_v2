import React, { useState } from 'react';
import { 
  Upload, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Utensils, 
  Shirt, 
  Laptop, 
  Home, 
  FileText, 
  DollarSign, 
  MapPin, 
  Clock, 
  Eye, 
  Save, 
  Send,
  Bold,
  Italic,
  List,
  AlertCircle
} from 'lucide-react';
import { User, Product } from '../types';

interface PublishListingProps {
  currentUser: User;
  onPublishSuccess: (newProduct: Product) => void;
  onPreview: (productData: Partial<Product>) => void;
}

export const PublishListing: React.FC<PublishListingProps> = ({
  currentUser,
  onPublishSuccess,
  onPreview,
}) => {
  const [title, setTitle] = useState('Jaket Krew Media Prima TV3 (Edisi Khas) Saiz L');
  const [category, setCategory] = useState<'pakaian' | 'makanan' | 'gajet' | 'pejabat'>('pakaian');
  const [condition, setCondition] = useState<'10/10' | '9/10' | '7/10'>('9/10');
  const [description, setDescription] = useState(
    'Kain tahan lasak dan berbau segar kedai, dilepaskan sebab terlebih saiz (terbeli semasa karnival penyiaran).\n\nSpesifikasi:\n- Saiz: L (Ukuran Dada 42–44 inci)\n- Material: Poliester kalis angin (Windbreaker) dengan sulaman benang perak TV3\n- Sesuai untuk krew lapangan OB Van atau tugasan bilik berhawa dingin sejuk'
  );
  const [price, setPrice] = useState('85.00');
  const [negotiable, setNegotiable] = useState(true);
  const [acceptDuitNow, setAcceptDuitNow] = useState(true);
  const [acceptCod, setAcceptCod] = useState(true);
  const [hub, setHub] = useState('sri_pentas');
  const [specificLocation, setSpecificLocation] = useState('Kafeteria Aras Bawah (Bersebelahan Kaunter Minuman)');
  const [pickupHours, setPickupHours] = useState('08:30 Pagi hingga 06:00 Petang (Hari Bekerja)');
  const [conciergeLobby, setConciergeLobby] = useState(true);
  const [cobeAgreement, setCobeAgreement] = useState(true);
  const [photos, setPhotos] = useState<string[]>([
    '/src/assets/images/jaket_krew_tv3_1790743939062.jpg',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, idx) => idx !== index));
  };

  const handleAddSamplePhoto = () => {
    setPhotos([...photos, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Sila masukkan tajuk iklan barangan.');
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setErrorMsg('Sila masukkan harga jualan yang sah.');
      return;
    }
    if (!cobeAgreement) {
      setErrorMsg('Sila tandakan pengesahan pematuhan integriti (COBE).');
      return;
    }

    setIsSubmitting(true);

    const newProd: Product = {
      id: `prod_${Date.now()}`,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category,
      categoryLabel: category === 'pakaian' ? 'Pakaian & Kru TV' : category === 'makanan' ? 'Makanan & Minuman' : category === 'gajet' ? 'Elektronik & Gajet' : 'Perabot & Pejabat',
      price: parseFloat(price),
      unitLabel: category === 'pakaian' ? 'helai' : 'unit',
      stockLeft: 1,
      totalStock: 1,
      location: hub === 'sri_pentas' ? 'Sri Pentas Bandar Utama' : 'Balai Berita Bangsar',
      hub: hub as any,
      images: photos.length > 0 ? photos : ['/src/assets/images/jaket_krew_tv3_1790743939062.jpg'],
      seller: {
        id: currentUser.id,
        name: currentUser.name,
        nickname: currentUser.name.split(' ')[0],
        avatar: currentUser.avatar,
        role: currentUser.role,
        department: currentUser.department,
        location: currentUser.location,
        phoneExt: currentUser.phoneExt,
        ssoId: currentUser.ssoId,
        yearsOfService: 8,
        cobeCompliance: 100,
        isTopSeller: true,
        statusText: 'Aktif di Pejabat Hari Ini',
        isActiveToday: true,
        responseTime: '< 5 Minit',
        pickupLocation: specificLocation,
        pickupTimeMorning: pickupHours,
        pickupTimeNoon: '12:30 PTG – 02:00 PTG',
        satisfactionScore: 5.0,
        totalReviews: 48,
        successfulSales: 48,
        ratingDistribution: { 5: 48, 4: 0, 3: 0, 2: 0, 1: 0 },
        praiseTags: [
          { label: 'Serahan Tepat Masa', count: 42, icon: '⏰' },
          { label: 'Mesra Rakan Sekerja', count: 39, icon: '🤗' },
        ],
        mediaUnits: ['Bilik Berita TV3', 'NSTP Balai Berita'],
      },
      rating: 5.0,
      reviewCount: 1,
      badge: 'BARU DITERBITKAN',
      waktuAmbilan: pickupHours,
      statusSuhu: 'Kondisi ' + condition,
      penyediaan: 'Sedia Untuk Diambil',
      description,
      contents: [title, 'Beg Pelindung Rasmi MPB'],
      tags: ['Kakitangan MPB', condition, 'SSO Verified'],
      floorPlanArea: specificLocation,
      adId: `#MPB-CL-2025-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onPublishSuccess(newProd);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* 1. Verified Seller Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#002B66] via-[#003882] to-[#002B66] text-white p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-2xs"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-[#002B66]"></span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm sm:text-base leading-tight">
                {currentUser.name}
              </h2>
              <span className="font-mono text-[10px] bg-blue-900/80 px-2 py-0.5 rounded text-blue-200">
                ID: {currentUser.ssoId}
              </span>
            </div>
            <p className="text-xs text-blue-200">
              {currentUser.role} • {currentUser.department} ({currentUser.location})
            </p>
            <div className="flex items-center gap-3 text-[11px] text-blue-100/90 pt-0.5 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                SSO Azure AD Aktif
              </span>
              <span>•</span>
              <span>{currentUser.transactionsCompleted} Transaksi Selamat</span>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-100 text-xs font-semibold self-start sm:self-center">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>STATUS: Disahkan PrimaBazaar</span>
        </div>
      </div>

      {/* Stepper progress indicator */}
      <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[11px]">
            1
          </div>
          <div>
            <div className="font-bold text-slate-900">Pendaftaran Iklan Pantas</div>
            <div className="text-[11px] text-slate-500">Lengkapkan 5 bahagian telus untuk paparan rakan sekerja</div>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[11px] text-slate-500">Kelajuan Penyiaran: </span>
          <span className="font-bold text-emerald-700">Serta-merta (Live Feed)</span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Muat Naik Gambar Barangan */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                1
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Muat Naik Gambar Barangan</h3>
                <p className="text-[11px] text-slate-500">
                  Minimum 1 foto diperlukan. Format dibenarkan: JPG, PNG, WEBP (Maksimum 5MB setiap imej).
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-xs font-semibold">
              {photos.length}/5 Gambar
            </span>
          </div>

          {/* Tip callout */}
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-950">Tip Warga Kerja:</strong> Foto jelas berlatar belakang pencahayaan kemas menarik minat rakan sekerja 3x lebih pantas berbanding foto tanpa fokus terperinci.
            </div>
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {photos.map((photoUrl, idx) => (
              <div 
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden border border-slate-300 shadow-2xs group bg-slate-100"
              >
                <img
                  src={photoUrl}
                  alt={`Upload ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-white text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-xs">
                    UTAMA (COVER)
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-red-600 text-white shadow hover:bg-red-700 transition-colors cursor-pointer"
                  title="Padam Foto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {photos.length < 5 && (
              <button
                type="button"
                onClick={handleAddSamplePhoto}
                className="aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-600 bg-slate-50 hover:bg-blue-50/50 flex flex-col items-center justify-center p-3 text-center transition-colors cursor-pointer group"
              >
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-1" />
                <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700">
                  Tambah Foto
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Tarik imej ke sini atau klik untuk fail
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Section 2: Maklumat & Kategori Barangan */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
              2
            </span>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Maklumat & Kategori Barangan</h3>
              <p className="text-[11px] text-slate-500">
                Pastikan butiran lengkap dan tepat bagi mengelakkan kekeliruan pembeli sesama krew.
              </p>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">
                Tajuk Iklan Barangan <span className="text-red-500">*</span>
              </label>
              <span className="font-mono text-slate-400 text-[11px]">
                {title.length}/80 aksara
              </span>
            </div>
            <input
              type="text"
              maxLength={80}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Cth: Jaket Krew Media Prima TV3 (Edisi Khas) Saiz L"
              className="w-full p-2.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-100 outline-none font-medium"
            />
          </div>

          {/* Category Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">
              Kategori Komuniti Media Prima <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setCategory('makanan')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  category === 'makanan'
                    ? 'bg-[#002B66] text-white border-[#002B66] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Utensils className="w-4 h-4 mb-1" />
                <div className="text-xs font-bold">Makanan & Minuman</div>
                <div className="text-[10px] opacity-80">Katering & Kafe</div>
              </button>

              <button
                type="button"
                onClick={() => setCategory('pakaian')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  category === 'pakaian'
                    ? 'bg-[#002B66] text-white border-[#002B66] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Shirt className="w-4 h-4 mb-1" />
                <div className="text-xs font-bold">Pakaian & Krew TV</div>
                <div className="text-[10px] opacity-80">Merchandise & Jaket</div>
              </button>

              <button
                type="button"
                onClick={() => setCategory('gajet')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  category === 'gajet'
                    ? 'bg-[#002B66] text-white border-[#002B66] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Laptop className="w-4 h-4 mb-1" />
                <div className="text-xs font-bold">Gajet & IT Pejabat</div>
                <div className="text-[10px] opacity-80">Aksesori & Audio</div>
              </button>

              <button
                type="button"
                onClick={() => setCategory('pejabat')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  category === 'pejabat'
                    ? 'bg-[#002B66] text-white border-[#002B66] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Home className="w-4 h-4 mb-1" />
                <div className="text-xs font-bold">Rumah & Studio</div>
                <div className="text-[10px] opacity-80">Lampu & Perabot</div>
              </button>
            </div>
          </div>

          {/* Condition Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">
              Kondisi Fizikal Barangan <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setCondition('10/10')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  condition === '10/10'
                    ? 'bg-blue-50 border-blue-600 ring-1 ring-blue-600'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold font-mono">
                    10 / 10
                  </span>
                  {condition === '10/10' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div className="font-bold text-xs text-slate-900 mt-1">Baru (Belum Digunakan)</div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Kemas dalam bungkusan asal atau tag belum dicabut.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setCondition('9/10')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  condition === '9/10'
                    ? 'bg-blue-50 border-blue-600 ring-1 ring-blue-600'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold font-mono">
                    9 / 10
                  </span>
                  {condition === '9/10' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div className="font-bold text-xs text-slate-900 mt-1">Terpakai – Macam Baru</div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Dipakai 1–2 kali sahaja untuk tugasan rasmi, tanpa cela.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setCondition('7/10')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  condition === '7/10'
                    ? 'bg-blue-50 border-blue-600 ring-1 ring-blue-600'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-extrabold font-mono">
                    7 / 10
                  </span>
                  {condition === '7/10' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div className="font-bold text-xs text-slate-900 mt-1">Terpakai – Keadaan Elok</div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Terdapat tanda penggunaan biasa tetapi fungsi 100% sempurna.
                </p>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">
                Keterangan & Deskripsi Barangan <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[10px]">Format Ringkas Disyorkan</span>
              </div>
            </div>

            {/* Mock Editor Toolbar */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-300 rounded-t-xl text-slate-600">
              <button type="button" className="p-1 hover:bg-white rounded cursor-pointer">
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button type="button" className="p-1 hover:bg-white rounded cursor-pointer">
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button type="button" className="p-1 hover:bg-white rounded cursor-pointer">
                <List className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-slate-400 pl-2">
                Gunakan perenggan ringkas untuk saiz, warna, dan sebab pelepasan.
              </span>
            </div>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-xs text-slate-900 bg-white border border-t-0 border-slate-300 rounded-b-xl focus:border-blue-600 outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Section 3: Harga & Kaedah Bayaran */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
              3
            </span>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Harga & Kaedah Bayaran</h3>
              <p className="text-[11px] text-slate-500">
                Transaksi sesama staf disyorkan menggunakan DuitNow QR rasmi demi keselamatan audit.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Price Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 block">
                Harga Jualan Ditawarkan (RM) <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 font-bold text-slate-600 text-sm">
                  RM
                </span>
                <input
                  type="number"
                  step="0.50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="85.00"
                  className="w-full pl-11 pr-4 py-2.5 text-base font-extrabold text-[#002B66] font-mono bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={negotiable}
                  onChange={(e) => setNegotiable(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold">Boleh runding / Nego nipis mesra sekerja</span>
              </label>
            </div>

            {/* Payment Methods Checkboxes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 block">
                Kaedah Bayaran Diterima <span className="text-red-500">*</span>
              </label>

              <div className="space-y-2">
                <label className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={acceptDuitNow}
                    onChange={(e) => setAcceptDuitNow(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>DuitNow QR Kakitangan</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-extrabold">
                        Disyorkan
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Imbas kod QR bank atau TNG eWallet semasa serahan fizikal di pejabat.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={acceptCod}
                    onChange={(e) => setAcceptCod(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-bold text-slate-900">Tunai Semasa Serahan (COD Kafe/Lobi)</div>
                    <div className="text-[10px] text-slate-500">
                      Bayaran wang tunai tepat semasa perjumpaan bersemuka di premis.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Titik Serahan Fizikal Media Prima */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                4
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Titik Serahan Fizikal Media Prima</h3>
                <p className="text-[11px] text-slate-500">
                  Pilih hab dalaman berdaftar untuk memudahkan pertemuan serah-terima tanpa pos luar.
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">
              Zon Selamat Syarikat
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                Pusat Operasi / Bangunan <span className="text-red-500">*</span>
              </label>
              <select
                value={hub}
                onChange={(e) => setHub(e.target.value)}
                className="w-full p-2.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none font-medium"
              >
                <option value="sri_pentas">Sri Pentas (Bandar Utama) – Hab Berita & Radio</option>
                <option value="balai_berita">Balai Berita Bangsar – Hab Cetak & Digital NSTP</option>
                <option value="rev_media">REV Media Hub – Aras 3 Sri Pentas</option>
                <option value="glenmarie">Studio Glenmarie Shah Alam</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                Lokasi Pertemuan Spesifik <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={specificLocation}
                onChange={(e) => setSpecificLocation(e.target.value)}
                placeholder="Cth: Kafeteria Aras Bawah (Bersebelahan Kaunter Minuman)"
                className="w-full p-2.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-blue-700 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">{pickupHours}</span>
                <div className="text-[10px] text-slate-500">
                  Boleh dititipkan di Concierge Lobi Utama jika krew perlu ke tugasan luar/OB.
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800 whitespace-nowrap">
              <input
                type="checkbox"
                checked={conciergeLobby}
                onChange={(e) => setConciergeLobby(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Sedia serahan wakil Concierge Lobi</span>
            </label>
          </div>
        </div>

        {/* Section 5: Pengesahan Pematuhan Integriti (COBE) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
              5
            </span>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Pengesahan Pematuhan Integriti (COBE)</h3>
              <p className="text-[11px] text-slate-500">
                Semua transaksi tertakluk di bawah Tata Etika Syarikat Media Prima Berhad.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={cobeAgreement}
                onChange={(e) => setCobeAgreement(e.target.checked)}
                className="mt-1 rounded border-blue-400 text-blue-600 focus:ring-blue-500"
              />
              <div className="text-xs text-slate-800 leading-relaxed">
                <strong className="text-blue-950 block mb-0.5">
                  Saya mengesahkan barangan ini mematuhi Tatakelakuan Pekerja (COBE) Media Prima
                </strong>
                Barangan ini adalah hak milik peribadi sah, tidak melibatkan aset hak cipta penyiaran yang belum dilupuskan, tiada pita master/rakaman dalaman sulit syarikat, dan iklan ini tidak mengganggu waktu produktiviti penyiaran rasmi.
              </div>
            </label>

            <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] text-blue-800">
              <span className="flex items-center gap-1 font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                Rujukan HR-COBE-2024/REV-03
              </span>
              <span>Kerahsiaan Kakitangan Terpelihara</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Draf disimpan secara automatik • 10:42 AM</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4 text-slate-500" />
              <span>Simpan Draf</span>
            </button>

            <button
              type="button"
              onClick={() => onPreview({ title, price: parseFloat(price) || 0, description })}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              <span>Pratonton Paparan Web</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#002B66] hover:bg-[#001D47] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Menerbitkan Iklan...</span>
                </>
              ) : (
                <>
                  <span>Hantar & Terbitkan Iklan Sekarang</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
