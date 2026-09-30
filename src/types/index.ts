export interface User {
  id: string;
  name: string;
  ssoId: string;
  role: string;
  department: string;
  location: string;
  avatar: string;
  verified: boolean;
  transactionsCompleted: number;
  phoneExt: string;
}

export interface Seller {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  phoneExt: string;
  ssoId: string;
  yearsOfService: number;
  cobeCompliance: number;
  isTopSeller: boolean;
  statusText: string;
  isActiveToday: boolean;
  responseTime: string;
  pickupLocation: string;
  pickupTimeMorning: string;
  pickupTimeNoon: string;
  satisfactionScore: number;
  totalReviews: number;
  successfulSales: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  praiseTags: { label: string; count: number; icon: string }[];
  mediaUnits: string[];
}

export interface AddOnOption {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: 'makanan' | 'pakaian' | 'gajet' | 'pejabat' | 'lain';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  discountPct?: number;
  unitLabel: string;
  stockLeft: number;
  totalStock: number;
  location: string;
  hub: 'sri_pentas' | 'balai_berita' | 'glenmarie' | 'rev_media';
  images: string[];
  seller: Seller;
  rating: number;
  reviewCount: number;
  badge?: string;
  isEditorPick?: boolean;
  isMpbPick?: boolean;
  isFlashSale?: boolean;
  flashSaleProgress?: string;
  waktuAmbilan: string;
  statusSuhu: string;
  penyediaan: string;
  description: string;
  recipeStory?: string;
  contents?: string[];
  addOns?: AddOnOption[];
  tags: string[];
  floorPlanArea?: string;
  adId: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorRole: string;
  authorDept: string;
  authorLocation: string;
  authorAvatar?: string;
  verified: boolean;
  rating: number;
  date: string;
  itemPurchased: string;
  itemPrice: number;
  paymentMethod: string;
  text: string;
  photo?: string;
  helpfulCount: number;
  pickupLocation?: string;
  receivedTime?: string;
  reply?: {
    authorName: string;
    role: string;
    text: string;
    time: string;
  };
}

export interface DuitNowSlip {
  amount: number;
  recipientName: string;
  recipientAccount: string;
  recipientPhone: string;
  referenceNo: string;
  transactionTime: string;
  sourceAccount: string;
  fileName: string;
  fileSize: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'contact' | 'system';
  senderName?: string;
  senderAvatar?: string;
  time: string;
  text?: string;
  duitNowSlip?: DuitNowSlip;
  isPaymentConfirmation?: boolean;
  isOrderStatus?: boolean;
  statusTitle?: string;
  statusSubtitle?: string;
  actions?: {
    label: string;
    action: string;
  }[];
}

export interface ChatThread {
  id: string;
  contactId: string;
  contactName: string;
  contactNickname?: string;
  contactDept: string;
  contactExt: string;
  contactAvatar: string;
  contactActiveStatus?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  category: 'buy' | 'sell';
  relatedItem: {
    title: string;
    price: number;
    image: string;
    quantity: number;
    statusText: string;
    pickupLocation: string;
    pickupTime?: string;
    isPaid: boolean;
  };
  messages: ChatMessage[];
}

export interface NewListing {
  title: string;
  category: 'makanan' | 'pakaian' | 'gajet' | 'pejabat';
  condition: '10/10' | '9/10' | '7/10';
  description: string;
  price: number;
  negotiable: boolean;
  acceptDuitNow: boolean;
  acceptCod: boolean;
  hub: string;
  specificLocation: string;
  timeAvailability: string;
  conciergeAvailable: boolean;
  cobeConsent: boolean;
  images: string[];
}
