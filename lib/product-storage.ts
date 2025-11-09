import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { Product, Category, Order } from '@/types/product';

// PRODUCT OPERATIONS
export async function getProducts(): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
}

export async function getProduct(id: string): Promise<Product | null> {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  }
  return null;
}

export async function createProduct(
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, 
  imageFile?: File
): Promise<string> {
  let imageUrl = product.imageUrl;
  
  // Upload image if provided
  if (imageFile) {
    const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(snapshot.ref);
  }

  const productData = {
    ...product,
    imageUrl,
    stock: product.stock || 0,
    isActive: product.isActive !== undefined ? product.isActive : true,
    deliveryType: product.deliveryType || 'manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const docRef = await addDoc(collection(db, 'products'), productData);
  return docRef.id;
}

export async function updateProduct(
  id: string, 
  product: Partial<Product>, 
  imageFile?: File
): Promise<void> {
  let updates: any = { ...product, updatedAt: new Date().toISOString() };
  
  // Upload new image if provided
  if (imageFile) {
    const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    updates.imageUrl = await getDownloadURL(snapshot.ref);
  }

  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, updates);
}

export async function deleteProduct(id: string): Promise<void> {
  // Soft delete by setting isActive to false
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, { 
    isActive: false, 
    updatedAt: new Date().toISOString() 
  });
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('featured', '==', true),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('category', '==', category),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
}

// CATEGORY OPERATIONS
export async function getCategories(): Promise<Category[]> {
  const q = query(
    collection(db, 'categories'),
    where('isActive', '==', true),
    orderBy('name', 'asc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Category));
}

export async function createCategory(category: Omit<Category, 'id' | 'createdAt'>): Promise<string> {
  const categoryData = {
    ...category,
    createdAt: new Date().toISOString()
  };

  const docRef = await addDoc(collection(db, 'categories'), categoryData);
  return docRef.id;
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<void> {
  const docRef = doc(db, 'categories', id);
  await updateDoc(docRef, category);
}

export async function deleteCategory(id: string): Promise<void> {
  // Soft delete category
  const docRef = doc(db, 'categories', id);
  await updateDoc(docRef, { 
    isActive: false 
  });
}

// ORDER OPERATIONS
export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const orderData = {
    ...order,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const docRef = await addDoc(collection(db, 'orders'), orderData);
  return docRef.id;
}

export async function getOrders(): Promise<Order[]> {
  const q = query(
    collection(db, 'orders'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Order));
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  const docRef = doc(db, 'orders', id);
  await updateDoc(docRef, { 
    status, 
    updatedAt: new Date().toISOString() 
  });
}

// INVENTORY MANAGEMENT
export async function updateProductStock(productId: string, quantity: number): Promise<void> {
  const product = await getProduct(productId);
  if (product) {
    const newStock = product.stock - quantity;
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, { 
      stock: newStock,
      updatedAt: new Date().toISOString()
    });
  }
}