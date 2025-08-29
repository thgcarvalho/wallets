import { Wallet } from '../types/Wallet';
import { Asset } from '../types/Asset';

export const mockWallets: Wallet[] = [
  {
    uuid: '1',
    name: '1-LDG-CLD-STR',
    description: 'Ledger Cold Storage',
    type: 'cold',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    uuid: '2',
    name: '2-BLU-ARG-TLY',
    description: 'Blue Wallet Argent',
    type: 'hot',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    uuid: '3',
    name: '3-ELE-CLD-UND',
    description: 'Electrum Cold Underground',
    type: 'cold',
    status: 'ACTIVE',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    uuid: '4',
    name: 'BINANCE',
    description: 'Exchange Binance',
    type: 'exchange',
    status: 'ACTIVE',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    uuid: '5',
    name: '6-BLU-HOT-TER',
    description: 'Blue Wallet Hot Terra',
    type: 'hot',
    status: 'ACTIVE',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    uuid: '6',
    name: 'ELE-HOT-BIN',
    description: 'Electrum Hot Binance',
    type: 'hot',
    status: 'ACTIVE',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    uuid: '7',
    name: 'ELE-HOT-PLS',
    description: 'Electrum Hot Plus',
    type: 'hot',
    status: 'ACTIVE',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-01'),
  },
  {
    uuid: '8',
    name: 'BLU-HOT-TER',
    description: 'Blue Wallet Hot Terra',
    type: 'hot',
    status: 'ACTIVE',
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-15'),
  },
  {
    uuid: '9',
    name: 'MET-HOT-DEF',
    description: 'Metamask Hot DeFi',
    type: 'hot',
    status: 'ACTIVE',
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-01'),
  },
  {
    uuid: '10',
    name: 'TZR-CLD-DBM',
    description: 'Tezos Cold Database',
    type: 'cold',
    status: 'ACTIVE',
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-05-15'),
  },
];

export const mockAssets: Asset[] = [
  // Bitcoin
  {
    uuid: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 0.06279681,
    buyPrice: 45000,
    currentPrice: 118384.00,
    walletId: '1',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  // Ethereum
  {
    uuid: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    quantity: 0.655977,
    buyPrice: 2800,
    currentPrice: 3816.92,
    walletId: '1',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  // Solana
  {
    uuid: '3',
    symbol: 'SOL',
    name: 'Solana',
    quantity: 7.780,
    buyPrice: 95,
    currentPrice: 1000.00,
    walletId: '2',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  // AAVE
  {
    uuid: '4',
    symbol: 'AAVE',
    name: 'Aave',
    quantity: 6.200,
    buyPrice: 250,
    currentPrice: 311.54,
    walletId: '2',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  // PENDLE
  {
    uuid: '5',
    symbol: 'PENDLE',
    name: 'Pendle',
    quantity: 432.650,
    buyPrice: 15,
    currentPrice: 20.00,
    walletId: '3',
    status: 'ACTIVE',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  // USDC
  {
    uuid: '6',
    symbol: 'USDC',
    name: 'USD Coin',
    quantity: 483.110,
    buyPrice: 1.00,
    currentPrice: 1.00,
    walletId: '4',
    status: 'ACTIVE',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  // USDT
  {
    uuid: '7',
    symbol: 'USDT',
    name: 'Tether',
    quantity: 0.000,
    buyPrice: 1.00,
    currentPrice: 1.00,
    walletId: '4',
    status: 'ACTIVE',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
];

export const getWalletsWithAssets = (): Wallet[] => {
  return mockWallets.map(wallet => ({
    ...wallet,
    assets: mockAssets.filter(asset => asset.walletId === wallet.uuid)
  }));
};

export const getTotalPortfolioValue = (): number => {
  return mockAssets.reduce((total, asset) => {
    const currentValue = asset.currentPrice || asset.buyPrice || 0;
    return total + (asset.quantity * currentValue);
  }, 0);
};

export const getWalletValue = (walletId: string): number => {
  const walletAssets = mockAssets.filter(asset => asset.walletId === walletId);
  return walletAssets.reduce((total, asset) => {
    const currentValue = asset.currentPrice || asset.buyPrice || 0;
    return total + (asset.quantity * currentValue);
  }, 0);
};

export const getAssetAllocation = () => {
  const totalValue = getTotalPortfolioValue();
  return mockAssets.map(asset => {
    const currentValue = asset.currentPrice || asset.buyPrice || 0;
    const value = asset.quantity * currentValue;
    const allocation = (value / totalValue) * 100;
    
    return {
      ...asset,
      value,
      allocation,
      wallet: mockWallets.find(w => w.uuid === asset.walletId)
    };
  }).sort((a, b) => b.allocation - a.allocation);
};

export const getPerformanceRating = (totalValue: number): string => {
  if (totalValue < 20000) return 'RUIM';
  if (totalValue < 23000) return 'BOM';
  if (totalValue < 27000) return 'ÓTIMO';
  return 'EXCELENTE';
};

export const getPerformanceColor = (rating: string): string => {
  switch (rating) {
    case 'RUIM': return 'bg-red-500';
    case 'BOM': return 'bg-yellow-500';
    case 'ÓTIMO': return 'bg-blue-400';
    case 'EXCELENTE': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

// Função para obter valores em BTC e EUR
export const getWalletValuesInBTCAndEUR = () => {
  const btcPrice = 118384; // Preço atual do BTC
  const eurRate = 0.85; // Taxa de câmbio USD/EUR
  
  return mockWallets.map(wallet => {
    const walletValueUSD = getWalletValue(wallet.uuid);
    const walletValueBTC = walletValueUSD / btcPrice;
    const walletValueEUR = walletValueUSD * eurRate;
    
    return {
      ...wallet,
      valueUSD: walletValueUSD,
      valueBTC: walletValueBTC,
      valueEUR: walletValueEUR
    };
  });
};

// Função para obter totais em BTC e EUR
export const getTotalValuesInBTCAndEUR = () => {
  const totalValueUSD = getTotalPortfolioValue();
  const btcPrice = 118384;
  const eurRate = 0.85;
  
  return {
    totalUSD: totalValueUSD,
    totalBTC: totalValueUSD / btcPrice,
    totalEUR: totalValueUSD * eurRate
  };
};
