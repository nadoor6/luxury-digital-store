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
      <body className="min-h-screen bg-black text-white transition-colors duration-300 overflow-x-hidden">
        {/* Enhanced Live Dark B&W Abstract Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden bg-abstract-grid">
          {/* Enhanced Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90 bg-size-200 animate-gradient-shift"></div>
          
          {/* Enhanced Floating Abstract Elements */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float-sophisticated"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-white/8 rounded-full blur-3xl animate-float-sophisticated animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-white/12 rounded-full blur-3xl animate-float-sophisticated animation-delay-4000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/6 rounded-full blur-3xl animate-float-sophisticated animation-delay-3000"></div>
          
          {/* Enhanced Geometric Patterns */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-10 w-3 h-3 bg-white rounded-full animate-pulse-sophisticated"></div>
            <div className="absolute top-40 right-20 w-2 h-2 bg-white rounded-full animate-pulse-sophisticated animation-delay-1000"></div>
            <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-white rounded-full animate-pulse-sophisticated animation-delay-2000"></div>
            <div className="absolute top-1/2 right-32 w-2 h-2 bg-white rounded-full animate-pulse-sophisticated animation-delay-500"></div>
            <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-white rounded-full animate-pulse-sophisticated animation-delay-1500"></div>
          </div>

          {/* Enhanced Animated Grid */}
          <div className="absolute inset-0 opacity-[0.03] bg-shimmer-animated"></div>
          
          {/* Additional Floating Dots Layer */}
          <div className="absolute inset-0 bg-floating-dots"></div>
        </div>
        
        {/* Main Content */}
        <ThemeProvider>
          <WalletProvider>
            <CartProvider>
              {/* Enhanced Header */}
              <Header />
              
              {/* Main Content Area */}
              <main className="min-h-screen relative z-10 pt-24 pb-16">
                <div className="container mx-auto px-4">
                  {children}
                </div>
              </main>
              
              {/* Enhanced Glass Footer */}
              <footer className="glass-card border-t border-white/10 relative z-10 mt-16">
                <div className="container mx-auto px-4 py-8">
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg glass-card border border-white/20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">U</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="brand-ugarit text-lg leading-none">Ugarit</span>
                        <span className="text-white/60 text-xs font-medium tracking-wider">DIGITAL</span>
                      </div>
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
                      © 2024 Ugarit Digital. All rights reserved.
                    </p>
                  </div>
                  
                  {/* Enhanced Footer Bottom */}
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