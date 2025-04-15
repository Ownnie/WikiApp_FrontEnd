import { useState } from 'react';
import { useWiki } from '../context/WikiContext';
import type { Entity } from '../types';

type EntityEditFormProps = {
    entityToEdit: Entity;
    onClose: () => void;
};

export default function EntityEditForm({ entityToEdit, onClose }: EntityEditFormProps) {
    const { updateEntity } = useWiki();

    const [formData, setFormData] = useState({
        nombre: entityToEdit.nombre,
        fechaCreacion: entityToEdit.fechaCreacion,
        descripcion: entityToEdit.descripcion,
        imagen: entityToEdit.imagen,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        updateEntity(entityToEdit.id, formData);
        onClose();
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-semibold">Nombre</label>
                <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold">Fecha de Fundación</label>
                <input
                    name="fechaCreacion"
                    value={formData.fechaCreacion}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold">Imagen</label>
                <input
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold">Descripción</label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    rows={4}
                />
            </div>

            <div className="flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Guardar</button>
            </div>
        </div>
    );
}
