export type CurrencyCode = 'YER' | 'SAR' | 'USD';

export type AccountCategory = 'customer' | 'supplier' | 'general';

export type TransactionType = 'leh' | 'alaih'; // leh = credit/receivable, alaih = debit/payable

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  currency: CurrencyCode;
  type: TransactionType;
  date: string;
  note: string;
  isArchived: boolean;
  receiptImage?: string;
}

export interface Account {
  id: string;
  name: string;
  category: AccountCategory;
  phone?: string;
  currency: CurrencyCode;
  createdAt: string;
  lastTransactionAt?: string;
}

export interface CurrencyBalance {
  currency: CurrencyCode;
  totalLeh: number;
  totalAlaih: number;
  net: number;
}
