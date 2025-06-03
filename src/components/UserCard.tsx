import { useAuth } from "../context/AuthContext";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';
import type { User } from '../types/index';
import UserEditForm from "./UserEditForm";
import { useWiki } from "../context/WikiContext";

type UserCardProps = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
};

export default function UserCard({ nombre, apellido, email, rol }: UserCardProps) {
  const { user } = useAuth();
  const { isOpen, mode, item, openModal, closeModal } = useModal<User>();
  const { deleteUser, getUserByEmail } = useWiki();
  const currentUser: User = getUserByEmail(email) as User;

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Botones de edición y eliminación */}
      {user?.rol === 'writer' && (
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={() => openModal(currentUser, 'edit')}
            title="Editar"
            className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
          >
            <PencilSquareIcon className="w-5 h-5 text-blue-600" />
          </button>
          <button
            onClick={() => openModal(currentUser, 'delete')}
            title="Eliminar"
            className="p-2 bg-red-100 rounded-full hover:bg-red-200"
          >
            <TrashIcon className="w-5 h-5 text-red-600" />
          </button>
        </div>
      )}

      {/* Contenido */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">
          {nombre} {apellido}
        </h2>
        <p className="text-gray-700 text-sm mb-4">{email}</p>
        <div className="text-gray-500 text-xs">
          <p>
            <span className="font-semibold">Rol:</span> {rol}
          </p>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {mode === 'delete' && item && (
          <div>
            <h2 className="text-lg font-bold mb-4">¿Eliminar usuario "{item.nombre}"?</h2>
            <div className="flex justify-end gap-4">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteUser(item.id);
                  closeModal();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
        {mode === 'edit' && item && (
          <UserEditForm userToEdit={item} onClose={closeModal} />
        )}
      </Modal>
    </div>
  );
}