// app/projects/page.tsx
'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/project-card'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  link?: string
}

const projects: Project[] = [
  {
    title: "LeetLogger",
    description: "A playful game where YOU are the AI, and you have to respond to prompts while sounding like AI as much as possible.",
    image: "/public/project-images/chatgpme.png",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase", "postgreSQL", "shadcn"],
    link: "/"
  },
  {
    title: "Gymcore",
    description: "Lexplora is a 'duolingo for anything' app that helps you learn any subject by providing a prompt. I was the front-end developer in charge of the UI.",
    image: "/projects/lexplora.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
    link: "/"
  },
  {
    title: "Veri-Thread",
    description: "Project for Hack The North 2023 that uses the AdHawk MindLink to allow visually impaired people to know what lecturers are writing.",
    image: "/projects/hawkeye.png",
    technologies: ["GPT-4", "Google Cloud Platform"],
    link: "/"
  },
  // Add more projects here
]

const PROJECTS_PER_PAGE = 9

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  
  const paginatedProjects = projects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  )

  return (
    <main className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
          <p className="text-gray-400">A collection of my latest work and side projects.</p>
        </div>

        {/* Technologies filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {[
            "Google Cloud Platform",
            "React",
            "Next.js",
            "TypeScript",
            "Langchain",
            "+22 More"
          ].map((tech, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-full bg-[#252837] text-gray-300 hover:bg-[#2a2d3d] transition-colors"
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedProjects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${currentPage === index + 1
                    ? 'bg-pink-500 text-white'
                    : 'bg-[#252837] text-gray-300 hover:bg-[#2a2d3d]'
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}