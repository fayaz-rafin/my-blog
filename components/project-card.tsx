import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Project } from '../app/projects/page'

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  link,
  category,
}: Project) {
  return (
    <article className="card-raw group flex h-full flex-col">
      <div className="relative h-44 overflow-hidden border-b border-white/15 sm:h-48">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--text-raw)] sm:text-xl">
            {title}
          </h3>
          {category && (
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-raw)]">
              {category}
            </span>
          )}
        </div>
        <p className="mb-4 text-sm leading-relaxed text-[var(--muted-raw)] sm:text-base">
          {description}
        </p>
        <ul className="mb-5 flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-raw)]"
            >
              {tech}
            </li>
          ))}
        </ul>
        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="link-raw mt-auto"
          >
            View
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  )
}
