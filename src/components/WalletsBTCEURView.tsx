'use client';

import { getWalletValuesInBTCAndEUR, getTotalValuesInBTCAndEUR } from '../data/mockData';
import { useCurrency } from '../contexts/CurrencyContext';

export default function WalletsBTCEURView() {
  const walletsWithValues = getWalletValuesInBTCAndEUR();
  const totals = getTotalValuesInBTCAndEUR();
  const { selectedCurrency } = useCurrency();

  // Nomes simbólicos para as carteiras (como na imagem 3)
  const getWalletSymbolicName = (walletName: string) => {
    const symbolicNames: { [key: string]: string } = {
      'LDG-CLD-STR': 'Vela',
      'BLU-ARG-TLY': 'Cisne',
      'ELE-CLD-UND': 'Coração',
      'ELE-HOT-BIN': 'Cadeira',
      'ELE-HOT-PLS': 'Gancho',
      'BLU-HOT-TER': 'Cereja',
      'MET-HOT-DEF': 'Vara',
      'XMET-HOT-DEF': 'BIN',
      'TZR-CLD-DBM': 'CNX',
      'BINANCE': 'BIN'
    };
    return symbolicNames[walletName] || walletName;
  };

  // Cores para as carteiras
  const getWalletColor = (index: number) => {
    const colors = [
      'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500', 
      'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-orange-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                WLT
              </th>
              <th className="px-4 py-3 text-left font-medium">
                BTC
              </th>
              <th className="px-4 py-3 text-left font-medium">
                EUR
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Código
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {walletsWithValues.map((wallet, index) => (
              <tr 
                key={wallet.uuid} 
                className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${getWalletColor(index)}`}></span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {getWalletSymbolicName(wallet.name)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {selectedCurrency === 'HIDDEN' ? '••••••' : (wallet.valueBTC > 0 ? wallet.valueBTC.toFixed(8) : '')}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {selectedCurrency === 'HIDDEN' ? '••••••' : (wallet.valueEUR > 0 ? wallet.valueEUR.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€' : '#N/A')}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {wallet.name}
                </td>
              </tr>
            ))}
            
            {/* Linha de TOTAL */}
            <tr className="bg-gray-100 dark:bg-gray-700 font-semibold">
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                TOTAL
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {selectedCurrency === 'HIDDEN' ? '••••••' : totals.totalBTC.toFixed(8)}
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {selectedCurrency === 'HIDDEN' ? '••••••' : totals.totalEUR.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€'}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                -
              </td>
            </tr>
            
            {/* Linha de referência */}
            <tr className="bg-gray-50 dark:bg-gray-600 text-sm">
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                -
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                1
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                60,000.00€
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
