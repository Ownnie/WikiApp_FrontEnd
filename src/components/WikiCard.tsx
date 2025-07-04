import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';
import type { Language } from '../types';
import { useWiki } from '../context/WikiContext';
import EditForm from './WikiEditForm';
import { useEffect, useState } from "react";
import { getUserById } from "../services/userService";

type WikiCardProps = {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  añoCreacion: number;
  creador: string;
};

const truncateText = (text: string, limit: number): string => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};


export default function WikiCard({ id, nombre, imagen, descripcion, añoCreacion, creador }: WikiCardProps) {
  const { user } = useAuth();
  const { isOpen, mode, item, openModal, closeModal } = useModal<Language>();
  const { deleteLanguage, getLanguageByName, getUltimaEdicion } = useWiki();
  const currentLanguage = getLanguageByName(nombre);

  // Estado para la última edición
  const [ultimaEdicion, setUltimaEdicion] = useState<{ fecha: string; nombreUsuario: string } | null>(null);
  useEffect(() => {
    if (id) {
      getUltimaEdicion("lenguajes", Number(id))
        .then(async data => {
          if (data && data.fecha && data.idUsuario) {
            const usuario = await getUserById(String(data.idUsuario));
            setUltimaEdicion({ fecha: data.fecha, nombreUsuario: usuario?.nombre || "Desconocido" });
          } else {
            setUltimaEdicion(null);
          }
        })
        .catch(() => setUltimaEdicion(null));
    }
  }, [id, getUltimaEdicion, getUserById]);

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <Link to={`/wiki/${nombre}`}>
        <div className="flex flex-col">
          {/* Imagen */}
          <div className="relative h-48">
            <img src={imagen} alt={nombre} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-purple-800 mb-2">{nombre}</h2>
            <p className="text-gray-700 text-sm mb-4">{truncateText(descripcion, 120)}</p>
            <div className="text-gray-500 text-xs">
              <p><span className="font-semibold">Año de Creación:</span> {añoCreacion}</p>
              <p><span className="font-semibold">Creador:</span> {creador}</p>
            </div>
            {/* Última edición */}
            <div className="mt-2 text-xs text-gray-500">
              {ultimaEdicion
                ? <>Última edición: {ultimaEdicion.fecha} (por {ultimaEdicion.nombreUsuario})</>
                : <>Sin ediciones registradas</>
              }
            </div>
          </div>
        </div>
      </Link>

      {/* Botones de edición y eliminación */}
      {user?.rol === 'writer' && currentLanguage && (
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button title="Editar" onClick={() => openModal(currentLanguage, 'edit')} className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
            <PencilSquareIcon className="w-5 h-5 text-blue-600" />
          </button>
          <button title="Eliminar" onClick={() => openModal(currentLanguage, 'delete')} className="p-2 bg-red-100 rounded-full hover:bg-red-200">
            <TrashIcon className="w-5 h-5 text-red-600" />
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {mode === 'delete' && item && (
          <div>
            <h2 className="text-lg font-bold mb-4">¿Eliminar "{item.nombre}"?</h2>
            <div className="flex justify-end gap-4">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
              <button onClick={() => {
                deleteLanguage(item.id);
                closeModal();
              }} className="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
            </div>
          </div>
        )}
        {mode === 'edit' && item && (
          <EditForm language={item} onClose={closeModal} />
        )}
      </Modal>
    </div>
  );
}