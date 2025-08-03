'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getVisitorId, getGeographicData } from '@/lib/geo'

interface OnlineViewersClientProps {
  className?: string
}

export default function OnlineViewersClient({ className = '' }: OnlineViewersClientProps) {
  const [viewerCount, setViewerCount] = useState<number>(0)
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const [isTracking, setIsTracking] = useState<boolean>(false)
  const [blobAvailable, setBlobAvailable] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [fallbackMode, setFallbackMode] = useState<boolean>(false)
  const [realtimeConnected, setRealtimeConnected] = useState<boolean>(false)
  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    // Initialize visitor ID
    const id = getVisitorId()

    // Check if Vercel Blob is available
    const checkBlobAvailability = async () => {
      try {
        const response = await fetch('/api/viewers')
        
        if (response.ok) {
          const data = await response.json()
          setViewerCount(data.totalViewers)
          setBlobAvailable(true)
          setError(false)
          setFallbackMode(false)
        } else {
          setBlobAvailable(false)
          setError(true)
          setFallbackMode(true)
        }
      } catch (error) {
        setBlobAvailable(false)
        setError(true)
        setFallbackMode(true)
      }
    }

    checkBlobAvailability()

    // Set up fallback mode with simulated data
    if (fallbackMode) {
      const simulateViewers = () => {
        // Use a simple counter that increments
        setViewerCount(prev => {
          const newCount = prev === 0 ? 1 : (prev % 3) + 1
          return newCount
        })
        setIsOnline(true)
      }

      // Initial count
      simulateViewers()

      // Update count every 30 seconds
      const interval = setInterval(simulateViewers, 30000)

      return () => clearInterval(interval)
    }

    // Only track if blob is available
    if (blobAvailable) {
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
            setError(true)
          }
        } catch (error) {
          setError(true)
        } finally {
          setIsTracking(false)
        }
      }

      trackViewer()

      // Set up real-time SSE connection
      const setupSSE = () => {
        try {
          const eventSource = new EventSource('/api/viewers/stream')
          eventSourceRef.current = eventSource

          eventSource.onopen = () => {
            setRealtimeConnected(true)
          }

          eventSource.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data)
              
              if (data.type === 'viewers-updated' && data.data) {
                setViewerCount(data.data.totalViewers)
                setError(false)
              } else if (data.type === 'viewer-joined' && data.data) {
                // Instant update when new viewer joins
                setViewerCount(data.data.totalViewers)
                setError(false)
              } else if (data.type === 'error') {
                setError(true)
              }
            } catch (error) {
              console.error('Error parsing SSE data:', error)
            }
          }

          eventSource.onerror = (error) => {
            setRealtimeConnected(false)
            setError(true)
            
            // Reconnect after 5 seconds
            setTimeout(() => {
              if (eventSourceRef.current) {
                eventSourceRef.current.close()
                setupSSE()
              }
            }, 5000)
          }

          return eventSource
        } catch (error) {
          setError(true)
        }
      }

      const eventSource = setupSSE()

      // Set up heartbeat
      const heartbeatInterval = setInterval(async () => {
        try {
          const response = await fetch('/api/socket', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'viewer-heartbeat',
              data: { id }
            }),
          })
          
          if (!response.ok) {
            console.error('Failed to send heartbeat - API error')
          }
        } catch (error) {
          console.error('Error sending heartbeat:', error)
        }
      }, 30000) // Every 30 seconds

      return () => {
        clearInterval(heartbeatInterval)
        if (eventSource) {
          eventSource.close()
        }
        if (eventSourceRef.current) {
          eventSourceRef.current.close()
        }
      }
    }
  }, [blobAvailable, fallbackMode])

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