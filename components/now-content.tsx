'use client'

import { useMemo } from 'react'

import { useLanguage, type Language } from '@/components/language-provider'

type Section = {
  title: string
  paragraphs?: string[]
  lists?: string[][]
  listLabels?: (string | null | undefined)[]
  afterList?: string[]
}

type NowPageCopy = {
  index: string
  title: string
  lastUpdatedPrefix: string
  sections: Section[]
  footer: string
}

const copy: Record<Language, NowPageCopy> = {
  en: {
    index: '05 / Now',
    title: 'Now',
    lastUpdatedPrefix: 'Updated',
    sections: [
      {
        title: 'Current Focus',
        paragraphs: [
          'My current focus is starting a new full-time job as a Senior Consultant at KPMG Canada.',
          "I'm taking a course on designing a 32-bit RISC-V CPU.",
        ],
      },
      {
        title: 'Working On',
        paragraphs: ['Currently working on several projects:'],
        lists: [['Personal portfolio website (this one!)', 'Developing an iOS app for runners on race day.']],
        afterList: [
          'These are the open-source projects that I am contributing to:',
          `<link href="https://github.com/SheerSt/pokewilds">Pokewilds</link> — A Gen 2 Pokémon fan game/engine using libGDX`,
        ],
      },
      {
        title: 'Streaming',
        paragraphs: [
          'I started streaming on Twitch for fun! I stream occasionally, playing games like Jump King, Celeste, Plants VS Zombies, and Pokemon.',
        ],
      },
      {
        title: 'Learning',
        paragraphs: ['Always expanding my knowledge in:'],
        lists: [
          [
            'Advanced React patterns',
            'Software architecture',
            'Cloud infrastructure (AWS, Azure)',
            'Java Object Oriented Programming',
          ],
        ],
      },
      {
        title: 'Location',
        paragraphs: [
          "I'm currently based in Toronto, Ontario, Canada. I love the tech scene here and the vibrant community of developers.",
        ],
      },
      {
        title: 'Goals for 2026',
        lists: [
          [
            'Launch 3 side projects',
            'Write one technical blog post per month',
            'Contribute to more open source projects',
            'Improve system design skills',
            'Learn more about the stock market',
            'Learn app development in Swift',
          ],
        ],
      },
      {
        title: 'Currently Reading',
        lists: [['"Dune" by Frank Herbert', '"Lovecraft Compendium" by H.P. Lovecraft']],
      },
    ],
    footer: `This is a "now page", inspired by <link href="https://nownownow.com/about">nownownow.com</link>. It shows what I'm currently focused on at this point in my life.`,
  },
  fr: {
    index: '05 / Maintenant',
    title: 'Maintenant',
    lastUpdatedPrefix: 'Mis à jour',
    sections: [
      {
        title: 'Priorités actuelles',
        paragraphs: [
          'Ma priorité actuelle est de commencer un nouvel emploi à temps plein comme consultant principal chez KPMG Canada.',
          'Je suis un cours sur la conception d’un CPU RISC-V 32 bits.',
        ],
      },
      {
        title: 'Projets en cours',
        paragraphs: ['Je travaille actuellement sur plusieurs projets :'],
        lists: [
          ['Ce portfolio (eh oui !)', "Développement d'une application iOS pour les coureurs le jour de la course."],
        ],
        afterList: [
          'Et voici les projets open source auxquels je contribue :',
          `<link href="https://github.com/SheerSt/pokewilds">Pokewilds</link> — un fan game/engine Pokémon Gen 2 construit sur libGDX`,
        ],
      },
      {
        title: 'Streaming',
        paragraphs: [
          "J'ai commencé à streamer sur Twitch pour le plaisir ! Je stream occasionnellement, en jouant à des jeux comme Jump King, Celeste, Plants VS Zombies et Pokemon.",
        ],
      },
      {
        title: 'Apprentissages',
        paragraphs: ['Je continue de me former sur :'],
        lists: [
          [
            'Patrons avancés React',
            'Architecture logicielle',
            'Infrastructures cloud (AWS, Azure)',
            'Programmation orientée objet en Java',
          ],
        ],
      },
      {
        title: 'Localisation',
        paragraphs: [
          "Je vis actuellement à Toronto (Ontario, Canada). J'aime beaucoup la scène tech locale et sa communauté de développeurs.",
        ],
      },
      {
        title: 'Objectifs pour 2026',
        lists: [
          [
            'Lancer 3 projets personnels',
            'Écrire un billet technique par mois',
            'Contribuer à davantage de projets open source',
            'Améliorer mes compétences en architecture système',
            'Mieux comprendre la bourse',
            "Apprendre le développement d'applications Swift",
          ],
        ],
      },
      {
        title: 'Lectures du moment',
        lists: [['« Dune » de Frank Herbert', '« Lovecraft Compendium » de H.P. Lovecraft']],
      },
    ],
    footer: `Ceci est une « now page » inspirée de <link href="https://nownownow.com/about">nownownow.com</link>. Elle présente ce sur quoi je me concentre en ce moment.`,
  },
}

