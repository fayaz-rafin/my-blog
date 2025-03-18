'use client'

import { useState } from 'react'

interface ProjectPaginationProps {
  totalProjects: number
  projectsPerPage: number
}

export function ProjectPagination({ 
  totalProjects, 
  projectsPerPage 
}: ProjectPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalProjects / projectsPerPage)

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            transition-colors duration-200
            ${currentPage === index + 1
              ? 'bg-[#f5c2e7] text-[#1e1e2e]'
              : 'bg-[#252837] text-gray-300 hover:bg-[#2a2d3d] hover:text-[#f5c2e7]'
            }
          `}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}