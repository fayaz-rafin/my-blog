// app/page.tsx
export default function Home() {
  return (
    <main className="pt-16 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Hero section */}
          <h1 className="text-6xl font-bold text-white">
            Hello, World!
          </h1>
          
          <div className="space-y-6">
            <p className="text-2xl text-gray-300">
              My name is Fayaz. I build software and write about technology, development, and my journey.
            </p>
            
            <p className="text-xl text-gray-400">
              Welcome to my digital garden. Here, I share my thoughts, projects, and experiences in software development and beyond.
            </p>
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
              
              {/* Add your latest update here */}
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
      </div>
    </main>
  )
}