import React from 'react';
import { 
  Building, 
  MapPin, 
  ShieldCheck, 
  QrCode, 
  FileCheck, 
  PhoneCall, 
  CreditCard,
  Lock,
  Headphones
} from 'lucide-react';

interface FooterProps {
  onOpenCobeModal: () => void;
  onNavigate: (tab: 'pasar' | 'detail' | 'iklan' | 'sembang' | 'profil' | 'cobe') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCobeModal, onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 lg:pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Overview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#0047AB] flex items-center justify-center text-white font-extrabold text-sm">
                MP
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Prima<span className="text-blue-400">Bazaar</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[12px]">
              Platform pasaran dalaman eksklusif untuk komuniti warga kerja Media Prima Berhad, Omnia, Big Tree Outdoor, REV Media Group, dan The New Straits Times Press (NSTP).
            </p>
            <div className="flex items-center gap-2 text-blue-300 text-[11px] font-medium pt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Sri Pentas Bandar Utama & Balai Berita Bangsar</span>
            </div>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Penyulitan SSO Azure Active Directory MPB</span>
            </div>
          </div>

          {/* Col 2: Pusat Penyerahan Rasmi */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-400" />
              Pusat Penyerahan Rasmi (Hubs)
            </h4>
            <ul className="space-y-2 text-slate-400 text-[12px]">
              <li className="hover:text-white transition-colors flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <div>
                  <strong className="text-slate-200">Kafeteria Sri Pentas (Hub A)</strong>
                  <div className="text-[11px] text-slate-500">Kaunter Minuman & Meja Rehat Aras Bawah</div>
                </div>
              </li>
              <li className="hover:text-white transition-colors flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <div>
                  <strong className="text-slate-200">Lobi Utama Balai Berita Bangsar</strong>
                  <div className="text-[11px] text-slate-500">Kaunter Concierge & Pengawal Jalan Riong</div>
                </div>
              </li>
              <li className="hover:text-white transition-colors flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <div>
                  <strong className="text-slate-200">NSTP Editorial Hub (Tingkat 3)</strong>
                  <div className="text-[11px] text-slate-500">Bilik Berita Harian & Berita Harian Digital</div>
                </div>
              </li>
              <li className="hover:text-white transition-colors flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <div>
                  <strong className="text-slate-200">Big Tree & REV Media Hub</strong>
                  <div className="text-[11px] text-slate-500">Sri Pentas Aras 3 & 4</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Integriti & Etika Syarikat */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Integriti & Etika Syarikat
            </h4>
            <ul className="space-y-2 text-slate-400 text-[12px]">
              <li>
                <button 
                  onClick={onOpenCobeModal}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Polisi Kod Etika Kerja (COBE)</span>
                </button>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                <span>Penyelesaian Pertikaian Rakan Sekerja</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                <span>Kerahsiaan Data Kakitangan (PDPA)</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Hubungi Khidmat HR Prima (Ext: 8888)</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Helpdesk IT Sri Pentas (Ext: 8889)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Kaedah Pembayaran Staf & DuitNow */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-amber-400" />
              Pembayaran Selamat
            </h4>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-[#ED1C24] text-white font-extrabold text-[10px]">
                  DN
                </div>
                <div>
                  <div className="text-xs font-bold text-white">DuitNow QR Sahaja</div>
                  <div className="text-[10px] text-slate-400">Pindahan Terus Rakan Sekerja</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Disyorkan menggunakan imbasan DuitNow rasmi bank semasa serahan langsung (face-to-face) demi ketelusan transaksi kakitangan. Sifar komisen.
              </p>
            </div>

            {/* Quick App Badges */}
            <div className="pt-1 flex items-center gap-2 text-[11px]">
              <div className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300">
                Maybank2u
              </div>
              <div className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300">
                CIMB Clicks
              </div>
              <div className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300">
                Touch 'n Go
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2025 Media Prima Berhad (Company No. 200001030368). Hak Cipta Terpelihara. Aplikasi Dalaman Khusus Kakitangan.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button 
              onClick={onOpenCobeModal}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Garis Panduan COBE
            </button>
            <span>•</span>
            <span className="hover:text-slate-300">Dasar Privasi MPB</span>
            <span>•</span>
            <span className="hover:text-slate-300">Terma Khidmat Azure AD</span>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Sistem Bersepadu MPB Identity SSO</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
