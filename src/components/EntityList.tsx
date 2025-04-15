import { useWiki } from "../context/WikiContext";
import { Entity } from "../types";
import EntityCard from "./EntityCard";

export default function EntityList() {
    const { data, dataType } = useWiki();
    const entidades = (dataType === "entidades" ? data : []) as Entity[];

    return (
        <div className="grid grid-cols-1 gap-4 w-2/3 mx-auto py-5">
            {entidades.map((entity) => (
                <EntityCard
                    key={entity.id}
                    nombre={entity.nombre}
                    fechaCreacion={entity.fechaCreacion}
                    imagen={entity.imagen}
                    descripcion={entity.descripcion}
                />
            ))}
        </div>
    );
}
