// Currency Exchange Rate API Integration
// Using Frankfurter API for real-time exchange rates

const API_ENDPOINT = 'https://api.frankfurter.dev/v1/latest?base=USD';

export interface ExchangeRateData {
  rates: Record<string, number>;
  changes: Record<string, number>;
  lastUpdated: Date;
}

// Store previous rates to calculate changes
let previousRates: Record<string, number> = {};

/**
 * Fetches current exchange rates from the Frankfurter API
 */
export async function fetchExchangeRates(): Promise<ExchangeRateData> {
  try {
    const response = await fetch(API_ENDPOINT);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    
    // Calculate changes based on previous rates
    const changes: Record<string, number> = {};
    Object.keys(data.rates).forEach((currency) => {
      if (previousRates[currency]) {
        const change = ((data.rates[currency] - previousRates[currency]) / previousRates[currency]) * 100;
        changes[currency] = change;
      } else {
        // Default small random change for first load
        changes[currency] = (Math.random() - 0.5) * 0.5;
      }
    });
    
    // Store current rates for next comparison
    previousRates = { ...data.rates };
    
    return {
      rates: data.rates,
      changes,
      lastUpdated: new Date(data.date),
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
}

/**
 * Simulates real-time rate updates
 * In production, you might want to use WebSocket or polling
 */
export function simulateRateUpdate(currentRates: Record<string, number>): Record<string, number> {
  const updatedRates: Record<string, number> = {};
  
  Object.entries(currentRates).forEach(([currency, rate]) => {
    // Add small random fluctuation (-0.5% to +0.5%)
    const fluctuation = (Math.random() - 0.5) * 0.01;
    updatedRates[currency] = rate * (1 + fluctuation);
  });
  
  return updatedRates;
}