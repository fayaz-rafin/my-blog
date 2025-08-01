export async function getGeographicData() {
  try {
    // Get IP from server first
    const ipResponse = await fetch('/api/ip')
    const { ip } = await ipResponse.json()
    
    // Use a free IP geolocation service
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,timezone,query`)
    const data = await response.json()
    
    if (data.status === 'success') {
      return {
        country: data.country,
        countryCode: data.countryCode,
        region: data.regionName,
        city: data.city,
        timezone: data.timezone,
        ip: data.query
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting geographic data:', error)
    return null
  }
}

export function getVisitorId(): string {
  // Return empty string during SSR to avoid hydration mismatch
  if (typeof window === 'undefined') {
    return ''
  }
  
  let visitorId = localStorage.getItem('visitorId')
  if (!visitorId) {
    visitorId = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15)
    localStorage.setItem('visitorId', visitorId)
  }
  return visitorId
} 