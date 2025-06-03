import { getAuthHeaders } from './api';

const BASE_URL = 'http://localhost:8080/entities';

export const getEntities = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener entidades');
    return res.json();
};

export const getEntityById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Entidad no encontrada');
    return res.json();
};

export const createEntity = async (entity: any) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(entity),
    });
    if (!res.ok) throw new Error('Error al crear entidad');
    return res.json();
};

export const updateEntityById = async (id: string, updated: any) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error('Error al actualizar entidad');
    return res.json();
};

export const deleteEntityById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al eliminar entidad');
};
