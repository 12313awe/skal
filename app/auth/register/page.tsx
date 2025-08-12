import type { Metadata } from "next"
import RegisterClientPage from "./RegisterClientPage"

export default function RegisterPage() {
  return <RegisterClientPage />
}

export const metadata: Metadata = {
  title: "Kayıt Ol - SkalGPT",
  description: "SkalGPT'ye kayıt olun ve yapay zeka destekli eğitim deneyiminizi başlatın.",
  keywords: "kayıt, register, SkalGPT, yapay zeka, eğitim, Sezai Karakoç Anadolu Lisesi",
  robots: "index, follow",
  openGraph: {
    title: "Kayıt Ol - SkalGPT",
    description: "SkalGPT'ye kayıt olun ve yapay zeka destekli eğitim deneyiminizi başlatın.",
    type: "website",
  },
}
