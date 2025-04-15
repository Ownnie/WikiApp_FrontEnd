import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 text-purple-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl font-semibold mb-6">Página no encontrada</p>
      <p className="text-center text-gray-700 mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}