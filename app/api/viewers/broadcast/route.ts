import { NextRequest, NextResponse } from 'next/server'

// Store connected SSE clients
const clients = new Set<ReadableStreamDefaultController>()

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    start(controller) {
      // Add this client to the set
      clients.add(controller)
      
      // Send initial connection message
      controller.enqueue(encoder.encode('data: {"type":"connected","message":"Broadcast connected"}\n\n'))
      
      // Clean up when connection closes
      request.signal.addEventListener('abort', () => {
        clients.delete(controller)
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
    clients.forEach(client => {
      try {
        client.enqueue(encoder.encode(`data: ${message}\n\n`))
      } catch (error) {
        // Remove disconnected clients
        clients.delete(client)
      }
    })
    
    return NextResponse.json({ success: true, clientsCount: clients.size })
  } catch (error) {
    console.error('Broadcast error:', error)
    return NextResponse.json({ error: 'Broadcast failed' }, { status: 500 })
  }
} 