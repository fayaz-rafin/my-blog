import NowContent from '@/components/now-content'
import nowData from '@/data/now-content.json'

export default function Page(): React.JSX.Element {
  return <NowContent lastUpdatedIso={nowData.lastUpdatedIso} />
}
