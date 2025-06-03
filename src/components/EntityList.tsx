import { useWiki } from "../context/WikiContext";
import { Entity } from "../types";
import EntityCard from "./EntityCard";
import { useEffect } from "react"; // Import useEffect

export default function EntityList() {
    const { data, dataType, setCurrentDataType } = useWiki();

    // Use useEffect to set the data type to 'entidades' when this component mounts
    useEffect(() => {
        // Only set if it's not already 'entidades' to avoid unnecessary re-renders/fetches
        if (dataType !== 'entidades') {
            setCurrentDataType('entidades');
        }
    }, [dataType, setCurrentDataType]); // Depend on dataType and setCurrentDataType

    // Filter data to ensure we only process 'Entity' types
    const entidades = (dataType === "entidades" ? data : []) as Entity[];

    return (
        <div className="grid grid-cols-1 gap-4 w-2/3 mx-auto py-5">
            {entidades.length > 0 ? (
                entidades.map((entity) => (
                    <EntityCard
                        key={entity.id}
                        id={entity.id}
                        nombre={entity.nombre}
                        fechaCreacion={entity.fechaCreacion}
                        imagen={entity.imagen}
                        descripcion={entity.descripcion}
                    />
                ))
            ) : (
                <p className="text-center text-gray-600 text-lg">No hay entidades disponibles.</p>
            )}
        </div>
    );
}
