'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface OnlineViewersProps {
  className?: string
}

export default function OnlineViewers({ className = '' }: OnlineViewersProps) {
  const [viewerCount, setViewerCount] = useState<number>(0)
  const [isOnline, setIsOnline] = useState<boolean>(false)

  useEffect(() => {
    // Generate a unique visitor ID
    const visitorId = localStorage.getItem('visitorId') || 
      Math.random().toString(36).substring(2, 15) + 
      Math.random().toString(36).substring(2, 15)
    
    localStorage.setItem('visitorId', visitorId)

    // Simulate real-time viewer count
    const simulateViewers = () => {
      // Base count with some randomness
      const baseCount = Math.floor(Math.random() * 5) + 1
      const randomIncrement = Math.floor(Math.random() * 3)
      const newCount = baseCount + randomIncrement
      
      setViewerCount(newCount)
      setIsOnline(true)
    }

    // Initial count
    simulateViewers()

    // Update count every 30 seconds
    const interval = setInterval(simulateViewers, 30000)

    // Cleanup on unmount
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <motion.div
      className={`inline-flex items-center gap-2 text-sm text-gray-400 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs">
          {viewerCount} {viewerCount === 1 ? 'person' : 'people'} online
        </span>
      </div>
    </motion.div>
  )
} 