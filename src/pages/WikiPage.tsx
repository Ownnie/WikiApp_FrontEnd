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
    const [newSection, setNewSection] = useState({ titulo: "", datos: "" });

    if (!language) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 text-purple-800">
                <h1 className="text-4xl font-bold mb-4">Lenguaje no encontrado</h1>
                <p className="text-lg text-gray-700">El lenguaje que buscas no existe o no está disponible.</p>
            </div>
        );
    }

    const handleEdit = (index: number, currentText: string) => {
        if (typeof currentText === "string") {
            setEditingIndex(index);
            setEditedText(currentText);
        } else {
            console.log("Structured data (e.g., functions list) cannot be edited directly here.");
        }
    };

    const handleSave = (index: number) => {
        if (!editedText.trim()) {
            console.warn("Cannot save empty text.");
            return;
        }

        const updatedSections = [...language.secciones];
        updatedSections[index].datos = editedText;
        updateLanguage(language.id, { secciones: updatedSections });
        setEditingIndex(null);
    };

    const handleAddSection = () => {
        if (!newSection.titulo.trim() || !newSection.datos.trim()) {
            console.warn("Title and data for new section cannot be empty.");
            return;
        }

        const updatedSections = [...language.secciones, { ...newSection }];
        updateLanguage(language.id, { secciones: updatedSections });
        setNewSection({ titulo: "", datos: "" });
    };

    return (
        <div className="flex flex-col items-center bg-purple-100 text-purple-800 min-h-screen py-10">
            <h1 className="text-5xl font-bold mb-6">{language.nombre}</h1>
            <div className="w-4/5 bg-white shadow-lg rounded-lg p-6">
                {/* Important Information Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Datos Importantes</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li><strong>Año de Creación:</strong> {language.anyoCreacion}</li>
                        <li><strong>Creador:</strong> {language.creador}</li>
                        <li><strong>Paradigma:</strong> {language.paradigma}</li>
                        <li><strong>Última Versión:</strong> {language.ultimaVersion}</li>
                        <li>
                            <strong>Extensiones:</strong>{" "}
                            {Array.isArray(language.extensiones)
                                ? language.extensiones.join(", ")
                                : "No especificadas"}
                        </li>
                    </ul>
                </div>

                {/* Images Section */}
                <div className="flex gap-4 mb-6">
                    {/* Placeholder images for demonstration. Replace with actual image URLs if available. */}
                    <img
                        src={language.img1 || "https://placehold.co/400x200/E9D5FF/7E3AF2?text=Imagen+1"}
                        alt={`${language.nombre} Imagen 1`}
                        className="w-1/2 rounded-lg shadow-md object-cover"
                        onError={(e) => { e.currentTarget.src = "https://placehold.co/400x200/E9D5FF/7E3AF2?text=Error+Loading+Image"; }}
                    />
                    <img
                        src={language.img2 || "https://placehold.co/400x200/E9D5FF/7E3AF2?text=Imagen+2"}
                        alt={`${language.nombre} Imagen 2`}
                        className="w-1/2 rounded-lg shadow-md object-cover"
                        onError={(e) => { e.currentTarget.src = "https://placehold.co/400x200/E9D5FF/7E3AF2?text=Error+Loading+Image"; }}
                    />
                </div>

                {/* Sections Display */}
                <div className="mb-6">
                    {language.secciones.map((section, index) => (
                        <div key={index} className="mb-6 border-b pb-4 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-semibold">{section.titulo}</h3>
                                {user?.rol === "writer" && (
                                    <button
                                        onClick={() => handleEdit(index, typeof section.datos === "string" ? section.datos : "")}
                                        className={`flex items-center gap-1 transition-colors ${typeof section.datos === "string"
                                                ? "text-blue-600 hover:text-blue-800 hover:underline"
                                                : "text-gray-400 cursor-not-allowed"
                                            }`}
                                        disabled={typeof section.datos !== "string"}
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
                                        className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        rows={6}
                                    />
                                    <button
                                        onClick={() => handleSave(index)}
                                        className="px-4 py-2 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 transition"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {console.log(`Section ${index} datos type: ${typeof section.datos}, content:`, section.datos)}
                                    {Array.isArray(section.datos) ? (
                                        <table className="w-full text-left border border-purple-300 shadow-sm rounded overflow-hidden">
                                            <thead className="bg-purple-200">
                                                <tr>
                                                    <th className="p-2 border-b border-purple-300">Función</th>
                                                    <th className="p-2 border-b border-purple-300">Descripción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {section.datos.map((func: any, idx: number) => (
                                                    <tr key={idx} className="even:bg-purple-50">
                                                        <td className="p-2 border-b border-purple-200">{func.Funcion}</td>
                                                        <td className="p-2 border-b border-purple-200">{func.Descripcion}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-gray-700 whitespace-pre-wrap">{section.datos || "Sin información."}</p>
                                    )}
                                </>
                            )}
                        </div>
                    ))}

                    {user?.rol === "writer" && (
                        <div className="mt-6 p-4 border rounded-lg bg-purple-50 shadow-inner">
                            <h3 className="text-xl font-semibold mb-4 text-purple-700">Agregar Nueva Sección</h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Título de la sección"
                                    value={newSection.titulo}
                                    onChange={(e) => setNewSection({ ...newSection, titulo: e.target.value })}
                                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <textarea
                                    placeholder="Descripción de la sección (para funciones, use formato JSON: [{'Funcion': '...', 'Descripcion': '...'}])"
                                    value={newSection.datos}
                                    onChange={(e) => setNewSection({ ...newSection, datos: e.target.value })}
                                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    rows={6}
                                />
                                <button
                                    onClick={handleAddSection}
                                    className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition"
                                >
                                    Agregar Sección
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Documentation Link */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Documentación</h2>
                    <a
                        href={language.documentacion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                    >
                        {language.documentacion}
                    </a>
                </div>
            </div>
        </div>
    );
}
