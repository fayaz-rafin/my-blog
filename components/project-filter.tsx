'use client'

import { useState } from 'react'

const technologies = [
  "Next.js", "React", "TypeScript", "Tailwind", 
  "Supabase", "PostgreSQL", "AI", "Unity"
]

export function ProjectFilter() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])

  const toggleTechnology = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Filter by Technologies</h2>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => toggleTechnology(tech)}
            className={`
              px-4 py-2 rounded-full transition-colors duration-200
              ${selectedTechs.includes(tech)
                ? 'bg-[#f5c2e7] text-[#1e1e2e]'
                : 'bg-[#252837] text-gray-300 hover:bg-[#2a2d3d] hover:text-[#f5c2e7]'
              }
            `}
          >
            {tech}
          </button>
        ))}
      </div>
    </section>
  )
}