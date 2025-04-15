import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState<'writer' | 'reader'>('reader');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await register(nombre, apellido, email, password, rol);
        if (!success) {
            setError('Este usuario ya existe.');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Registrarse</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <label className="block mb-2 text-sm font-medium">Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <label className="block mb-2 text-sm font-medium">Apellido</label>
                <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <label className="block mb-2 text-sm font-medium">Correo Electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <label className="block mb-2 text-sm font-medium">Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <label className="block mb-2 text-sm font-medium">Rol</label>
                <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value as 'writer' | 'reader')}
                    className="w-full p-2 mb-6 border border-gray-300 rounded"
                >
                    <option value="reader">Reader</option>
                    <option value="writer">Writer</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Register;
