import React from 'react';
import { Store, Compass, Plus, MessageSquare, User } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'pasar' | 'detail' | 'iklan' | 'sembang' | 'profil' | 'cobe';
  onNavigate: (tab: 'pasar' | 'detail' | 'iklan' | 'sembang' | 'profil' | 'cobe') => void;
  unreadCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onNavigate,
  unreadCount,
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {/* Pasar */}
        <button
          onClick={() => onNavigate('pasar')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors cursor-pointer ${
            activeTab === 'pasar' || activeTab === 'detail'
              ? 'text-blue-900 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Store className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Pasar</span>
        </button>

        {/* Carian / Terokai */}
        <button
          onClick={() => onNavigate('pasar')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors cursor-pointer ${
            activeTab === 'cobe' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Carian</span>
        </button>

        {/* + Iklan (Prominent elevated center action) */}
        <div className="relative -top-4">
          <button
            onClick={() => onNavigate('iklan')}
            className="w-12 h-12 rounded-full bg-[#002B66] text-white flex flex-col items-center justify-center shadow-lg hover:bg-blue-900 active:scale-95 transition-all cursor-pointer border-2 border-white"
            aria-label="Terbitkan Iklan Baru"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
          <div className="text-[10px] font-bold text-slate-700 text-center mt-0.5">
            + Iklan
          </div>
        </div>

        {/* Pesanan & Sembang */}
        <button
          onClick={() => onNavigate('sembang')}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 transition-colors cursor-pointer ${
            activeTab === 'sembang'
              ? 'text-blue-900 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Pesanan</span>
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-2 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profil */}
        <button
          onClick={() => onNavigate('profil')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 transition-colors cursor-pointer ${
            activeTab === 'profil'
              ? 'text-blue-900 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Profil</span>
        </button>
      </div>
    </nav>
  );
};
