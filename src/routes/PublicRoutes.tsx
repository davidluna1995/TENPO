import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/public/Login';
// Futuros componentes públicos:
// import { ResetPassword } from '../pages/public/ResetPassword';
// import { Register } from '../pages/public/Register';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Futuras rutas públicas:
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} /> */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};