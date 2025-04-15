import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, password);
    if (!success) {
      setError('Correo o contraseña inválidos.');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-purple-800">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Iniciar Sesión</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Ingresa tu correo"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Ingresa tu contraseña"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;