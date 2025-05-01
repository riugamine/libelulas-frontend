import { supabase } from '@/lib/supabase/client'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')

  if (code) {

    try {
      // Intentar verificar el código
      const { error, data } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        // Si el error es porque el usuario ya está verificado
        if (error.message.includes('User is already confirmed')) {
          return NextResponse.redirect(new URL('/auth/callback/already-verified', request.url))
        }
        // Para otros errores
        return NextResponse.redirect(new URL('/auth/callback/error', request.url))
      }

      // Si es un código de verificación de email
      if (type === 'email_verification' && data?.user) {
        // Verificar si el usuario ya estaba confirmado
        if (data.user.email_confirmed_at) {
          return NextResponse.redirect(new URL('/auth/callback/already-verified', request.url))
        }
        // Primera verificación exitosa
        return NextResponse.redirect(new URL('/auth/callback/success', request.url))
      }

      // Para otros tipos de códigos (reset password, magic link, etc)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/callback/error', request.url))
    }
  }

  // Si hay un error, redirigir a la página de error
  return NextResponse.redirect(new URL('/auth/callback/error', request.url))
}