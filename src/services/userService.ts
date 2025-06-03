import { getAuthHeaders } from './api';

const BASE_URL = 'http://localhost:8080/users';

export const getUsers = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener usuarios');
    return res.json();
};

export const getUserById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Usuario no encontrado');
    return res.json();
};

export const createUser = async (user: any) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Error al crear usuario');
    return res.json();
};

export const updateUserById = async (id: string, updated: any) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error('Error al actualizar usuario');
    return res.json();
};

export const deleteUserById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al eliminar usuario');
};
