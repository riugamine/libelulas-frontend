import { supabase } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()


    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    })

    if (error) {
      return NextResponse.json(
        { error: 'Error al reenviar el correo' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Correo reenviado exitosamente' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}