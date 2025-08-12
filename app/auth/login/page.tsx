import type { Metadata } from "next"
import LoginPage from "./ClientPage"

export default function ServerPage() {
  return <LoginPage />
}

export const metadata: Metadata = {
  title: "Giriş Yap - SkalGPT",
  description: "SkalGPT hesabınıza giriş yapın ve yapay zeka destekli eğitim deneyiminize devam edin.",
  keywords: "giriş, login, SkalGPT, yapay zeka, eğitim, Sezai Karakoç Anadolu Lisesi",
  robots: "index, follow",
  openGraph: {
    title: "Giriş Yap - SkalGPT",
    description: "SkalGPT hesabınıza giriş yapın ve yapay zeka destekli eğitim deneyiminize devam edin.",
    type: "website",
  },
}
