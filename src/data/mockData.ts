import { Wallet } from '../types/Wallet';
import { Asset } from '../types/Asset';
import { getCurrentPrice, getBtcPrice, getEurRate } from './currentPrices';

export const mockWallets: Wallet[] = [
  {
    uuid: '1',
    name: 'LDG-CLD-STR',
    description: 'Ledger Cold Storage',
    type: 'cold',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    uuid: '2',
    name: 'BLU-ARG-TLY',
    description: 'Blue Wallet Air-Gapped ',
    type: 'cold',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    uuid: '3',
    name: 'ELE-CLD-UND',
    description: 'Electrum Cold Underground',
    type: 'cold',
    status: 'ACTIVE',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    uuid: '4',
    name: 'ELE-HOT-BIN',
    description: 'Electrum Hot Binance',
    type: 'hot',
    status: 'ACTIVE',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    uuid: '5',
    name: 'ELE-HOT-PLS',
    description: 'Electrum Hot Plus',
    type: 'hot',
    status: 'ACTIVE',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-01'),
  },
  {
    uuid: '6',
    name: 'BLU-HOT-TER',
    description: 'Blue Wallet Hot Terra',
    type: 'hot',
    status: 'ACTIVE',
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-15'),
  },
  {
    uuid: '7',
    name: 'MET-HOT-DEF',
    description: 'Metamask Hot DeFi',
    type: 'hot',
    status: 'ACTIVE',
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-01'),
  },
  {
    uuid: '8',
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
    quantity: 0.0628,
    buyPrice: 45000,
    currentPrice: getCurrentPrice('BTC'),
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
    quantity: 0.0180,
    buyPrice: 2800,
    currentPrice: getCurrentPrice('ETH'),
    walletId: '1',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  // Bitcoin para BLU-ARG-TLY
  {
    uuid: '3',
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 0.01604994,
    buyPrice: 45000,
    currentPrice: getCurrentPrice('BTC'),
    walletId: '2',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  // Bitcoin para ELE-CLD-UND
  {
    uuid: '4',
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 0.04662472,
    buyPrice: 45000,
    currentPrice: getCurrentPrice('BTC'),
    walletId: '3',
    status: 'ACTIVE',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  // USDC
  {
    uuid: '5',
    symbol: 'USDC',
    name: 'USD Coin',
    quantity: 4708.45,
    buyPrice: 1.00,
    currentPrice: getCurrentPrice('USDC'),
    walletId: '1',
    status: 'ACTIVE',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  // USDT
  {
    uuid: '6',
    symbol: 'USDT',
    name: 'Tether',
    quantity: 2343.28,
    buyPrice: 1.00,
    currentPrice: getCurrentPrice('USDT'),
    walletId: '1',
    status: 'ACTIVE',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  // Bitcoin para BLU-HOT-TER
  {
    uuid: '7',
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 0.01800894,
    buyPrice: 45000,
    currentPrice: getCurrentPrice('BTC'),
    walletId: '6',
    status: 'ACTIVE',
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-15'),
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
  const btcPrice = getBtcPrice();
  const eurRate = getEurRate();
  
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
  const btcPrice = getBtcPrice();
  const eurRate = getEurRate();
  
  return {
    totalUSD: totalValueUSD,
    totalBTC: totalValueUSD / btcPrice,
    totalEUR: totalValueUSD * eurRate
  };
};

// Funções de conversão de moedas
export const convertToCurrency = (valueUSD: number, currency: 'USD' | 'BTC' | 'EUR' | 'HIDDEN'): number => {
  const btcPrice = getBtcPrice();
  const eurRate = getEurRate();
  
  switch (currency) {
    case 'USD':
      return valueUSD;
    case 'BTC':
      return valueUSD / btcPrice;
    case 'EUR':
      return valueUSD * eurRate;
    case 'HIDDEN':
      return 0; // Retorna 0 para ocultar valores
    default:
      return valueUSD;
  }
};

export const formatCurrency = (value: number, currency: 'USD' | 'BTC' | 'EUR' | 'HIDDEN'): string => {
  switch (currency) {
    case 'USD':
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'BTC':
      return `₿${value.toFixed(8)}`;
    case 'EUR':
      return `€${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'HIDDEN':
      return '••••••';
    default:
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

export const getCurrencySymbol = (currency: 'USD' | 'BTC' | 'EUR' | 'HIDDEN'): string => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'BTC':
      return '₿';
    case 'EUR':
      return '€';
    case 'HIDDEN':
      return '••••••';
    default:
      return '$';
  }
};

// Função para formatar valores considerando se a moeda está oculta
export const formatValueWithCurrency = (value: number, currency: 'USD' | 'BTC' | 'EUR' | 'HIDDEN', showPercentage: boolean = false, percentage?: number): string => {
  if (currency === 'HIDDEN') {
    if (showPercentage && percentage !== undefined) {
      return `${percentage.toFixed(1)}%`;
    }
    return '••••••';
  }
  return formatCurrency(value, currency);
};

// Função para obter percentual de cada carteira
export const getWalletPercentage = (walletId: string): number => {
  const totalValue = getTotalPortfolioValue();
  const walletValue = getWalletValue(walletId);
  return totalValue > 0 ? (walletValue / totalValue) * 100 : 0;
};

// Função para obter ativos agrupados por símbolo
export const getGroupedAssets = () => {
  const assetAllocation = getAssetAllocation();
  const grouped: { [key: string]: any } = {};

  assetAllocation.forEach(asset => {
    if (!grouped[asset.symbol]) {
      grouped[asset.symbol] = {
        symbol: asset.symbol,
        name: asset.name,
        totalQuantity: 0,
        totalValue: 0,
        allocation: 0,
        wallets: []
      };
    }
    
    grouped[asset.symbol].totalQuantity += asset.quantity;
    grouped[asset.symbol].totalValue += asset.value;
    grouped[asset.symbol].wallets.push({
      walletName: asset.wallet?.name || 'N/A',
      quantity: asset.quantity,
      value: asset.value,
      uuid: asset.uuid
    });
  });

  // Calcular alocação total para cada ativo agrupado
  const totalValue = getTotalPortfolioValue();
  Object.values(grouped).forEach((asset: any) => {
    asset.allocation = totalValue > 0 ? (asset.totalValue / totalValue) * 100 : 0;
  });

  return Object.values(grouped).sort((a: any, b: any) => b.allocation - a.allocation);
};

// Função para obter ativos detalhados por carteira
export const getDetailedAssets = () => {
  return getAssetAllocation();
};

// Estratégias de rebalanciamento pré-definidas
export const REBALANCE_STRATEGIES = {
  CONSERVATIVE: {
    name: 'Constant-Mix Conservador',
    description: '50% Criptomoedas, 50% Caixa',
    cryptoTarget: 50,
    cashTarget: 50,
    color: 'bg-green-500'
  },
  MODERATE: {
    name: 'Constant-Mix Moderado',
    description: '70% Criptomoedas, 30% Caixa',
    cryptoTarget: 70,
    cashTarget: 30,
    color: 'bg-yellow-500'
  },
  AGGRESSIVE: {
    name: 'Constant-Mix Agressivo',
    description: '90% Criptomoedas, 10% Caixa',
    cryptoTarget: 90,
    cashTarget: 10,
    color: 'bg-red-500'
  }
};

// Função para calcular indicadores de saúde da carteira
export const getPortfolioHealth = () => {
  const assets = getAssetAllocation();
  const totalValue = getTotalPortfolioValue();
  
  // Calcular alocação atual
  const cryptoAssets = assets.filter(asset => !['USDC', 'USDT'].includes(asset.symbol));
  const cashAssets = assets.filter(asset => ['USDC', 'USDT'].includes(asset.symbol));
  
  const cryptoValue = cryptoAssets.reduce((sum, asset) => sum + asset.value, 0);
  const cashValue = cashAssets.reduce((sum, asset) => sum + asset.value, 0);
  
  const cryptoPercentage = totalValue > 0 ? (cryptoValue / totalValue) * 100 : 0;
  const cashPercentage = totalValue > 0 ? (cashValue / totalValue) * 100 : 0;
  
  // Calcular diversificação (número de ativos únicos)
  const uniqueAssets = new Set(assets.map(asset => asset.symbol)).size;
  const diversificationScore = Math.min(uniqueAssets * 10, 100); // Max 100 para 10+ ativos
  
  // Calcular concentração (maior ativo individual)
  const maxAssetAllocation = Math.max(...assets.map(asset => asset.allocation));
  const concentrationRisk = maxAssetAllocation > 50 ? 'Alto' : maxAssetAllocation > 30 ? 'Médio' : 'Baixo';
  
  // Calcular volatilidade estimada (baseada em tipos de ativos)
  const volatilityScore = cryptoAssets.length > 0 ? 
    Math.min(cryptoAssets.length * 15, 100) : 0;
  
  return {
    cryptoPercentage,
    cashPercentage,
    diversificationScore,
    concentrationRisk,
    volatilityScore,
    uniqueAssets,
    maxAssetAllocation,
    totalValue,
    cryptoValue,
    cashValue
  };
};

// Função para gerar sugestões de rebalanciamento
export const getRebalanceSuggestions = (strategy: keyof typeof REBALANCE_STRATEGIES) => {
  const health = getPortfolioHealth();
  const strategyConfig = REBALANCE_STRATEGIES[strategy];
  
  const suggestions = [];
  
  // Sugestão de alocação crypto/caixa
  const cryptoDiff = health.cryptoPercentage - strategyConfig.cryptoTarget;
  const cashDiff = health.cashPercentage - strategyConfig.cashTarget;
  
  if (Math.abs(cryptoDiff) > 5) { // Tolerância de 5%
    if (cryptoDiff > 0) {
      suggestions.push({
        type: 'sell',
        asset: 'Criptomoedas',
        amount: Math.abs(cryptoDiff),
        message: `Vender ${cryptoDiff.toFixed(1)}% de criptomoedas para atingir ${strategyConfig.cryptoTarget}%`,
        priority: 'high'
      });
    } else {
      suggestions.push({
        type: 'buy',
        asset: 'Criptomoedas',
        amount: Math.abs(cryptoDiff),
        message: `Comprar ${Math.abs(cryptoDiff).toFixed(1)}% de criptomoedas para atingir ${strategyConfig.cryptoTarget}%`,
        priority: 'high'
      });
    }
  }
  
  if (Math.abs(cashDiff) > 5) {
    if (cashDiff > 0) {
      suggestions.push({
        type: 'sell',
        asset: 'Caixa (USDC/USDT)',
        amount: Math.abs(cashDiff),
        message: `Vender ${cashDiff.toFixed(1)}% de caixa para atingir ${strategyConfig.cashTarget}%`,
        priority: 'high'
      });
    } else {
      suggestions.push({
        type: 'buy',
        asset: 'Caixa (USDC/USDT)',
        amount: Math.abs(cashDiff),
        message: `Comprar ${Math.abs(cashDiff).toFixed(1)}% de caixa para atingir ${strategyConfig.cashTarget}%`,
        priority: 'high'
      });
    }
  }
  
  // Sugestões de diversificação
  if (health.uniqueAssets < 3) {
    suggestions.push({
      type: 'diversify',
      asset: 'Novos Ativos',
      amount: 0,
      message: `Adicionar mais ativos para diversificação (atual: ${health.uniqueAssets})`,
      priority: 'medium'
    });
  }
  
  // Sugestões de concentração
  if (health.maxAssetAllocation > 50) {
    suggestions.push({
      type: 'rebalance',
      asset: 'Ativo Concentrado',
      amount: health.maxAssetAllocation - 40,
      message: `Reduzir concentração do maior ativo (${health.maxAssetAllocation.toFixed(1)}%)`,
      priority: 'medium'
    });
  }
  
  return {
    strategy: strategyConfig,
    currentHealth: health,
    suggestions,
    isBalanced: suggestions.length === 0
  };
};
