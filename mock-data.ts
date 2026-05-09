import { Account, Transaction, CurrencyBalance } from './types';

export const MOCK_ACCOUNTS: Account[] = [
  { id: '1', name: 'أحمد علي', category: 'customer', phone: '777123456', currency: 'YER', createdAt: '2023-10-01' },
  { id: '2', name: 'شركة البركة للحلول', category: 'supplier', phone: '733987654', currency: 'USD', createdAt: '2023-11-15' },
  { id: '3', name: 'محمد سالم', category: 'customer', phone: '711556677', currency: 'SAR', createdAt: '2023-12-05' },
  { id: '4', name: 'مكتب الهندسية', category: 'general', phone: '01223344', currency: 'YER', createdAt: '2024-01-10' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', accountId: '1', amount: 5000, currency: 'YER', type: 'alaih', date: '2024-03-01', note: 'شراء مواد بناء', isArchived: false },
  { id: 't2', accountId: '1', amount: 2000, currency: 'YER', type: 'leh', date: '2024-03-05', note: 'دفعة نقدية', isArchived: false },
  { id: 't3', accountId: '2', amount: 100, currency: 'USD', type: 'alaih', date: '2024-03-10', note: 'طلب بضاعة', isArchived: false },
  { id: 't4', accountId: '3', amount: 500, currency: 'SAR', type: 'leh', date: '2024-03-12', note: 'تسوية حساب', isArchived: false },
];

export const MOCK_CURRENCY_BALANCES: CurrencyBalance[] = [
  { currency: 'YER', totalLeh: 45000, totalAlaih: 120000, net: -75000 },
  { currency: 'SAR', totalLeh: 1500, totalAlaih: 800, net: 700 },
  { currency: 'USD', totalLeh: 200, totalAlaih: 450, net: -250 },
];
