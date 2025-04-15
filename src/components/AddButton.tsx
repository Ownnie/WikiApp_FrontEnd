import { PlusIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { useWiki } from '../context/WikiContext';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import { useState } from 'react';
import type { Language, User, Entity } from '../types';

export default function AddButton() {
    const { user } = useAuth();
    const { dataType, addLanguage, addUser, addEntity } = useWiki();
    const { isOpen, openModal, closeModal } = useModal<void>();

    const [formData, setFormData] = useState<any>({});

    // Manejar cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    // Manejar el envío del formulario
    const handleSubmit = () => {
        if (dataType === 'lenguajes') {
            const newLanguage: Language = {
                Nombre: formData.Nombre,
                DatosImportantes: {
                    AñoCreacion: Number(formData.AñoCreacion),
                    Creador: formData.Creador,
                    Paradigma: formData.Paradigma,
                    UltimaVersion: formData.UltimaVersion,
                    Extensiones: formData.Extensiones.split(',').map((ext: string) => ext.trim()),
                },
                img1: formData.img1,
                img2: formData.img2,
                Secciones: [],
                Documentacion: formData.Documentacion,
            };
            addLanguage(newLanguage);
        } else if (dataType === 'usuarios') {
            const newUser: User = {
                id: crypto.randomUUID(),
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                password: formData.password,
                rol: formData.rol,
            };
            addUser(newUser);
        } else if (dataType === 'entidades') {
            const newEntity: Entity = {
                id: crypto.randomUUID(),
                nombre: formData.nombre,
                fechaCreacion: formData.fechaCreacion,
                wiki: formData.wiki,
                imagen: formData.imagen,
                descripcion: formData.descripcion,
            };
            addEntity(newEntity);
        }
        closeModal();
    };

    if (user?.rol !== 'writer') return null;

    return (
        <>
            <button
                onClick={() => openModal(undefined, 'edit')}
                className="fixed bottom-8 right-8 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition"
                title="Agregar nuevo elemento"
            >
                <PlusIcon className="w-6 h-6" />
            </button>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="max-h-[80vh] overflow-y-auto scroll-m- space-y-6">
                    <h2 className="text-2xl font-bold text-purple-800 mb-4">Agregar {dataType}</h2>
                    <form className="space-y-4">
                        {dataType === 'lenguajes' && (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                                    <input
                                        name="Nombre"
                                        placeholder="Nombre del Lenguaje"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Año de Creación</label>
                                    <input
                                        name="AñoCreacion"
                                        type="number"
                                        placeholder="Año de Creación"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Creador</label>
                                    <input
                                        name="Creador"
                                        placeholder="Creador del Lenguaje"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Paradigma</label>
                                    <input
                                        name="Paradigma"
                                        placeholder="Paradigma del Lenguaje"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Última Versión</label>
                                    <input
                                        name="UltimaVersion"
                                        placeholder="Última Versión"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Extensiones</label>
                                    <input
                                        name="Extensiones"
                                        placeholder="Extensiones (separadas por comas)"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">URL de la Imagen 1</label>
                                    <input
                                        name="img1"
                                        placeholder="URL de la Imagen 1"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">URL de la Imagen 2</label>
                                    <input
                                        name="img2"
                                        placeholder="URL de la Imagen 2"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Documentación</label>
                                    <input
                                        name="Documentacion"
                                        placeholder="URL de la Documentación"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </>
                        )}
                        {dataType === 'usuarios' && (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                                    <input
                                        name="nombre"
                                        placeholder="Nombre"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido</label>
                                    <input
                                        name="apellido"
                                        placeholder="Apellido"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Correo Electrónico"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Contraseña"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Rol</label>
                                    <select
                                        name="rol"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="reader">Reader</option>
                                        <option value="writer">Writer</option>
                                    </select>
                                </div>
                            </>
                        )}
                        {dataType === 'entidades' && (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                                    <input
                                        name="nombre"
                                        placeholder="Nombre"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Creación</label>
                                    <input
                                        name="fechaCreacion"
                                        type="date"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Wiki</label>
                                    <input
                                        name="wiki"
                                        placeholder="URL de la Wiki"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Imagen</label>
                                    <input
                                        name="imagen"
                                        placeholder="URL de la Imagen"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        name="descripcion"
                                        placeholder="Descripción"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        rows={4}
                                    />
                                </div>
                            </>
                        )}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}