import fs from 'fs'
import path from 'path'

import NowContent from '@/components/now-content'

export default function Page(): React.JSX.Element {
  const filePath = path.join(process.cwd(), 'app/now/page.tsx')
  let lastUpdatedIso = new Date().toISOString()

  try {
    const stats = fs.statSync(filePath)
    lastUpdatedIso = stats.mtime.toISOString()
  } catch {
    // If reading the file metadata fails, fall back to build time
  }

  return <NowContent lastUpdatedIso={lastUpdatedIso} />
}
