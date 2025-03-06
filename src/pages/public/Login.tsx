import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, HelpCircle } from 'lucide-react';
import { fakeLogin } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useTooltip } from '../../hooks/useTooltip';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  useTooltip();

  const validateEmail = (value: string) => {
    if (!value) return 'El correo electrónico es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Ingrese un correo electrónico válido';
    }
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'La contraseña es requerida';
    if (value.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  };

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const isFormValid = !emailError && !passwordError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    
    if (!isFormValid) return;
    
    setLoading(true);
    try {
      const user = await fakeLogin(email, password);
      setUser(user);
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <LogIn className="text-primary" size={48} />
            <h2 className="mt-3 mb-4">Iniciar Sesión</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label d-flex align-items-center">
                Correo electrónico
                <HelpCircle
                  size={16}
                  className="ms-2 text-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Formato: ejemplo@dominio.com"
                  style={{ cursor: 'help' }}
                />
              </label>
              <input
                id="email"
                type="email"
                className={`form-control ${emailTouched && emailError ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                placeholder="ejemplo@dominio.com"
              />
              {emailTouched && emailError && (
                <div className="form-text text-danger">{emailError}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label d-flex align-items-center">
                Contraseña
                <HelpCircle
                  size={16}
                  className="ms-2 text-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Mínimo 6 caracteres"
                  style={{ cursor: 'help' }}
                />
              </label>
              <input
                id="password"
                type="password"
                className={`form-control ${passwordTouched && passwordError ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                placeholder="******"
              />
              {passwordTouched && passwordError && (
                <div className="form-text text-danger">{passwordError}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading || !isFormValid}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};