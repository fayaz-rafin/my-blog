// components/WorkHistory.tsx
import Image from 'next/image'
import Link from 'next/link'

interface WorkExperience {
  company: string
  role: string
  period: string
  logo: string
}

interface WorkHistoryProps {
  experiences: WorkExperience[]
}

export function WorkHistory({ experiences }: WorkHistoryProps) {
  return (
    <div className="bg-[#1a1b26] rounded-xl p-8">
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="flex items-center gap-6">
            <div className="w-16 h-16 relative flex-shrink-0 bg-[#252837] rounded-full overflow-hidden">
              <Image
                src={exp.logo}
                alt={exp.company}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-purple-400 font-medium text-lg">
                {exp.company}
              </h3>
              <p className="text-gray-300 italic">
                {exp.role}
              </p>
            </div>
            <div className="text-gray-400">
              {exp.period}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-400">
          Want to see more?{' '}
          <Link 
            href="/resume.pdf" 
            className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
          >
            Check out my CV
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </p>
      </div>
    </div>
  )
}