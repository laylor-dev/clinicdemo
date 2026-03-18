import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Loader from '@/components/Loader';
import { LanguageProvider } from '@/i18n/LanguageContext';

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ADA Clinic | Premium Esthetic Dentistry',
  description: 'Designing smiles that are as healthy as they are beautiful.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#14151d] text-[#eae8e8] selection:bg-[#b38c61] selection:text-white" suppressHydrationWarning>
        <LanguageProvider>
          <Loader />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
