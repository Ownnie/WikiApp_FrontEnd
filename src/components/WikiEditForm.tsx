import { useState } from 'react';
import { useWiki } from '../context/WikiContext';
import type { Language } from '../types';

type EditFormProps = {
    language: Language;
    onClose: () => void;
};

export default function EditForm({ language, onClose }: EditFormProps) {
    const { updateLanguage } = useWiki();

    const [formData, setFormData] = useState({
        Nombre: language.Nombre,
        AñoCreacion: language.DatosImportantes.AñoCreacion,
        Creador: language.DatosImportantes.Creador,
        UltimaVersion: language.DatosImportantes.UltimaVersion,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        updateLanguage(language.Nombre, {
            ...language,
            Nombre: formData.Nombre,
            DatosImportantes: {
                ...language.DatosImportantes,
                AñoCreacion: Number(formData.AñoCreacion),
                Creador: formData.Creador,
                UltimaVersion: formData.UltimaVersion,
            }
        });
        onClose();
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-bold mb-1">Nombre</label>
                <input
                    name="Nombre"
                    value={formData.Nombre}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-bold mb-1">Año de Creación</label>
                <input
                    name="AñoCreacion"
                    type="number"
                    value={formData.AñoCreacion}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-bold mb-1">Creador</label>
                <input
                    name="Creador"
                    value={formData.Creador}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-bold mb-1">Última Versión</label>
                <input
                    name="UltimaVersion"
                    value={formData.UltimaVersion}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div className="flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Guardar</button>
            </div>
        </div>
    );
}
