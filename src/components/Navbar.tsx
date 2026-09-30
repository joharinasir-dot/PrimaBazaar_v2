import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MessageSquareText, 
  PlusCircle, 
  ShieldCheck, 
  Bell, 
  ChevronDown, 
  Menu, 
  X,
  MapPin,
  CheckCircle2,
  Store,
  FileText,
  UserCheck
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User;
  activeTab: 'pasar' | 'detail' | 'iklan' | 'sembang' | 'profil' | 'cobe';
  onNavigate: (tab: 'pasar' | 'detail' | 'iklan' | 'sembang' | 'profil' | 'cobe') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  unreadCount: number;
  onOpenCobeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  onNavigate,
  searchQuery,
  onSearchChange,
  unreadCount,
  onOpenCobeModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState('Sri Pentas (Bandar Utama)');
  const [isHubDropdownOpen, setIsHubDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const hubs = [
    'Sri Pentas (Bandar Utama)',
    'Balai Berita NSTP (Bangsar)',
    'Studio Glenmarie (Shah Alam)',
    'REV Media Hub (Aras 3)',
  ];

  const categories = [
    'Semua Kategori',
    'Makanan & Minuman',
    'Pakaian & Kru TV',
    'Elektronik & Gajet',
    'Perabot & Pejabat',
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Top Notice Bar - Exclusive Corporate SSO Banner */}
      <div className="bg-[#002B66] text-white text-[11px] md:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-700/80 text-[10px] uppercase font-bold tracking-wide">
              Eksklusif
            </span>
            <span className="hidden sm:inline">Platform Pasaran Rasmi Warga Kerja Media Prima Berhad</span>
            <span className="sm:hidden">Warga Media Prima Berhad</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 text-blue-100 text-[11px]">
            <button 
              onClick={() => onNavigate('profil')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Pusat Penjual Warga MP</span>
            </button>
            <button 
              onClick={onOpenCobeModal}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Jaminan SSO MP</span>
            </button>
            <div className="hidden lg:flex items-center gap-1.5 border-l border-blue-400/40 pl-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] text-blue-100 font-mono">Pelayan Sri Pentas: Selamat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3 md:gap-6">
          {/* Brand Logo & Hub Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onNavigate('pasar')} 
              className="flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#002B66] to-[#0047AB] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                <span className="tracking-tighter">MP</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                    Prima<span className="text-[#0047AB]">Bazaar</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide -mt-1 hidden sm:block">
                  Media Prima Berhad
                </span>
              </div>
            </button>

            {/* Hub Location Badge */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setIsHubDropdownOpen(!isHubDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100/90 hover:bg-slate-200/80 rounded-full border border-slate-200 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-700" />
                <span className="text-blue-900 font-semibold">{selectedHub}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isHubDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Pilih Lokasi Serahan Sah
                  </div>
                  {hubs.map((hub) => (
                    <button
                      key={hub}
                      onClick={() => {
                        setSelectedHub(hub);
                        setIsHubDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                        selectedHub === hub ? 'text-blue-700 font-semibold bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{hub}</span>
                      {selectedHub === hub && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Box - Responsive */}
          <div className="hidden md:flex flex-1 max-w-xl items-center">
            <div className="relative w-full flex items-center rounded-lg border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all bg-white overflow-hidden shadow-2xs">
              {/* Category Dropdown */}
              <div className="relative border-r border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="h-9 px-2.5 text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-slate-50 cursor-pointer font-medium whitespace-nowrap"
                >
                  <span className="max-w-[100px] truncate">{selectedCategory}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setSelectedCategory(c);
                          setIsCategoryOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari sarapan, gajet, jaket kru, baucar..."
                className="w-full pl-3 pr-9 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button 
                type="button"
                className="absolute right-2 text-slate-400 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Items (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onNavigate('pasar')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'pasar'
                  ? 'text-blue-900 bg-blue-50 font-bold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Store className="w-4 h-4 text-blue-700" />
              <span>Pasar Utama</span>
            </button>

            <button
              onClick={() => onNavigate('sembang')}
              className={`relative px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sembang'
                  ? 'text-blue-900 bg-blue-50 font-bold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <MessageSquareText className="w-4 h-4 text-blue-700" />
              <span>Pesanan & Sembang</span>
              {unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('iklan')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'iklan'
                  ? 'text-blue-900 bg-blue-50 font-bold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Terbitkan Iklan</span>
            </button>

            <button
              onClick={onOpenCobeModal}
              className="px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">Garis Panduan COBE</span>
            </button>

            {/* + Jual Barang Primary Button */}
            <button
              onClick={() => onNavigate('iklan')}
              className="ml-1 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Jual Barang</span>
            </button>

            {/* Notification Bell */}
            <button 
              onClick={() => onNavigate('sembang')}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Notifikasi Aktiviti MPB"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600"></span>
            </button>

            {/* User Profile Pill - Azure SSO */}
            <button
              onClick={() => onNavigate('profil')}
              className="flex items-center gap-2 p-1 pl-2 bg-slate-100 hover:bg-slate-200/80 rounded-full border border-slate-200 transition-colors cursor-pointer"
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-white"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
              </div>
              <div className="hidden xl:flex flex-col text-left pr-2">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser.name.split(' ')[0]} {currentUser.name.split(' ')[1]}
                </span>
                <span className="text-[10px] text-blue-700 font-medium leading-none">
                  SSO Azure Verified
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('iklan')}
              className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-md shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Jual</span>
            </button>

            <button
              onClick={() => onNavigate('sembang')}
              className="relative p-2 text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600"></span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-md hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Directly below header) */}
        <div className="md:hidden py-2 pb-3">
          <div className="relative w-full flex items-center rounded-lg border border-slate-300 bg-white overflow-hidden shadow-2xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari sarapan, gajet, jaket kru TV3..."
              className="w-full pl-3 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button type="button" className="absolute right-2.5 text-slate-400">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-3 shadow-lg">
          {/* User Info Bar */}
          <div className="flex items-center gap-3 p-3 bg-blue-50/70 rounded-xl border border-blue-100">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-2xs"
            />
            <div className="flex-1">
              <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
              <div className="text-[11px] text-slate-600">{currentUser.role} · {currentUser.department}</div>
              <div className="text-[10px] text-blue-700 font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                ID: {currentUser.ssoId} · Azure Active Directory
              </div>
            </div>
          </div>

          {/* Location hub selector */}
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 mb-1.5">Lokasi Utama Serahan:</div>
            <select
              value={selectedHub}
              onChange={(e) => setSelectedHub(e.target.value)}
              className="w-full text-xs font-semibold text-blue-900 bg-white border border-slate-300 rounded px-2.5 py-1.5"
            >
              {hubs.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('pasar');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Store className="w-4 h-4 text-blue-700" />
                Pasar Utama
              </span>
              <span className="text-[10px] text-slate-400">Feed & Flash Sale</span>
            </button>

            <button
              onClick={() => {
                onNavigate('sembang');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <MessageSquareText className="w-4 h-4 text-blue-700" />
                Pesanan & Sembang
              </span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                  {unreadCount} baru
                </span>
              )}
            </button>

            <button
              onClick={() => {
                onNavigate('iklan');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-amber-600" />
                Terbitkan Iklan Barangan
              </span>
              <span className="text-[10px] text-slate-400">Jual</span>
            </button>

            <button
              onClick={() => {
                onNavigate('profil');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-700" />
                Profil Penjual Kak Ani
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">4.9 ★ (84 Ulasan)</span>
            </button>

            <button
              onClick={() => {
                onOpenCobeModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Garis Panduan Integriti (COBE)
              </span>
              <span className="text-[10px] text-slate-400">Polisi HR</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
