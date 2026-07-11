interface ProjectFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function ProjectFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProjectFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2 sm:mb-8" role="group" aria-label="Filter projects">
      {categories.map((category) => {
        const isActive = selectedCategory === category
        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`filter-raw ${isActive ? 'filter-raw-active' : ''}`}
            aria-pressed={isActive}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
