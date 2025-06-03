// src/services/languageService.ts

import { getAuthHeaders } from './api'; // Import the helper to get authentication headers
import type { Language } from '../types'; // Import the Language type

const BASE_URL = 'http://localhost:8080/languages'; // Ensure this matches your backend API endpoint for languages

/**
 * Fetches all languages from the API.
 * @returns A promise that resolves to an array of Language objects.
 * @throws An error if the API request fails.
 */
export const getLanguages = async (): Promise<Language[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Error desconocido al obtener lenguajes' }));
        throw new Error(errorData.message || 'Error al obtener lenguajes');
    }
    return res.json();
};

/**
 * Fetches a single language by its ID from the API.
 * @param id The ID of the language to fetch.
 * @returns A promise that resolves to a Language object.
 * @throws An error if the language is not found or the API request fails.
 */
export const getLanguageById = async (id: string): Promise<Language> => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Lenguaje no encontrado' }));
        throw new Error(errorData.message || 'Lenguaje no encontrado');
    }
    return res.json();
};

/**
 * Creates a new language via the API.
 * This function requires authentication, so it uses getAuthHeaders().
 * @param language The language object to create.
 * @returns A promise that resolves to the created Language object.
 * @throws An error if the API request fails (e.g., 403 Forbidden).
 */
export const createLanguage = async (language: Omit<Language, 'id'>): Promise<Language> => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: getAuthHeaders(), // IMPORTANT: Attach the Authorization header here
        body: JSON.stringify(language),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Error desconocido al crear lenguaje' }));
        // Log the full response for debugging 403 errors
        console.error('Error response from backend:', errorData);
        throw new Error(errorData.message || 'Error al crear lenguaje');
    }
    return res.json();
};

/**
 * Updates an existing language by its ID via the API.
 * This function requires authentication, so it uses getAuthHeaders().
 * @param id The ID of the language to update.
 * @param updatedData Partial data of the language to update.
 * @returns A promise that resolves to the updated Language object.
 * @throws An error if the API request fails.
 */
export const updateLanguageById = async (id: string, updatedData: Partial<Language>): Promise<Language> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(), // Attach the Authorization header here
        body: JSON.stringify(updatedData),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Error desconocido al actualizar lenguaje' }));
        throw new Error(errorData.message || 'Error al actualizar lenguaje');
    }
    return res.json();
};

/**
 * Deletes a language by its ID via the API.
 * This function requires authentication, so it uses getAuthHeaders().
 * @param id The ID of the language to delete.
 * @throws An error if the API request fails.
 */
export const deleteLanguageById = async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(), // Attach the Authorization header here
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Error desconocido al eliminar lenguaje' }));
        throw new Error(errorData.message || 'Error al eliminar lenguaje');
    }
};
