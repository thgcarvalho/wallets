'use client';

import { getAssetAllocation } from '../data/mockData';
import { ChevronDown, Coins } from 'lucide-react';

export default function TotalGroupedView() {
  const assets = getAssetAllocation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  COIN
                  <ChevronDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                PRICE
                <ChevronDown className="h-4 w-4 ml-2" />
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  # AMOUNT
                  <ChevronDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                VALUE
                <ChevronDown className="h-4 w-4 ml-2" />
              </th>
              <th className="px-4 py-3 text-left font-medium">
                ALLOCATION
                <ChevronDown className="h-4 w-4 ml-2" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {assets.map((asset, index) => (
              <tr 
                key={asset.uuid} 
                className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{asset.symbol}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{asset.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  ${asset.currentPrice?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {asset.quantity.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  ${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {asset.allocation.toFixed(4)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
