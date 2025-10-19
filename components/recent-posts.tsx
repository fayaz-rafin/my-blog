// components/RecentPosts.tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { calculateReadTime } from '@/lib/utils' // Import the utility function

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: number
  imageUrl?: string // Add optional image URL
}

export default function RecentPosts() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'))

  const blogPosts: BlogPost[] = files.map((filename) => {
    const slug = filename.replace('.md', '')
    const filePath = path.join('content/blog', filename) // Store file path
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent) // Extract content
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', { // Format date from frontmatter
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Find the first markdown image URL
    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const match = content.match(imageRegex);
    const imageUrl = match ? match[1] : undefined;

    return {
      slug,
      title: data.title,
      description: data.description,
      date: formattedDate, // Use formatted mtime
      readTime: calculateReadTime(content), // Calculate read time
      imageUrl, // Add image URL
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sorting should still work with formatted date string

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-8">Recent Posts</h2>
      <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 sm:p-8">
        {blogPosts.length > 0 ? (
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <div
                key={post.slug}
                className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 border-b border-gray-800 last:border-0 pb-6 sm:pb-8 last:pb-0"
              >
                <div className="flex-grow"> {/* Text content container */}
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-purple-400 font-medium text-base sm:text-lg mb-2 hover:underline">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4 text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
                {post.imageUrl && (
                  <div className="flex-shrink-0 mt-3 sm:mt-0"> {/* Image container */}
                    <Link href={`/blog/${post.slug}`}>
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md hover:opacity-90 transition-opacity" 
                        width={96}
                        height={96}
                      />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No posts found.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
