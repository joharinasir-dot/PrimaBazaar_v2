import React, { useState } from 'react';
import { 
  currentUser, 
  sellerKakAni, 
  initialProducts, 
  initialReviews, 
  initialChatThreads 
} from './data/mockData';
import { Product, Review, ChatThread, ChatMessage } from './types';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MarketplaceHome } from './components/MarketplaceHome';
import { ProductDetail } from './components/ProductDetail';
import { PublishListing } from './components/PublishListing';
import { OrdersAndChat } from './components/OrdersAndChat';
import { SellerProfile } from './components/SellerProfile';
import { Footer } from './components/Footer';
import { DuitNowModal } from './components/DuitNowModal';
import { ReviewModal } from './components/ReviewModal';
import { CafeteriaMapModal } from './components/CafeteriaMapModal';
import { CobeGuidelinesModal } from './components/CobeGuidelinesModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'pasar' | 'detail' | 'iklan' | 'sembang' | 'profil' | 'cobe'>('pasar');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProducts[0]);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(initialChatThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>('thread_kak_ani');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal states
  const [isDuitNowOpen, setIsDuitNowOpen] = useState(false);
  const [duitNowProduct, setDuitNowProduct] = useState<Product>(initialProducts[0]);
  const [duitNowQty, setDuitNowQty] = useState(1);
  const [duitNowAddOns, setDuitNowAddOns] = useState<string[]>([]);
  const [duitNowTotal, setDuitNowTotal] = useState(6.00);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isCobeOpen, setIsCobeOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDuitNow = (product: Product, quantity: number, addOns: string[], total: number) => {
    setDuitNowProduct(product);
    setDuitNowQty(quantity);
    setDuitNowAddOns(addOns);
    setDuitNowTotal(total);
    setIsDuitNowOpen(true);
  };

  const handleConfirmDuitNowPayment = (method: 'duitnow' | 'cod') => {
    setIsDuitNowOpen(false);

    if (method === 'duitnow') {
      // Add DuitNow receipt into Kak Ani's chat thread
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} PG`;
      
      const newDuitNowMsg: ChatMessage = {
        id: `msg_pay_${Date.now()}`,
        sender: 'user',
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        time: timeStr,
        isPaymentConfirmation: true,
        duitNowSlip: {
          amount: duitNowTotal,
          recipientName: duitNowProduct.seller.name,
          recipientPhone: `019-3827109 (${duitNowProduct.seller.nickname})`,
          recipientAccount: `${duitNowProduct.seller.nickname} MPB`,
          referenceNo: `DUIT-MP-20241024-${Math.floor(10000 + Math.random() * 90000)}`,
          transactionTime: `24 Okt 2024, ${timeStr}`,
          sourceAccount: 'Maybank2u Corp (Akaun Kakitangan MPB)',
          fileName: `e-Resit_DuitNow_MP88421.pdf`,
          fileSize: '142 KB • Sah Diperakui',
        },
        text: `Kak Ani, saya dah transfer RM${duitNowTotal.toFixed(2)} guna DuitNow. Ni resit bayarannya ya! Sekarang saya turun kafeteria ambil bungkusan 😊`,
      };

      setChatThreads((prevThreads) =>
        prevThreads.map((thread) => {
          if (thread.id === 'thread_kak_ani') {
            return {
              ...thread,
              lastMessage: `Bayaran RM${duitNowTotal.toFixed(2)} DuitNow Berjaya`,
              lastMessageTime: timeStr,
              messages: [...thread.messages, newDuitNowMsg],
            };
          }
          return thread;
        })
      );

      // Decrement product stock
      setProducts((prev) =>
        prev.map((p) =>
          p.id === duitNowProduct.id
            ? { ...p, stockLeft: Math.max(0, p.stockLeft - duitNowQty) }
            : p
        )
      );

      showToast(`Bayaran DuitNow RM${duitNowTotal.toFixed(2)} berjaya! Resit dihantar ke sembang Kak Ani.`);
      setActiveThreadId('thread_kak_ani');
      setActiveTab('sembang');
    } else {
      showToast(`Pesanan COD dicatat! Sila buat pembayaran tunai tepat semasa ambil di kafeteria.`);
      setActiveThreadId('thread_kak_ani');
      setActiveTab('sembang');
    }
  };

  const handleSendMessage = (threadId: string, text: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} PG`;

    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      time: timeStr,
      text,
    };

    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            lastMessage: text,
            lastMessageTime: timeStr,
            messages: [...thread.messages, userMsg],
          };
        }
        return thread;
      })
    );

    // Simulate polite reply from Kak Ani if chatting with her
    if (threadId === 'thread_kak_ani') {
      setTimeout(() => {
        const replyTime = `${now.getHours().toString().padStart(2, '0')}:${(now.getMinutes() + 1).toString().padStart(2, '0')} PG`;
        const sellerReplies = [
          'Baik Nurul, akak dah tandakan siap-siap. Jumpa di kaunter minuman ya! 👍',
          'Sama-sama Nurul! Sambal tu akak dah bungkus lebih sikit untuk Nurul. Selamat bertugas siaran langsung nanti ya! 🥰',
          'Alhamdulillah, terima kasih banyak Nurul! Nanti jumpa di kafeteria ya.',
        ];
        const randomReply = sellerReplies[Math.floor(Math.random() * sellerReplies.length)];

        const contactMsg: ChatMessage = {
          id: `msg_c_${Date.now()}`,
          sender: 'contact',
          senderName: sellerKakAni.nickname,
          senderAvatar: sellerKakAni.avatar,
          time: replyTime,
          text: randomReply,
        };

        setChatThreads((prev) =>
          prev.map((thread) => {
            if (thread.id === threadId) {
              return {
                ...thread,
                lastMessage: randomReply,
                lastMessageTime: replyTime,
                messages: [...thread.messages, contactMsg],
              };
            }
            return thread;
          })
        );
      }, 1500);
    }
  };

  const handleSubmitReview = (reviewData: {
    rating: number;
    text: string;
    tags: string[];
    photo?: string;
  }) => {
    setIsReviewOpen(false);

    const newRev: Review = {
      id: `rev_${Date.now()}`,
      authorName: currentUser.name,
      authorRole: currentUser.department,
      authorDept: currentUser.role,
      authorLocation: currentUser.location,
      authorAvatar: currentUser.avatar,
      verified: true,
      rating: reviewData.rating,
      date: 'Baru sebentar tadi',
      itemPurchased: selectedProduct.title,
      itemPrice: selectedProduct.price,
      paymentMethod: 'DuitNow QR',
      pickupLocation: selectedProduct.location,
      receivedTime: 'Diterima Hari Ini',
      photo: reviewData.photo,
      text: reviewData.text,
      helpfulCount: 1,
    };

    setReviews([newRev, ...reviews]);
    showToast('Terima kasih! Ulasan anda telah diterbitkan untuk tatapan rakan sekerja Media Prima.');
  };

  const handlePublishSuccess = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
    setSelectedProduct(newProduct);
    setActiveTab('detail');
    showToast('Iklan barangan anda berjaya diterbitkan ke suapan pasaran!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products by search query
  const searchedProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.seller.name.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const unreadCount = chatThreads.reduce((sum, t) => sum + t.unreadCount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 p-4 bg-slate-900 text-white text-xs font-semibold rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-3 duration-200 max-w-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unreadCount={unreadCount}
        onOpenCobeModal={() => setIsCobeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-5">
        {activeTab === 'pasar' && (
          <MarketplaceHome
            products={searchedProducts}
            onSelectProduct={handleSelectProduct}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCobeModal={() => setIsCobeOpen(true)}
          />
        )}

        {activeTab === 'detail' && (
          <ProductDetail
            product={selectedProduct}
            reviews={reviews}
            onBack={() => {
              setActiveTab('pasar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDuitNow={handleOpenDuitNow}
            onOpenChat={(prod) => {
              setActiveThreadId('thread_kak_ani');
              setActiveTab('sembang');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSellerProfile={() => {
              setActiveTab('profil');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenReviewModal={() => setIsReviewOpen(true)}
            onOpenCafeteriaMap={() => setIsMapOpen(true)}
          />
        )}

        {activeTab === 'iklan' && (
          <PublishListing
            currentUser={currentUser}
            onPublishSuccess={handlePublishSuccess}
            onPreview={(data) => {
              showToast('Pratonton paparan: Semak butiran sebelum hantar.');
            }}
          />
        )}

        {activeTab === 'sembang' && (
          <OrdersAndChat
            currentUser={currentUser}
            threads={chatThreads}
            activeThreadId={activeThreadId}
            onSelectThread={(id) => setActiveThreadId(id)}
            onSendMessage={handleSendMessage}
            onOpenSellerProfile={() => setActiveTab('profil')}
            onOpenReviewModal={() => setIsReviewOpen(true)}
            onOpenCafeteriaMap={() => setIsMapOpen(true)}
            onOpenDuitNowModal={() => handleOpenDuitNow(selectedProduct, 1, [], selectedProduct.price)}
          />
        )}

        {activeTab === 'profil' && (
          <SellerProfile
            seller={sellerKakAni}
            reviews={reviews}
            activeProducts={products.filter((p) => p.seller.id === sellerKakAni.id)}
            onBack={() => {
              setActiveTab('pasar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenChat={() => {
              setActiveThreadId('thread_kak_ani');
              setActiveTab('sembang');
            }}
            onOpenReviewModal={() => setIsReviewOpen(true)}
            onSelectProduct={handleSelectProduct}
            onOpenCobeModal={() => setIsCobeOpen(true)}
          />
        )}

        {activeTab === 'cobe' && (
          <div className="py-8">
            <CobeGuidelinesModal isOpen={true} onClose={() => setActiveTab('pasar')} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onOpenCobeModal={() => setIsCobeOpen(true)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        unreadCount={unreadCount}
      />

      {/* Global Interactive Modals */}
      <DuitNowModal
        product={duitNowProduct}
        quantity={duitNowQty}
        selectedAddOns={duitNowAddOns}
        totalAmount={duitNowTotal}
        isOpen={isDuitNowOpen}
        onClose={() => setIsDuitNowOpen(false)}
        onConfirmPayment={handleConfirmDuitNowPayment}
      />

      <ReviewModal
        seller={sellerKakAni}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

      <CafeteriaMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />

      <CobeGuidelinesModal
        isOpen={isCobeOpen}
        onClose={() => setIsCobeOpen(false)}
      />
    </div>
  );
}
