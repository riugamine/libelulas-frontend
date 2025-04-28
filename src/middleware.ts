import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Crear el cliente de Supabase
  const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() })
  
  // Verificar la sesión
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Si la ruta comienza con /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      // Si no hay sesión, redirigir al login
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    // Verificar si el usuario es admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      // Si no es admin, redirigir a la página principal
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}