import PortfolioSummary from '../../components/PortfolioSummary';
import AssetsTable from '../../components/AssetsTable';
import PortfolioOverview from '../../components/PortfolioOverview';
import PieChart from '../../components/PieChart';
import Breadcrumb from '../../components/Breadcrumb';
import { getAssetAllocation } from '../../data/mockData';

export default function Dashboard() {
  const assetData = getAssetAllocation();
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
            Dashboard Detalhado
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-200">
            Visão completa do seu portfólio com gráficos e análises
          </p>
        </div>

        <div className="mb-8">
          <PortfolioSummary />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabela de ativos - 2/3 da largura */}
          <div className="lg:col-span-2">
            <AssetsTable />
          </div>

          {/* Sidebar com overview e gráfico - 1/3 da largura */}
          <div className="space-y-6">
            <PortfolioOverview />
            <PieChart data={assetData} />
          </div>
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
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
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
