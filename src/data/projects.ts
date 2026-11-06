import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "studiospace",
    title: "StudioSpace",
    tagline: "Discover, Explore & Book Creative Spaces for Your Next Big Idea",
    description:
      "A modern peer-to-peer creative workspace marketplace that connects photographers, filmmakers, podcasters, musicians, and creators with professional studios and creative spaces. Discover studio listings, explore detailed facilities, manage bookings, and host your own creative space through a seamless, responsive user experience.",
    problem:
      "Finding suitable creative studios, comparing facilities and hourly rates, checking availability, and managing studio reservations can be time-consuming and inconvenient for independent creators and production teams.",
    solution:
      "Developed a responsive studio marketplace featuring dynamic studio discovery, category-based filtering, detailed studio listings, studio management, secure authentication, booking management, and personalized user dashboards.",
    image: "/images/projects/studio.png",
    imageAlt:
      "StudioSpace creative workspace discovery and booking platform interface",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Better Auth",
      "Express.js",
      "MongoDB",
      "JWT",
      "Lucide React",
    ],
    githubUrl: "https://github.com/Md-sihab11/studioSpace",
    liveUrl: "https://studiospace-vert.vercel.app",
    featured: true,
    category: "Full-Stack",
    developmentStatus: "Live",
    highlights: [
      "Discover and explore creative studios with category-based filtering",
      "Add, edit, and manage studio listings with dedicated owner dashboards",
      "Secure user authentication with Better Auth and social login",
      "Book creative workspaces and manage reservations through My Bookings",
      "Studio details with pricing, amenities, location, and host information",
      "Responsive interface with light and dark theme support",
      "Next.js frontend integrated with Express.js and MongoDB backend",
    ],
    features: [
      {
        title: "Curated studio discovery",
        description:
          "A Swiper hero carousel, live featured studios, category shortcuts, and a four-step “how it works” flow on the home page.",
      },
      {
        title: "Search and URL-based filtering",
        description:
          "Browse every listing, filter by category through the URL, search by name, location, or amenity, and clear filters from dedicated loading, empty, and error states.",
      },
      {
        title: "Detailed studio pages",
        description:
          "Each listing includes an image gallery, amenities, capacity, location, hourly rate, security deposit, host details, sample reviews, and a booking panel.",
      },
      {
        title: "Host dashboard and listings",
        description:
          "Hosts can create, edit, and delete listings, with ownership checked in both the UI and on the server. Cover and gallery images upload to imgbb, with a direct image URL fallback.",
      },
      {
        title: "Hourly booking and My Bookings",
        description:
          "Pick a date, start time, and duration, see the calculated total, and cancel a pending booking. Overlapping reservations for the same studio and day are rejected with HTTP 409.",
      },
      {
        title: "Authentication and private routes",
        description:
          "Email/password and Google sign-in through Better Auth, HTTPOnly session cookies, and short-lived JWTs for the Express API. Protected routes redirect signed-out visitors and return them after login.",
      },
      {
        title: "Responsive UI and persisted theme",
        description:
          "Mobile navigation, adaptive grids, accessible dialogs, and a light/dark theme applied before hydration to avoid a flash on load.",
      },
      {
        title: "Feedback and empty states",
        description:
          "Sonner success and error toasts cover auth, CRUD, uploads, and bookings, alongside custom 404 pages and empty dashboard states.",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Tailwind CSS 4",
          "shadcn-style components",
        ],
      },
      {
        label: "Backend",
        items: ["Node.js", "Express 5", "jose"],
      },
      {
        label: "Database",
        items: ["MongoDB Atlas", "Official MongoDB Driver"],
      },
      {
        label: "Authentication",
        items: ["Better Auth", "Google OAuth", "JWT / JWKS"],
      },
      {
        label: "UI & Tooling",
        items: ["Swiper", "Sonner", "date-fns", "Lucide React", "imgbb"],
      },
    ],
    challenges: [
      {
        title: "HTTPOnly JWT authentication",
        problem:
          "Better Auth keeps the session in an HTTPOnly cookie, so the separate Express API could not read it from the browser and could not trust an email or owner name supplied by the client.",
        solution:
          "The client requests a short-lived JWT from /api/auth/token and sends it as a Bearer token. The Express API verifies it with jose against the Better Auth JWKS endpoint, including issuer and audience checks, and derives ownership from the verified token.",
      },
      {
        title: "Double-booking prevention",
        problem:
          "Two users could try to reserve the same studio for overlapping hours on the same day.",
        solution:
          "POST /add-booking loads pending and confirmed bookings for that studio and date, converts HH:mm values to minutes, and rejects any overlap with HTTP 409. The UI surfaces the server's message.",
      },
      {
        title: "Theme persistence without a flash",
        problem:
          "Applying the saved theme after hydration caused the default light theme to flash before the dark class was added.",
        solution:
          "A small inline script applies the saved theme before hydration, while the toggle updates localStorage and the dark class. The navbar and dashboard share the same studiospace_theme key.",
      },
    ],
    learnings: [
      {
        title: "Verifying tokens across services",
        description:
          "How to validate short-lived JWTs against a remote JWKS endpoint, including issuer and audience checks, without trusting client-supplied identity.",
      },
      {
        title: "Server-side availability rules",
        description:
          "How to convert time strings into minutes and reject overlapping bookings deterministically on the API rather than relying on the interface alone.",
      },
      {
        title: "Hydration-safe theme persistence",
        description:
          "Why applying a saved theme before hydration prevents a flash of the wrong theme and keeps the experience consistent across the app.",
      },
    ],
    screenshots: [
      {
        src: "/images/projects/studiospace/explore.png",
        alt: "StudioSpace explore page with studio search, category filters, and listing cards",
        caption:
          "Explore studios with search, category filters, and live listings.",
      },
      {
        src: "/images/projects/studiospace/studio-detail.png",
        alt: "StudioSpace studio detail page with gallery, pricing, and booking panel",
        caption:
          "Detailed studio pages with a gallery, amenities, and hourly booking.",
      },
      {
        src: "/images/projects/studiospace/category-filter.png",
        alt: "StudioSpace Film Stage category filter showing filtered studio results",
        caption:
          "URL-based category filtering with clear reset controls.",
      },
    ],
    resources: [
      {
        label: "Live Demo",
        href: "https://studiospace-vert.vercel.app",
        description: "Open the deployed StudioSpace application.",
        kind: "live",
      },
      {
        label: "Frontend Repository",
        href: "https://github.com/Md-sihab11/studioSpace",
        description: "Browse the Next.js and React source code.",
        kind: "repository",
      },
      {
        label: "Backend Repository",
        href: "https://github.com/Md-sihab11/studioSpace-Backend",
        description: "Explore the Express API and MongoDB integration.",
        kind: "repository",
      },
      {
        label: "Backend API",
        href: "https://studiospace-backend-chi.vercel.app",
        description: "Open the deployed Express API endpoint.",
        kind: "api",
      },
    ],
  },
  {
    slug: "bazar-dor",
    title: "Bazar Dor",
    tagline: "Essential Commodities Price Monitoring Platform for Bangladesh",
    description:
      "A modern web platform designed to make daily market prices of essential commodities in Bangladesh accessible to the public, tracking price fluctuations across local markets.",
    problem:
      "Daily market price volatility and lack of accessible price tracking in local bazaars make it challenging for ordinary citizens to anticipate fair prices and prevent overpaying.",
    solution:
      "Constructed a responsive full-stack platform featuring an animated price ticker, Bengali calendar date integration, detailed product price analytics, and protected product detail and profile routes.",
    image: "/images/projects/bazar-dor1.png",
    imageAlt: "Bazar Dor daily market commodity monitoring platform interface",
    technologies: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Better Auth",
      "MongoDB Atlas",
    ],
    githubUrl: "https://github.com/Md-sihab11/bazar-dor",
    liveUrl: "https://bazar-dor-orpin-nine.vercel.app/",
    featured: true,
    category: "Full-Stack",
    developmentStatus: "Live",
    highlights: [
      "Real-time infinite scrolling price ticker with upward/downward fluctuation indicators",
      "Automatic Bengali calendar and date engine calculating current Bangla day and year",
      "Comparative market analysis tracking minimum, maximum, and average commodity prices",
      "Secure authentication and protected routes implemented with Better Auth & MongoDB",
    ],
    features: [
      {
        title: "Live commodity price ticker",
        description:
          "An animated, infinitely scrolling ticker shows daily price changes with upward and downward indicators.",
      },
      {
        title: "Automatic Bengali calendar",
        description:
          "Displays the current Bengali day, month, and year alongside market information.",
      },
      {
        title: "Price comparison and analysis",
        description:
          "Product-wise comparisons with the previous day, plus minimum, maximum, and average prices across major local markets.",
      },
      {
        title: "Secure authentication",
        description:
          "Better Auth with email/password, Google, and GitHub sign-in protects product detail pages and other private routes.",
      },
      {
        title: "Profile and account management",
        description:
          "View account information, update the profile name, and sign out securely.",
      },
      {
        title: "Category filtering and sorting",
        description:
          "Organizes products into categories such as vegetables, fish and meat, and rice and lentils, with ascending or descending price sorting.",
      },
      {
        title: "Responsive and accessible design",
        description:
          "Layouts adapt across phones, tablets, and desktops for a consistent browsing experience.",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: [
          "Next.js",
          "React 19",
          "TypeScript",
          "Tailwind CSS",
          "DaisyUI",
        ],
      },
      {
        label: "Database",
        items: ["MongoDB Atlas"],
      },
      {
        label: "Authentication",
        items: ["Better Auth", "Google OAuth", "GitHub OAuth"],
      },
      {
        label: "UI & Tooling",
        items: ["React Toastify", "React Icons", "Anek Bangla (Google Fonts)"],
      },
    ],
    resources: [
      {
        label: "Live Demo",
        href: "https://bazar-dor-orpin-nine.vercel.app/",
        description: "Open the deployed Bazar Dor application.",
        kind: "live",
      },
      {
        label: "GitHub Repository",
        href: "https://github.com/Md-sihab11/bazar-dor",
        description: "Browse the full Next.js source code.",
        kind: "repository",
      },
    ],
  },
  {
    slug: "devstack",
    title: "DevStack",
    tagline: "Curated Developer Stack & Tooling Repository",
    description:
      "An interactive web platform enabling developers to discover, organize, and evaluate modern web tools, frameworks, and library ecosystems.",
    problem:
      "Developers lose hours navigating scattered documentation to assemble modern, compatible development stacks.",
    solution:
      "Built a streamlined React interface where users can explore technologies by category, difficulty, rating, and description, then assemble and manage a personal stack without duplicates.",
    image: "/images/projects/devstack1.png",
    imageAlt: "DevStack developer tool catalog interface",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Vite",
      "React Toastify",
      "JSON",
    ],
    githubUrl: "https://github.com/Md-sihab11/dev-stack-builder",
    liveUrl: "https://devstackb.netlify.app/",
    featured: true,
    category: "Frontend",
    developmentStatus: "Live",
    highlights: [
      "Browse technologies with icon, category, difficulty, rating, and description",
      "Add technologies to a personal stack with duplicate prevention",
      "Remove selected technologies individually or clear the whole stack",
      "Responsive interface with toast feedback for add and remove actions",
    ],
    features: [
      {
        title: "Explore technologies",
        description:
          "Browse technologies with their icon, category, difficulty, rating, and description.",
      },
      {
        title: "Build a personal stack",
        description:
          "Add technologies to your own stack and remove them individually or all at once.",
      },
      {
        title: "Duplicate-safe selection",
        description:
          "The same technology cannot be added twice, keeping the personal stack clean.",
      },
      {
        title: "Toast feedback",
        description:
          "React Toastify confirms when technologies are added to or removed from the stack.",
      },
      {
        title: "Responsive interactive UI",
        description:
          "The experience adapts across desktop, tablet, and mobile devices.",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "DaisyUI",
        ],
      },
      {
        label: "Data",
        items: ["JSON"],
      },
      {
        label: "UI & Tooling",
        items: ["React Toastify"],
      },
    ],
    learnings: [
      {
        title: "React fundamentals in practice",
        description:
          "Working with JSX, props, state, and hooks while building an interactive interface.",
      },
      {
        title: "Component data flow",
        description:
          "Passing data down through props and sending changes back up through callback functions.",
      },
      {
        title: "Lists and conditional UI",
        description:
          "Using stable keys, loading JSON with useEffect, and rendering a clear empty state when no technologies are selected.",
      },
    ],
    resources: [
      {
        label: "Live Demo",
        href: "https://devstackb.netlify.app/",
        description: "Open the deployed DevStack builder.",
        kind: "live",
      },
      {
        label: "GitHub Repository",
        href: "https://github.com/Md-sihab11/dev-stack-builder",
        description: "Browse the React and Vite source code.",
        kind: "repository",
      },
    ],
  },
  {
    slug: "fitlog-workout-library",
    title: "FitLog - Workout Library",
    tagline: "Responsive Workout Library & Personal Fitness Planner",
    description:
      "A simple and responsive workout library built with Next.js that allows users to explore workouts, view detailed workout instructions, save workouts for later, and create a personalized workout plan.",
    problem:
      "Finding suitable workouts and organizing a consistent fitness routine can be challenging without a centralized place to explore exercises and manage workout plans.",
    solution:
      "Developed a responsive workout library with detailed workout pages, saved workouts, and a personal workout planner using reusable React components and Context API for state management.",
    image: "/images/projects/fitlog.png",
    imageAlt:
      "FitLog workout library and personal fitness planner interface",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Context API",
    ],
    githubUrl: "https://github.com/Md-sihab11/fitlog-workout-library",
    liveUrl: "https://fitlog-workout-library-pink.vercel.app/",
    featured: true,
    category: "Full-Stack",
    developmentStatus: "Live",
    highlights: [
      "Browse workouts with category, difficulty, duration, and equipment information",
      "View detailed workout instructions through dynamic routes",
      "Create and manage a personalized workout plan",
      "Save workouts for quick access later",
      "Responsive interface optimized for desktop, tablet, and mobile devices",
    ],
    features: [
      {
        title: "Workout library",
        description:
          "Explore a collection of workouts with useful information such as category, difficulty, duration, and equipment.",
      },
      {
        title: "Workout details",
        description:
          "View detailed information about individual workouts, including instructions and workout-related information, through dynamic routes.",
      },
      {
        title: "My Plan",
        description:
          "Add workouts to a personal workout plan and manage the workouts selected for your routine.",
      },
      {
        title: "Save workouts",
        description:
          "Save workouts for quick access and keep track of exercises you want to do later.",
      },
      {
        title: "Responsive design",
        description:
          "A smooth experience across desktop, tablet, and mobile devices.",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      },
      {
        label: "State Management",
        items: ["React Context API"],
      },
    ],
    learnings: [
      {
        title: "Next.js App Router",
        description:
          "Practising dynamic routes, loading and not-found states, and a reusable component structure.",
      },
      {
        title: "Shared state with Context API",
        description:
          "Keeping saved workouts and the personal plan in sync across multiple pages.",
      },
      {
        title: "Reusable UI and responsive layouts",
        description:
          "Breaking the interface into modular components and adapting it for desktop, tablet, and mobile.",
      },
    ],
    resources: [
      {
        label: "Live Demo",
        href: "https://fitlog-workout-library-pink.vercel.app/",
        description: "Open the deployed FitLog application.",
        kind: "live",
      },
      {
        label: "GitHub Repository",
        href: "https://github.com/Md-sihab11/fitlog-workout-library",
        description: "Browse the Next.js source code.",
        kind: "repository",
      },
    ],
  },
  {
    slug: "wanderlust",
    title: "Wanderlust",
    tagline: "Discover, Explore & Book Your Next Unforgettable Journey",
    description:
      "A modern travel and destination listing web application that helps users discover stunning destinations, explore detailed travel information, manage bookings, and plan unforgettable journeys with a seamless, responsive user experience.",
    problem:
      "Finding suitable travel destinations, accessing essential trip information, managing reservations, and keeping travel plans organized across different services can be time-consuming and inconvenient.",
    solution:
      "Developed a responsive travel platform featuring destination discovery, detailed destination pages, new destination listings, secure authentication with Google OAuth, password recovery, booking management, and user profile functionality.",
    image: "/images/projects/wanderlast.png",
    imageAlt: "Wanderlust travel destination discovery and booking interface",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Better Auth",
      "MongoDB",
      "Lucide React",
    ],
    githubUrl: "https://github.com/Md-sihab11/wanderlast",
    liveUrl: "",
    featured: true,
    category: "Full-Stack",
    developmentStatus: "Completed",
    highlights: [
      "Browse curated travel destinations with rich visuals and detailed information",
      "Add, edit, and manage destination listings",
      "Secure sign-up, sign-in, Google OAuth, and password recovery with Better Auth",
      "View and manage travel reservations through the My Bookings page",
      "Responsive, accessible UI with 40+ shadcn components",
      "MongoDB integration with strict TypeScript and Next.js App Router",
    ],
    features: [
      {
        title: "Browse destinations",
        description:
          "Explore curated travel spots with rich details and visuals.",
      },
      {
        title: "Destination details",
        description:
          "Deep-dive into any place with images, descriptions, and key information.",
      },
      {
        title: "Add new listings",
        description:
          "Hosts and contributors can submit new destinations to the platform.",
      },
      {
        title: "User authentication",
        description:
          "Secure sign-up, sign-in, and Google OAuth through Better Auth.",
      },
      {
        title: "Password recovery",
        description:
          "Forgot-password and reset-password flows are included.",
      },
      {
        title: "My bookings",
        description:
          "Users can view and manage their travel reservations.",
      },
      {
        title: "Profile",
        description: "A personal profile page for each signed-in user.",
      },
      {
        title: "Responsive shadcn UI",
        description:
          "A fully responsive Tailwind CSS v4 interface built with 40+ accessible shadcn components.",
      },
    ],
    techStack: [
      {
        label: "Frontend",
        items: [
          "Next.js 16",
          "React 19.3",
          "TypeScript",
          "Tailwind CSS v4",
          "shadcn / Base UI",
        ],
      },
      {
        label: "Database",
        items: ["MongoDB", "Better Auth Mongo Adapter"],
      },
      {
        label: "Authentication",
        items: ["Better Auth", "Google OAuth"],
      },
      {
        label: "UI & Tooling",
        items: [
          "Lucide React",
          "tw-animate-css",
          "Recharts",
          "Geist",
          "Turbopack",
        ],
      },
    ],
    resources: [
      {
        label: "GitHub Repository",
        href: "https://github.com/Md-sihab11/wanderlast",
        description: "Browse the Next.js and MongoDB source code.",
        kind: "repository",
      },
    ],
  },
];
