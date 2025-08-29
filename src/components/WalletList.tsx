'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getWalletsWithAssets, getWalletValue } from '../data/mockData';
import { Plus, MoreVertical } from 'lucide-react';

export default function WalletList() {
  const wallets = getWalletsWithAssets();

  const getWalletTypeColor = (type: string) => {
    switch (type) {
      case 'hot':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'cold':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'exchange':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getWalletTypeLabel = (type: string) => {
    switch (type) {
      case 'hot':
        return 'Hot Wallet';
      case 'cold':
        return 'Cold Storage';
      case 'exchange':
        return 'Exchange';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Minhas Carteiras</h2>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
          <Plus className="h-4 w-4" />
          Nova Carteira
        </button>
      </div>

      <div className="grid gap-6">
        {wallets.map((wallet) => (
          <Card key={wallet.uuid} className="hover:shadow-lg transition-all duration-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center transition-colors duration-200">
                    <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white transition-colors duration-200">{wallet.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getWalletTypeColor(wallet.type)}`}>
                    {getWalletTypeLabel(wallet.type)}
                  </span>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
                    <MoreVertical className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Valor da carteira: <span className="font-semibold text-lg text-gray-900 dark:text-white transition-colors duration-200">
                    ${getWalletValue(wallet.uuid).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </span>
                <span className="text-sm text-muted-foreground">
                  {wallet.assets?.length || 0} ativos
                </span>
              </div>

              {wallet.assets && wallet.assets.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Ativos:</h4>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {wallet.assets.map((asset) => (
                      <div key={asset.uuid} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-200">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white transition-colors duration-200">{asset.symbol}</div>
                          <div className="text-sm text-muted-foreground">{asset.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900 dark:text-white transition-colors duration-200">{asset.quantity}</div>
                          <div className="text-sm text-muted-foreground">
                            ${((asset.currentPrice || asset.buyPrice || 0) * asset.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(!wallet.assets || wallet.assets.length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  <Plus className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum ativo nesta carteira</p>
                  <button className="mt-3 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm transition-colors duration-200">
                    Adicionar primeiro ativo
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
