# Real-Time Viewer Tracking System

This portfolio includes a comprehensive real-time viewer tracking system that shows live analytics of who's viewing your site.

## Features

### 🎯 Real-Time Tracking
- **Live Viewer Count**: Shows how many people are currently viewing your site
- **WebSocket Updates**: Real-time updates using Socket.IO
- **Geographic Data**: Tracks viewer locations by country and city
- **Interactive Dashboard**: Click the viewer counter to see detailed analytics

### 🌍 Geographic Analytics
- **Country Tracking**: See which countries your viewers are from
- **City Data**: Track specific cities within countries
- **Top Locations**: Display the most active viewing locations
- **Real-time Updates**: Geographic data updates every 30 seconds

### 💾 Data Storage
- **Vercel Blob Storage**: Uses Vercel Blob for scalable data storage
- **JSON Files**: Each viewer session stored as a JSON file
- **Automatic Cleanup**: Inactive viewers (5+ minutes) are automatically filtered out

## Architecture

### Backend Components

1. **API Routes**:
   - `/api/viewers` - Main viewer tracking endpoint
   - `/api/ip` - IP address detection
   - `/api/socket` - WebSocket server for real-time updates

2. **Data Storage**:
   - Vercel Blob storage for viewer session data
   - Each viewer gets a unique JSON file
   - Automatic cleanup of inactive sessions

3. **Geographic Data**:
   - Uses ip-api.com for IP geolocation
   - Tracks country, city, region, and timezone
   - Server-side IP detection for accuracy

### Frontend Components

1. **OnlineViewers Component**:
   - Real-time viewer counter
   - Interactive dropdown with detailed analytics
   - WebSocket connection for live updates
   - Geographic data display

2. **ViewerAnalytics Component**:
   - Comprehensive analytics dashboard
   - Top countries and viewer counts
   - Live data updates every 30 seconds

## Setup Instructions

### 1. Environment Variables
Add these to your `.env.local`:
```
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

### 2. Vercel Blob Setup
1. Install Vercel Blob: `npm install @vercel/blob`
2. Create a Blob store in your Vercel dashboard
3. Add the token to your environment variables

### 3. Dependencies
```bash
npm install @vercel/blob socket.io socket.io-client
```

## Usage

### Basic Viewer Counter
```tsx
import OnlineViewers from '@/components/online-viewers'

<OnlineViewers />
```

### Analytics Dashboard
```tsx
import ViewerAnalytics from '@/components/viewer-analytics'

<ViewerAnalytics />
```

## Data Flow

1. **Visitor Arrives**: 
   - Unique visitor ID generated
   - IP address detected server-side
   - Geographic data fetched from IP

2. **Real-Time Tracking**:
   - WebSocket connection established
   - Viewer data stored in Vercel Blob
   - Heartbeat updates every 30 seconds

3. **Analytics Display**:
   - Live viewer count updates
   - Geographic data aggregated
   - Interactive dashboard with detailed stats

## Privacy & Performance

### Privacy
- No personal data collected
- Only IP-based geographic data
- Anonymous visitor tracking
- Data automatically expires after 5 minutes

### Performance
- Efficient WebSocket connections
- Minimal API calls
- Cached geographic data
- Automatic cleanup of stale data

## Customization

### Styling
All components use Tailwind CSS and can be customized:
```tsx
<OnlineViewers className="custom-class" />
<ViewerAnalytics className="custom-class" />
```

### Data Retention
Modify the active threshold in `/api/viewers/route.ts`:
```typescript
const activeThreshold = 5 * 60 * 1000 // 5 minutes
```

### Geographic Services
Replace the IP geolocation service in `/lib/geo.ts`:
```typescript
// Currently uses ip-api.com
// Can be replaced with other services
```

## Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**:
   - Check if Socket.IO is properly installed
   - Verify the socket path in the component

2. **Geographic Data Not Loading**:
   - Check network connectivity
   - Verify IP geolocation service is accessible

3. **Blob Storage Errors**:
   - Verify Vercel Blob token is correct
   - Check blob store permissions

### Debug Mode
Enable console logging by adding:
```typescript
console.log('Viewer data:', viewerData)
```

## Future Enhancements

- [ ] Add viewer session duration tracking
- [ ] Implement viewer path tracking
- [ ] Add real-time chat feature
- [ ] Create detailed analytics dashboard
- [ ] Add viewer engagement metrics
- [ ] Implement viewer notifications 