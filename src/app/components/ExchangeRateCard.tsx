import { TrendingUp, TrendingDown } from 'lucide-react';

interface ExchangeRateCardProps {
  currency: string;
  rate: number;
  change: number;
  symbol: string;
}

export function ExchangeRateCard({ currency, rate, change, symbol }: ExchangeRateCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-semibold">{currency}</div>
          <div className="text-sm text-gray-500 mt-1">Symbol: {symbol}</div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm ${
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isPositive ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-gray-900">
          {rate.toFixed(4)}
        </div>
        <div className="text-sm text-gray-500 mt-1">per USD</div>
      </div>
    </div>
  );
}
