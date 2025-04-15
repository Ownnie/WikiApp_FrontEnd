import { useState } from 'react';
import { useWiki } from '../context/WikiContext';
import type { User } from '../types';

type UserEditFormProps = {
    userToEdit: User;
    onClose: () => void;
};

export default function UserEditForm({ userToEdit, onClose }: UserEditFormProps) {
    const { updateUser } = useWiki();

    const [formData, setFormData] = useState({
        nombre: userToEdit.nombre,
        apellido: userToEdit.apellido,
        email: userToEdit.email,
        rol: userToEdit.rol,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        updateUser(userToEdit.id, formData);
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
                <label className="block text-sm font-semibold">Apellido</label>
                <input
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold">Correo</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold">Rol</label>
                <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="reader">Reader</option>
                    <option value="writer">Writer</option>
                </select>
            </div>

            <div className="flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
        </div>
    );
}
