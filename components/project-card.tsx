import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  link?: string
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies,
  link 
}: ProjectCardProps) {
  return (
    <div className="bg-[#1a1b26] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative aspect-video w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-full bg-[#252837] text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {link && (
          <div className="mt-4">
            <Link 
              href={link} 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Project →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}