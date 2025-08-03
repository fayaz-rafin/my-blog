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
  const [error, setError] = useState<boolean>(false)
  const [fallbackMode, setFallbackMode] = useState<boolean>(false)

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
          setError(false)
          setFallbackMode(false)
          return true
        } else {
          console.log('Vercel Blob not available - API returned error')
          setBlobAvailable(false)
          setError(true)
          setFallbackMode(true)
          return false
        }
      } catch (error) {
        console.log('Vercel Blob not available - Network error:', error)
        setBlobAvailable(false)
        setError(true)
        setFallbackMode(true)
        return false
      }
    }

    // Initialize the system
    const initializeSystem = async () => {
      const isBlobAvailable = await checkBlobAvailability()
      
      if (!isBlobAvailable) {
        // Set up fallback mode with simulated data
        const simulateViewers = () => {
          const baseCount = Math.floor(Math.random() * 3) + 1
          const randomIncrement = Math.floor(Math.random() * 2)
          const newCount = baseCount + randomIncrement
          setViewerCount(newCount)
          setIsOnline(true)
        }

        // Initial count
        simulateViewers()

        // Update count every 30 seconds
        const interval = setInterval(simulateViewers, 30000)
        return () => clearInterval(interval)
      } else {
        // Track viewer with real data
        const trackViewer = async () => {
          try {
            setIsTracking(true)
            setError(false)
            
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
            } else {
              console.error('Failed to track viewer - API error')
              setError(true)
            }
          } catch (error) {
            console.error('Error tracking viewer:', error)
            setError(true)
          } finally {
            setIsTracking(false)
          }
        }

        trackViewer()

        // Set up polling for viewer updates and heartbeat in a single interval
        const updateViewersAndHeartbeat = async () => {
          try {
            // Update viewer count
            const response = await fetch('/api/viewers')
            if (response.ok) {
              const data = await response.json()
              setViewerCount(data.totalViewers)
              setError(false)
            } else {
              console.error('Failed to update viewers - API error')
              setError(true)
            }

            // Send heartbeat
            const heartbeatResponse = await fetch('/api/socket', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'viewer-heartbeat',
                data: { id }
              }),
            })
            
            if (!heartbeatResponse.ok) {
              console.error('Failed to send heartbeat - API error')
            }
          } catch (error) {
            console.error('Error in update cycle:', error)
            setError(true)
          }
        }

        // Update every 30 seconds
        const interval = setInterval(updateViewersAndHeartbeat, 30000)
        return () => clearInterval(interval)
      }
    }

    let cleanup: (() => void) | undefined

    initializeSystem().then((cleanupFn) => {
      cleanup = cleanupFn
    })

    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [mounted])

  // Don't render anything during SSR or if not mounted
  if (!mounted) {
    return null
  }

  // Don't render if there's an error and not in fallback mode
  if (error && !fallbackMode) {
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
        {fallbackMode && (
          <span className="text-xs text-gray-500 ml-1">(demo)</span>
        )}
      </div>
    </motion.div>
  )
} 