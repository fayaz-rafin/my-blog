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
    <div className="bg-[#252837] rounded-xl overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <span className="text-sm text-pink-400 bg-pink-400/10 px-2 py-1 rounded">
            {category}
          </span>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-sm text-gray-300 bg-[#1e1e2e] px-2 py-1 rounded"
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
            className="text-pink-400 hover:text-pink-300 inline-flex items-center gap-1"
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