import { Asset } from './Asset';

export interface Wallet {
  uuid: string;
  name: string;
  description?: string;
  type: string;
  status: 'ACTIVE' | 'DELETED';
  createdAt: Date;
  updatedAt: Date;
  assets?: Asset[];
}

export interface CreateWalletData {
  name: string;
  description?: string;
  type: string;
}

export interface UpdateWalletData {
  name?: string;
  description?: string;
  type?: string;
}
