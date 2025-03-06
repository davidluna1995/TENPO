import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { Home } from '../pages/private/Home';
// Futuros componentes privados:
// import { Profile } from '../pages/private/Profile';
// import { Settings } from '../pages/private/Settings';

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        {/* Futuras rutas privadas:
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} /> */}
      </Route>
    </Routes>
  );
};