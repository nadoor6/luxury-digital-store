export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  popular?: boolean;
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const initialProducts: Product[] = [
  {
    id: '1',
    name: "Telegram Premium",
    price: "$4.99",
    originalPrice: "$6.99",
    description: "Upgrade your messaging experience with Telegram Premium. Enjoy exclusive features including larger file sharing (up to 4GB), faster downloads, unique stickers, and advanced chat management tools.",
    image: "/images/telegram-premium.jpg",
    category: "messaging",
    features: ["4GB File Upload", "Voice-to-Text Conversion", "Premium Stickers", "Faster Downloads", "Advanced Chat Management"],
    popular: true,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: "Telegram Stars",
    price: "$9.99",
    originalPrice: "$12.99",
    description: "Support your favorite content creators with Telegram Stars. This virtual currency allows you to show appreciation for premium content and exclusive channels.",
    image: "/images/telegram-stars.jpg",
    category: "messaging",
    features: ["Support Creators", "Premium Content Access", "Digital Tips", "Exclusive Channels"],
    popular: false,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: "V-Bucks",
    price: "$7.99 - $79.99",
    description: "Get the latest Fortnite skins, battle passes, and emotes with V-Bucks. Instant delivery guaranteed with multiple package options to suit your gaming needs.",
    image: "/images/vbucks.jpg",
    category: "gaming",
    features: ["Instant Delivery", "Exclusive Skins", "Battle Pass", "Seasonal Items", "Cross-Platform"],
    popular: true,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: "Steam Wallet",
    price: "$10 - $100",
    description: "Fund your Steam account for games, DLC, software, and marketplace items. Region-free codes with instant digital delivery.",
    image: "/images/steam-wallet.jpg",
    category: "gaming",
    features: ["Region Free Codes", "Instant Delivery", "Games & DLC", "Software & Tools", "Marketplace Items"],
    popular: false,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '5',
    name: "Virtual MasterCard",
    price: "$25 - $500",
    description: "Digital MasterCard for online purchases worldwide. Perfect for subscriptions, international shopping, and secure online transactions. No physical card required.",
    image: "/images/mastercard.jpg",
    category: "financial",
    features: ["Worldwide Acceptance", "Online Shopping", "Subscription Payments", "Secure Transactions", "Instant Activation"],
    popular: true,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '6',
    name: "PayPal Funds",
    price: "$10 - $1000",
    description: "Add funds to your PayPal account securely. Use for online payments, money transfers, shopping, and business transactions with buyer protection.",
    image: "/images/paypal.jpg",
    category: "financial",
    features: ["Secure Transfer", "Instant Delivery", "Online Payments", "Money Transfers", "Buyer Protection"],
    popular: false,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const features = [
  {
    title: 'Instant Digital Delivery',
    description: 'Receive your digital goods immediately after payment confirmation',
    icon: 'shipping'
  },
  {
    title: 'Bank-Level Security',
    description: 'All transactions protected with enterprise-grade encryption',
    icon: 'shield'
  },
  {
    title: '24/7 Premium Support',
    description: 'Round-the-clock customer support from our expert team',
    icon: 'support'
  }
];

export const categories = [
  { value: 'messaging', label: 'Messaging' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'financial', label: 'Financial' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'utilities', label: 'Utilities' }
];