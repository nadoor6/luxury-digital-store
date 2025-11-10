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
              {/* Adjusted padding for mobile bottom navigation */}
              <main className="min-h-screen pt-20 lg:pt-24 pb-20 lg:pb-16">
                <div className="container mx-auto px-4">
                  {children}
                </div>
              </main>
              
              <footer className="glass-card border-t border-white/10 mt-16">
                <div className="container mx-auto px-4 py-8">
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Simplified Brand - Only Ugarit */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg glass-card border border-white/20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">U</span>
                      </div>
                      <span className="brand-ugarit text-lg font-bold">Ugarit</span>
                    </div>
                    
                    {/* Links */}
                    <nav className="flex items-center gap-6 text-sm">
                      <a href="/privacy" className="text-white/60 hover:text-white transition-colors duration-300 font-helvetica">
                        Privacy
                      </a>
                      <a href="/terms" className="text-white/60 hover:text-white transition-colors duration-300 font-helvetica">
                        Terms
                      </a>
                      <a href="/contact" className="text-white/60 hover:text-white transition-colors duration-300 font-helvetica">
                        Contact
                      </a>
                    </nav>
                    
                    {/* Copyright */}
                    <p className="text-white/40 text-sm font-helvetica">
                      © 2024 Ugarit. All rights reserved.
                    </p>
                  </div>
                  
                  {/* Footer Bottom */}
                  <div className="mt-6 pt-6 border-t border-white/5 text-center">
                    <p className="text-white/30 text-xs font-helvetica">
                      Crafted with precision for the discerning digital connoisseur
                    </p>
                  </div>
                </div>
              </footer>
            </CartProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}