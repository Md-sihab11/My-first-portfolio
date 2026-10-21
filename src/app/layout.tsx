import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shakib.dev"),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.headline} Portfolio of ${siteConfig.fullName}. Explore real Next.js and full-stack projects, coding notes, and technical articles.`,
  keywords: [
    "Shakib",
    "Sihab Sharar",
    "Full-stack Developer",
    "Next.js Developer",
    "React Developer",
    "Bazar Dor",
    "Web Developer Bangladesh",
  ],
  authors: [{ name: siteConfig.fullName, url: siteConfig.links.github }],
  creator: siteConfig.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.headline,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.headline,
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#090E17",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-primary font-sans antialiased flex flex-col selection:bg-accent selection:text-accent-text">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
