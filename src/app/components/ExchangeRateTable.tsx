import { ExchangeRateCard } from './ExchangeRateCard';
import { currencies } from './CurrencySelector';

interface ExchangeRateTableProps {
  rates: Record<string, number>;
  changes: Record<string, number>;
}

export function ExchangeRateTable({ rates, changes }: ExchangeRateTableProps) {
  const ratesWithInfo = Object.entries(rates).map(([code, rate]) => {
    const currency = currencies.find(c => c.code === code);
    return {
      code,
      rate,
      change: changes[code] || 0,
      symbol: currency?.symbol || code,
      name: currency?.name || code
    };
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Exchange Rates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ratesWithInfo.map((item) => (
          <ExchangeRateCard
            key={item.code}
            currency={item.code}
            rate={item.rate}
            change={item.change}
            symbol={item.symbol}
          />
        ))}
      </div>
    </div>
  );
}
