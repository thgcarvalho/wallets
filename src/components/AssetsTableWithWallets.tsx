'use client';

import { getAssetAllocation, getWalletsWithAssets } from '../data/mockData';
import { ChevronDown, Wallet, Coins, Network, FileText } from 'lucide-react';

export default function AssetsTableWithWallets() {
  const assets = getAssetAllocation();
  const wallets = getWalletsWithAssets();

  const getWalletColor = (walletName: string) => {
    const colors = [
      'bg-purple-500', 'bg-blue-500', 'bg-blue-400', 'bg-red-500', 'bg-green-500'
    ];
    const index = wallets.findIndex(w => w.name === walletName) % colors.length;
    return colors[index];
  };

  const getNetworkColor = (symbol: string) => {
    const networkColors: { [key: string]: string } = {
      'BTC': 'bg-yellow-500',
      'ETH': 'bg-purple-500',
      'SOL': 'bg-orange-500',
      'AAVE': 'bg-red-500',
      'PENDLE': 'bg-blue-500',
      'USDC': 'bg-blue-400',
      'USDT': 'bg-green-500'
    };
    return networkColors[symbol] || 'bg-gray-500';
  };

  const getNetworkName = (symbol: string) => {
    const networkNames: { [key: string]: string } = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'SOL': 'Solana',
      'AAVE': 'Ethereum',
      'PENDLE': 'Arbitrum',
      'USDC': 'Ethereum',
      'USDT': 'Ethereum'
    };
    return networkNames[symbol] || 'Unknown';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-sm">TT</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </th>
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
                % ALLOCATION
                <ChevronDown className="h-4 w-4 ml-2" />
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  WALLET
                  <ChevronDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  NETWORK
                  <ChevronDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  TT Notes
                  <ChevronDown className="h-4 w-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {assets.map((asset, index) => (
              <tr 
                key={asset.uuid} 
                className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
              >
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {index + 1}
                </td>
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
                  {asset.quantity.toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 })}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  ${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {asset.allocation.toFixed(8)}%
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getWalletColor(asset.wallet?.name || '')}`}>
                      {asset.wallet?.name}
                    </span>
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getNetworkColor(asset.symbol)}`}>
                      {getNetworkName(asset.symbol)}
                    </span>
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span>Notes</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
          Add 1000 more rows at the bottom
        </button>
      </div>
    </div>
  );
}
