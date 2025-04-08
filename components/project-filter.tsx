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
              ? 'bg-pink-400 text-white' 
              : 'bg-[#252837] text-gray-300 hover:bg-[#313244]'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}