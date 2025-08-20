import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

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
    shortcut: "/favicon.png",
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
    "chatbot",
    "ödev yardımı",
    "ders notları",
    "sınav hazırlığı",
    "matematik",
    "fizik",
    "kimya",
    "türkçe",
    "edebiyat",
    "tarih",
    "coğrafya",
    "biyoloji",
    "İstanbul",
    "Türkiye",
    "lise",
    "anadolu lisesi",
    "öğrenci portalı",
    "eğitim platformu"
  ],
  authors: [{ name: "SkalGPT Team", url: "https://skalgpt.vercel.app" }],
  creator: "SkalGPT Team",
  publisher: "Sezai Karakoç Anadolu Lisesi",
  applicationName: "SkalGPT",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  classification: "Education",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["mailto:skalgpt.official@gmail.com"],
    },
  },
  manifest: "/manifest.json",
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
    alternateLocale: ["en_US"],
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
        type: "image/png",
      },
      {
        url: "/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "SkalGPT Logo",
        type: "image/png",
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
  appleWebApp: {
    capable: true,
    title: "SkalGPT",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "https://skalgpt.vercel.app",
    languages: {
      "tr-TR": "https://skalgpt.vercel.app",
      "en-US": "https://skalgpt.vercel.app/en",
    },
  },
  category: "education",
  generator: "Next.js",
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
    "yandex-verification": "your-yandex-verification-code",
  },
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
        <link rel="dns-prefetch" href="https://skalgpt.vercel.app" />
        <link rel="preconnect" href="https://api.groq.com" />
        <link rel="preconnect" href="https://generativelanguage.googleapis.com" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SkalGPT" />
        <meta name="application-name" content="SkalGPT" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="light" storageKey="skalgpt-theme">
          {children}
        </ThemeProvider>
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "SkalGPT",
              "description": "Sezai Karakoç Anadolu Lisesi için özel geliştirilmiş yapay zeka destekli eğitim asistanı",
              "url": "https://skalgpt.vercel.app",
              "logo": "https://skalgpt.vercel.app/logo.png",
              "sameAs": [
                "https://twitter.com/skalgpt",
                "https://github.com/skalgpt"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "skalgpt.official@gmail.com",
                "contactType": "customer service"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "TR",
                "addressLocality": "İstanbul"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "TRY",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  )
}
