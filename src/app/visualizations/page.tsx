import AssetsTableWithWallets from '../../components/AssetsTableWithWallets';
import TotalGroupedView from '../../components/TotalGroupedView';
import WalletsBTCEURView from '../../components/WalletsBTCEURView';
import PortfolioSummary from '../../components/PortfolioSummary';
import Breadcrumb from '../../components/Breadcrumb';

export default function Visualizations() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
            Visualizações do Portfólio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-200">
            Diferentes perspectivas dos seus investimentos cripto
          </p>
        </div>

        {/* Resumo geral */}
        <div className="mb-8">
          <PortfolioSummary />
        </div>

        {/* Visualização 1: Ativos com coluna de wallets */}
        <div id="assets-wallets" className="mb-12 scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
              1. Visualização de Ativos com Coluna de Wallets
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tabela completa com todos os ativos, incluindo informações de carteiras e redes
            </p>
          </div>
          <AssetsTableWithWallets />
        </div>

        {/* Visualização 2: Total agrupado */}
        <div id="total-grouped" className="mb-12 scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
              2. Visualização Total Agrupada
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Resumo dos ativos agrupados por criptomoeda com valores e alocações
            </p>
          </div>
          <TotalGroupedView />
        </div>

        {/* Visualização 3: Lista de carteiras com BTC e EUR */}
        <div id="wallets-btc-eur" className="mb-12 scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
              3. Lista de Carteiras com Valores em BTC e EUR
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Visão das carteiras individuais com seus valores em Bitcoin e Euro
            </p>
          </div>
          <WalletsBTCEURView />
        </div>

        {/* Footer com disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Quotes are not sourced from all markets and may be delayed up to 20 minutes. 
            Information is provided &apos;as is&apos; and solely for informational purposes, 
            not for trading purposes or advice. Disclaimer
          </p>
          
          {/* Barra de navegação */}
          <div className="flex justify-center items-center gap-8 py-3 border-t border-gray-200 dark:border-gray-600">
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
              + =
            </button>
            <button className="text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
              TOTAL
            </button>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
              WALLETS
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
