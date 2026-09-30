import React, { useState, useEffect } from 'react';
import { 
  currentUser as defaultUser, 
  sellerKakAni, 
  initialProducts, 
  initialReviews, 
  initialChatThreads 
} from './data/mockData';
import { Product, Review, ChatThread, ChatMessage, User } from './types';
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
import { 
  testConnection, 
  seedInitialDataIfEmpty, 
  subscribeToProducts, 
  addProductToFirestore, 
  updateProductStockInFirestore,
  subscribeToReviews, 
  addReviewToFirestore, 
  subscribeToChatThreads,
  subscribeToChatMessages,
  addChatMessageToFirestore,
  updateChatThreadInFirestore,
  createOrderInFirestore,
  OrderRecord,
  auth,
  loginWithGoogle,
  logoutUser
} from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [activeTab, setActiveTab] = useState<'pasar' | 'detail' | 'iklan' | 'sembang' | 'profil' | 'cobe'>('pasar');
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProducts[0]);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(initialChatThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>('thread_kak_ani');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  // Modal states
  const [isDuitNowOpen, setIsDuitNowOpen] = useState(false);
  const [duitNowProduct, setDuitNowProduct] = useState<Product>(initialProducts[0]);
  const [duitNowQty, setDuitNowQty] = useState(1);
  const [duitNowAddOns, setDuitNowAddOns] = useState<string[]>([]);
  const [duitNowTotal, setDuitNowTotal] = useState(6.00);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isCobeOpen, setIsCobeOpen] = useState(false);

  // Initialize and connect to Firebase Firestore
  useEffect(() => {
    let unsubscribeProducts: (() => void) | undefined;
    let unsubscribeReviews: (() => void) | undefined;
    let unsubscribeThreads: (() => void) | undefined;

    async function initializeFirebase() {
      // 1. Mandatory connection test
      const connected = await testConnection();
      setIsFirebaseConnected(connected);

      // 2. Auto-seed ALL default collections if empty (products, reviews, chat_threads, chat_messages, users)
      await seedInitialDataIfEmpty();

      // 3. Real-time products listener
      unsubscribeProducts = subscribeToProducts((realtimeProducts) => {
        if (realtimeProducts && realtimeProducts.length > 0) {
          setProducts(realtimeProducts);
        }
      });

      // 4. Real-time reviews listener
      unsubscribeReviews = subscribeToReviews((realtimeReviews) => {
        if (realtimeReviews && realtimeReviews.length > 0) {
          setReviews(realtimeReviews);
        }
      });

      // 5. Real-time chat threads listener
      unsubscribeThreads = subscribeToChatThreads((realtimeThreads) => {
        if (realtimeThreads && realtimeThreads.length > 0) {
          setChatThreads((prev) =>
            realtimeThreads.map((rt) => {
              const local = prev.find((p) => p.id === rt.id);
              return {
                ...rt,
                messages: local ? local.messages : [],
              };
            })
          );
        }
      });
    }

    initializeFirebase();

    // 6. Real-time chat messages listener for active thread
    const unsubscribeMessages = subscribeToChatMessages(activeThreadId, (messages) => {
      if (messages && messages.length > 0) {
        setChatThreads((prev) =>
          prev.map((thread) => {
            if (thread.id === activeThreadId) {
              return {
                ...thread,
                messages: [...thread.messages, ...messages.filter((m) => !thread.messages.some((tm) => tm.id === m.id))],
              };
            }
            return thread;
          })
        );
      }
    });

    // 7. Auth state listener
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser((prev) => ({
          ...prev,
          id: firebaseUser.uid,
          name: firebaseUser.displayName || prev.name,
          avatar: firebaseUser.photoURL || prev.avatar,
          verified: true,
        }));
      }
    });

    return () => {
      if (unsubscribeProducts) unsubscribeProducts();
      if (unsubscribeReviews) unsubscribeReviews();
      if (unsubscribeThreads) unsubscribeThreads();
      unsubscribeMessages();
      unsubscribeAuth();
    };
  }, [activeThreadId]);

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

  const handleConfirmDuitNowPayment = async (method: 'duitnow' | 'cod') => {
    setIsDuitNowOpen(false);

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} PG`;
    const referenceNo = `DUIT-MP-20241024-${Math.floor(10000 + Math.random() * 90000)}`;

    // 1. Record Order in Firestore
    const newOrder: OrderRecord = {
      id: `ord_${Date.now()}`,
      productId: duitNowProduct.id,
      productTitle: duitNowProduct.title,
      quantity: duitNowQty,
      totalAmount: duitNowTotal,
      paymentMethod: method,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      sellerId: duitNowProduct.seller.id,
      sellerName: duitNowProduct.seller.name,
      referenceNo: method === 'duitnow' ? referenceNo : undefined,
      status: method === 'duitnow' ? 'paid' : 'pending_cod',
      createdAt: new Date().toISOString(),
    };
    await createOrderInFirestore(newOrder);

    if (method === 'duitnow') {
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
          referenceNo,
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

      // Decrement stock in Firestore
      const newStock = Math.max(0, duitNowProduct.stockLeft - duitNowQty);
      await updateProductStockInFirestore(duitNowProduct.id, newStock);
      await addChatMessageToFirestore('thread_kak_ani', newDuitNowMsg);
      await updateChatThreadInFirestore('thread_kak_ani', `Bayaran RM${duitNowTotal.toFixed(2)} DuitNow Berjaya`, timeStr);

      showToast(`Bayaran DuitNow RM${duitNowTotal.toFixed(2)} berjaya! Rekod pesanan disimpan di Firebase Firestore.`);
      setActiveThreadId('thread_kak_ani');
      setActiveTab('sembang');
    } else {
      showToast(`Pesanan COD dicatat & disimpan di Firebase Firestore! Sila buat pembayaran tunai tepat semasa ambil di kafeteria.`);
      setActiveThreadId('thread_kak_ani');
      setActiveTab('sembang');
    }
  };

  const handleSendMessage = async (threadId: string, text: string) => {
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

    // Save to Firestore collections: chat_messages and update chat_threads
    await addChatMessageToFirestore(threadId, userMsg);
    await updateChatThreadInFirestore(threadId, text, timeStr);

    // Simulate polite reply from Kak Ani if chatting with her
    if (threadId === 'thread_kak_ani') {
      setTimeout(async () => {
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

        await addChatMessageToFirestore(threadId, contactMsg);
        await updateChatThreadInFirestore(threadId, randomReply, replyTime);
      }, 1500);
    }
  };

  const handleSubmitReview = async (reviewData: {
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

    // Store into Firebase Firestore
    await addReviewToFirestore(newRev);
    setReviews([newRev, ...reviews]);
    showToast('Terima kasih! Ulasan disimpan ke Firebase Firestore untuk tatapan rakan sekerja Media Prima.');
  };

  const handlePublishSuccess = async (newProduct: Product) => {
    // Save to Firestore
    await addProductToFirestore(newProduct);
    setProducts([newProduct, ...products]);
    setSelectedProduct(newProduct);
    setActiveTab('detail');
    showToast('Iklan barangan anda berjaya diterbitkan & disimpan ke Firebase Firestore!');
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
