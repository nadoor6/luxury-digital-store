'use client';

import { Product, initialProducts } from './utils';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'luxury-store-products';

export class ProductStorage {
  static getProducts(): Product[] {
    if (typeof window === 'undefined') return initialProducts;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const products = JSON.parse(stored);
        // Convert date strings back to Date objects
        return products.map((product: any) => ({
          ...product,
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt)
        }));
      }
      
      // Initialize with sample products
      this.saveProducts(initialProducts);
      return initialProducts;
    } catch (error) {
      console.error('Error loading products:', error);
      return initialProducts;
    }
  }

  static saveProducts(products: Product[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }

  static addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...productData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedProducts = [...products, newProduct];
    this.saveProducts(updatedProducts);
    return newProduct;
  }

  static updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    const updatedProduct = {
      ...products[index],
      ...updates,
      updatedAt: new Date()
    };
    
    products[index] = updatedProduct;
    this.saveProducts(products);
    return updatedProduct;
  }

  static deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length === products.length) return false;
    
    this.saveProducts(filteredProducts);
    return true;
  }

  static getProduct(id: string): Product | null {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  }
}