# Shakib | Modern Developer Portfolio

A sleek, editorial dark-mode developer portfolio and personal CMS for **Shakib (Sihab Sharar)**, Full-stack Developer in Progress.

## ✨ Features

- **Next.js 15 App Router** & **TypeScript** — Modern full-stack React framework
- **Tailwind CSS** — Bespoke editorial dark design system (`#0B0D0C`, `#141715`, `#F4F5F0`, `#C5F467`)
- **Better Auth + Google OAuth** — Secure, owner-only admin authentication
- **MongoDB Atlas** — Persistent content management with graceful static fallbacks
- **Owner-only Admin Dashboard** — Manage projects, blog, resources, socials, and profile
- **S3 / Cloudflare R2 Storage** — Cloud file uploads with local fallback
- **Contact Form with Inbox** — Sends messages to MongoDB, notifies via Resend email
- **MDX Blog** — Write and publish articles with local MDX or DB-stored content
- **Downloadable Resources** — PDF cheatsheets and notes with download tracking
- **Social Profiles Directory** — Verified links with descriptions
- **Search** — Unified search across projects, blog, and resources
- **Fully Responsive** — Mobile-first with smooth micro-interactions

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd portfolio
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env.local
```
Open `.env.local` and fill in all required values (see **Environment Variables** section below).

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

All variables are documented in `.env.example`. Copy that file to `.env.local` and configure:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Your public site URL (e.g. `https://shakib.dev`) |
| `BETTER_AUTH_SECRET` | ✅ | 32+ char secret (generate: `openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | ✅ | Same as `NEXT_PUBLIC_SITE_URL` |
| `OWNER_EMAIL` | ✅ | Google account email allowed to access `/admin` |
| `GOOGLE_CLIENT_ID` | ✅ | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | ✅ | Google OAuth Client Secret |
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `MONGODB_DB` | ✅ | Database name (e.g. `portfolio`) |
| `S3_BUCKET` | Optional | S3/R2 bucket name for file uploads |
| `S3_ACCESS_KEY_ID` | Optional | S3/R2 access key |
| `S3_SECRET_ACCESS_KEY` | Optional | S3/R2 secret key |
| `S3_ENDPOINT_URL` | Optional | Custom endpoint for Cloudflare R2 |
| `NEXT_PUBLIC_CDN_URL` | Optional | Public CDN base URL for uploaded files |
| `RESEND_API_KEY` | Optional | Resend API key for email notifications |
| `CONTACT_EMAIL` | Optional | Email to receive contact form notifications |

---

## 🔑 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new **OAuth 2.0 Client ID** (type: Web application)
3. Add **Authorized redirect URI**: `http://localhost:3000/api/auth/callback/google`
4. For production: add `https://yourdomain.com/api/auth/callback/google`
5. Copy **Client ID** and **Client Secret** to `.env.local`

---

## 🗃️ MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a database user
3. Allow network access (0.0.0.0/0 for development, restrict for production)
4. Copy the connection string to `MONGODB_URI` in `.env.local`

> **Note:** The portfolio works without MongoDB using static fallback data. MongoDB is required only for the admin content management features.

---

## 🔐 Admin Access

After configuring all environment variables:

1. Navigate to `/admin/login`
2. Click **Continue with Google**
3. Sign in with the Google account matching `OWNER_EMAIL`

Admin sections:
- `/admin` — Overview dashboard with content metrics
- `/admin/profile` — Edit personal info, bio, and profile image
- `/admin/projects` — Add, edit, and reorder portfolio projects
- `/admin/blog` — Write and publish blog articles
- `/admin/resources` — Upload and manage PDF resources
- `/admin/social` — Manage social media links
- `/admin/experience` — Add work experience and learning milestones
- `/admin/skills` — Manage skill categories and technologies
- `/admin/messages` — View contact form submissions
- `/admin/resume` — Replace the downloadable resume PDF
- `/admin/settings` — Site-wide configuration (hero text, section visibility)

---

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets
│   ├── images/         # Profile, project, and blog images
│   ├── files/          # Resume PDF
│   ├── resources/      # Downloadable PDF cheatsheets
│   └── icons/          # Favicon and PWA icons
├── content/
│   └── blog/           # MDX blog post source files
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── admin/      # Owner-only admin dashboard
│   │   └── api/        # API route handlers
│   ├── components/     # React UI components
│   ├── data/           # Static fallback data (projects, skills, socials)
│   ├── lib/            # Shared utilities (DB, auth, blog parser)
│   ├── providers/      # React context providers
│   └── types/          # TypeScript type definitions
├── .env.example        # Environment variables template
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Auth | Better Auth + Google OAuth |
| Database | MongoDB Atlas |
| Storage | AWS S3 / Cloudflare R2 |
| Icons | Lucide React |
| Email | Resend |
| Deployment | Vercel (recommended) |

---

## 📦 Deployment (Vercel)

1. Push your repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables in the Vercel dashboard
4. Update OAuth redirect URIs to include your production domain
5. Deploy!

---

Built with ❤️ by [Sihab Sharar](https://github.com/Md-sihab11)
