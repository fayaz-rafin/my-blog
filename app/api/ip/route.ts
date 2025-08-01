import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get IP from various headers (for different hosting environments)
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

    return NextResponse.json({ ip })
  } catch (error) {
    console.error('Error getting IP:', error)
    return NextResponse.json({ ip: '127.0.0.1' })
  }
} 