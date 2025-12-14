'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Zap, 
  Tv, 
  TrendingUp, 
  BarChart3, 
  Eye, 
  Github, 
  ExternalLink,
  Lightbulb,
  Target,
  Cpu,
  Sparkles
} from 'lucide-react'
import Dashboard from './Dashboard'

const LandingPage = () => {
  const [showDashboard, setShowDashboard] = useState(false)

  if (showDashboard) {
    return <Dashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 backdrop-blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          {/* Header Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-sm font-medium">SUSTAINABILITY METRICS</span>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-violet-500 rounded-full px-4 py-2">
              <span className="text-white text-sm font-bold">RENEWABLE × STREAMING</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              onClick={() => setShowDashboard(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Eye className="w-4 h-4 mr-2" />
              LIVE DEMO
            </Button>
            <Button 
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 font-semibold px-6 py-3 rounded-lg"
              onClick={() => window.open('https://github.com/yourusername/renewable-netflix-dashboard', '_blank')}
            >
              VISIT SITE
            </Button>
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-2">
              <span className="text-slate-400 text-sm">BUILT WITH</span>
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-slate-900 font-bold px-3 py-1 rounded text-sm">
                KIRO AI
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-2">
              <span className="text-slate-400 text-sm">LICENSE</span>
              <div className="bg-green-500 text-white font-bold px-3 py-1 rounded text-sm">
                MIT
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover hidden correlations between{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                renewable energy trends
              </span>{' '}
              and{' '}
              <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                Netflix streaming patterns
              </span>
            </h1>
            
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-6 text-slate-300">
              <a href="#features" className="hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400">
                Features
              </a>
              <span className="text-slate-600">•</span>
              <button 
                onClick={() => setShowDashboard(true)}
                className="hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400"
              >
                Demo
              </button>
              <span className="text-slate-600">•</span>
              <a href="#installation" className="hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400">
                Installation
              </a>
              <span className="text-slate-600">•</span>
              <a href="#tech-stack" className="hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400">
                Tech Stack
              </a>
              <span className="text-slate-600">•</span>
              <a href="#deployment" className="hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400">
                Deployment
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Powerful Features for Sustainability Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-green-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Interactive Visualizations</CardTitle>
                <CardDescription className="text-slate-400">
                  Dual-axis line charts with renewable energy percentages and Netflix streaming hours
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Correlation Analysis</CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time statistical correlation calculation between sustainability and streaming metrics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-orange-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Anomaly Detection</CardTitle>
                <CardDescription className="text-slate-400">
                  Automatically flags unusual patterns for sustainability awareness campaigns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Smart Insights</CardTitle>
                <CardDescription className="text-slate-400">
                  AI-generated insights and fun facts about energy usage and streaming patterns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Multi-Facility Support</CardTitle>
                <CardDescription className="text-slate-400">
                  Track and compare data across multiple office locations and facilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-yellow-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">AI-Accelerated Development</CardTitle>
                <CardDescription className="text-slate-400">
                  Built in under 2 hours using Kiro AI - 83% faster than traditional development
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Modern Tech Stack</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Next.js 14', color: 'from-gray-400 to-gray-600' },
              { name: 'React', color: 'from-blue-400 to-cyan-500' },
              { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
              { name: 'Tailwind CSS', color: 'from-cyan-400 to-blue-500' },
              { name: 'shadcn/ui', color: 'from-slate-400 to-slate-600' },
              { name: 'Recharts', color: 'from-green-400 to-emerald-500' },
              { name: 'Lucide Icons', color: 'from-orange-400 to-red-500' },
              { name: 'Kiro AI', color: 'from-yellow-400 to-orange-500' }
            ].map((tech, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-r ${tech.color} rounded-lg p-4 transform group-hover:scale-105 transition-all duration-200`}>
                  <div className="text-white font-semibold">{tech.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Quick Start</h2>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">1. Clone the repository</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-green-400">
                  git clone https://github.com/yourusername/renewable-netflix-dashboard.git
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">2. Install dependencies</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-green-400">
                  npm install
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">3. Run development server</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-green-400">
                  npm run dev
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">4. Open in browser</h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-blue-400">
                  http://localhost:3000
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Explore Sustainability Data?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Discover the hidden patterns between renewable energy usage and streaming habits
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              onClick={() => setShowDashboard(true)}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Eye className="w-5 h-5 mr-2" />
              Launch Dashboard
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-slate-400 text-slate-300 hover:bg-slate-700 font-semibold px-8 py-4 rounded-lg"
              onClick={() => window.open('https://github.com/yourusername/renewable-netflix-dashboard', '_blank')}
            >
              <Github className="w-5 h-5 mr-2" />
              View Source
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 mb-4">
            Built with ❤️ using Kiro AI • Part of AI for Bharat Initiative
          </p>
          <p className="text-slate-500 text-sm">
            Demonstrating the power of AI-accelerated development for sustainability solutions
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage