import fs from 'fs'
import path from 'path'

import NowContent from '@/components/now-content'

export default function Page(): React.JSX.Element {
  const dataFilePath = path.join(process.cwd(), 'data/now-content.json')
  let lastUpdatedIso = new Date().toISOString()

  try {
    const stats = fs.statSync(dataFilePath)
    lastUpdatedIso = stats.mtime.toISOString()
  } catch {
    // If reading the file metadata fails, fall back to build time
  }

  return <NowContent lastUpdatedIso={lastUpdatedIso} />
}
