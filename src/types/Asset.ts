import { Wallet } from './Wallet';

export interface Asset {
  uuid: string;
  symbol: string;
  name: string;
  quantity: number;
  buyPrice?: number;
  currentPrice?: number;
  walletId: string;
  status: 'ACTIVE' | 'DELETED';
  createdAt: Date;
  updatedAt: Date;
  wallet?: Wallet;
}

export interface CreateAssetData {
  symbol: string;
  name: string;
  quantity: number;
  buyPrice?: number;
  currentPrice?: number;
  walletId: string;
}

export interface UpdateAssetData {
  symbol?: string;
  name?: string;
  quantity?: number;
  buyPrice?: number;
  currentPrice?: number;
}

export interface AssetWithValue extends Asset {
  totalValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}
