import { ThemeProvider } from '@/components/ThemeProvider';
import { WalletProvider } from '@/contexts/WalletContext';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import './globals.css';

export const metadata = {
  title: 'Ugarit - Premium Digital Luxury',
  description: 'Exclusive digital products and experiences for the discerning client',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white transition-colors duration-300">
        <ThemeProvider>
          <WalletProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              
              <footer className="bg-black border-t border-white/10">
                <div className="container mx-auto px-4 py-8">
                  <p className="text-center text-gray-400 font-helvetica">
                    © 2024 Ugarit. All rights reserved.
                  </p>
                </div>
              </footer>
            </CartProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}