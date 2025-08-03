// app/now/page.tsx
import Link from 'next/link'
import React from 'react'
import fs from 'fs';
import path from 'path';

export default function Page(): React.JSX.Element {
  // Get the modification time of this file and format it immediately
  const filePath = path.join(process.cwd(), 'app/now/page.tsx');
  const stats = fs.statSync(filePath);
  const lastUpdatedString = stats.mtime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">What I'm Doing Now</h1>
          <p className="text-gray-400">
            Last updated: {lastUpdatedString}
          </p>
        </header>

        <div className="space-y-12 text-gray-200">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">🚀 Current Focus</h2>
            <p>
              Starting a new full-time job as a Student Life Assistant @ York University. I'm also currently diving deep into:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Next.js 15 and Server Components</li>
              <li>TypeScript best practices</li>
              <li>Swift and SwiftUI</li>
            </ul>
            <p>
              Additionally, I'm taking the following courses in university:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Computer Organization</li>
              <li>Electricity and Magnetism</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">💻 Working On</h2>
            <p>
              Currently working on several projects:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Personal portfolio website (this one!)</li>
              <li>An iOS app for runners on race day.</li>
              <li>A progressive web app which creates an Agentic Shopping Experience for your groceries.</li>
            </ul>

            <p>These are the open-source projects that i am contributing to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <Link href="https://github.com/SheerSt/pokewilds" className='text-blue-400 hover:text-blue-300 underline'>
                  Pokewilds
                </Link> - A Gen 2 Pokemon Fan Game
              </li>
              <li>
                <Link href="https://github.com/JustJavaOrg/gymcore" className='text-blue-400 hover:text-blue-300 underline'>
                  Gymcore
                </Link> - a simple RESTful API for managing gym members and their subscriptions.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">📚 Learning</h2>
            <p>
              Always expanding my knowledge in:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Advanced React patterns</li>
              <li>Swift and SwiftUI</li>
              <li>Software architecture</li>
              <li>Cloud infrastructure (AWS, Azure)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">📍 Location</h2>
            <p>
                I'm currently based in Toronto, Ontario, Canada. I love the tech scene here and the vibrant community of developers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">🎯 Goals for 2025</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Launch 3 side projects</li>
              <li>Write one technical blog post per month</li>
              <li>Contribute to 5 open source projects</li>
              <li>Improve system design skills</li>
              <li>Learn more about the stock market</li>
              <li>Learn app development in Swift and SwiftUI</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">📖 Currently Reading</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>&quot;Dune&quot; by Frank Herbert</li>
              <li>&quot;The Lovecraft Compendium&quot; by H.P. Lovecraft</li>
              <li>&quot;Doom Guy: Life in First Person&quot; by John Romero</li>
              <li>&quot;A Playful Production Process&quot; by Richard Lemarchand</li>
            </ul>
          </section>

          <footer className="pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              This is a &quot;now page&quot;, inspired by{' '}
              <a 
                href="https://nownownow.com/about" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                nownownow.com
              </a>
              . It shows what I&apos;m currently focused on at this point in my life.
            </p>
          </footer>
        </div>
      </div>
    </main>
  )
}
