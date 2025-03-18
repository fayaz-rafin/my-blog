import { ProjectCard } from '@/components/project-card'
import { ProjectFilter } from '@/components/project-filter'
import { ProjectPagination } from '@/components/project-pagination'

export interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  link?: string
  category?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "LeetLogger",
    description: "A Leetcode progress tracker to make Leetcode more fun and engaging.",
    image: "/images/projects/leetlogger.png",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase", "PostgreSQL"],
    link: "https://leetlogger.com",
    category: "Web App"
  },
  {
    id: 2,
    title: "ChatGPMe",
    description: "A playful game where YOU are the AI, responding to prompts while sounding like an AI.",
    image: "/images/projects/chatgpme.png",
    technologies: ["Unity", "Cohere AI", "Google Cloud Platform"],
    link: "https://chatgpme.com",
    category: "Game"
  },
  {
    id: 3,
    title: "Veri-Thread",
    description: "Hack The North 2023 project using AdHawk MindLink to help visually impaired people.",
    image: "/images/projects/verithread.png",
    technologies: ["React", "GPT-4", "Google Cloud Platform"],
    link: "https://verithread.com",
    category: "Accessibility"
  },
  // Add more projects here
]

export default function ProjectsPage() {
  return (
    <main className="pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
          <p className="text-xl text-gray-400">
            A collection of my latest work and side projects.
          </p>
        </header>

        <ProjectFilter />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </section>

        <ProjectPagination 
          totalProjects={projects.length} 
          projectsPerPage={6} 
        />
      </div>
    </main>
  )
}