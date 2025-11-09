'use client';

import { Product, Category, Order } from '@/types/product';

const STORAGE_KEYS = {
  PRODUCTS: 'luxury-store-products',
  CATEGORIES: 'luxury-store-categories',
  ORDERS: 'luxury-store-orders'
};

// Helper function to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// PRODUCT OPERATIONS

export const getProducts = async (): Promise<Product[]> => {
  await delay(500); // Simulate network delay
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) {
      return JSON.parse(stored);
    }
    // Return default products if none exist
    return [];
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  await delay(300);
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
};

export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, imageFile?: File): Promise<Product> => {
  await delay(1000);
  const products = await getProducts();
  
  const newProduct: Product = {
    ...productData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // If there's an image file, we would normally upload it and get a URL, but for now we'll use a placeholder
  if (imageFile) {
    // In a real app, you would upload the image and get a URL
    // For now, we'll create a dummy URL
    newProduct.imageUrl = URL.createObjectURL(imageFile);
  } else {
    newProduct.imageUrl = '/images/placeholder-product.jpg';
  }

  const updatedProducts = [...products, newProduct];
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updatedProducts));
  
  return newProduct;
};

export const updateProduct = async (id: string, productData: Partial<Product>, imageFile?: File): Promise<Product> => {
  await delay(1000);
  const products = await getProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Product not found');
  }

  const updatedProduct = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString()
  };

  if (imageFile) {
    updatedProduct.imageUrl = URL.createObjectURL(imageFile);
  }

  products[index] = updatedProduct;
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  
  return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await delay(500);
  const products = await getProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filteredProducts));
};

// CATEGORY OPERATIONS

export const getCategories = async (): Promise<Category[]> => {
  await delay(500);
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (stored) {
      return JSON.parse(stored);
    }
    // Default categories
    const defaultCategories: Category[] = [
      { id: '1', name: 'apps', description: 'Apps & Software', isActive: true, createdAt: new Date().toISOString() },
      { id: '2', name: 'subscriptions', description: 'Subscriptions', isActive: true, createdAt: new Date().toISOString() },
      { id: '3', name: 'game-coins', description: 'Game Coins', isActive: true, createdAt: new Date().toISOString() },
      { id: '4', name: 'accounts', description: 'Accounts', isActive: true, createdAt: new Date().toISOString() },
      { id: '5', name: 'licenses', description: 'Licenses', isActive: true, createdAt: new Date().toISOString() },
    ];
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
    return defaultCategories;
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
};

// ORDER OPERATIONS (if needed)

export const getOrders = async (): Promise<Order[]> => {
  await delay(500);
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading orders:', error);
    return [];
  }
};

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  await delay(1000);
  const orders = await getOrders();
  
  const newOrder: Order = {
    ...orderData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updatedOrders = [...orders, newOrder];
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));
  
  return newOrder;
};