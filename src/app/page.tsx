'use client';

import PortfolioSummary from '../components/PortfolioSummary';
import WalletList from '../components/WalletList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
            Portfólio de Carteiras
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-200">
            Gerencie suas carteiras cripto e acompanhe seus investimentos
          </p>
        </div>

        <div className="space-y-8">
          <PortfolioSummary />
          <WalletList />
        </div>
      </div>
    </main>
  );
}
