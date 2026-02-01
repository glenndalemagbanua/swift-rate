import { ChevronDown } from 'lucide-react';

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
];

export function CurrencySelector({ value, onChange, label }: CurrencySelectorProps) {
  const selectedCurrency = currencies.find(c => c.code === value);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
      </div>
      {selectedCurrency && (
        <div className="text-xs text-gray-500">
          Symbol: {selectedCurrency.symbol}
        </div>
      )}
    </div>
  );
}

export { currencies };
