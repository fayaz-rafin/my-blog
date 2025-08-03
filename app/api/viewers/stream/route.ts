import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()
  
  // Create a readable stream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(encoder.encode('data: {"type":"connected","message":"SSE connected"}\n\n'))
      
      // Set up interval to send viewer updates
      const interval = setInterval(async () => {
        try {
          // Fetch current viewer data
          const response = await fetch(`${request.nextUrl.origin}/api/viewers`)
          if (response.ok) {
            const data = await response.json()
            
            // Send viewer data as SSE
            const sseData = {
              type: 'viewers-updated',
              data: data
            }
            
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(sseData)}\n\n`))
          }
        } catch (error) {
          console.error('Error fetching viewer data for SSE:', error)
          controller.enqueue(encoder.encode('data: {"type":"error","message":"Failed to fetch viewer data"}\n\n'))
        }
      }, 5000) // Update every 5 seconds for real-time feel
      
      // Clean up interval when connection closes
      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
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