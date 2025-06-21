<h1 align="center">🌐 Divya Khunt – Developer Portfolio</h1>

<p align="center">
  <b>A modern, high-performance portfolio website built using React, TypeScript, Tailwind CSS, and Framer Motion.</b><br/>
  <a href="https://divyakhunt-portfolio.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Live-Demo-4ade80?style=flat-square&logo=vercel&logoColor=black" /></a>
  <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-38bdf8?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-4.9-3178c6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-⚡️-9466ff?style=flat-square&logo=vite&logoColor=white" />
</p>

---

## 🔗 Live Demo

▶️ **Visit here:** [https://divyakhunt-portfolio.vercel.app](https://divyakhunt-portfolio.vercel.app)

---

## ✨ Features

- ⚛️ Built with React + TypeScript
- 💨 Tailwind CSS for utility-first styling
- 🎥 Smooth scroll-based animations with Framer Motion
- 🔀 Section-based hash navigation
- 🧠 Lazy loading with React.lazy and Suspense
- 👀 Scroll tracking using IntersectionObserver + debounce
- 📄 Resume download link
- 📱 Fully responsive design
- 🌍 Deployed on Vercel

---

## 🗂️ Project Structure

```bash
.
├── components/               # All React UI components & sections
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── FilterControls.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── IconComponents.tsx
│   ├── layout.tsx
│   ├── ProjectCard.tsx
│   ├── Projects.tsx
│   ├── ProjectVisuals.tsx
│   └── Skills.tsx
│
├── public/
│   ├── assets/              # Static files (images/icons)
│   └── Divya_Khunt_Resume.pdf
│
├── App.tsx                  # App layout with lazy-loaded sections
├── index.tsx                # Main entry point
├── index.css                # Tailwind + custom CSS
├── index.html
├── metadata.json            # Structured resume/project metadata
├── types.ts                 # TypeScript type definitions
├── vite.config.ts           # Vite bundler configuration
├── package.json
├── tsconfig.json
├── .env.local
├── .gitignore
└── README.md
