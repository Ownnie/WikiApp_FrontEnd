import { getAuthHeaders } from './api';

const BASE_URL = 'http://localhost:8080/ultimaEdicion';

export const getUltimaEdicion = async (tabla: string, idEditado: number) => {
    const res = await fetch(`${BASE_URL}?tabla=${encodeURIComponent(tabla)}&idEditado=${idEditado}`);
    if (!res.ok) throw new Error('No se encontró la última edición');
    return res.json();
};

export const registrarUltimaEdicion = async (data: { idUsuario: number; idEditado: number; tabla: string }) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al registrar la última edición');
    return res.json();
};