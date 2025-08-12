import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://skalgpt.vercel.app"),
  title: {
    default: "SkalGPT - Eğitimde Yapay Zeka Devrimi | Sezai Karakoç Anadolu Lisesi",
    template: "%s | SkalGPT",
  },
  description:
    "SkalGPT, Sezai Karakoç Anadolu Lisesi için özel geliştirilmiş yapay zeka destekli eğitim asistanıdır. Öğrenciler, öğretmenler ve idare için kişiselleştirilmiş destek sunar.",
  keywords: [
    "SkalGPT",
    "yapay zeka",
    "eğitim",
    "AI",
    "Sezai Karakoç Anadolu Lisesi",
    "öğretim asistanı",
    "eğitim teknolojisi",
    "öğrenci destek",
    "öğretmen yardımcısı",
    "okul AI sistemi",
  ],
  authors: [{ name: "SkalGPT Team", url: "https://skalgpt.vercel.app" }],
  creator: "SkalGPT Team",
  publisher: "Sezai Karakoç Anadolu Lisesi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://skalgpt.vercel.app",
    siteName: "SkalGPT",
    title: "SkalGPT - Eğitimde Yapay Zeka Devrimi",
    description:
      "Sezai Karakoç Anadolu Lisesi için özel tasarlanmış AI destekli eğitim asistanı. Öğrenciler ve öğretmenler için kişiselleştirilmiş destek.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkalGPT - Eğitimde Yapay Zeka Devrimi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@skalgpt",
    creator: "@skalgpt",
    title: "SkalGPT - Eğitimde Yapay Zeka Devrimi",
    description: "Sezai Karakoç Anadolu Lisesi için özel tasarlanmış AI destekli eğitim asistanı",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://skalgpt.vercel.app",
  },
  category: "education",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="light" storageKey="skalgpt-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
