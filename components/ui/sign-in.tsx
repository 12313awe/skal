"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

// --- TYPE DEFINITIONS ---

export interface Testimonial {
  name: string
  handle?: string
  text: string
}

interface SignInPageProps {
  title?: React.ReactNode
  description?: React.ReactNode
  heroImageSrc?: string
  testimonials?: Testimonial[]
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void
  onCreateAccount?: () => void
  serverError?: string | null
  isSubmitting?: boolean
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
    {children}
  </div>
)

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial; delay: string }) => (
  <div
    className={`animate-testimonial ${delay} flex flex-col gap-3 rounded-3xl bg-card/40 dark:bg-zinc-800/40 backdrop-blur-xl border border-white/10 p-5 w-64`}
  >
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium">{testimonial.name}</p>
      {testimonial.handle && <p className="text-muted-foreground">{testimonial.handle}</p>}
      <p className="mt-1 text-foreground/80">{testimonial.text}</p>
    </div>
  </div>
)

// --- MAIN COMPONENT ---

export const SignInPage: React.FC<SignInPageProps> = ({
  title = <span className="font-light text-foreground tracking-tighter">Hoş Geldiniz</span>,
  description = "Hesabınıza erişin ve yolculuğunuza devam edin",
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onCreateAccount,
  serverError,
  isSubmitting = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {title}
            </h1>
            <p className="animate-element animate-delay-200 text-muted-foreground text-sm sm:text-base">
              {description}
            </p>

            <form className="space-y-5" onSubmit={onSignIn}>
              <div className="animate-element animate-delay-300">
                <label className="text-sm font-medium text-muted-foreground">E-posta Adresi</label>
                <GlassInputWrapper>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="E-posta adresinizi girin"
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-muted-foreground">Şifre</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Şifrenizi girin"
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                      )}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              {serverError && <p className="text-sm font-medium text-destructive">{serverError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="animate-element animate-delay-500 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>
            </form>

            <p className="animate-element animate-delay-600 text-center text-sm text-muted-foreground">
              Platformumuzda yeni misiniz?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onCreateAccount?.()
                }}
                className="text-violet-400 hover:underline transition-colors"
              >
                Hesap Oluşturun
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden lg:block flex-1 relative p-4">
          <div
            className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          ></div>
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
              <TestimonialCard testimonial={testimonials[0]} delay="animate-delay-1000" />
              {testimonials[1] && (
                <div className="hidden xl:flex">
                  <TestimonialCard testimonial={testimonials[1]} delay="animate-delay-1200" />
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
