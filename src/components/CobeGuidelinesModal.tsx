import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, FileText, Lock, Users } from 'lucide-react';

interface CobeGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CobeGuidelinesModal: React.FC<CobeGuidelinesModalProps> = ({
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
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-blue-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#002B66] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Garis Panduan Kod Etika Perniagaan (COBE)
              </h3>
              <p className="text-[11px] text-blue-800 font-medium">
                Pematuhan Integriti & Tatatertib Warga Media Prima Berhad (Rujukan HR-COBE-2024/REV-03)
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
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs text-slate-700">
          {/* Executive Summary */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed">
            PrimaBazaar diwujudkan sebagai platform komuniti dalaman untuk memudahkan warga kerja Media Prima Berhad berurusan, berkongsi makanan sarapan buatan rumah, pakaian krew terpakai, dan peralatan pejabat secara telus dan selamat tanpa komisen pihak ketiga. Semua urus niaga tertakluk di bawah <strong>Tatakelakuan & Etika Perniagaan Kumpulan (COBE)</strong>.
          </div>

          {/* Core Principles */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>5 Syarat Utama Pematuhan COBE Media Prima:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>1. Warga Sah Berdaftar</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Hanya staf tetap, kontrak berdaftar, dan pelatih amali yang memiliki akaun Microsoft Azure SSO syarikat dibenarkan beriklan dan membeli.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>2. Larangan Aset Syarikat</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  DILARANG sama sekali mengiklan aset hak cipta penyiaran yang belum dilupuskan, pita master, rakaman video mentah, atau peralatan syarikat yang tidak dilupuskan secara rasmi.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  <span>3. Produktiviti Waktu Siaran</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Aktiviti penyerahan barang hanya dibenarkan pada waktu rehat, sebelum siaran langsung, atau dititipkan di concierge lobi rasmi agar tidak mengganggu waktu penyiaran.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>4. Bayaran Terus DuitNow</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Semua transaksi kewangan dilakukan secara terus dari akaun pembeli kepada penjual menggunakan DuitNow QR atau tunai COD tanpa sebarang caj perantara.
                </p>
              </div>
            </div>
          </div>

          {/* Conflict Resolution & Reporting */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Penyelesaian Masalah & Aduan Integriti</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Sebarang pertikaian barangan, kerosakan tersembunyi, atau ketidaksesuaian hendaklah diselesaikan secara harmoni sesama rakan sekerja. Jika terdapat sebarang penipuan atau salah laku, sila laporkan terus kepada Jabatan Integriti & HR Media Prima di talian <strong>Ext: 8888</strong>.
            </p>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#002B66] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Saya Telah Membaca & Memahami Polisi COBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
