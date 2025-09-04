'use client';

import { useState } from 'react';

export type Currency = 'USD' | 'BTC' | 'EUR';

interface CurrencyToggleProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export default function CurrencyToggle({ selectedCurrency, onCurrencyChange }: CurrencyToggleProps) {
  const currencies: { value: Currency; label: string; symbol: string }[] = [
    { value: 'USD', label: 'Dólar', symbol: '$' },
    { value: 'BTC', label: 'Bitcoin', symbol: '₿' },
    { value: 'EUR', label: 'Euro', symbol: '€' }
  ];

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {currencies.map((currency) => (
        <button
          key={currency.value}
          onClick={() => onCurrencyChange(currency.value)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedCurrency === currency.value
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <span className="mr-1">{currency.symbol}</span>
          {currency.label}
        </button>
      ))}
    </div>
  );
}
