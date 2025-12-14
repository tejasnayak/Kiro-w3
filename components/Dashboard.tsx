'use client'

import React, { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { generateDummyData, calculateCorrelation, detectAnomalies, generateInsights } from '@/lib/utils'
import { Calendar, Zap, Tv, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'

const Dashboard = () => {
  const [selectedFacilities, setSelectedFacilities] = useState(['SF-HQ', 'NYC-OFFICE', 'AUSTIN-LAB'])
  const [timeRange, setTimeRange] = useState('6months')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const allData = useMemo(() => generateDummyData(), [])
  
  const facilities = [
    { id: 'SF-HQ', name: 'San Francisco HQ' },
    { id: 'NYC-OFFICE', name: 'New York Office' },
    { id: 'AUSTIN-LAB', name: 'Austin Lab' }
  ]

  const filteredData = useMemo(() => {
    let filtered = allData.filter(item => selectedFacilities.includes(item.facility_id))
    
    const now = new Date()
    let startDate = new Date()
    
    switch (timeRange) {
      case '30days':
        startDate.setDate(now.getDate() - 30)
        break
      case '6months':
        startDate.setMonth(now.getMonth() - 6)
        break
      case '12months':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate = new Date('2024-01-01')
    }
    
    return filtered.filter(item => new Date(item.date) >= startDate)
  }, [allData, selectedFacilities, timeRange])

  const chartData = useMemo(() => {
    const grouped = filteredData.reduce((acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = {
          date: item.date,
          renewable_percentage: 0,
          netflix_hours: 0,
          count: 0
        }
      }
      acc[item.date].renewable_percentage += item.renewable_percentage
      acc[item.date].netflix_hours += item.netflix_hours
      acc[item.date].count += 1
      return acc
    }, {} as any)

    return Object.values(grouped).map((item: any) => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      renewable_percentage: Math.round(item.renewable_percentage / item.count),
      netflix_hours: Math.round((item.netflix_hours / item.count) * 10) / 10
    }))
  }, [filteredData])

  const correlation = useMemo(() => {
    const renewableValues = filteredData.map(item => item.renewable_percentage)
    const netflixValues = filteredData.map(item => item.netflix_hours)
    return calculateCorrelation(renewableValues, netflixValues)
  }, [filteredData])

  const anomalies = useMemo(() => detectAnomalies(filteredData), [filteredData])
  const insights = useMemo(() => generateInsights(filteredData), [filteredData])

  const toggleFacility = (facilityId: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facilityId) 
        ? prev.filter(id => id !== facilityId)
        : [...prev, facilityId]
    )
  }

  const averages = useMemo(() => {
    const totalRenewable = filteredData.reduce((sum, item) => sum + item.renewable_percentage, 0)
    const totalNetflix = filteredData.reduce((sum, item) => sum + item.netflix_hours, 0)
    const count = filteredData.length
    
    return {
      renewable: count > 0 ? Math.round(totalRenewable / count) : 0,
      netflix: count > 0 ? Math.round((totalNetflix / count) * 10) / 10 : 0
    }
  }, [filteredData])

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">🌱 Renewable Energy vs 📺 Netflix Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Exploring the quirky relationship between sustainability and streaming habits
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="ml-4"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </Button>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Filters & Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium">Facilities:</label>
                <div className="flex gap-2">
                  {facilities.map(facility => (
                    <Button
                      key={facility.id}
                      variant={selectedFacilities.includes(facility.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFacility(facility.id)}
                    >
                      {facility.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range:</label>
                <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                  <option value="30days">Last 30 Days</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="12months">Last 12 Months</option>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Renewable %</CardTitle>
              <Zap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{averages.renewable}%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Netflix Hours</CardTitle>
              <Tv className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{averages.netflix}h</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Correlation</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{(correlation * 100).toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {Math.abs(correlation) > 0.3 ? 'Strong' : Math.abs(correlation) > 0.1 ? 'Moderate' : 'Weak'} correlation
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anomalies</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{anomalies.length}</div>
              <p className="text-xs text-muted-foreground">Detected issues</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Renewable Energy % vs Netflix Streaming Hours</CardTitle>
            <CardDescription>
              Daily averages across selected facilities. Green line shows renewable energy percentage, red line shows Netflix hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}${name === 'renewable_percentage' ? '%' : 'h'}`,
                      name === 'renewable_percentage' ? 'Renewable Energy' : 'Netflix Hours'
                    ]}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="renewable_percentage" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    name="Renewable Energy %"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="netflix_hours" 
                    stroke="#dc2626" 
                    strokeWidth={2}
                    name="Netflix Hours"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Insights and Anomalies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Fun Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insights.slice(0, 5).map((insight, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{insight.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Anomaly Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {anomalies.slice(0, 5).map((anomaly, index) => (
                  <div key={index} className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">{anomaly.facility_name}</p>
                        <p className="text-xs text-muted-foreground">{new Date(anomaly.date).toLocaleDateString()}</p>
                      </div>
                      <span className="text-xs bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">
                        {anomaly.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm mt-2">{anomaly.message}</p>
                  </div>
                ))}
                {anomalies.length === 0 && (
                  <p className="text-sm text-muted-foreground">No anomalies detected in the current time range.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard