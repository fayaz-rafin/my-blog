// app/projects/page.tsx
'use client'

import { useState } from 'react'
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
    title: "social brocoli",
    description: "The first Agentic shopping assistant for no name brands.",
    image: "/projects/socialbrocoli.png",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase", "PostgreSQL", "Vercel", "groq",],
    link: "https://social-pod.vercel.app/",
    category: "Web App",
  },
  {
    id: 2,
    title: "sponsorship.io",
    description: "A web-app to help peopel draft emails for sponsorships.",
    image: "/projects/sponsorship.png",
    technologies: ["Next.js", "Tailwind", "TypeScript", "Vercel", "Google Gemini"],
    link: "https://sponsorshipio.vercel.app/",
    category: "Web App"
  },
  {
    id: 8,
    title: "Leetcode Tracker",
    description: "A Leetcode progress tracker to make Leetcode more fun and engaging.",
    image: "/projects/leetlogger.png",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase", "PostgreSQL", "Vercel"],
    link: "https://leetcode-tracker-phi.vercel.app/",
    category: "Web App"
  },
  {
    id: 3,
    title: "Pomoduino",
    description: "A functional Pomodoro timer in Arduino using a 4-Digit 7 Segment LED Display and 4x4 Keypad and Arduino DUE Microcontroller.",
    image: "/projects/pomoduino.png",
    technologies: ["C++", "Arduino", "7-Segment Display", "4x4 Keypad"],
    link: "https://github.com/fayaz-rafin/Embedded-Systems-FInal-Project---Pomodoro-Timer",
    category: "Hardware"
  },
  {
    id: 4,
    title: "Veri-Thread",
    description: "Transparent, sustainable fashion backed up by blockchain. Trace every step from material to finished product, safety contracts, earn ICP tokens for supporting ethical and eco-friendly manufacturing.",
    image: "/projects/verithread.png",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Google Cloud Platform"],
    link: "https://devpost.com/software/verithread",
    category: "App"
  },
  {
    id: 5,
    title: "Veripong",
    description: "VGA Pong Game Implementation on DE10-Lite FPGA",
    image: "/projects/veripong.png",
    technologies: ["Terasic DE10-Lite", "Verilog", "VGA"],
    link: "https://github.com/fayaz-rafin/veripong",
    category: "Hardware"
  },
  {
    id: 6,
    title: "Amnesiac's Odyssey",
    description: "JRPG Game on the Nintendo Gameboy using GBDK and Aseprite.",
    image: "/projects/aogame.png",
    technologies: ["C", "Aseprite", "GBDK", "Nintendo Gameboy"],
    link: "https://fintastic14.itch.io/amnesiacs-odyssey",
    category: "Game"
  },
  {
    id: 7,
    title: "CTRL+HACK+DEL",
    description: "Landing page of CTRL+HACK+DEL, York University's Premier Hackathon.",
    image: "/projects/chd.png",
    technologies: ["Next.js", "Tailwind", "TypeScript", "Vercel", "clerk", "AWS RDS", "AWS S3", "AWS Lambda", "PostgreSQL"],
    link: "https://www.ctrlhackdel.com/",
    category: "Web App"
  },
  
]

const PROJECTS_PER_PAGE = 6

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Get unique categories for filter
  const categories = ['All', ...new Set(projects.map(project => project.category || 'Other'))]

  // Filter projects based on category
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  // Calculate pagination
  const indexOfLastProject = currentPage * PROJECTS_PER_PAGE
  const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to first page when changing category
  }

  return (
    <main className="pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
          <p className="text-xl text-gray-400">
            A collection of my latest work and side projects. From web applications to hardware projects,
            here's what I've been working on.
          </p>
        </header>

        <div className="mb-8">
          <h2 className="text-lg text-gray-300 mb-4">Filter by category:</h2>
          <ProjectFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-16">
          {currentProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No projects found in this category.</p>
            </div>
          )}
        </section>

        {filteredProjects.length > PROJECTS_PER_PAGE && (
          <ProjectPagination 
            currentPage={currentPage}
            totalProjects={filteredProjects.length}
            projectsPerPage={PROJECTS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  )
}