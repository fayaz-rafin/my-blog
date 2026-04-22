import fs from 'fs'
import path from 'path'

import NowContent from '@/components/now-content'

type NowContentJson = {
  lastUpdatedIso?: string
}

export default function Page(): React.JSX.Element {
  const dataFilePath = path.join(process.cwd(), 'data/now-content.json')
  let lastUpdatedIso = new Date().toISOString()

  try {
    const raw = fs.readFileSync(dataFilePath, 'utf8')
    const data = JSON.parse(raw) as NowContentJson
    if (data.lastUpdatedIso) {
      lastUpdatedIso = data.lastUpdatedIso
    } else {
      const stats = fs.statSync(dataFilePath)
      lastUpdatedIso = stats.mtime.toISOString()
    }
  } catch {
    // If reading the file fails, fall back to build time
  }

  return <NowContent lastUpdatedIso={lastUpdatedIso} />
}
