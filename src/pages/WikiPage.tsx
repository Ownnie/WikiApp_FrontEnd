import { useParams } from "react-router-dom";
import { useWiki } from "../context/WikiContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function WikiPage() {
    const { Nombre } = useParams<{ Nombre: string }>();
    const { getLanguageByName, updateLanguage } = useWiki();
    const { user } = useAuth();
    const language = getLanguageByName(Nombre || "");

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedText, setEditedText] = useState<string>("");
    const [newSection, setNewSection] = useState({ Titulo: "", Datos: "" });

    if (!language) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 text-purple-800">
                <h1 className="text-4xl font-bold mb-4">Lenguaje no encontrado</h1>
                <p className="text-lg text-gray-700">El lenguaje que buscas no existe o no está disponible.</p>
            </div>
        );
    }

    const handleEdit = (index: number, currentText: string) => {
        setEditingIndex(index);
        setEditedText(currentText);
    };

    const handleSave = (index: number) => {
        if (!editedText.trim()) return; // Validación para evitar guardar texto vacío
        const updatedSections = [...language.Secciones];
        updatedSections[index].Datos = editedText;
        updateLanguage(language.Nombre, { Secciones: updatedSections });
        setEditingIndex(null);
    };

    const handleAddSection = () => {
        if (!newSection.Titulo.trim() || !newSection.Datos.trim()) return; // Validación simple
        const updatedSections = [...language.Secciones, { ...newSection }];
        updateLanguage(language.Nombre, { Secciones: updatedSections });
        setNewSection({ Titulo: "", Datos: "" }); // Limpiar el formulario
    };

    return (
        <div className="flex flex-col items-center bg-purple-100 text-purple-800 min-h-screen py-10">
            <h1 className="text-5xl font-bold mb-6">{language.Nombre}</h1>
            <div className="w-4/5 bg-white shadow-lg rounded-lg p-6">
                {/* Información importante */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Datos Importantes</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li><strong>Año de Creación:</strong> {language.DatosImportantes.AñoCreacion}</li>
                        <li><strong>Creador:</strong> {language.DatosImportantes.Creador}</li>
                        <li><strong>Paradigma:</strong> {language.DatosImportantes.Paradigma}</li>
                        <li><strong>Última Versión:</strong> {language.DatosImportantes.UltimaVersion}</li>
                        <li><strong>Extensiones:</strong> {language.DatosImportantes.Extensiones.join(", ")}</li>
                    </ul>
                </div>

                {/* Imágenes */}
                <div className="flex gap-4 mb-6">
                    <img src={language.img1} alt={`${language.Nombre} Imagen 1`} className="w-1/2 rounded-lg shadow-md" />
                    <img src={language.img2} alt={`${language.Nombre} Imagen 2`} className="w-1/2 rounded-lg shadow-md" />
                </div>

                {/* Secciones */}
                <div className="mb-6">
                    {language.Secciones.map((section, index) => (
                        <div key={index} className="mb-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold mb-2">{section.Titulo}</h3>
                                {user?.rol === "writer" && (
                                    <button
                                        onClick={() => handleEdit(index, typeof section.Datos === "string" ? section.Datos : "")}
                                        className="flex items-center gap-1 text-blue-600 hover:underline"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                        Editar
                                    </button>
                                )}
                            </div>
                            {editingIndex === index ? (
                                <div>
                                    <textarea
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className="w-full border p-2 rounded mb-2"
                                    />
                                    <button
                                        onClick={() => handleSave(index)}
                                        className="px-4 py-2 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 transition"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            ) : typeof section.Datos === "string" ? (
                                <p className="text-gray-700">{section.Datos}</p>
                            ) : (
                                <ul className="list-disc list-inside text-gray-700">
                                    {section.Datos.map((func, idx) => (
                                        <li key={idx}>
                                            <strong>{func.Funcion}:</strong> {func.Descripcion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                    {/* Botón para agregar una nueva sección */}
                    {user?.rol === "writer" && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-4">Agregar Nueva Sección</h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Título de la sección"
                                    value={newSection.Titulo}
                                    onChange={(e) => setNewSection({ ...newSection, Titulo: e.target.value })}
                                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <textarea
                                    placeholder="Descripción de la sección"
                                    value={newSection.Datos}
                                    onChange={(e) => setNewSection({ ...newSection, Datos: e.target.value })}
                                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    rows={4}
                                />
                                <button
                                    onClick={handleAddSection}
                                    className="px-4 py-2 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition"
                                >
                                    Agregar Sección
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Documentación */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Documentación</h2>
                    <a
                        href={language.Documentacion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        {language.Documentacion}
                    </a>
                </div>
            </div>
        </div>
    );
}