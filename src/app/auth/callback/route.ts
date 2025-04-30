import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    
    // Crear el cliente de Supabase con las variables de entorno
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        }
      }
    )
    
    // Intercambiar el código por una sesión
    await supabase.auth.exchangeCodeForSession(code)
    
    // Redirigir al dashboard después de verificar
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Si hay un error, redirigir a la página de error
  return NextResponse.redirect(new URL('/auth/callback/error', request.url))
}