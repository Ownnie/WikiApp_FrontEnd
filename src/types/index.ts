//Tipado de Funciones del Lenguaje
export type LanguageFunction = {
    Funcion: string;
    Descripcion: string;
}

//Tipado de Secciones del Lneguaje
export type LanguageSection = {
    Titulo: string;
    Parrafo?: string;
    Datos: string | LanguageFunction[];
}

//Estructura del Lenguaje
export type Language = {
    Nombre: string;
    DatosImportantes: {
        AñoCreacion: number;
        Creador: string;
        Paradigma: string;
        UltimaVersion: string;
        Extensiones: string[];
    };
    img1: string;
    img2: string;
    Secciones: LanguageSection[];
    Documentacion: string;
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
    login: (email: string, password: string) => boolean;
    logout: () => void;
    register: (nombre: string, apellido: string, email: string, password: string, rol: 'writer' | 'reader') => boolean;
}

export type Entity = {
    id: string;
    nombre: string;
    fechaCreacion: string;
    wiki: string;
    imagen: string;
    descripcion: string;
};
