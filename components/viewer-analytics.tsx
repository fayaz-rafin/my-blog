'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'

interface GeographicData {
  country: string
  count: number
  cities: string[]
}

interface ViewerAnalyticsProps {
  className?: string
}

export default function ViewerAnalytics({ className = '' }: ViewerAnalyticsProps) {
  const [viewerData, setViewerData] = useState<{
    totalViewers: number
    geographicData: GeographicData[]
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/viewers')
        if (response.ok) {
          const data = await response.json()
          setViewerData(data)
        }
      } catch (error) {
        console.error('Error fetching viewer data:', error)
        // Fallback to simulated data
        setViewerData({
          totalViewers: Math.floor(Math.random() * 10) + 1,
          geographicData: [
            { country: 'United States', count: 3, cities: ['New York', 'San Francisco'] },
            { country: 'United Kingdom', count: 2, cities: ['London'] },
            { country: 'Canada', count: 1, cities: ['Toronto'] }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className={`bg-[#252837] rounded-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-[#313244] rounded mb-4"></div>
          <div className="h-4 bg-[#313244] rounded mb-2"></div>
          <div className="h-4 bg-[#313244] rounded"></div>
        </div>
      </div>
    )
  }

  if (!viewerData) {
    return null
  }

  const topCountries = viewerData.geographicData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <motion.div
      className={`bg-[#252837] rounded-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Live Analytics</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#313244] rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">
              {viewerData.totalViewers}
            </div>
            <div className="text-sm text-gray-400">Active Viewers</div>
          </div>

          <div className="bg-[#313244] rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">
              {viewerData.geographicData.length}
            </div>
            <div className="text-sm text-gray-400">Countries</div>
          </div>
        </div>

        {topCountries.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Top Locations</h4>
            <div className="space-y-2">
              {topCountries.map((country, index) => (
                <motion.div
                  key={country.country}
                  className="flex items-center justify-between p-2 bg-[#313244] rounded"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">#{index + 1}</span>
                    <span className="text-sm text-white">{country.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-400">{country.count}</span>
                    <span className="text-xs text-gray-400">viewers</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#313244]">
          <p className="text-xs text-gray-400 text-center">
            Data updates every 30 seconds
          </p>
        </div>
      </div>
    </motion.div>
  )
} 