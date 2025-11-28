# LAF Black Friday

A Black Friday landing page built with Next.js, designed for seamless deployment on Vercel with staging and production environments.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/nikosmaheras11/LAFBLACKFRIDAY.git
   cd LAFBLACKFRIDAY
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a local environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Vercel Deployment

This project is configured for Vercel deployment with support for staging and production environments.

### Setting Up Vercel

1. **Connect Repository**: Link this GitHub repository to your Vercel account
2. **Configure Environments**:
   - **Preview/Staging**: Automatically created for every PR and non-production branches
   - **Production**: Deploys from the `main` branch

### Environment Variables

Configure these in your Vercel project settings:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_ENV` | Environment name | `staging` or `production` |
| `NEXT_PUBLIC_SITE_URL` | Full site URL | `https://your-domain.com` |

### Branch Strategy

- `main` → Production deployment
- Feature branches / PRs → Preview (staging) deployments

## 📁 Project Structure

```
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── .env.example
├── vercel.json
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Technologies

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Deployment platform

## 📝 License

Private project - All rights reserved.
