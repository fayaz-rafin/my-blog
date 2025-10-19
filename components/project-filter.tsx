// components/project-filter.tsx
interface ProjectFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function ProjectFilter({ categories, selectedCategory, onCategoryChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 
            ${selectedCategory === category 
              ? 'bg-purple-400 text-white' 
              : 'bg-white/10 border border-white/10 backdrop-blur-md text-white/90 hover:bg-white/15'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}