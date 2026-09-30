import React from 'react';
import { X, MapPin, Navigation, Info, CheckCircle2 } from 'lucide-react';

interface CafeteriaMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CafeteriaMapModal: React.FC<CafeteriaMapModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pelan Tapak Kafeteria Sri Pentas (Bandar Utama)
              </h3>
              <p className="text-[11px] text-slate-500">
                Zon Pengambilan A1 • Aras Bawah (Kaunter Minuman & Serahan Kak Ani)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Status bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Titik Ambilan Aktif Pagi Ini: 08:00 – 09:30 PG
            </span>
            <span className="font-semibold text-[11px]">Suhu Panas Dalam Beg Termal</span>
          </div>

          {/* Interactive Architectural Floor Plan Diagram */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-white relative select-none">
            {/* Legend / Title */}
            <div className="flex justify-between items-center text-[11px] text-slate-400 border-b border-slate-800 pb-2 mb-4">
              <span>PELAN ARAS BAWAH (GROUND FLOOR KAFETERIA)</span>
              <span className="text-amber-400 font-mono">ARAS 0 • KOD: A1-KAFE</span>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-12 gap-3 min-h-[260px]">
              {/* Left Column: Entrance & Crew tables */}
              <div className="col-span-5 space-y-3">
                {/* Lobby Entrance */}
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-center text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span>Pintu Lobi Utama / Pusing</span>
                </div>

                {/* Flow corridor */}
                <div className="text-[10px] text-slate-500 text-center tracking-widest uppercase">
                  ↓ Laluan Masuk Staf & Krew ↓
                </div>

                {/* Crew Dining Area A */}
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 text-center">
                  <div className="text-xs font-bold text-slate-300">Meja Makan Krew A</div>
                  <div className="text-[10px] text-slate-500">Krew Buletin Utama & Siaran</div>
                </div>

                {/* Crew Dining Area B */}
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 text-center">
                  <div className="text-xs font-bold text-slate-300">Meja Makan Krew B</div>
                  <div className="text-[10px] text-slate-500">Pasukan Digital & Kontrak</div>
                </div>
              </div>

              {/* Right Column: Stalls & Kak Ani Pickup Counter */}
              <div className="col-span-7 flex flex-col justify-between space-y-3">
                {/* Other Food Stalls */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50 text-center text-[11px] text-slate-400">
                    Gerai Mee Tarik
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50 text-center text-[11px] text-slate-400">
                    Nasi Campur Kak Yam
                  </div>
                </div>

                {/* Hot Beverage Counter & KAK ANI MEJA SERAHAN (Focal Point) */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/30 border-2 border-amber-400 text-amber-100 space-y-2 relative shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                      ★ LOKASI AMBILAN KHAS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-extrabold text-[10px]">
                      DISINI!
                    </span>
                  </div>

                  <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Kaunter Minuman & Meja Serahan Kak Ani</span>
                  </div>

                  <p className="text-[11px] text-amber-200/90 leading-relaxed">
                    Bungkusan diletakkan di atas meja kaunter minuman panas (bersebelahan Kaunter Kopi Pak Ali). Sila semak label nama Nurul Aini yang dilekatkan pada daun pisang.
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-[10px] text-amber-300 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Thermal Bag Kak Ani • Tag MP-70492</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Tunjukkan pas pekerja MPB jika diminta oleh penyelia kaunter.</span>
              <span className="text-blue-400 font-semibold">Hub Sri Pentas</span>
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Panduan Mengambil Pesanan:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 pl-1">
              <li>Ambil sebelum jam 9:30 PG sebelum kaunter pagi dikemas untuk persiapan makan tengah hari.</li>
              <li>Jika tidak dapat turun sendiri, krew sepasukan boleh tolong ambilkan dengan memaklumkan nama anda di dalam chat.</li>
              <li>Untuk serahan ke Balai Berita Bangsar, pesanan akan dihantar melalui despatch transit harian jam 11:00 PG.</li>
            </ul>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#002B66] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Faham, Tutup Pelan Tapak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
