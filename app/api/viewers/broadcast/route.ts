import { NextRequest, NextResponse } from 'next/server'

// Use a regular Map for reliable client management
const clientMap = new Map<ReadableStreamDefaultController, boolean>()

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    start(controller) {
      // Add this client to the map
      clientMap.set(controller, true)
      
      // Send initial connection message
      controller.enqueue(encoder.encode('data: {"type":"connected","message":"Broadcast connected"}\n\n'))
      
      // Clean up when connection closes
      request.signal.addEventListener('abort', () => {
        clientMap.delete(controller)
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body
    
    const encoder = new TextEncoder()
    const message = JSON.stringify({ type, data, timestamp: Date.now() })
    
    // Broadcast to all connected clients
    let activeClients = 0
    for (const [client, isActive] of clientMap.entries()) {
      if (isActive) {
        try {
          client.enqueue(encoder.encode(`data: ${message}\n\n`))
          activeClients++
        } catch (error) {
          // Remove disconnected clients
          clientMap.delete(client)
        }
      }
    }
    
    return NextResponse.json({ success: true, clientsCount: activeClients })
  } catch (error) {
    console.error('Broadcast error:', error)
    return NextResponse.json({ error: 'Broadcast failed' }, { status: 500 })
  }
} 