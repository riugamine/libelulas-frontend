import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => Promise<void>
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: async () => {
    try {
      // Cerrar sesión en Supabase
      await supabase.auth.signOut()
      console.log('Sesión cerrada')
      // Limpiar estado local
      set({ user: null, isLoading: false })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }
}))