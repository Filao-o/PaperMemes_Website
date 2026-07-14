import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'Papermemes — Paper trading de memecoins sans risque',
  description: "Papermemes simule le trading de memecoins sur de vrais prix de marché. Entraîne-toi, analyse tes erreurs, progresse — sans perdre d'argent réel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
        <GoogleAnalytics gaId="G-7QQ41GV4FD" />
      </body>
    </html>
  );
}
