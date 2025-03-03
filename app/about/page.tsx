// app/about/page.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface WorkExperience {
  company: string
  role: string
  period: string
  logo: string
}

const experiences: WorkExperience[] = [
    {
        company: "Software Engineer",
        role: "Dorayaki Studios",
        period: "March 2024 — Present",
        logo: "/logos/gigs.png"
      },
    {
    company: "Outlier AI",
    role: "Prompt Engineer",
    period: "May 2024 — August 2024",
    logo: "/logos/gigs.png"
  },
  {
    company: "Radar",
    role: "Software Engineer Intern",
    period: "May 2022 — August 2022",
    logo: "/logos/stackoverflow.png"
  },
  
]

export default function Page(): React.JSX.Element {
  return (
    <main className="pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Me Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-8">About Me</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-6">
              Hi! I'm [Your Name], a software engineer passionate about building great products 
              and leading engineering teams. With over 15 years of experience in software development,
              I specialize in web technologies and distributed systems.
            </p>
            <p className="text-gray-400 mb-6">
              I enjoy solving complex problems and sharing knowledge with the community. 
              When I'm not coding, you can find me writing technical articles, contributing 
              to open source projects, or mentoring other developers.
            </p>
          </div>
        </section>

        {/* Work History Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Work history, in brief</h2>
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
                    <h3 className="text-pink-400 font-medium text-lg">
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
                  className="text-pink-400 hover:text-pink-300 inline-flex items-center gap-1"
                >
                  Check out my Resume
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
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "JavaScript/TypeScript",
              "React & Next.js",
              "Node.js",
              "AWS",
              "System Design",
              "Team Leadership",
              "Agile Methodologies",
              "CI/CD",
              "Cloud Architecture"
            ].map((skill, index) => (
              <div 
                key={index}
                className="bg-[#252837] rounded-lg px-4 py-3 text-gray-300"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}