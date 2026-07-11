# Welcome to my Portfolio! [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fayaz-rafin_my-blog&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fayaz-rafin_my-blog)

Welcome to my personal portfolio website! Built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**, this site showcases who I am, what I've built, what I'm working on now, and where I'm headed.

![image](https://github.com/user-attachments/assets/0afc54e8-36ba-49b0-b746-a40974e0710b)

## 🚀 Features

- ⚡ Fast and modern stack (App Router, Server Components, Suspense)
- 🎨 Fully responsive, engineering-raw design with amber accents
- 🌙 Light/Dark mode toggle (powered by `next-themes`)
- 🌐 English / French language toggle
- 🧑‍💻 About & Work History section
- 🗃️ Project showcase with filtering
- 📬 Custom "Now" page to highlight current focuses
- 📝 Blog with Markdown support

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + ShadCN UI
- **Animations:** Motion
- **Icons:** Lucide
- **Markdown Parsing:** `gray-matter`, `react-markdown`, `rehype`/`remark`
- **Analytics:** Vercel Analytics + Speed Insights

## 🏗️ Architecture Overview

### **App Router Structure**
```
portfolio/
├── app/                    # App Router pages
│   ├── page.tsx           # Home page
│   ├── about/page.tsx     # About page
│   ├── blog/page.tsx      # Blog listing
│   ├── blog/[slug]/       # Blog post
│   ├── projects/page.tsx  # Projects page
│   └── now/page.tsx       # Current focuses
├── components/            # Reusable components
├── content/              # Blog posts (markdown)
├── data/                 # JSON content (Now page)
├── public/               # Static assets
└── lib/                  # Utility functions
```

## 🎯 Key Features Deep Dive

### **1. Blog System**
- **Markdown Support**: Write posts in `.md` files
- **Frontmatter**: Metadata for titles, dates, descriptions
- **Static Generation**: Pre-built at build time for performance
- **Syntax Highlighting**: Code blocks with `rehype-highlight`

### **2. Performance Optimizations**
- **Static Generation**: Blog posts pre-built for fast loading
- **Image Optimization**: Next.js Image component with WebP
- **Code Splitting**: Automatic by Next.js
- **SSR-Safe Components**: No hydration mismatches

### **3. Responsive Design**
- **Mobile First**: Optimized for all screen sizes
- **Smooth Animations**: Motion throughout
- **Touch Friendly**: Mobile-optimized interactions

## 🧑‍💻 Developer

**Fayaz Rafin**

- 🌐 [fayazrafin.xyz](https://fayazrafin.xyz)
- 🐙 [GitHub](https://github.com/fayaz-rafin)
- 💼 [LinkedIn](https://linkedin.com/in/fayazrafin)
- ✉️ fayaz.rafin@gmail.com

## 🧪 Running Locally

```bash
git clone https://github.com/fayaz-rafin/portfolio.git
cd portfolio
pnpm install
pnpm dev
```
Visit http://localhost:3000 to view the site locally.

## 📦 Deploy
This site is optimized for deployment on Vercel with automatic deployments on push to main branch.

## 🔒 Privacy & Security

- **Static Generation**: No server-side data exposure
- **Markdown**: Author-controlled content only
- **No Authentication**: No user accounts needed
- **No Cookies**: Only local preferences (theme, language) in `localStorage`

## 📄 License
This project is open source and available under the MIT License.

---

Made with ☕ and way too many Tailwind utility classes 😅
