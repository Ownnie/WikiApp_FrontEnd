//Tipado de Funciones del Lenguaje
export type LanguageFunction = {
    Funcion: string;
    Descripcion: string;
}

//Tipado de Secciones del Lneguaje
export type LanguageSection = {
    titulo: string;
    parrafo?: string;
    datos: string | LanguageFunction[];
}

//Estructura del Lenguaje
export type Language = {
    id: string;
    nombre: string;
    anyoCreacion: number;
    creador: string;
    paradigma: string;
    ultimaVersion: string;
    extensiones: string[];
    img1: string;
    img2: string;
    secciones: LanguageSection[];
    documentacion: string;
}

export type newLanguage = {
    nombre: string;
    anyoCreacion: number;
    creador: string;
    paradigma: string;
    ultimaVersion: string;
    extensiones: string[];
    img1: string;
    img2: string;
    secciones: LanguageSection[];
    documentacion: string;
}

// Tipado para el usuario
export type User = {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol: string;
}

// Tipado del contexto de autenticación
export type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (nombre: string, apellido: string, email: string, password: string, rol: 'writer' | 'reader') => Promise<boolean>;
}

export type Entity = {
    id: string;
    nombre: string;
    fechaCreacion: string;
    wiki: string;
    imagen: string;
    descripcion: string;
};
