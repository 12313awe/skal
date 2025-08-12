import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase credentials are not available, redirect to auth
  if (!supabaseUrl || !supabaseAnonKey) {
    const { pathname } = request.nextUrl
    if (!pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    return response
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options })
        response.cookies.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: "", ...options })
        response.cookies.set({ name, value: "", ...options })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  if (user && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/chat", request.url))
  }

  const protectedRoutes = ["/chat", "/", "/api/chat", "/api/generate-title"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (pathname === "/") {
    if (user) {
      return NextResponse.redirect(new URL("/chat", request.url))
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
}
