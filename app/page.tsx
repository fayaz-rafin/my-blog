import { getLatestPost } from '@/lib/getLatestPost'
import HomeClient from '@/components/home-client'

export default async function Home() {
  const recentPost = await getLatestPost()
  return <HomeClient recentPost={recentPost} />
}
