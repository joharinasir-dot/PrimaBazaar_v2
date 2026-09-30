import React, { useState } from 'react';
import { 
  Search, 
  Phone, 
  UserCheck, 
  CheckCircle2, 
  FileText, 
  Download, 
  Eye, 
  Paperclip, 
  Smile, 
  Send, 
  MapPin, 
  Star, 
  Clock, 
  ShieldCheck, 
  ChevronLeft,
  Navigation,
  ExternalLink,
  Lock,
  MessageSquareText
} from 'lucide-react';
import { ChatThread, ChatMessage, User } from '../types';

interface OrdersAndChatProps {
  currentUser: User;
  threads: ChatThread[];
  activeThreadId: string;
  onSelectThread: (threadId: string) => void;
  onSendMessage: (threadId: string, text: string) => void;
  onOpenSellerProfile: (sellerId?: string) => void;
  onOpenReviewModal: () => void;
  onOpenCafeteriaMap: () => void;
  onOpenDuitNowModal: () => void;
}

export const OrdersAndChat: React.FC<OrdersAndChatProps> = ({
  currentUser,
  threads,
  activeThreadId,
  onSelectThread,
  onSendMessage,
  onOpenSellerProfile,
  onOpenReviewModal,
  onOpenCafeteriaMap,
  onOpenDuitNowModal,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'buy' | 'sell'>('all');
  const [searchContact, setSearchContact] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [mobileShowThread, setMobileShowThread] = useState(true);
  const [showCallNotice, setShowCallNotice] = useState(false);
  const [showReceiptDetail, setShowReceiptDetail] = useState(false);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const filteredThreads = threads.filter((t) => {
    const matchesFilter = filterTab === 'all' || t.category === filterTab;
    const matchesSearch = 
      t.contactName.toLowerCase().includes(searchContact.toLowerCase()) ||
      t.contactDept.toLowerCase().includes(searchContact.toLowerCase()) ||
      t.relatedItem.title.toLowerCase().includes(searchContact.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    onSendMessage(activeThread.id, inputMessage.trim());
    setInputMessage('');
  };

  const handleQuickChip = (text: string) => {
    onSendMessage(activeThread.id, text);
  };

  const handleCallExt = () => {
    setShowCallNotice(true);
    setTimeout(() => setShowCallNotice(false), 3500);
  };

  return (
    <div className="space-y-4 pb-16">
      {/* Top System Status Bar */}
      <div className="hidden sm:flex items-center justify-between p-2.5 px-4 bg-white rounded-xl border border-slate-200 text-xs shadow-2xs">
        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span className="font-semibold text-slate-900">
            Sistem Perutusan Bersepadu Warga Kerja
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">Hab Pesanan Langsung Sri Pentas & Bangsar</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Pelayan Pesanan MPB: Sedia Terhubung</span>
          </div>
          <span className="text-slate-400">Sesi: 24 Okt 2024, 08:42 PG</span>
        </div>
      </div>

      {/* Main 2-Panel Chat Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[640px] grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Chat Threads List (4 cols on desktop) */}
        <div 
          className={`md:col-span-5 lg:col-span-4 border-r border-slate-200 flex flex-col ${
            mobileShowThread ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50/70">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <MessageSquareText className="w-5 h-5 text-blue-700" />
                <span>Pesanan & Sembang</span>
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setFilterTab('all')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                  filterTab === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua ({threads.length})
              </button>
              <button
                onClick={() => setFilterTab('buy')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                  filterTab === 'buy'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Belian Saya (2)
              </button>
              <button
                onClick={() => setFilterTab('sell')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                  filterTab === 'sell'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Jualan Saya (2)
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchContact}
                onChange={(e) => setSearchContact(e.target.value)}
                placeholder="Cari nama rakan sekerja, ext, barangan..."
                className="w-full pl-8 pr-3 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Pickup Alert Reminder Banner (As shown in screenshot 4) */}
          <div className="p-3 bg-amber-50/90 border-b border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950">
            <span className="text-base leading-none">🥪</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-amber-900 uppercase">
                  Peringatan Serahan Pagi Ini
                </span>
                <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-200/80 px-1.5 py-0.2 rounded">
                  08:30 – 09:30 PG
                </span>
              </div>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-snug">
                <strong>Nasi Lemak Sambal Sotong Kak Ani</strong> sedia diambil di <strong>Meja Kaunter Minuman</strong> Kafeteria Aras Bawah Sri Pentas.
              </p>
            </div>
          </div>

          {/* Threads List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredThreads.map((thread) => {
              const isSelected = thread.id === activeThread.id;
              return (
                <button
                  key={thread.id}
                  onClick={() => {
                    onSelectThread(thread.id);
                    setMobileShowThread(true);
                  }}
                  className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                    isSelected ? 'bg-blue-50/80' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={thread.contactAvatar}
                      alt={thread.contactName}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {thread.contactName}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {thread.lastMessageTime}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 truncate">
                      {thread.contactDept} • Ext {thread.contactExt}
                    </div>

                    <p className="text-xs text-slate-600 truncate mt-1">
                      {thread.lastMessage}
                    </p>

                    {/* Related Item Pill */}
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700 truncate max-w-[190px]">
                        <span className="truncate">{thread.relatedItem.title}</span>
                        <span className="font-bold font-mono">RM {thread.relatedItem.price.toFixed(2)}</span>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        thread.relatedItem.statusText.includes('DuitNow')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {thread.relatedItem.statusText}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Left Footer */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Semakan Berkelompok SSO Aktif
            </span>
            <span className="font-mono">v2.4.2 MP-Hub</span>
          </div>
        </div>

        {/* Right Column: Active Conversation (7-8 cols on desktop) */}
        <div 
          className={`md:col-span-7 lg:col-span-8 flex flex-col bg-slate-50/50 ${
            !mobileShowThread ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Thread Header */}
          <div className="p-3.5 sm:p-4 bg-white border-b border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 min-w-0">
              {/* Back button on mobile */}
              <button
                onClick={() => setMobileShowThread(false)}
                className="md:hidden p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="relative shrink-0">
                <img
                  src={activeThread.contactAvatar}
                  alt={activeThread.contactName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {activeThread.contactName}
                  </h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-500 truncate flex items-center gap-2">
                  <span className="text-emerald-700 font-semibold">{activeThread.contactActiveStatus || 'Aktif'}</span>
                  <span>•</span>
                  <span>{activeThread.contactDept} (Ext {activeThread.contactExt})</span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCallExt}
                className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-blue-200 cursor-pointer whitespace-nowrap"
                title="Panggilan Talian Sambungan Pejabat"
              >
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span className="hidden sm:inline">Panggilan Dalaman</span>
                <span>({activeThread.contactExt})</span>
              </button>

              <button
                onClick={() => onOpenSellerProfile(activeThread.contactId)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Lihat Profil Penjual</span>
              </button>
            </div>
          </div>

          {/* Internal call simulated alert */}
          {showCallNotice && (
            <div className="p-3 bg-blue-900 text-white text-xs flex items-center justify-between px-4 animate-in slide-in-from-top duration-200">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Menyambungkan panggilan VoIP dalaman ke <strong>Ext: {activeThread.contactExt} ({activeThread.contactName})</strong>...</span>
              </div>
              <span className="font-mono text-[11px] text-blue-200">Bilik Konti TV3</span>
            </div>
          )}

          {/* Pinned Order Item Banner */}
          <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={activeThread.relatedItem.image}
                alt={activeThread.relatedItem.title}
                className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <h5 className="font-bold text-slate-900 truncate">
                  {activeThread.relatedItem.title}
                </h5>
                <div className="text-[11px] text-slate-500">
                  {activeThread.relatedItem.quantity} Bungkus Panas • <strong className="text-slate-900 font-mono">RM {activeThread.relatedItem.price.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                DuitNow Selesai
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                Sedia Diambil di Kafeteria
              </span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {/* Date separator */}
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-600 text-[10px] font-bold">
                Hari ini, 24 Oktober 2024
              </span>
            </div>

            {/* Chat message bubbles */}
            {activeThread.messages.map((msg) => {
              const isMe = msg.sender === 'user';
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 space-y-2.5 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#002B66] text-white flex items-center justify-center font-bold">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#002B66]">
                          {msg.statusTitle}
                        </div>
                        <div className="text-[11px] text-slate-600">
                          {msg.statusSubtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={onOpenCafeteriaMap}
                        className="px-3.5 py-1.5 rounded-lg bg-white border border-blue-300 text-blue-800 hover:bg-blue-50 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5 text-blue-600" />
                        <span>Navigasi Kafeteria</span>
                      </button>

                      <button
                        onClick={onOpenReviewModal}
                        className="px-3.5 py-1.5 rounded-lg bg-[#002B66] hover:bg-blue-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>Beri Penilaian</span>
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                    <span>{msg.senderName}</span>
                    <span>•</span>
                    <span className="font-mono">{msg.time}</span>
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-md rounded-2xl p-3.5 text-xs leading-relaxed space-y-2.5 ${
                      isMe
                        ? 'bg-[#002B66] text-white rounded-tr-xs shadow-2xs'
                        : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    {/* DuitNow Official Slip Representation */}
                    {msg.isPaymentConfirmation && msg.duitNowSlip && (
                      <div className="bg-white text-slate-900 rounded-xl p-3 border border-emerald-300 shadow-sm space-y-2.5">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>PENGESAHAN DUITNOW</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                            LULUS
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="text-[10px] text-slate-500">Jumlah Bayaran:</div>
                          <div className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                            RM {msg.duitNowSlip.amount.toFixed(2)}
                          </div>
                        </div>

                        <div className="text-[11px] space-y-1 pt-1 border-t border-slate-100">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Penerima:</span>
                            <span className="font-bold text-slate-800 text-right">{msg.duitNowSlip.recipientName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">DuitNow ID:</span>
                            <span className="font-mono text-slate-700">{msg.duitNowSlip.recipientPhone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">No. Rujukan:</span>
                            <span className="font-mono text-slate-700">{msg.duitNowSlip.referenceNo}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Waktu:</span>
                            <span className="font-mono text-slate-700">{msg.duitNowSlip.transactionTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Sumber Dana:</span>
                            <span className="text-slate-700">{msg.duitNowSlip.sourceAccount}</span>
                          </div>
                        </div>

                        {/* e-Receipt attachment preview button */}
                        <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-200/80 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                            <div className="truncate">
                              <div className="font-bold text-[11px] text-slate-800 truncate">
                                {msg.duitNowSlip.fileName}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {msg.duitNowSlip.fileSize}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => alert(`Memuat turun ${msg.duitNowSlip?.fileName}...`)}
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-800 text-[11px] font-bold rounded border border-blue-300 flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <Download className="w-3 h-3" />
                            <span>Muat Turun</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowReceiptDetail(true)}
                          className="w-full py-1.5 bg-[#002B66] hover:bg-blue-900 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat Resit Penuh & Perincian</span>
                        </button>
                      </div>
                    )}

                    {/* Standard text message */}
                    {msg.text && (
                      <div className="whitespace-pre-line">
                        {msg.text}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Reply Chips */}
          <div className="px-4 py-2 bg-white border-t border-slate-200/80 overflow-x-auto flex items-center gap-2 text-xs select-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              BALAS PANTAS:
            </span>
            <button
              onClick={() => handleQuickChip('Terima kasih Kak Ani, saya turun ambil sekarang! 🏃')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer border border-slate-200"
            >
              Terima kasih Kak Ani, saya turun ambil sekarang! 🏃
            </button>
            <button
              onClick={() => handleQuickChip('Minta rakan sepasukan saya tolong kutipkan ya')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer border border-slate-200"
            >
              Minta rakan sepasukan saya tolong kutipkan ya
            </button>
            <button
              onClick={() => handleQuickChip('Sedap sangat sambal sotong pagi ni!')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer border border-slate-200"
            >
              Sedap sangat!
            </button>
          </div>

          {/* Chat Message Input Bar */}
          <form 
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Lampirkan Dokumen / Gambar"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenDuitNowModal}
              className="px-2.5 py-1.5 bg-red-50 text-[#ED1C24] font-bold text-xs rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1 border border-red-200 cursor-pointer shrink-0"
              title="Bayaran DuitNow"
            >
              <span className="font-extrabold text-[10px]">DN</span>
              <span>DuitNow</span>
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Tulis mesej kepada ${activeThread.contactNickname || activeThread.contactName} (Ext ${activeThread.contactExt})...`}
              className="flex-1 py-2 px-3 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-blue-600 outline-none"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="px-4 py-2 bg-[#002B66] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <span>Kirim</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Integriti Disclaimer Footer */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/60 text-[10px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-1">
            <span>Perbualan ini dipantau mengikut Polisi Kod Etika Kerja (COBE) Media Prima Berhad.</span>
            <span className="font-mono text-slate-500">Bilik Sembang Selamat ID: MP-CHAT-0994</span>
          </div>
        </div>
      </div>

      {/* Full Receipt Modal */}
      {showReceiptDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-slate-900">Salinan e-Resit Rasmi Kakitangan</h4>
              <button 
                onClick={() => setShowReceiptDetail(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border space-y-2 text-xs font-mono">
              <div className="text-center font-bold text-slate-800 text-sm">
                MAYBANK2U CORP / DUITNOW MPB
              </div>
              <div className="text-center text-[11px] text-slate-500">
                TRANS-ID: DUIT-MP-20241024-88421
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between">
                <span>Pembeli:</span>
                <span>Nurul Aini (MP-88421)</span>
              </div>
              <div className="flex justify-between">
                <span>Penerima:</span>
                <span>Hjh Rohani (MP-70492)</span>
              </div>
              <div className="flex justify-between">
                <span>Item:</span>
                <span>Nasi Lemak Sambal Sotong</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t">
                <span>Jumlah:</span>
                <span>RM 6.00</span>
              </div>
              <div className="text-center text-[10px] text-emerald-700 font-bold pt-2">
                ✓ STATUS: SELESAI & DIPERAKUI SSO
              </div>
            </div>

            <button
              onClick={() => setShowReceiptDetail(false)}
              className="w-full py-2 bg-[#002B66] text-white text-xs font-bold rounded-xl"
            >
              Tutup Resit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
