// app/about/page.tsx
'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useLanguage } from '@/components/language-provider'

interface WorkExperience {
  company: string
  role: string
  period: string
  logo: string
  companyLink?: string
}

interface Skill {
  name: string
  icon: string
}

const skills = {
  languages: [
    { name: "JavaScript", icon: "/icons/javascript.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "Python", icon: "/icons/python.svg" },
    { name: "Java", icon: "/icons/java.svg" },
    { name: "Swift", icon: "/icons/swift.svg" },  
    { name: "C", icon: "/icons/c.svg" },
    { name: "Go", icon: "/icons/go.svg" },
    { name: "Rust", icon: "/icons/rust.svg" },
    { name: "Flutter", icon: "/icons/flutter.svg" },
    { name: "Assembly", icon: "/icons/assembly.svg" },
    { name: "Verilog", icon: "/icons/verilog.svg" },
    
  ],
  frameworks: [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "SwiftUI", icon: "/icons/swift.svg" },
    { name: "Flask", icon: "/icons/flask.svg" },
    { name: "Express.js", icon: "/icons/express.svg" },
    { name: "Docker", icon: "/icons/docker.svg" },
    { name: "TailwindCSS", icon: "/icons/tailwind.svg" },
  ],
  cloud: [
    { name: "AWS", icon: "/icons/aws.svg" },
    { name: "Google Cloud", icon: "/icons/gcp.svg" },
    { name: "AWS RDS", icon: "/icons/awsrds.svg" },
    { name: "AWS S3", icon: "/icons/awss3.svg" },
    { name: "AWS Cognito", icon: "/icons/awscognito.svg" },
    { name: "AWS Lambda", icon: "/icons/awslambda.svg" },
    { name: "Localstack", icon: "/icons/cloud.svg"},
    { name: "auth0", icon: "/icons/auth0.svg" },
    { name: "Vercel", icon: "/icons/vercel.svg" },
  ],
  databases: [
    { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
    { name: "MySQL", icon: "/icons/mysql.svg" },
    { name: "SQLite", icon: "/icons/sqlite.svg" },
    { name: "Supabase", icon: "/icons/supabase.svg" },
    { name: "MongoDB", icon: "/icons/mongodb.svg" },
    { name: "Grafana", icon: "/icons/grafana.svg" },
    { name: "Redis", icon: "/icons/redis.svg" },
    { name: "Power BI", icon: "/icons/powerbi.svg" },
  ],
  practices: [
    { name: "CI/CD", icon: "/icons/cicd.svg" },
    { name: "Agile", icon: "/icons/agile.svg" },
    { name: "System Design", icon: "/icons/system-design.svg" },
    { name: "Cloud Architecture", icon: "/icons/cloud.svg" },
  ]
}

const experiences: WorkExperience[] = [
    {
        company: "TD Canada Trust",
        role: "Software Engineer, TD Securities",
        period: "January 2026 — Present",
        logo: "/logos/tdbank.png",
        companyLink: "https://www.tdsecurities.com/ca/en"
    },
    {
        company: "Dorayaki Studios",
        role: "Software Engineer",
        period: "March 2024 — Present",
        logo: "/logos/ds.png",
        companyLink: "https://www.dorayakistudios.com/"
    },
    {
        company: "Outlier AI",
        role: "Prompt Engineer",
        period: "May 2024 — August 2024",
        logo: "/logos/outlier.png",
        companyLink: "https://outlier.ai/"
    },
    {
        company: "Radar",
        role: "Software Engineer Intern",
        period: "May 2022 — August 2022",
        logo:"/logos/radar.png",
        companyLink: "https://www.linkedin.com/company/theradarapp"
    },
]

const copy = {
  en: {
    title: 'About Me',
    intro: [
      `Hi! I'm Fayaz, a software engineer based in Toronto, Canada. Originally from Dhaka, Bangladesh, I'm currently pursuing my degree in Computer Engineering at York University, where I've found my passion at the intersection of hardware and software.`,
      `My journey in tech has been shaped by my love for both hardware and software. While my Electrical Engineering background satisfies my curiosity for hardware systems, my internship at Radar in 2022 helped me discover my true calling in software engineering. This unique perspective allows me to approach problems with both hardware and software solutions in mind.`,
      `When I'm not coding or tinkering with hardware, you'll find me exploring the vibrant streets of downtown Toronto or embarking on outdoor adventures — from tobogganing in winter to hiking and beach trips in summer. I'm an avid gamer with a particular love for roguelikes like <link href="https://enterthegungeon.com/">Enter the Gungeon</link> and <link href="https://dead-cells.com/">Dead Cells</link>. You can also catch me diving into the worlds of <link href="https://www.minecraft.net/en-us">Minecraft</link> and <link href="https://play.pokemonshowdown.com/">Pokemon</link>.`,
      `As an extrovert, I thrive on social interactions and community engagement. Whether it's discussing the latest tech trends, sharing cooking recipes, or getting lost in a good book, I'm always eager to connect with people who share similar interests.`,
    ],
    workHeading: 'Work history, in brief',
    resumeQuestion: 'Want to see more?',
    resumeCta: 'Check out my Resume',
    skillsHeading: 'Skills & Technologies',
    programmingHeading: 'Programming Languages',
    frameworksHeading: 'Libraries & Frameworks',
    cloudHeading: 'Cloud & DevOps',
    databasesHeading: 'Databases',
    practicesHeading: 'Practices & Concepts',
  },
  fr: {
    title: 'À propos de moi',
    intro: [
      `Bonjour ! Je suis Fayaz, ingénieur logiciel basé à Toronto, Canada, originaire de Dhaka au Bangladesh. Je poursuis actuellement un diplôme en génie informatique à l’Université York, où j’ai découvert ma passion pour la rencontre entre matériel et logiciel.`,
      `Mon parcours en technologie est façonné par mon affection pour le matériel et le logiciel. Si ma formation en génie électrique nourrit ma curiosité pour les systèmes matériels, mon stage chez Radar en 2022 a confirmé mon intérêt pour le génie logiciel. Cette perspective hybride me permet d’aborder les problèmes sous les deux angles.`,
      `Lorsque je ne code pas ou ne bricole pas, je profite de Toronto ou je pars en escapades : luge en hiver, randonnées et escapades à la plage en été. J’adore les roguelikes comme <link href="https://enterthegungeon.com/">Enter the Gungeon</link> et <link href="https://dead-cells.com/">Dead Cells</link>. Je plonge aussi dans l’univers de <link href="https://www.minecraft.net/en-us">Minecraft</link> et <link href="https://play.pokemonshowdown.com/">Pokemon</link>.`,
      `Grand extraverti, j’aime les échanges et la vie communautaire. Que ce soit pour discuter des dernières tendances tech, partager des recettes ou parler de livres, j’adore rencontrer des personnes qui partagent les mêmes centres d’intérêt.`,
    ],
    workHeading: 'Parcours professionnel (aperçu)',
    resumeQuestion: 'Envie d’en voir davantage ?',
    resumeCta: 'Consultez mon CV',
    skillsHeading: 'Compétences & technologies',
    programmingHeading: 'Langages de programmation',
    frameworksHeading: 'Bibliothèques & frameworks',
    cloudHeading: 'Cloud & DevOps',
    databasesHeading: 'Bases de données',
    practicesHeading: 'Pratiques & concepts',
  },
} as const

export default function Page(): React.JSX.Element {
  const { language } = useLanguage()
  const content = copy[language]

  const introParagraphs = useMemo(
    () =>
      content.intro.map((paragraph) => {
        const withLinks = paragraph.replace(
          /<link href="([^"]+)">([^<]+)<\/link>/g,
          `<a href="$1" class="text-purple-400 hover:text-purple-300" target="_blank" rel="noreferrer">$2</a>`,
        )
        return withLinks
      }),
    [content],
  )

  return (
    <main className="pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Me Section */}
        <section className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">
            <h1 className="text-4xl font-bold text-white mb-6">{content.title}</h1>
            <div className="prose prose-invert max-w-none">
              {introParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? 'text-xl text-gray-300 mb-6' : 'text-gray-400 mb-6'}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Work History Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">{content.workHeading}</h2>
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">
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
                    {exp.companyLink ? (
                      <Link 
                        href={exp.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 font-medium text-lg hover:text-purple-300 transition-colors"
                      >
                        {exp.company}
                      </Link>
                    ) : (
                      <h3 className="text-purple-400 font-medium text-lg">
                        {exp.company}
                      </h3>
                    )}
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

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-gray-400">
                {content.resumeQuestion}{' '}
                <Link 
                  href="resume/resume.pdf" 
                  className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
                >
                  {content.resumeCta}
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
          <h2 className="text-2xl font-bold text-white mb-8">{content.skillsHeading}</h2>
          
          {/* Languages */}
          <div className="mb-8">
            <h3 className="text-xl text-purple-400 mb-4">{content.programmingHeading}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.languages.map((skill, index) => (
                <div 
                  key={index}
                  className="rounded-xl p-4 flex items-center gap-3 border border-white/10 bg-white/10 backdrop-blur-md"
                >
                  <Image 
                    src={skill.icon}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="brightness-0 invert opacity-[.85]"
                  />
                  <span className="text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="mb-8">
            <h3 className="text-xl text-purple-400 mb-4">{content.frameworksHeading}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.frameworks.map((skill, index) => (
                <div 
                  key={index}
                  className="rounded-xl p-4 flex items-center gap-3 border border-white/10 bg-white/10 backdrop-blur-md"
                >
                  <Image 
                    src={skill.icon}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="brightness-0 invert opacity-[.85]"
                  />
                  <span className="text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud & DevOps */}
          <div className="mb-8">
            <h3 className="text-xl text-purple-400 mb-4">{content.cloudHeading}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.cloud.map((skill, index) => (
                <div 
                  key={index}
                  className="rounded-xl p-4 flex items-center gap-3 border border-white/10 bg-white/10 backdrop-blur-md"
                >
                  <Image 
                    src={skill.icon}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="brightness-0 invert opacity-[.85]"
                  />
                  <span className="text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* databases & Databases */}
          <div className="mb-8">
            <h3 className="text-xl text-purple-400 mb-4">{content.databasesHeading}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.databases.map((skill, index) => (
                <div 
                  key={index}
                  className="rounded-xl p-4 flex items-center gap-3 border border-white/10 bg-white/10 backdrop-blur-md"
                >
                  <Image 
                    src={skill.icon}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="brightness-0 invert opacity-[.85]"
                  />
                  <span className="text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practices */}
          <div>
            <h3 className="text-xl text-purple-400 mb-4">{content.practicesHeading}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.practices.map((skill, index) => (
                <div 
                  key={index}
                  className="rounded-xl p-4 flex items-center gap-3 border border-white/10 bg-white/10 backdrop-blur-md"
                >
                  <Image 
                    src={skill.icon}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="brightness-0 invert opacity-[.85]"
                  />
                  <span className="text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}