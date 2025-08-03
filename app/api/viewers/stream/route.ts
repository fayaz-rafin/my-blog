import { NextRequest } from 'next/server'
import { getViewerData } from '@/lib/viewer-utils'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

// No shared cache or controller list (per-connection state only)

// Helper function to fetch and encode viewer data for SSE
async function fetchAndEncodeViewerData() {
  try {
    const data = await getViewerData()
    const sseData = {
      type: 'viewers-updated',
      data: data
    }
    return new TextEncoder().encode(`data: ${JSON.stringify(sseData)}\n\n`)
  } catch (error) {
    console.error('Error fetching viewer data for SSE:', error)
    return new TextEncoder().encode('data: {"type":"error","message":"Failed to fetch viewer data"}\n\n')
  }
}

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  // Create a readable stream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Add this controller to the global list
      controllers.push({ controller, encoder })

      // Send initial connection message
      controller.enqueue(encoder.encode('data: {"type":"connected","message":"SSE connected"}\n\n'))

      // Send cached data immediately if available
      if (viewerDataCache !== null) {
        const sseData = {
          type: 'viewers-updated',
          data: viewerDataCache
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(sseData)}\n\n`))
      }

      // Start polling if this is the first client
      if (controllers.length === 1) {
        pollingInterval = setInterval(pollViewerDataAndBroadcast, 15000)
        // Also fetch immediately
        pollViewerDataAndBroadcast()
      }

      // Clean up when connection closes
      request.signal.addEventListener('abort', () => {
        // Remove this controller from the list
        controllers = controllers.filter(c => c.controller !== controller)
        controller.close()
        // Stop polling if no clients remain
        if (controllers.length === 0 && pollingInterval) {
          clearInterval(pollingInterval)
          pollingInterval = null
        }
      })
    }
  })
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    }
  })
} 