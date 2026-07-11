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
  onPageChange,
}: ProjectPaginationProps) {
  const totalPages = Math.ceil(totalProjects / projectsPerPage)

  if (totalPages <= 1) return null

  return (
    <nav className="flex justify-center gap-2" aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
        const isActive = currentPage === pageNumber
        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={`filter-raw min-w-10 ${isActive ? 'filter-raw-active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Page ${pageNumber}`}
          >
            {pageNumber}
          </button>
        )
      })}
    </nav>
  )
}
