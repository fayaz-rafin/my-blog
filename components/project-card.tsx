// components/project-card.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '../app/projects/page'

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  link,
  category
}: Project) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-xl">
      <div className="relative h-40 sm:h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white flex-1 min-w-0">{title}</h3>
          {category && (
            <span className="text-sm text-purple-400 bg-purple-400/10 px-2 py-1 rounded flex-shrink-0 whitespace-nowrap">
              {category}
            </span>
          )}
        </div>
        <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-sm text-white/90 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md"
            >
              {tech}
            </span>
          ))}
        </div>
        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
          >
            View Project
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}