import { NextRequest } from 'next/server'
import { getViewerData } from '@/lib/viewer-utils'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

// Shared cache and controller list (global for the module)
let viewerDataCache: any = null
let controllers: Array<{ controller: ReadableStreamDefaultController, encoder: TextEncoder }> = []
let pollingInterval: NodeJS.Timeout | null = null

async function pollViewerDataAndBroadcast() {
  try {
    const data = await getViewerData()
    viewerDataCache = data
    const sseData = {
      type: 'viewers-updated',
      data: data
    }
    const encoded = new TextEncoder().encode(`data: ${JSON.stringify(sseData)}\n\n`)
    // Broadcast to all connected clients
    controllers.forEach(({ controller, encoder }) => {
      controller.enqueue(encoded)
    })
  } catch (error) {
    console.error('Error fetching viewer data for SSE:', error)
    const errorMsg = new TextEncoder().encode('data: {"type":"error","message":"Failed to fetch viewer data"}\n\n')
    controllers.forEach(({ controller, encoder }) => {
      controller.enqueue(errorMsg)
    })
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