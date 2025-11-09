export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  featured: boolean;
  stock: number; // Added for inventory management
  isActive: boolean; // Added to show/hide products
  deliveryType: 'instant' | 'manual' | 'auto'; // Added for digital delivery
  digitalContent?: string; // Added for license keys, download links, etc.
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// NEW: Order interface for order management
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'delivered' | 'cancelled';
  customerEmail: string;
  createdAt: string;
  updatedAt: string;
}

// NEW: Category interface for product organization
export interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}