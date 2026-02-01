import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { CurrencySelector } from './CurrencySelector';

interface CurrencyConverterProps {
  rates: Record<string, number>;
}

export function CurrencyConverter({ rates }: CurrencyConverterProps) {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('100');

  const convertCurrency = () => {
    const amountNum = parseFloat(amount) || 0;
    if (fromCurrency === 'USD') {
      return (amountNum * (rates[toCurrency] || 1)).toFixed(2);
    } else if (toCurrency === 'USD') {
      return (amountNum / (rates[fromCurrency] || 1)).toFixed(2);
    } else {
      // Convert from -> USD -> to
      const inUSD = amountNum / (rates[fromCurrency] || 1);
      return (inUSD * (rates[toCurrency] || 1)).toFixed(2);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = convertCurrency();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Currency Converter</h2>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4">
          <CurrencySelector
            value={fromCurrency}
            onChange={setFromCurrency}
            label="From"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-4 text-3xl font-bold border-none outline-none focus:ring-0"
            placeholder="0.00"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-colors"
            aria-label="Swap currencies"
          >
            <ArrowLeftRight className="size-5" />
          </button>
        </div>

        <div className="bg-white rounded-lg p-4">
          <CurrencySelector
            value={toCurrency}
            onChange={setToCurrency}
            label="To"
          />
          <div className="w-full mt-4 text-3xl font-bold text-blue-600">
            {convertedAmount}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        1 {fromCurrency} = {fromCurrency === 'USD' ? rates[toCurrency]?.toFixed(4) : 
          toCurrency === 'USD' ? (1 / (rates[fromCurrency] || 1)).toFixed(4) :
          ((rates[toCurrency] || 1) / (rates[fromCurrency] || 1)).toFixed(4)} {toCurrency}
      </div>
    </div>
  );
}
