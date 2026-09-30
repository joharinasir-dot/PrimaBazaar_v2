import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  collection, 
  onSnapshot, 
  setDoc, 
  addDoc, 
  updateDoc, 
  query, 
  orderBy, 
  getDocs 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Product, Review, ChatMessage, ChatThread, User } from '../types';
import { initialProducts, initialReviews, initialChatThreads, currentUser, sellerKakAni } from '../data/mockData';

// 1. Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 2. Initialize Firestore with designated database ID (CRITICAL: Required for AI Studio provisioned instance)
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 3. Error Handling Architecture conforming to Firebase Integration Specification
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// 4. Test connection on boot (CRITICAL CONSTRAINT)
export async function testConnection(): Promise<boolean> {
  const testPath = 'test/connection';
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection verified successfully.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Verify configuration.');
    }
    return false;
  }
}

// 5. Seed ALL database collections if empty
export async function seedInitialDataIfEmpty() {
  try {
    // A. Seed Products
    const productsSnap = await getDocs(collection(db, 'products'));
    if (productsSnap.empty) {
      console.log('Seeding initial Media Prima products into Firestore...');
      for (const prod of initialProducts) {
        await setDoc(doc(db, 'products', prod.id), {
          ...prod,
          createdAt: new Date().toISOString(),
        });
      }
    }

    // B. Seed Reviews
    const reviewsSnap = await getDocs(collection(db, 'reviews'));
    if (reviewsSnap.empty) {
      console.log('Seeding initial colleague reviews into Firestore...');
      for (const rev of initialReviews) {
        await setDoc(doc(db, 'reviews', rev.id), {
          ...rev,
          createdAt: new Date().toISOString(),
        });
      }
    }

    // C. Seed Chat Threads
    const threadsSnap = await getDocs(collection(db, 'chat_threads'));
    if (threadsSnap.empty) {
      console.log('Seeding initial chat threads into Firestore...');
      for (const thread of initialChatThreads) {
        const { messages, ...threadMeta } = thread;
        await setDoc(doc(db, 'chat_threads', thread.id), {
          ...threadMeta,
          createdAt: new Date().toISOString(),
        });

        // Seed individual messages
        for (const msg of messages) {
          await setDoc(doc(db, 'chat_messages', msg.id), {
            ...msg,
            threadId: thread.id,
            createdAt: new Date().toISOString(),
          });
        }
      }
    }

    // D. Seed Staff User Directory
    const userDocSnap = await getDocs(collection(db, 'users'));
    if (userDocSnap.empty) {
      console.log('Seeding staff profiles into Firestore...');
      await setDoc(doc(db, 'users', currentUser.id), {
        ...currentUser,
        createdAt: new Date().toISOString(),
      });
      await setDoc(doc(db, 'users', sellerKakAni.id), {
        ...sellerKakAni,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn('Auto-seed check notice:', err);
  }
}

// 6. Firestore Real-time Subscriptions & Mutations

// --- Products ---
export function subscribeToProducts(
  onData: (products: Product[]) => void
) {
  const path = 'products';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(initialProducts);
        return;
      }
      const items: Product[] = [];
      snapshot.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as Product);
      });
      onData(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function addProductToFirestore(product: Product): Promise<void> {
  const path = `products/${product.id}`;
  try {
    await setDoc(doc(db, 'products', product.id), {
      ...product,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateProductStockInFirestore(productId: string, newStock: number): Promise<void> {
  const path = `products/${productId}`;
  try {
    await updateDoc(doc(db, 'products', productId), {
      stockLeft: newStock,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// --- Reviews ---
export function subscribeToReviews(
  onData: (reviews: Review[]) => void
) {
  const path = 'reviews';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(initialReviews);
        return;
      }
      const items: Review[] = [];
      snapshot.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as Review);
      });
      items.sort((a, b) => (b.date > a.date ? 1 : -1));
      onData(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function addReviewToFirestore(review: Review): Promise<void> {
  const path = `reviews/${review.id}`;
  try {
    await setDoc(doc(db, 'reviews', review.id), {
      ...review,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateReviewHelpfulInFirestore(reviewId: string, count: number): Promise<void> {
  const path = `reviews/${reviewId}`;
  try {
    await updateDoc(doc(db, 'reviews', reviewId), {
      helpfulCount: count,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// --- Chat Threads ---
export function subscribeToChatThreads(
  onData: (threads: ChatThread[]) => void
) {
  const path = 'chat_threads';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(initialChatThreads);
        return;
      }
      const threads: ChatThread[] = [];
      snapshot.forEach((d) => {
        threads.push({ id: d.id, ...d.data(), messages: [] } as any);
      });
      onData(threads);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function updateChatThreadInFirestore(
  threadId: string, 
  lastMessage: string, 
  lastMessageTime: string
): Promise<void> {
  const path = `chat_threads/${threadId}`;
  try {
    await updateDoc(doc(db, 'chat_threads', threadId), {
      lastMessage,
      lastMessageTime,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// --- Chat Messages ---
export function subscribeToChatMessages(
  threadId: string,
  onData: (messages: ChatMessage[]) => void
) {
  const path = 'chat_messages';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const items: (ChatMessage & { threadId?: string; createdAt?: string })[] = [];
      snapshot.forEach((d) => {
        const data = d.data();
        if (data.threadId === threadId) {
          items.push({ id: d.id, ...data } as any);
        }
      });
      if (items.length > 0) {
        items.sort((a, b) => ((a.createdAt || '') > (b.createdAt || '') ? 1 : -1));
        onData(items);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function addChatMessageToFirestore(threadId: string, message: ChatMessage): Promise<void> {
  const path = `chat_messages/${message.id}`;
  try {
    await setDoc(doc(db, 'chat_messages', message.id), {
      ...message,
      threadId,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// --- Orders ---
export interface OrderRecord {
  id: string;
  productId: string;
  productTitle: string;
  quantity: number;
  totalAmount: number;
  paymentMethod: 'duitnow' | 'cod';
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  referenceNo?: string;
  status: 'paid' | 'pending_cod' | 'collected';
  createdAt: string;
}

export async function createOrderInFirestore(order: OrderRecord): Promise<void> {
  const path = `orders/${order.id}`;
  try {
    await setDoc(doc(db, 'orders', order.id), {
      ...order,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeToOrders(
  onData: (orders: OrderRecord[]) => void
) {
  const path = 'orders';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const items: OrderRecord[] = [];
      snapshot.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as OrderRecord);
      });
      onData(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

// --- User Profiles ---
export async function saveUserProfileToFirestore(user: User): Promise<void> {
  const path = `users/${user.id}`;
  try {
    await setDoc(doc(db, 'users', user.id), {
      ...user,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 7. Authentication Helpers
export async function loginWithGoogle(): Promise<FirebaseUser | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google Sign-in Error:', error);
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
}
