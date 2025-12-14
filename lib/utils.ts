import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface DataPoint {
  date: string;
  facility_id: string;
  facility_name: string;
  total_energy_kwh: number;
  renewable_energy_kwh: number;
  renewable_percentage: number;
  netflix_data_mb: number;
  netflix_hours: number;
}

export function generateDummyData(): DataPoint[] {
  const facilities = [
    { id: 'SF-HQ', name: 'San Francisco HQ' },
    { id: 'NYC-OFFICE', name: 'New York Office' },
    { id: 'AUSTIN-LAB', name: 'Austin Lab' }
  ];

  const data: DataPoint[] = [];
  // Generate data for the past year from today
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    facilities.forEach(facility => {
      // Generate seasonal patterns for renewable energy
      const seasonalFactor = Math.sin((i / 365) * 2 * Math.PI) * 0.3 + 0.7;
      const baseRenewable = facility.id === 'SF-HQ' ? 0.75 : facility.id === 'NYC-OFFICE' ? 0.55 : 0.65;
      
      // Add some randomness and weekly patterns
      const weeklyPattern = Math.sin((i / 7) * 2 * Math.PI) * 0.1;
      const randomFactor = (Math.random() - 0.5) * 0.3;
      
      const totalEnergyKwh = 8000 + Math.random() * 2000;
      const renewablePercentage = Math.max(0.2, Math.min(0.95, 
        baseRenewable * seasonalFactor + weeklyPattern + randomFactor
      ));
      const renewableEnergyKwh = totalEnergyKwh * renewablePercentage;
      
      // Netflix usage - inversely correlated with renewable energy sometimes
      const baseNetflixMb = 2000 + Math.random() * 1500;
      const correlationFactor = facility.id === 'NYC-OFFICE' ? -0.3 : -0.1;
      const netflixDataMb = Math.max(500, 
        baseNetflixMb + (correlationFactor * renewablePercentage * 1000) + (Math.random() - 0.5) * 800
      );
      
      data.push({
        date: date.toISOString().split('T')[0],
        facility_id: facility.id,
        facility_name: facility.name,
        total_energy_kwh: Math.round(totalEnergyKwh),
        renewable_energy_kwh: Math.round(renewableEnergyKwh),
        renewable_percentage: Math.round(renewablePercentage * 100),
        netflix_data_mb: Math.round(netflixDataMb),
        netflix_hours: Math.round((netflixDataMb / 500) * 10) / 10
      });
    });
  }
  
  return data;
}

export function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  if (n !== y.length || n === 0) return 0;
  
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;
}

interface Anomaly extends DataPoint {
  type: string;
  message: string;
}

export function detectAnomalies(data: DataPoint[]): Anomaly[] {
  const anomalies: Anomaly[] = [];
  
  if (data.length === 0) {
    return anomalies;
  }
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    
    // Flag when renewable is low (<40%) and Netflix is high (>4 hours)
    if (item.renewable_percentage < 40 && item.netflix_hours > 4) {
      anomalies.push({
        ...item,
        type: 'low_renewable_high_netflix',
        message: `Low renewable energy (${item.renewable_percentage}%) with high Netflix usage (${item.netflix_hours}h)`
      });
    }
    
    // Flag unusual spikes in Netflix usage
    if (item.netflix_hours > 6) {
      anomalies.push({
        ...item,
        type: 'netflix_spike',
        message: `Netflix usage spike: ${item.netflix_hours} hours`
      });
    }
  }
  
  return anomalies;
}

interface Insight {
  type: string;
  message: string;
}

export function generateInsights(data: DataPoint[]): Insight[] {
  const insights: Insight[] = [];
  
  if (data.length === 0) {
    insights.push({
      type: 'no_data',
      message: 'No data available for the selected filters'
    });
    return insights;
  }
  
  // Find highest Netflix day
  const maxNetflix = data.reduce((max, item) => 
    item.netflix_hours > max.netflix_hours ? item : max
  );
  
  insights.push({
    type: 'peak_netflix',
    message: `Peak Netflix day: ${new Date(maxNetflix.date).toLocaleDateString()} at ${maxNetflix.facility_name} with ${maxNetflix.netflix_hours}h (renewable: ${maxNetflix.renewable_percentage}%)`
  });
  
  // Find best renewable day
  const maxRenewable = data.reduce((max, item) => 
    item.renewable_percentage > max.renewable_percentage ? item : max
  );
  
  insights.push({
    type: 'peak_renewable',
    message: `Best renewable day: ${new Date(maxRenewable.date).toLocaleDateString()} at ${maxRenewable.facility_name} with ${maxRenewable.renewable_percentage}% (Netflix: ${maxRenewable.netflix_hours}h)`
  });
  
  // Calculate facility averages
  const facilityStats = data.reduce((acc, item) => {
    if (!acc[item.facility_id]) {
      acc[item.facility_id] = { 
        name: item.facility_name, 
        renewable: [], 
        netflix: [] 
      };
    }
    acc[item.facility_id].renewable.push(item.renewable_percentage);
    acc[item.facility_id].netflix.push(item.netflix_hours);
    return acc;
  }, {} as any);
  
  Object.entries(facilityStats).forEach(([id, stats]: [string, any]) => {
    const avgRenewable = stats.renewable.reduce((a: number, b: number) => a + b, 0) / stats.renewable.length;
    const avgNetflix = stats.netflix.reduce((a: number, b: number) => a + b, 0) / stats.netflix.length;
    
    insights.push({
      type: 'facility_average',
      message: `${stats.name}: ${Math.round(avgRenewable)}% renewable avg, ${Math.round(avgNetflix * 10) / 10}h Netflix avg`
    });
  });
  
  return insights;
}