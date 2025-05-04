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
              <li>Java Springboot</li>
            </ul>
            <p>
              Additionally, I'm taking the following courses in university:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Multivariable Calculus</li>
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
              <li>Developing a web-app to streamline the process for people to find sponsorships.</li>
              <li>Developing a web application to turn Leetcode into a fun and competitive experience with friends.</li>
            </ul>

            <p>These are the open-source projects that i am contributing to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <Link href="https://github.com/SheerSt/pokewilds" className='text-blue-400 hover:text-blue-300 underline'>
                  Pokewilds
                </Link> - A Gen 2 Pokemon Fan Game/Engine using libGDX
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
              <li>Software architecture</li>
              <li>Cloud infrastructure (AWS)</li>
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
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">📖 Currently Reading</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>&quot;Dune&quot; by Frank Herbert</li>
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
