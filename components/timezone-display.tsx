'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimezoneDisplayProps {
  userTimezone: string
  userLocation: string
}

export default function TimezoneDisplay({ userTimezone, userLocation }: TimezoneDisplayProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [visitorTimezone, setVisitorTimezone] = useState<string>('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Initialize time
    const now = new Date()
    setCurrentTime(now)
    
    // Get visitor's timezone
    const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone
    setVisitorTimezone(visitorTz)

    // Update time every second - create Date once and reuse
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date | null, timezone: string) => {
    if (!date || !timezone) return '--:--:--'
    try {
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: timezone
      }).format(date)
    } catch (error) {
      console.error('Error formatting time:', error)
      return '--:--:--'
    }
  }

  const formatDate = (date: Date | null, timezone: string) => {
    if (!date || !timezone) return 'Loading...'
    try {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: timezone
      }).format(date)
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Loading...'
    }
  }

  const getTimeDifference = () => {
    if (!visitorTimezone || !currentTime) return { text: 'Loading...', percentage: 50 }
    try {
      // Use Intl.DateTimeFormat with formatToParts() for accurate timezone calculations
      // Use current date for timezone offset calculation (more intuitive than epoch start)
      const REFERENCE_DATE = new Date()
      
      // Get timezone offsets using Intl.DateTimeFormat with formatToParts()
      const userFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: userTimezone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      })
      
      const visitorFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: visitorTimezone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      })

      // Get timezone offsets by comparing with UTC
      const utcFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      })

      // Format the same date in different timezones
      const utcParts = utcFormatter.formatToParts(REFERENCE_DATE)
      const userParts = userFormatter.formatToParts(REFERENCE_DATE)
      const visitorParts = visitorFormatter.formatToParts(REFERENCE_DATE)

      // Extract time components
      const getTimeInMinutes = (parts: Intl.DateTimeFormatPart[]) => {
        const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0')
        const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0')
        return hour * 60 + minute
      }

      const utcMinutes = getTimeInMinutes(utcParts)
      const userMinutes = getTimeInMinutes(userParts)
      const visitorMinutes = getTimeInMinutes(visitorParts)

      // Calculate timezone offsets in minutes
      const userOffset = userMinutes - utcMinutes
      const visitorOffset = visitorMinutes - utcMinutes

      // Calculate the difference in hours
      const diffHours = (visitorOffset - userOffset) / 60
      
      const absDiff = Math.abs(diffHours)
      const hours = Math.floor(absDiff)
      const minutes = Math.round((absDiff - hours) * 60)
      
      let text = ''
      if (hours === 0 && minutes === 0) {
        text = 'same time'
      } else if (hours === 0) {
        text = `${minutes}m ${diffHours > 0 ? 'ahead' : 'behind'}`
      } else if (minutes === 0) {
        text = `${hours}h ${diffHours > 0 ? 'ahead' : 'behind'}`
      } else {
        text = `${hours}h ${minutes}m ${diffHours > 0 ? 'ahead' : 'behind'}`
      }

      // Calculate percentage for the bar (50% is center, 0% is far left, 100% is far right)
      // Max time difference we'll show is ±12 hours
      const maxDiff = 12
      const clampedDiff = Math.max(-maxDiff, Math.min(maxDiff, diffHours))
      // If your time is ahead (positive diff), bar goes right (more blue)
      // If your time is behind (negative diff), bar goes left (more green)
      const percentage = 50 + (clampedDiff / maxDiff) * 50

      return { text, percentage }
    } catch (error) {
      console.error('Error calculating time difference:', error)
      return { text: 'calculating...', percentage: 50 }
    }
  }

  if (!isClient) {
    return (
      <motion.div 
        className="bg-[#252837] rounded-xl p-6 relative overflow-hidden"
        initial={{ backgroundColor: '#252837' }}
        whileHover={{ backgroundColor: '#313244' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute inset-0 bg-blue-500/20"
          initial={{ x: '100%', y: '100%' }}
          whileHover={{ x: 0, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
        />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Time Zones</h2>
              <p className="text-gray-400">See the difference between our timezones</p>
            </div>
            <div className="text-4xl">🌍</div>
          </div>
          <div className="text-center py-8">
            <div className="text-gray-400">Loading timezone data...</div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="bg-[#252837] rounded-xl p-6 relative overflow-hidden"
      initial={{ backgroundColor: '#252837' }}
      whileHover={{ backgroundColor: '#313244' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute inset-0 bg-blue-500/20"
        initial={{ x: '100%', y: '100%' }}
        whileHover={{ x: 0, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
      />
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Time Zones</h2>
            <p className="text-gray-400">Current time across different locations</p>
          </div>
          <div className="text-4xl">🌍</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Your Time */}
          <motion.div 
            className="bg-[#313244] rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold text-white">My Time ({userLocation})</h3>
            </div>
            <div className="text-3xl font-mono font-bold text-blue-400 mb-2">
              {formatTime(currentTime, userTimezone)}
            </div>
            <div className="text-sm text-gray-400">
              {formatDate(currentTime, userTimezone)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {userTimezone}
            </div>
          </motion.div>

          {/* Visitor's Time */}
          <motion.div 
            className="bg-[#313244] rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold text-white">Your Time</h3>
            </div>
            <div className="text-3xl font-mono font-bold text-green-400 mb-2">
              {formatTime(currentTime, visitorTimezone)}
            </div>
            <div className="text-sm text-gray-400">
              {formatDate(currentTime, visitorTimezone)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {visitorTimezone}
            </div>
          </motion.div>
        </div>

        {/* Time Difference Visual */}
        <div className="mt-6 bg-[#313244] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Time Difference</span>
            <span className="text-sm font-medium text-white">{getTimeDifference().text}</span>
          </div>
          
          <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500"
              initial={{ width: '50%' }}
              animate={{ width: `${getTimeDifference().percentage}%` }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full shadow-lg"></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>You</span>
            <span>Visitor</span>
          </div>
        </div>

      </div>
    </motion.div>
  )
} 