# Welcome to my Portfolio! [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fayaz-rafin_my-blog&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fayaz-rafin_my-blog)

Welcome to my personal portfolio website! Built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, this site showcases who I am, what I've built, what I'm working on now, and where I'm headed. Features real-time viewer tracking with geographic analytics!

![image](https://github.com/user-attachments/assets/0afc54e8-36ba-49b0-b746-a40974e0710b)

## 🚀 Features

- ⚡ Fast and modern stack (App Router, Server Components, Suspense)
- 🎨 Fully responsive, themed with **Catppuccin Mocha**
- 🌙 Light/Dark mode toggle (powered by `next-themes`)
- 🧑‍💻 About & Work History section
- 🗃️ Project showcase with filtering
- 📬 Custom "Now" page to highlight current focuses
- 📝 Blog with MDX support
- 👥 **Real-time viewer tracking** with geographic analytics
- 🌍 **Live visitor counter** showing active viewers
- 📊 **Interactive analytics** with country-based data

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + ShadCN UI
- **Animations:** Framer Motion
- **Icons:** Lucide
- **Markdown Parsing:** `gray-matter`, `react-markdown`, `shiki`
- **Real-time Data:** Vercel Blob Storage + HTTP Polling
- **Geographic Data:** IP-based geolocation via ip-api.com
- **Analytics:** Custom viewer tracking system

## 🏗️ Architecture Overview

### **App Router Structure**
```
portfolio/
├── app/                    # App Router pages
│   ├── page.tsx           # Home page (Server Component)
│   ├── about/page.tsx     # About page
│   ├── blog/page.tsx      # Blog listing
│   ├── projects/page.tsx  # Projects page
│   ├── now/page.tsx       # Current focuses
│   └── api/               # API routes
│       ├── viewers/       # Real-time tracking
│       ├── socket/        # HTTP-based updates
│       └── ip/           # IP detection
├── components/            # Reusable components
├── content/              # Blog posts (markdown)
├── public/               # Static assets
└── lib/                  # Utility functions
```

### **Real-Time Viewer Tracking System**

The site includes a sophisticated real-time viewer tracking system that shows live analytics:

#### **How It Works:**
1. **Visitor Arrives** → Unique ID generated → IP detected → Geographic data fetched
2. **Real-Time Updates** → HTTP polling every 30 seconds → Vercel Blob storage
3. **Live Display** → Viewer counter in top-right corner → Geographic analytics

#### **Features:**
- 🌍 **Geographic Tracking**: Shows which countries visitors are from
- ⏰ **Real-time Updates**: Live viewer count updates every 30 seconds
- 🗄️ **Cloud Storage**: Uses Vercel Blob for scalable data storage
- 🧹 **Auto Cleanup**: Inactive viewers (5+ minutes) automatically filtered
- 🔒 **Privacy-Focused**: Only collects anonymous geographic data

#### **API Endpoints:**
- `GET /api/viewers` - Get active viewer count and geographic data
- `POST /api/viewers` - Track new viewer with geographic info
- `PUT /api/viewers` - Update viewer heartbeat
- `GET /api/ip` - Server-side IP detection
- `POST /api/socket` - Handle real-time updates

## 📁 Folder Structure
```
/ ├── app/ # App directory routing
│ ├── page.tsx # Home
│ ├── about/ # About page
│ ├── projects/ # Projects page
│ ├── blog/ # Blog landing
│ ├── now/ # Now page
│ └── api/ # API routes for viewer tracking
├── components/ # Reusable UI components
│ ├── online-viewers.tsx # Real-time viewer counter
│ ├── viewer-analytics.tsx # Analytics dashboard
│ └── ... # Other components
├── lib/ # Utility functions
│ ├── geo.ts # Geographic data utilities
│ └── ... # Other utilities
├── content/ # Blog posts (markdown)
├── public/ # Static assets (avatar, icons, images)
└── styles/ # Tailwind global styles
```

## 🎯 Key Features Deep Dive

### **1. Real-Time Viewer Tracking**
- **Live Counter**: Shows "X people online" in top-right corner
- **Geographic Data**: Tracks visitor countries and cities
- **Blob Storage**: Scalable cloud storage for viewer data
- **Auto Cleanup**: Removes inactive viewers automatically

### **2. Blog System**
- **Markdown Support**: Write posts in `.md` files
- **Frontmatter**: Metadata for titles, dates, descriptions
- **Static Generation**: Pre-built at build time for performance
- **Syntax Highlighting**: Code blocks with Shiki

### **3. Performance Optimizations**
- **Static Generation**: Blog posts pre-built for fast loading
- **Image Optimization**: Next.js Image component with WebP
- **Code Splitting**: Automatic by Next.js
- **SSR-Safe Components**: No hydration mismatches

### **4. Responsive Design**
- **Mobile First**: Optimized for all screen sizes
- **Dark Theme**: Catppuccin Mocha color scheme
- **Smooth Animations**: Framer Motion throughout
- **Touch Friendly**: Mobile-optimized interactions

## 🧑‍💻 Developer

**Fayaz Rafin**

- 🌐 [fayaz-rafin.xyz](https://fayazrafin.xyz)
- 🐙 [GitHub](https://github.com/fayaz-rafin)
- 💼 [LinkedIn](https://linkedin.com/in/fayazrafin)
- ✉️ fayaz.rafin@gmail.com

## 🧪 Running Locally

```bash
git clone https://github.com/fayaz-rafin/portfolio.git
cd portfolio
npm install
npm run dev
```
Visit http://localhost:3000 to view the site locally.

### **Environment Setup (Optional)**
For real-time viewer tracking, create a `.env.local` file:
```bash
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
```

## 📦 Deploy
This site is optimized for deployment on Vercel with automatic deployments on push to main branch.

## 🔒 Privacy & Security

### **Viewer Tracking:**
- **Anonymous**: No personal data collected
- **IP-based**: Only geographic data from IP addresses
- **Auto Expiration**: Data expires after 5 minutes
- **No Cookies**: No persistent tracking cookies

### **Content:**
- **Static Generation**: No server-side data exposure
- **Markdown**: Safe content format
- **No Authentication**: No user accounts needed

## 📄 License
This project is open source and available under the MIT License.

---

Made with ☕ and way too many Tailwind utility classes 😅

*Now with real-time viewer tracking powered by Vercel Blob! 🌟*
