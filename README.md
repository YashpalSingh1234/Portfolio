# AI Engineer Portfolio

World-class, production-grade portfolio website for an AI/ML Engineer.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **next-themes** (dark/light mode)

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
npm start
```

## Customise

All content is in **`lib/data.ts`**. Update:

- `PERSONAL` — your name, bio, links
- `EXPERIENCES` — your work history
- `PROJECTS` — your AI projects
- `SKILL_GROUPS` — your skills
- `CERTIFICATIONS` — your certs
- `BLOG_POSTS` — your writing

## Folder Structure

```
Portfolio/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx          # Main page assembling all sections
│   └── globals.css       # Design tokens, base styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Architecture.tsx
│   │   ├── Certifications.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── SectionHeading.tsx
│       ├── ThemeProvider.tsx
│       └── ThemeToggle.tsx
├── lib/
│   ├── data.ts           # All portfolio content
│   └── utils.ts          # cn() helper, formatDate
├── types/
│   └── index.ts          # TypeScript interfaces
├── public/
│   └── resume.pdf        # ← Add your resume here
└── ...config files
```

## Deploy

Push to GitHub → connect on [Vercel](https://vercel.com) → deploy. Zero config needed.

## Resume

Add your resume PDF to `public/yashpal.resume.pdf` so the download button works.
