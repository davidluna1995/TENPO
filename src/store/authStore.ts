import { create } from 'zustand';
import { User } from '../types';

/**
 * Store de autenticación usando Zustand
 * Mantiene el estado del usuario y proporciona métodos para actualizarlo
 */
interface AuthState {
  user: User | null;        // Estado del usuario actual
  setUser: (user: User | null) => void;  // Función para actualizar el usuario
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));