"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SignInPage, type Testimonial } from "@/components/ui/sign-in"

// <CHANGE> Updated testimonials with AI focus
const sampleTestimonials: Testimonial[] = [
  {
    name: "Muhammed Çevik",
    handle: "11. Sınıf Öğrencisi",
    text: "Yapay zeka teknolojisiyle güçlendirilmiş bu platform, yapay zeka deneyimimizi tamamen dönüştürüyor. SkalGPT'nin anlık cevapları ve akıllı çözümleri gerçekten etkileyici.",
  },
  {
    name: "Vahdethan İnan",
    handle: "10. Sınıf Öğrencisi",
    text: "SkalGPT'nin yapay zeka özellikleri sayesinde bilgiye erişim artık çok daha kolay. Bu yenilikçi platform, okulda bilgiye ulaşmayı oldukça kolaylaştırıyor.",
  },
]

export default function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // <CHANGE> Simplified sign-in without email validation
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setServerError("Giriş bilgileri hatalı. Lütfen e-posta ve şifrenizi kontrol edin.")
    } else {
      router.push("/chat")
      router.refresh()
    }
    setIsSubmitting(false)
  }

  const handleCreateAccount = () => {
    router.push("/auth/register")
  }

  return (
    <>
      <SignInPage
        heroImageSrc="/login-register-image.jpeg"
        testimonials={sampleTestimonials}
        onSignIn={handleSignIn}
        onCreateAccount={handleCreateAccount}
        serverError={serverError}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
