import { createClient } from '@supabase/supabase-js';

// Cliente con permisos de servicio
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

/**
 * Creates the first admin user in the system
 * @param email - Admin email
 * @param password - Admin password
 * @param userData - Additional user data
 */
export async function createFirstAdmin(email: string, password: string, userData: {
  nombre: string;
  cedula: string;
  direccion: string;
  telefono: string;
}) {
  try {
    // Crear el usuario en Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError) throw authError;

    // Actualizar el perfil como admin
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        nombre: userData.nombre,
        cedula: userData.cedula,
        direccion: userData.direccion,
        telefono: userData.telefono,
        rol: 'admin'
      })
      .eq('id', authData.user.id);

    if (profileError) throw profileError;

    return authData.user;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
}