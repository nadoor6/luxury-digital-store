import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import './globals.css';

// Add metadata for better SEO
export const metadata = {
  title: 'Luxury Digital Store - Premium Digital Products',
  description: 'Discover exclusive luxury digital products and experiences',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          
          {/* We'll add Footer component later */}
          <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-8">
              <p className="text-center text-gray-600 dark:text-gray-400">
                © 2024 Luxury Digital Store. All rights reserved.
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}