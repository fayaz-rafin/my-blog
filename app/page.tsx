import { getBlogPosts } from '@/lib/blog'
import HomeClient from '@/components/home-client'

export default function Home() {
  const recentPost = getBlogPosts()[0] ?? null
  return <HomeClient recentPost={recentPost} />
}
