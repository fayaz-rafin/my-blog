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
          className={`w-10 h-10 rounded-lg transition-colors duration-200 
            ${currentPage === pageNumber 
              ? 'bg-pink-400 text-white' 
              : 'bg-[#252837] text-gray-300 hover:bg-[#313244]'
            }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  )
}