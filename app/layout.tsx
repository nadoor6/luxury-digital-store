import './globals.css'
import { Inter, Playfair_Display, Montserrat } from 'next/font/google'
import { ThemeProvider } from '../components/ThemeProvider'
import { AuthProvider } from '../contexts/AuthContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata = {
  title: {
    default: 'Luxury Digital Store - Premium Digital Goods',
    template: '%s | LuxuryStore.nd'
  },
  description: 'Your premier destination for Telegram Premium, V-Bucks, Steam Wallet, Virtual MasterCard, PayPal Funds, and more premium digital goods. Instant delivery, secure payments, 24/7 support.',
  keywords: 'telegram premium, v-bucks, steam wallet, digital goods, luxury store, virtual mastercard, paypal funds, instant delivery',
  authors: [{ name: 'LuxuryStore.nd' }],
  creator: 'LuxuryStore.nd',
  publisher: 'LuxuryStore.nd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://luxurystore.nd'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Luxury Digital Store - Premium Digital Goods',
    description: 'Premium digital products with unparalleled service and instant delivery',
    url: 'https://luxurystore.nd',
    siteName: 'LuxuryStore.nd',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Digital Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Digital Store',
    description: 'Premium digital products with unparalleled service and instant delivery',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} min-h-full bg-cream-white text-dark-grey dark:bg-dark-grey dark:text-cream-white transition-colors duration-300 font-sans`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}