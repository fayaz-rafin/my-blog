'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getVisitorId, getGeographicData } from '@/lib/geo'

interface OnlineViewersProps {
  className?: string
}

export default function OnlineViewers({ className = '' }: OnlineViewersProps) {
  const [viewerCount, setViewerCount] = useState<number>(0)
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const [isTracking, setIsTracking] = useState<boolean>(false)
  const [blobAvailable, setBlobAvailable] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Initialize visitor ID
    const id = getVisitorId()

    // Check if Vercel Blob is available
    const checkBlobAvailability = async () => {
      try {
        const response = await fetch('/api/viewers')
        if (response.ok) {
          setBlobAvailable(true)
        }
      } catch (error) {
        console.log('Vercel Blob not available')
        setBlobAvailable(false)
      }
    }

    checkBlobAvailability()

    // Only track if blob is available
    if (blobAvailable) {
      const trackViewer = async () => {
        try {
          setIsTracking(true)
          
          // Get geographic data
          const geoData = await getGeographicData()
          
          // Track viewer with geographic data
          const response = await fetch('/api/socket', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'track-viewer',
              data: {
                id,
                userAgent: navigator.userAgent,
                ...geoData
              }
            }),
          })

          if (response.ok) {
            const result = await response.json()
            if (result.viewersData) {
              setViewerCount(result.viewersData.totalViewers)
            }
            setIsOnline(true)
          }
        } catch (error) {
          console.error('Error tracking viewer:', error)
        } finally {
          setIsTracking(false)
        }
      }

      trackViewer()

      // Set up polling for viewer updates
      const updateViewers = async () => {
        try {
          const response = await fetch('/api/viewers')
          if (response.ok) {
            const data = await response.json()
            setViewerCount(data.totalViewers)
          }
        } catch (error) {
          console.error('Error updating viewers:', error)
        }
      }

      // Update viewers every 30 seconds
      const interval = setInterval(updateViewers, 30000)

      // Set up heartbeat
      const heartbeatInterval = setInterval(async () => {
        try {
          await fetch('/api/socket', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'viewer-heartbeat',
              data: { id }
            }),
          })
        } catch (error) {
          console.error('Error sending heartbeat:', error)
        }
      }, 30000) // Every 30 seconds

      return () => {
        clearInterval(interval)
        clearInterval(heartbeatInterval)
      }
    }
  }, [mounted, blobAvailable])

  // Don't render anything during SSR or if not mounted
  if (!mounted) {
    return null
  }

  // Don't render if blob is not available
  if (!blobAvailable) {
    return null
  }

  return (
    <motion.div
      className={`inline-flex items-center gap-2 text-sm text-gray-400 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`}></div>
        <span className="text-xs">
          {isTracking ? 'Connecting...' : `${viewerCount} ${viewerCount === 1 ? 'person' : 'people'} online`}
        </span>
      </div>
    </motion.div>
  )
} 