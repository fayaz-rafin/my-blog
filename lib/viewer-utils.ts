import { put, list, del } from '@vercel/blob'

interface ViewerData {
  id: string
  timestamp: number
  userAgent: string
  ip: string
  country?: string
  city?: string
  region?: string
  timezone?: string
  lastSeen: number
}

// In-memory storage for fallback (when Vercel Blob is not configured)
let inMemoryViewers: ViewerData[] = []

export async function getViewerData() {
  try {
    const now = Date.now()
    const activeThreshold = 5 * 60 * 1000 // 5 minutes
    const cutoffTime = now - activeThreshold
    let viewers: ViewerData[] = []

    // Try to use Vercel Blob, fallback to in-memory storage
    try {
      // Filter by timestamp prefix to only fetch recent blobs
      const timestampPrefix = Math.floor(cutoffTime / 1000).toString()
      const { blobs } = await list({ prefix: 'viewers/' })
      
      // Filter blobs by timestamp before fetching
      const recentBlobs = blobs.filter(blob => {
        // Extract timestamp from blob name if it follows a pattern
        const timestampMatch = blob.pathname.match(/(\d+)/)
        if (timestampMatch) {
          const blobTimestamp = parseInt(timestampMatch[1]) * 1000
          return blobTimestamp >= cutoffTime
        }
        // If no timestamp in name, fetch and check later
        return true
      })
      
      for (const blob of recentBlobs) {
        try {
          const response = await fetch(blob.url)
          const viewerData: ViewerData = await response.json()
          
          // Double-check if viewer is still active
          if (now - viewerData.lastSeen < activeThreshold) {
            viewers.push(viewerData)
          }
        } catch (error) {
          console.error('Error reading viewer data:', error)
        }
      }
    } catch (blobError) {
      console.log('Using in-memory viewer data')
      // Use in-memory storage
      viewers = inMemoryViewers.filter(viewer => 
        now - viewer.lastSeen < activeThreshold
      )
    }

    // Group by country for geographic data
    const geographicData = viewers.reduce((acc, viewer) => {
      const country = viewer.country || 'Unknown'
      if (!acc[country]) {
        acc[country] = {
          count: 0,
          cities: new Set()
        }
      }
      acc[country].count++
      if (viewer.city) {
        acc[country].cities.add(viewer.city)
      }
      return acc
    }, {} as Record<string, { count: number; cities: Set<string> }>)

    // Convert Set to array for JSON serialization
    const geographicDataSerialized = Object.entries(geographicData).map(([country, data]) => ({
      country,
      count: data.count,
      cities: Array.from(data.cities)
    }))

    return {
      totalViewers: viewers.length,
      viewers: viewers.map(v => ({ id: v.id, country: v.country, city: v.city, lastSeen: v.lastSeen })),
      geographicData: geographicDataSerialized
    }
  } catch (error) {
    console.error('Error getting viewers:', error)
    throw new Error('Failed to get viewers')
  }
} 