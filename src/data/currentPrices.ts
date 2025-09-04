// Preços atuais centralizados para todos os ativos
export const CURRENT_PRICES = {
  // Criptomoedas principais
  BTC: 118384.00,
  ETH: 3816.92,
  SOL: 1000.00,
  AAVE: 311.54,
  PENDLE: 20.00,
  
  // Stablecoins
  USDC: 1.00,
  USDT: 1.00,
  
  // Taxas de câmbio
  EUR_RATE: 0.85, // Taxa USD/EUR
} as const;

// Função para obter preço atual de um ativo
export const getCurrentPrice = (symbol: string): number => {
  return CURRENT_PRICES[symbol as keyof typeof CURRENT_PRICES] || 0;
};

// Função para obter taxa de câmbio EUR
export const getEurRate = (): number => {
  return CURRENT_PRICES.EUR_RATE;
};

// Função para obter preço do BTC
export const getBtcPrice = (): number => {
  return CURRENT_PRICES.BTC;
};
