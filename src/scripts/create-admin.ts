import { createFirstAdmin } from '../lib/supabase/admin';

async function main() {
  try {
    const admin = await createFirstAdmin(
      'jangel9829@gmail.com',
      '123456',
      {
        nombre: 'Administrador Principal',
        cedula: 'V-27186616',
        direccion: 'Av. Siempreviva 742',
        telefono: '+58 412-6893533'
      }
    );
    console.log('Admin creado exitosamente:', admin);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();