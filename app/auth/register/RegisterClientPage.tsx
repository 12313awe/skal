"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SignUpPage, type Testimonial } from "@/components/ui/sign-up"

// <CHANGE> Updated testimonials with new names and removed avatars
const sampleTestimonials: Testimonial[] = [
  {
    name: "Muhammed Çevik",
    handle: "@muhammedcreative",
    text: "Kayıt olmak çok kolaydı ve hemen kullanmaya başladım. Gerçekten kullanıcı dostu bir platform.",
  },
  {
    name: "Vahdethan İnan",
    handle: "@vahdethantech",
    text: "İlk günden itibaren verimli olmaya başladım. Özellikler çok iyi düşünülmüş ve pratik.",
  },
]

export default function RegisterClientPage() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerError(null)
    setSuccessMessage(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const surname = formData.get("surname") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // <CHANGE> Simplified sign-up without email validation
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, surname },
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/chat`,
      },
    })

    if (error) {
      console.error("Supabase kayıt hatası:", error)
      setServerError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.")
    } else {
      setSuccessMessage("Kayıt başarılı! E-posta adresinizi kontrol edin ve hesabınızı doğrulayın.")
      event.currentTarget.reset()
    }
    setIsSubmitting(false)
  }

  const handleSignIn = () => {
    router.push("/auth/login")
  }

  return (
    <>
      <SignUpPage
        heroImageSrc="/login-register-image.jpeg"
        testimonials={sampleTestimonials}
        onSignUp={handleSignUp}
        onSignIn={handleSignIn}
        serverError={serverError}
        successMessage={successMessage}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
