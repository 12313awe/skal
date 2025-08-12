"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      const supabase = createClient()

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          router.replace("/chat")
        } else {
          router.replace("/auth/login")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        router.replace("/auth/login")
      }
    }

    checkUserAndRedirect()
  }, [router])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        <p className="text-lg font-semibold">Yönlendiriliyor...</p>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Lütfen bekleyin, sayfa yükleniyor.</p>
    </div>
  )
}
