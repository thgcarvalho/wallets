'use client';

import { getTotalPortfolioValue, getPerformanceRating, getPerformanceColor } from '../data/mockData';
import { getBtcPrice, getEurRate } from '../data/currentPrices';

export default function PortfolioOverview() {
  const totalValue = getTotalPortfolioValue();
  const performanceRating = getPerformanceRating(totalValue);
  const performanceColor = getPerformanceColor(performanceRating);

  // Conversões para outras moedas
  const eurValue = totalValue * getEurRate();
  const btcValue = totalValue / getBtcPrice();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Resumo do Portfólio
      </h3>
      
      {/* Valores totais */}
      <div className="mb-6">
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          TOTAL
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">USD:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">EUR:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              €{eurValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">BTC:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {btcValue.toFixed(5)}
            </span>
          </div>
        </div>
      </div>

      {/* Performance Rating */}
      <div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
          Performance Rating
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded text-center">
            &lt; 20K<br />RUIM
          </div>
          <div className="bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded text-center">
            23K<br />BOM
          </div>
          <div className="bg-blue-400 text-white text-xs font-medium px-2 py-1 rounded text-center">
            27K<br />ÓTIMO
          </div>
          <div className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded text-center">
            &gt; 30K<br />EXCELENTE
          </div>
        </div>
        
        {/* Rating atual */}
        <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Rating Atual:</span>
            <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ml-2 ${performanceColor}`}>
              {performanceRating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
