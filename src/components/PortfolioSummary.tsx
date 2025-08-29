'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getTotalPortfolioValue, getWalletsWithAssets } from '../data/mockData';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

export default function PortfolioSummary() {
  const totalValue = getTotalPortfolioValue();
  const wallets = getWalletsWithAssets();
  
  const totalWallets = wallets.length;
  const totalAssets = wallets.reduce((total, wallet) => total + (wallet.assets?.length || 0), 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground">
            Portfólio completo
          </p>
        </CardContent>
      </Card>

      <Card className="transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Carteiras</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalWallets}</div>
          <p className="text-xs text-muted-foreground">
            Total de carteiras
          </p>
        </CardContent>
      </Card>

      <Card className="transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAssets}</div>
          <p className="text-xs text-muted-foreground">
            Total de ativos
          </p>
        </CardContent>
      </Card>

      <Card className="transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Performance</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">+15.6%</div>
          <p className="text-xs text-muted-foreground">
            Últimos 30 dias
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
