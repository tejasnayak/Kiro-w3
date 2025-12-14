# 🌱 Renewable Energy vs 📺 Netflix Dashboard

A playful but functional sustainability storytelling tool that explores the quirky relationship between renewable energy usage and Netflix streaming patterns across multiple facilities.

## Features

- **Interactive Line Chart**: Visualize renewable energy percentage and Netflix streaming hours over time
- **Multi-Facility Support**: Track data across San Francisco HQ, New York Office, and Austin Lab
- **Time Range Filters**: View data for last 30 days, 6 months, or 12 months
- **Correlation Analysis**: Calculate and display correlation coefficient between metrics
- **Anomaly Detection**: Automatically flag unusual patterns (low renewable + high Netflix usage)
- **Fun Insights**: Auto-generated interesting facts and patterns
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript
- **UI Components**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Data Structure

### Renewable Energy Data
- `date`: Daily timestamp
- `facility_id`: Unique facility identifier
- `total_energy_kwh`: Total energy consumption
- `renewable_energy_kwh`: Renewable energy portion
- `renewable_percentage`: Calculated percentage

### Netflix Streaming Data
- `date`: Daily timestamp  
- `facility_id`: Unique facility identifier
- `netflix_data_mb`: Data usage in megabytes
- `netflix_hours`: Calculated streaming hours (500MB = 1 hour HD)

## Key Metrics

- **Average Renewable %**: Mean renewable energy percentage across selected facilities
- **Average Netflix Hours**: Mean daily streaming hours
- **Correlation**: Statistical correlation between renewable usage and Netflix consumption
- **Anomalies**: Count of detected unusual patterns

## Insights & Anomalies

The dashboard automatically generates:
- Peak usage days for both metrics
- Facility-specific averages
- Correlation patterns
- Anomaly detection for sustainability awareness

## Deployment

The app is designed to be easily deployable to:
- Vercel (recommended for Next.js)
- Netlify
- Google Cloud Run
- Any Node.js hosting platform

## Use Cases

- **ESG Awareness Campaigns**: Highlight sustainability patterns
- **CSR Showcases**: Demonstrate environmental consciousness
- **Internal Green Office Nudges**: Encourage sustainable behavior
- **Sustainability Storytelling**: Create engaging narratives around data

## Customization

- Modify `lib/utils.ts` to adjust data generation patterns
- Update facility information in the Dashboard component
- Customize anomaly detection rules
- Add new insight generation logic

## License

MIT License - feel free to use for your sustainability initiatives!