const formatDateForLanguage = (language: Language, date: Date) =>
  new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)

const renderRichText = (paragraph: string) =>
  paragraph.replace(
    /<link href="([^"]+)">([^<]+)<\/link>/g,
    `<a href="$1" class="text-[var(--accent-raw)] underline-offset-2 hover:underline" target="_blank" rel="noreferrer">$2</a>`,
  )

interface NowContentProps {
  lastUpdatedIso: string
}

export default function NowContent({ lastUpdatedIso }: NowContentProps): React.ReactElement {
  const { language } = useLanguage()
  const content = copy[language]
  const lastUpdatedDate = useMemo(() => new Date(lastUpdatedIso), [lastUpdatedIso])
  const formattedDate = formatDateForLanguage(language, lastUpdatedDate)

  return (
    <main className="pb-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 border-b border-white/10 pb-8 sm:mb-14 sm:pb-10">
          <p className="page-index">{content.index}</p>
          <h1 className="page-title">{content.title}</h1>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-raw)] sm:text-[11px] sm:tracking-[0.14em]">
            {content.lastUpdatedPrefix}{' '}
            <time dateTime={lastUpdatedDate.toISOString()}>{formattedDate}</time>
          </p>
        </header>

        <div className="space-y-10 sm:space-y-14">
          {content.sections.map((section, index) => (
            <section key={section.title} className="space-y-4">
              <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-raw)]">
                <span className="text-[var(--accent-raw)]">
                  {String(index + 1).padStart(2, '0')}
                </span>{' '}
                / {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="leading-relaxed text-[var(--muted-raw)]"
                  dangerouslySetInnerHTML={{ __html: renderRichText(paragraph) }}
                />
              ))}
              {section.lists?.map((items, listIndex) => (
                <div key={`${section.title}-list-${listIndex}`} className="space-y-2">
                  {section.listLabels?.[listIndex] && (
                    <p className="text-[var(--muted-raw)]">{section.listLabels[listIndex]}</p>
                  )}
                  <ul className="space-y-2 border-l border-white/15 pl-4">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="text-[var(--muted-raw)]"
                        dangerouslySetInnerHTML={{ __html: renderRichText(item) }}
                      />
                    ))}
                  </ul>
                </div>
              ))}
              {section.afterList?.map((paragraph) => (
                <p
                  key={`${section.title}-after-${paragraph}`}
                  className="leading-relaxed text-[var(--muted-raw)]"
                  dangerouslySetInnerHTML={{ __html: renderRichText(paragraph) }}
                />
              ))}
            </section>
          ))}

          <footer className="border-t border-white/10 pt-8">
            <p
              className="text-sm leading-relaxed text-[var(--muted-raw)]"
              dangerouslySetInnerHTML={{ __html: renderRichText(content.footer) }}
            />
          </footer>
        </div>
      </div>
    </main>
  )
}
