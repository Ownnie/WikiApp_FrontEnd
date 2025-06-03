import { useAuth } from "../context/AuthContext";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';
import type { Entity } from '../types';
import EntityEditForm from "./EntityEditForm";
import { useWiki } from "../context/WikiContext";

type EntityCardProps = {
    id: string;
    nombre: string;
    fechaCreacion: string;
    imagen: string;
    descripcion: string; // This can now be undefined, so we handle it
};

// Ensure text is always a string before checking length
const truncateText = (text: string | undefined, limit: number): string =>
    (text ?? '').length > limit ? (text ?? '').substring(0, limit) + "..." : (text ?? '');

export default function EntityCard({ nombre, fechaCreacion, imagen, descripcion }: EntityCardProps) {
    const { user } = useAuth();
    const { isOpen, mode, item, openModal, closeModal } = useModal<Entity>();
    const { deleteEntity, getEntityByName } = useWiki();
    const currentEntity: Entity = getEntityByName(nombre) as Entity; // Ensure currentEntity is properly typed

    return (
        <div className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            {/* Imagen */}
            <div className="relative h-48">
                {/* Add a fallback for image loading errors */}
                <img
                    src={imagen}
                    alt={nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/400x200/E9D5FF/7E3AF2?text=No+Image"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
            </div>

            {/* Contenido */}
            <div className="p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-2">{nombre}</h2>
                {/* Pass descripcion safely to truncateText */}
                <p className="text-gray-700 text-sm mb-4">{truncateText(descripcion, 120)}</p>
                <div className="text-gray-500 text-xs">
                    <p><span className="font-semibold">Fundada:</span> {fechaCreacion}</p>
                </div>
            </div>

            {/* Botones de edición y eliminación */}
            {user?.rol === 'writer' && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button
                        onClick={() => openModal(currentEntity, 'edit')}
                        title="Editar"
                        className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
                    >
                        <PencilSquareIcon className="w-5 h-5 text-blue-600" />
                    </button>
                    <button
                        onClick={() => openModal(currentEntity, 'delete')}
                        title="Eliminar"
                        className="p-2 bg-red-100 rounded-full hover:bg-red-200"
                    >
                        <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                </div>
            )}

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={closeModal}>
                {mode === 'delete' && item && (
                    <div>
                        <h2 className="text-lg font-bold mb-4">¿Eliminar entidad "{item.nombre}"?</h2>
                        <div className="flex justify-end gap-4">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    deleteEntity(item.id);
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
                    <EntityEditForm entityToEdit={item} onClose={closeModal} />
                )}
            </Modal>
        </div>
    );
}
