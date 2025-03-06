import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoutes';
import { PrivateRoutes } from './routes/PrivateRoutes';

/**
 * Componente principal de la aplicación
 * Configura el enrutamiento principal y divide las rutas en públicas y privadas
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas - Accesibles sin autenticación */}
        <Route path="/auth/*" element={<PublicRoutes />} />
        
        {/* Rutas Privadas - Requieren autenticación */}
        <Route path="/*" element={<PrivateRoutes />} />
        
        {/* Redirección por defecto a la página principal */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;