import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeSwitch from '../components/ThemeSwitch';
import NavigationMenu from '../components/NavigationMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wallets - Portfólio de Carteiras Cripto',
  description: 'Sistema para gerenciar carteiras cripto e acompanhar investimentos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <NavigationMenu />
          <div className="flex justify-end p-4">
            <ThemeSwitch />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
