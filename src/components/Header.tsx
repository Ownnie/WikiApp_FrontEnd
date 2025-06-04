import { Link } from 'react-router-dom';
import { useWiki } from '../context/WikiContext';
import { useAuth } from '../context/AuthContext';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Header() {
  const { setCurrentDataType, dataType } = useWiki();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-purple-500 text-black p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo y título */}
        <div className="flex items-center gap-2">
          <img src="/img/wiki-icon.png" alt="Wiki-Icon" className="max-h-10 max-w-10" />
          <p className="text-2xl font-bold">Wiki.Dev</p>
        </div>

        {/* Botones de cambio de vista */}
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentDataType('lenguajes')}
            className={`font-semibold px-3 py-2 rounded ${dataType === 'lenguajes'
              ? 'bg-white text-purple-800'
              : 'hover:bg-purple-600 text-white'
              }`}
          >
            Lenguajes
          </button>
          <button
            onClick={() => setCurrentDataType('usuarios')}
            className={`font-semibold px-3 py-2 rounded ${dataType === 'usuarios'
              ? 'bg-white text-purple-800'
              : 'hover:bg-purple-600 text-white'
              }`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setCurrentDataType('entidades')}
            className={`font-semibold px-3 py-2 rounded ${dataType === 'entidades'
              ? 'bg-white text-purple-800'
              : 'hover:bg-purple-600 text-white'
              }`}
          >
            Entidades
          </button>
        </div>

        {/* Acciones de sesión */}
        <div className="space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-8 h-8 text-white" />
                <span className="text-white font-semibold">{user.nombre || user.email}</span>
              </div>
              <button
                onClick={logout}
                className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Iniciar Sesión
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-white hover:bg-slate-200 text-black font-bold py-2 px-4 rounded">
                  Registrarse
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
