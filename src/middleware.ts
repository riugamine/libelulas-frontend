import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Crear una respuesta mutable
  let response = NextResponse.next()

  // Crear el cliente de Supabase con las cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )
  
  // Verificar la sesión
  const { data: { session } } = await supabase.auth.getSession()

  // Si la ruta comienza con /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      // Si no hay sesión, redirigir al login
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    // Verificar si el usuario es admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('rol')
      .eq('id', session.user.id)
      .single()

    if (!profile || profile.rol !== 'admin') {
      // Si no es admin, redirigir a la página principal
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: '/admin/:path*',
}