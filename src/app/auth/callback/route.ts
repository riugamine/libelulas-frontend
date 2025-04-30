import { createRouteHandlerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Intercambiar el código por una sesión
    await supabase.auth.exchangeCodeForSession(code)
    
    // Redirigir al dashboard después de verificar
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Si hay un error, redirigir a la página de error
  return NextResponse.redirect(new URL('/auth/callback/error', request.url))
}