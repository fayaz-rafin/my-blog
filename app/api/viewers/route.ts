import { NextRequest, NextResponse } from 'next/server'
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, userAgent, country, city, region, timezone } = body
    
    // Get IP address server-side
    const forwarded = request.headers.get('x-forwarded-for')
    const real = request.headers.get('x-real-ip')
    const cfConnectingIp = request.headers.get('cf-connecting-ip')
    
    let ip = request.ip || 
             (forwarded && forwarded.split(',')[0]) ||
             real ||
             cfConnectingIp ||
             '127.0.0.1'

    // Clean up IP address
    ip = ip.replace(/^::ffff:/, '')
    
    const viewerData: ViewerData = {
      id,
      timestamp: Date.now(),
      userAgent,
      ip,
      country,
      city,
      region,
      timezone,
      lastSeen: Date.now()
    }

    // Try to use Vercel Blob, fallback to in-memory storage
    try {
      const filename = `viewers/${id}.json`
      await put(filename, JSON.stringify(viewerData), {
        access: 'public',
        addRandomSuffix: false
      })
    } catch (blobError) {
      console.log('Vercel Blob not configured, using in-memory storage')
      // Update or add to in-memory storage
      const existingIndex = inMemoryViewers.findIndex(v => v.id === id)
      if (existingIndex >= 0) {
        inMemoryViewers[existingIndex] = viewerData
      } else {
        inMemoryViewers.push(viewerData)
      }
    }

    return NextResponse.json({ success: true, viewer: viewerData })
  } catch (error) {
    console.error('Error tracking viewer:', error)
    return NextResponse.json({ error: 'Failed to track viewer' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const now = Date.now()
    const activeThreshold = 5 * 60 * 1000 // 5 minutes
    let viewers: ViewerData[] = []

    // Try to use Vercel Blob, fallback to in-memory storage
    try {
      const { blobs } = await list({ prefix: 'viewers/' })
      
      for (const blob of blobs) {
        try {
          const response = await fetch(blob.url)
          const viewerData: ViewerData = await response.json()
          
          // Only include active viewers (seen in last 5 minutes)
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

    return NextResponse.json({
      totalViewers: viewers.length,
      viewers: viewers.map(v => ({ id: v.id, country: v.country, city: v.city, lastSeen: v.lastSeen })),
      geographicData: geographicDataSerialized
    })
  } catch (error) {
    console.error('Error getting viewers:', error)
    return NextResponse.json({ error: 'Failed to get viewers' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body
    
    // Try to update in Vercel Blob, fallback to in-memory storage
    try {
      const filename = `viewers/${id}.json`
      const response = await fetch(`${process.env.VERCEL_BLOB_STORE_URL || ''}/${filename}`)
      
      if (response.ok) {
        const viewerData: ViewerData = await response.json()
        viewerData.lastSeen = Date.now()
        
        await put(filename, JSON.stringify(viewerData), {
          access: 'public',
          addRandomSuffix: false
        })
      }
    } catch (blobError) {
      // Update in-memory storage
      const viewerIndex = inMemoryViewers.findIndex(v => v.id === id)
      if (viewerIndex >= 0) {
        inMemoryViewers[viewerIndex].lastSeen = Date.now()
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating viewer:', error)
    return NextResponse.json({ error: 'Failed to update viewer' }, { status: 500 })
  }
} 