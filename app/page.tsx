// app/page.tsx
import Image from 'next/image'

export default function Home() {
  return (
    <main className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-6 flex-col sm:flex-row">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Image
              src="/avatar.jpg"
              alt="Fayaz Rafin avatar"
              width={100}
              height={100}
              className="rounded-full border-4 border-[#313244] shadow-lg"
            />
          </div>

          {/* Hero content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold text-white">
              Hello, World!
            </h1>
            <p className="text-2xl text-gray-300">
              My name is Fayaz Rafin. I build software and write about technology, development, and my journey.
            </p>
            <p className="text-xl text-gray-400">
              Welcome to my digital garden. Here, I share my thoughts, projects, and experiences in software development and beyond.
            </p>
          </div>
        </div>

        {/* What's New Section */}
        <section className="mt-16">
          <div className="bg-[#252837] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              What's new?
            </h2>
            <p className="text-gray-400">
              My latest updates and activities.
            </p>

            <div className="mt-6 flex items-start gap-4">
              <div className="bg-[#313244] p-4 rounded-lg">
                {/* Icon or emoji */}
              </div>
              <p className="text-gray-300">
                Your latest update or activity goes here.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
