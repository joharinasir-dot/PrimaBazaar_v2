import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Banknote, 
  Send,
  Download,
  AlertCircle
} from 'lucide-react';
import { Product } from '../types';

interface DuitNowModalProps {
  product: Product;
  quantity: number;
  selectedAddOns: string[];
  totalAmount: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (method: 'duitnow' | 'cod') => void;
}

export const DuitNowModal: React.FC<DuitNowModalProps> = ({
  product,
  quantity,
  selectedAddOns,
  totalAmount,
  isOpen,
  onClose,
  onConfirmPayment,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        onConfirmPayment('duitnow');
      }, 1200);
    }, 1000);
  };

  const handlePayCod = () => {
    onConfirmPayment('cod');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ED1C24] text-white flex items-center justify-center font-extrabold text-xs shadow-2xs">
              DN
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Bayaran Pantas DuitNow QR
              </h3>
              <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Transaksi Selamat Kakitangan Media Prima (COBE Sah)</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Order Summary Box */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100/90 text-xs space-y-2">
            <div className="flex items-center justify-between text-blue-900">
              <span className="font-bold uppercase tracking-wider text-[10px] text-blue-600">
                Ringkasan Tempahan Kakitangan
              </span>
              <span className="font-mono text-[11px] font-semibold text-blue-800">
                ID: {product.adId || '#MPB-NL-8421'}
              </span>
            </div>

            <div className="flex items-start justify-between gap-2 pt-1 border-t border-blue-200/50">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{product.title}</h4>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Kuantiti: <span className="font-semibold text-slate-900">{quantity} {product.unitLabel}</span>
                  {selectedAddOns.length > 0 && (
                    <span> • Ekstra Sambal Berasingan</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-[#002B66] font-mono tabular-nums">
                  RM {totalAmount.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-500">Tepat Tanpa Caj Tambahan</div>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="flex items-center gap-2.5 pt-2 border-t border-blue-200/40 text-[11px]">
              <div className="w-6 h-6 rounded-full bg-blue-200/80 text-blue-900 font-bold flex items-center justify-center text-[10px]">
                KA
              </div>
              <div className="flex-1">
                <span className="font-bold text-slate-800">{product.seller.name}</span>
                <span className="text-slate-500 ml-1">({product.seller.nickname} • Ext: {product.seller.phoneExt})</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                SSO Disahkan
              </span>
            </div>
          </div>

          {/* DuitNow Standard QR Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-4 text-center space-y-3">
            <div className="flex items-center justify-between px-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <div className="w-5 h-5 rounded bg-[#ED1C24] text-white flex items-center justify-center font-bold text-[9px]">
                  DN
                </div>
                <span>DuitNow</span>
                <span className="text-[10px] text-slate-400 font-normal">STANDARD QR NASIONAL</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-semibold">
                Segera & Sifar Caj
              </span>
            </div>

            {/* QR Visual */}
            <div className="flex justify-center py-1">
              <div className="relative p-4 bg-white rounded-xl shadow-xs border-2 border-slate-200 inline-block">
                {/* SVG DuitNow Styled QR */}
                <div className="w-48 h-48 relative flex items-center justify-center bg-white">
                  {/* Outer corner marks */}
                  <div className="absolute top-0 left-0 w-11 h-11 border-4 border-slate-900 rounded-md p-1">
                    <div className="w-full h-full bg-slate-900 rounded-xs"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-11 h-11 border-4 border-slate-900 rounded-md p-1">
                    <div className="w-full h-full bg-slate-900 rounded-xs"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-11 h-11 border-4 border-slate-900 rounded-md p-1">
                    <div className="w-full h-full bg-slate-900 rounded-xs"></div>
                  </div>

                  {/* QR Pattern dots representation */}
                  <div className="grid grid-cols-8 gap-1.5 p-3 opacity-90">
                    {Array.from({ length: 64 }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3.5 h-3.5 rounded-xs transition-colors ${
                          idx % 2 === 0 || idx % 5 === 0 || idx % 7 === 0
                            ? 'bg-slate-900'
                            : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Center DuitNow Logo Badge */}
                  <div className="absolute inset-0 m-auto w-11 h-11 bg-white p-1 rounded-lg shadow-sm border border-slate-200 flex items-center justify-center">
                    <div className="w-full h-full rounded bg-[#ED1C24] text-white flex items-center justify-center font-extrabold text-sm tracking-tight">
                      DN
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[11px] font-bold text-slate-800 bg-slate-100 py-1 px-3 rounded-md">
                  Imbas & Bayar: <span className="text-red-600 font-mono">RM {totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
              Imbas kod QR menggunakan mana-mana aplikasi perbankan kakitangan (Maybank2u, CIMB, TNG eWallet, Bank Islam).
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {paymentSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Bayaran Disahkan Berjaya! Membuka Sembang Kak Ani...</span>
              </div>
            ) : (
              <>
                <button
                  onClick={handlePayNow}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 bg-[#002B66] hover:bg-[#001D47] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Mengesahkan Transaksi DuitNow...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-emerald-400" />
                      <span>Hantar Resit & Maklumkan {product.seller.nickname}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePayCod}
                  className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Banknote className="w-4 h-4 text-slate-500" />
                  <span>Bayar Tunai Semasa Ambil (Tukar ke COD Kafeteria)</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
