// components/project-pagination.tsx
interface ProjectPaginationProps {
  currentPage: number
  totalProjects: number
  projectsPerPage: number
  onPageChange: (pageNumber: number) => void
}

export function ProjectPagination({
  currentPage,
  totalProjects,
  projectsPerPage,
  onPageChange
}: ProjectPaginationProps) {
  const totalPages = Math.ceil(totalProjects / projectsPerPage)

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`w-10 h-10 rounded-lg transition-colors duration-200 overflow-hidden 
            ${currentPage === pageNumber 
              ? 'bg-purple-400 text-white' 
              : 'bg-white/10 border border-white/10 backdrop-blur-md text-white/90 hover:bg-white/15'
            }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  )
}