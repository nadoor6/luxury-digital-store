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
import { Product } from '@/types/product';

export async function getProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, 'products'));
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

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, imageFile?: File): Promise<string> {
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const docRef = await addDoc(collection(db, 'products'), productData);
  return docRef.id;
}

export async function updateProduct(id: string, product: Partial<Product>, imageFile?: File): Promise<void> {
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
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('featured', '==', true),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
}