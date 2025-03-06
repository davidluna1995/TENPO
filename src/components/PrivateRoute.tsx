import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

/**
 * Componente de protección de rutas
 * Verifica si el usuario está autenticado antes de permitir el acceso
 * Si no hay usuario, redirige al login
 */
export const PrivateRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    // Redirige al login si no hay usuario autenticado
    return <Navigate to="/auth/login" replace />;
  }

  // Renderiza las rutas hijas si el usuario está autenticado
  return <Outlet />;
};