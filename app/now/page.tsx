import React from 'react'

export default function NowPage() {
    return (
      <main className="pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">What I'm Doing Now</h1>
            <p className="text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </header>
  
          <div className="space-y-12 text-gray-200">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">🚀 Current Focus</h2>
              <p>
                Building and learning new technologies in web development. Currently diving deep into:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Next.js 15 and Server Components</li>
                <li>TypeScript best practices</li>
                <li>System Design patterns</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">💻 Working On</h2>
              <p>
                Currently working on several projects:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Personal portfolio website (this one!)</li>
                <li>Making Leetcode more fun by making a leetcode tracker with achievements.</li>
                <li>Contributing to open source projects</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">📚 Learning</h2>
              <p>
                Always expanding my knowledge in:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Operating Systems</li>
                <li>Digital Logic Design using Verilog and VHDL</li>
                <li>Cloud infrastructure (AWS)</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">📍 Location</h2>
              <p>
                Currently based in Toronto, ON, Canada 🇨🇦
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">🎯 Goals for 2025</h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Launch 3 side projects</li>
                <li>Write one technical blog post per month</li>
                <li>Contribute to 5 open source projects</li>
                <li>Improve system design skills</li>
                <li>Get an internshhip or a co-op</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">📖 Currently Reading</h2>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>"Clean Architecture" by Robert C. Martin</li>
                <li>"Dune" by Frank Herbert</li>
                <li>"Designing Data-Intensive Applications" by Martin Kleppmann</li>
              </ul>
            </section>
  
            <footer className="pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-400">
                This is a "now page", inspired by{' '}
                <a 
                  href="https://nownownow.com/about" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  nownownow.com
                </a>
                . It shows what I'm currently focused on at this point in my life.
              </p>
            </footer>
          </div>
        </div>
      </main>
    )
  }