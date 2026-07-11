'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { useLanguage } from '@/components/language-provider'

interface WorkExperience {
  company: string
  role: string
  period: string
  logo: string
  companyLink?: string
}

const skills = {
  languages: [
    { name: 'JavaScript', icon: '/icons/javascript.svg' },
    { name: 'TypeScript', icon: '/icons/typescript.svg' },
    { name: 'Python', icon: '/icons/python.svg' },
    { name: 'Java', icon: '/icons/java.svg' },
    { name: 'Swift', icon: '/icons/swift.svg' },
    { name: 'C', icon: '/icons/c.svg' },
    { name: 'Go', icon: '/icons/go.svg' },
    { name: 'Rust', icon: '/icons/rust.svg' },
    { name: 'Flutter', icon: '/icons/flutter.svg' },
    { name: 'Assembly', icon: '/icons/assembly.svg' },
    { name: 'Verilog', icon: '/icons/verilog.svg' },
  ],
  frameworks: [
    { name: 'React', icon: '/icons/react.svg' },
    { name: 'Next.js', icon: '/icons/nextjs.svg' },
    { name: 'SwiftUI', icon: '/icons/swift.svg' },
    { name: 'Flask', icon: '/icons/flask.svg' },
    { name: 'Express.js', icon: '/icons/express.svg' },
    { name: 'Spring Boot', icon: '/icons/springboot.svg' },
    { name: 'Maven', icon: '/icons/maven.svg' },
    { name: 'Docker', icon: '/icons/docker.svg' },
    { name: 'TailwindCSS', icon: '/icons/tailwind.svg' },
  ],
  cloud: [
    { name: 'AWS', icon: '/icons/aws.svg' },
    { name: 'Google Cloud', icon: '/icons/gcp.svg' },
    { name: 'AWS RDS', icon: '/icons/awsrds.svg' },
    { name: 'AWS S3', icon: '/icons/awss3.svg' },
    { name: 'AWS Cognito', icon: '/icons/awscognito.svg' },
    { name: 'AWS Lambda', icon: '/icons/awslambda.svg' },
    { name: 'Localstack', icon: '/icons/cloud.svg' },
    { name: 'auth0', icon: '/icons/auth0.svg' },
    { name: 'Vercel', icon: '/icons/vercel.svg' },
    { name: 'Azure App Service', icon: '/icons/azure.svg' },
    { name: 'Azure Data Lake Storage', icon: '/icons/azure.svg' },
  ],
  databases: [
    { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
    { name: 'MySQL', icon: '/icons/mysql.svg' },
    { name: 'SQLite', icon: '/icons/sqlite.svg' },
    { name: 'Supabase', icon: '/icons/supabase.svg' },
    { name: 'MongoDB', icon: '/icons/mongodb.svg' },
    { name: 'Grafana', icon: '/icons/grafana.svg' },
    { name: 'Redis', icon: '/icons/redis.svg' },
    { name: 'Power BI', icon: '/icons/powerbi.svg' },
  ],
  practices: [
    { name: 'CI/CD', icon: '/icons/cicd.svg' },
    { name: 'Agile', icon: '/icons/agile.svg' },
    { name: 'System Design', icon: '/icons/system-design.svg' },
    { name: 'Cloud Architecture', icon: '/icons/cloud.svg' },
  ],
}

const experiences: WorkExperience[] = [
  {
    company: 'KPMG Canada',
    role: 'Senior Consultant, Internal AI Solutions, Ignition Tax',
    period: 'May 2026 - Present',
    logo: '/logos/kpmg.svg',
    companyLink: 'https://kpmg.com/ca/en/home.html',
  },
  {
    company: 'TD Bank',
    role: 'Software Engineer Intern, TD Securities',
    period: 'January 2026 — April 2026',
    logo: '/logos/tdbank.png',
    companyLink: 'https://www.tdsecurities.com/ca/en',
  },
  {
    company: 'Dorayaki Studios',
    role: 'Software Engineer',
    period: 'March 2024 — Present',
    logo: '/logos/ds.png',
    companyLink: 'https://www.dorayakistudios.com/',
  },
  {
    company: 'Outlier AI',
    role: 'Prompt Engineer',
    period: 'May 2024 — August 2024',
    logo: '/logos/outlier.png',
    companyLink: 'https://outlier.ai/',
  },
  {
    company: 'Radar',
    role: 'Software Engineer Intern',
    period: 'May 2022 — August 2022',
    logo: '/logos/radar.png',
    companyLink: 'https://www.linkedin.com/company/theradarapp',
  },
]

const copy = {
  en: {
    index: '01 / About',
    title: 'About',
    intro: [
      `Hi! I'm Fayaz, a software engineer based in Toronto, Canada. Originally from Dhaka, Bangladesh, I'm currently pursuing my degree in Computer Engineering at York University, where I've found my passion at the intersection of hardware and software.`,
      `My journey in tech has been shaped by my love for both hardware and software. While my Electrical Engineering background satisfies my curiosity for hardware systems, my internship at Radar in 2022 helped me discover my true calling in software engineering. This unique perspective allows me to approach problems with both hardware and software solutions in mind.`,
      `When I'm not coding or tinkering with hardware, you'll find me exploring the vibrant streets of downtown Toronto or embarking on outdoor adventures — from tobogganing in winter to hiking and beach trips in summer. I'm an avid gamer with a particular love for roguelikes like <link href="https://enterthegungeon.com/">Enter the Gungeon</link> and <link href="https://dead-cells.com/">Dead Cells</link>. You can also catch me diving into the worlds of <link href="https://www.minecraft.net/en-us">Minecraft</link> and <link href="https://play.pokemonshowdown.com/">Pokemon</link>.`,
      `As an extrovert, I thrive on social interactions and community engagement. Whether it's discussing the latest tech trends, sharing cooking recipes, or getting lost in a good book, I'm always eager to connect with people who share similar interests.`,
    ],
    workHeading: '02 / Work',
    resumeQuestion: 'Want the full picture?',
    resumeCta: 'Resume',
    skillsHeading: '03 / Stack',
    programmingHeading: 'Languages',
    frameworksHeading: 'Libraries & Frameworks',
    cloudHeading: 'Cloud & DevOps',
    databasesHeading: 'Databases',
    practicesHeading: 'Practices',
  },
  fr: {
    index: '01 / À propos',
    title: 'À propos',
    intro: [
      `Bonjour ! Je suis Fayaz, ingénieur logiciel basé à Toronto, Canada, originaire de Dhaka au Bangladesh. Je poursuis actuellement un diplôme en génie informatique à l’Université York, où j’ai découvert ma passion pour la rencontre entre matériel et logiciel.`,
      `Mon parcours en technologie est façonné par mon affection pour le matériel et le logiciel. Si ma formation en génie électrique nourrit ma curiosité pour les systèmes matériels, mon stage chez Radar en 2022 a confirmé mon intérêt pour le génie logiciel. Cette perspective hybride me permet d’aborder les problèmes sous les deux angles.`,
      `Lorsque je ne code pas ou ne bricole pas, je profite de Toronto ou je pars en escapades : luge en hiver, randonnées et escapades à la plage en été. J’adore les roguelikes comme <link href="https://enterthegungeon.com/">Enter the Gungeon</link> et <link href="https://dead-cells.com/">Dead Cells</link>. Je plonge aussi dans l’univers de <link href="https://www.minecraft.net/en-us">Minecraft</link> et <link href="https://play.pokemonshowdown.com/">Pokemon</link>.`,
      `Grand extraverti, j’aime les échanges et la vie communautaire. Que ce soit pour discuter des dernières tendances tech, partager des recettes ou parler de livres, j’adore rencontrer des personnes qui partagent les mêmes centres d’intérêt.`,
    ],
    workHeading: '02 / Parcours',
    resumeQuestion: 'Envie d’en voir davantage ?',
    resumeCta: 'CV',
    skillsHeading: '03 / Stack',
    programmingHeading: 'Langages',
    frameworksHeading: 'Bibliothèques & frameworks',
    cloudHeading: 'Cloud & DevOps',
    databasesHeading: 'Bases de données',
    practicesHeading: 'Pratiques',
  },
} as const

const SkillGrid = ({
  heading,
  items,
}: {
  heading: string
  items: { name: string; icon: string }[]
}) => (
  <div>
    <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted-raw)]">
      {heading}
    </h3>
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {items.map((skill) => (
        <li key={skill.name} className="chip-raw">
          <Image
            src={skill.icon}
            alt=""
            width={18}
            height={18}
            className="brightness-0 invert opacity-80"
            aria-hidden="true"
          />
          <span>{skill.name}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default function Page(): React.JSX.Element {
  const { language } = useLanguage()
  const content = copy[language]

  const introParagraphs = useMemo(
    () =>
      content.intro.map((paragraph) =>
        paragraph.replace(
          /<link href="([^"]+)">([^<]+)<\/link>/g,
          `<a href="$1" class="text-[var(--accent-raw)] underline-offset-2 hover:underline" target="_blank" rel="noreferrer">$2</a>`,
        ),
      ),
    [content],
  )

  return (
    <main className="pb-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 border-b border-white/10 pb-8 sm:mb-14 sm:pb-10">
          <p className="page-index">{content.index}</p>
          <h1 className="page-title">{content.title}</h1>
        </header>

        <section className="mb-14 space-y-4 sm:mb-20 sm:space-y-5">
          {introParagraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? 'text-base leading-relaxed text-[var(--text-raw)] sm:text-xl'
                  : 'text-[0.9375rem] leading-relaxed text-[var(--muted-raw)] sm:text-lg'
              }
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </section>

        <section className="mb-14 sm:mb-20">
          <h2 className="section-index mb-6 sm:mb-8">{content.workHeading}</h2>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {experiences.map((exp) => {
              const isVectorLogo = exp.logo.endsWith('.svg')
              return (
                <li key={exp.company + exp.period} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-6">
                  <div
                    className={`relative h-12 w-12 shrink-0 overflow-hidden border border-white/15 ${
                      isVectorLogo ? 'bg-white p-1.5' : 'bg-[#1a1a1a]'
                    }`}
                  >
                    <Image
                      src={exp.logo}
                      alt=""
                      fill
                      className={isVectorLogo ? 'object-contain' : 'object-cover'}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    {exp.companyLink ? (
                      <Link
                        href={exp.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--accent-raw)] transition-colors hover:text-[#f0c14d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-raw)]"
                      >
                        {exp.company}
                      </Link>
                    ) : (
                      <h3 className="font-medium text-[var(--text-raw)]">{exp.company}</h3>
                    )}
                    <p className="mt-1 text-sm text-[var(--muted-raw)] sm:text-base">{exp.role}</p>
                  </div>
                  <time className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-raw)] sm:text-[11px] sm:tracking-[0.12em]">
                    {exp.period}
                  </time>
                </li>
              )
            })}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <p className="text-sm text-[var(--muted-raw)]">{content.resumeQuestion}</p>
            <Link href="/resume/resume.pdf" className="link-raw" target="_blank" rel="noopener noreferrer">
              {content.resumeCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="section-index">{content.skillsHeading}</h2>
          <SkillGrid heading={content.programmingHeading} items={skills.languages} />
          <SkillGrid heading={content.frameworksHeading} items={skills.frameworks} />
          <SkillGrid heading={content.cloudHeading} items={skills.cloud} />
          <SkillGrid heading={content.databasesHeading} items={skills.databases} />
          <SkillGrid heading={content.practicesHeading} items={skills.practices} />
        </section>
      </div>
    </main>
  )
}
