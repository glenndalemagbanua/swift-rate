import { useState, useEffect } from 'react';
import { RefreshCw, DollarSign } from 'lucide-react';
import { CurrencyConverter } from '@/app/components/CurrencyConverter';
import { ExchangeRateTable } from '@/app/components/ExchangeRateTable';
import { fetchExchangeRates, type ExchangeRateData } from '@/app/services/currencyApi';

export default function App() {
  const [data, setData] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRates = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    }
    
    try {
      const exchangeData = await fetchExchangeRates();
      setData(exchangeData);
    } catch (error) {
      console.error('Failed to load exchange rates:', error);
    } finally {
      setLoading(false);
      if (showRefreshIndicator) {
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    loadRates();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      loadRates();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    loadRates(true);
  };

  if (loading) {
    return (
      <div className="size-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="size-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading exchange rates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <DollarSign className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Swift Rate</h1>
                <p className="text-sm text-gray-500">Live rates updated in real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Last updated: {data?.lastUpdated.toLocaleTimeString()}
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className={`size-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Converter - Takes 1 column */}
          <div className="lg:col-span-1">
            {data && <CurrencyConverter rates={data.rates} />}
          </div>

          {/* Exchange Rates Table - Takes 2 columns */}
          <div className="lg:col-span-2">
            {data && <ExchangeRateTable rates={data.rates} changes={data.changes} />}
          </div>
        </div>
      </main>
    </div>
  );
}