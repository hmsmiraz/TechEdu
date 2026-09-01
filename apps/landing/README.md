# TechEdu — DevOps Mastery Landing Page

A beautiful, fully responsive Next.js 14 landing page for the TechEdu DevOps course.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Fonts**: Plus Jakarta Sans + JetBrains Mono (Google Fonts)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, CSS variables, utilities
│   ├── layout.tsx           # Root layout with metadata & font loading
│   └── page.tsx             # Main page — imports all sections
├── components/
│   ├── Navbar.tsx           # Responsive sticky nav with mobile menu
│   ├── Hero.tsx             # Hero section with stats
│   ├── About.tsx            # About section with terminal visual
│   ├── Services.tsx         # Career services cards
│   ├── AISection.tsx        # AI learning features
│   ├── Modules.tsx          # 27 modules grid with search & filter
│   ├── Pricing.tsx          # 3-tier pricing cards
│   ├── BookingCTA.tsx       # Mid-page booking call-to-action
│   ├── Team.tsx             # Instructor profile card
│   ├── Contact.tsx          # Contact info + Google Calendar booking
│   └── Footer.tsx           # Footer with links
└── data/
    ├── site.json            # Site config, contact info, URLs
    ├── modules.json         # All 27 course modules
    ├── pricing.json         # 3 pricing plans
    ├── services.json        # Career services
    ├── team.json            # Instructor info
    ├── ai-features.json     # AI learning features
    └── about-features.json  # About section features
```

## 🛠️ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/techedu.git
cd techedu
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

## ⚙️ Customization

All content is driven by JSON files in `src/data/`. To update:

- **Site info, links, contact**: edit `src/data/site.json`
- **Course modules**: edit `src/data/modules.json`
- **Pricing plans**: edit `src/data/pricing.json`
- **Career services**: edit `src/data/services.json`
- **Instructor info**: edit `src/data/team.json`

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo
4. Click Deploy — done!

No environment variables needed for the basic site.

## 📝 License

MIT — feel free to use and customize.
