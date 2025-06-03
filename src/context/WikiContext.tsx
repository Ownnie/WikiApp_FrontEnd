import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { Language, User, Entity } from '../types/index';
import { getLanguages, createLanguage, updateLanguageById, deleteLanguageById } from '../services/languageService';
import { getUsers, createUser, updateUserById, deleteUserById } from '../services/userService';
import { getEntities, createEntity, updateEntityById, deleteEntityById } from '../services/entityService';

export type DataType = 'lenguajes' | 'usuarios' | 'entidades';

interface WikiContextType {
    dataType: DataType;
    data: Language[] | User[] | Entity[];
    setCurrentDataType: (type: DataType) => void;
    loading: boolean; // Añadido estado de carga
    error: string | null; // Añadido estado de error

    // Lenguajes
    languages: Language[];
    getAllLanguages: () => Language[];
    getLanguageByName: (name: string) => Language | undefined;
    addLanguage: (newLanguage: Language) => Promise<void>;
    updateLanguage: (id: string, updatedData: Partial<Language>) => Promise<void>;
    deleteLanguage: (id: string) => Promise<void>;

    // Usuarios
    users: User[];
    getAllUsers: () => User[];
    getUserByEmail: (email: string) => User | undefined;
    addUser: (newUser: User) => Promise<void>;
    updateUser: (id: string, updatedData: Partial<User>) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;

    // Entidades
    entities: Entity[];
    getAllEntities: () => Entity[];
    getEntityByName: (name: string) => Entity | undefined;
    addEntity: (newEntity: Entity) => Promise<void>;
    updateEntity: (id: string, updatedData: Partial<Entity>) => Promise<void>;
    deleteEntity: (id: string) => Promise<void>;
}

const WikiContext = createContext<WikiContextType | undefined>(undefined);

export const useWiki = (): WikiContextType => {
    const context = useContext(WikiContext);
    if (!context) {
        throw new Error('useWiki debe usarse dentro de un WikiProvider');
    }
    return context;
};

export const WikiProvider = ({ children }: { children: ReactNode }) => {
    const [dataType, setDataType] = useState<DataType>('lenguajes'); // Default to 'lenguajes'
    const [data, setData] = useState<Language[] | User[] | Entity[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [entities, setEntities] = useState<Entity[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Inicializar estado de carga
    const [error, setError] = useState<string | null>(null); // Inicializar estado de error

    // Funciones de fetch para cada tipo de dato
    const fetchLanguages = async () => {
        setLoading(true);
        setError(null);
        try {
            const langs = await getLanguages();
            setLanguages(langs);
            setData(langs);
        } catch (err: any) {
            console.error(`Error cargando datos para lenguajes:`, err);
            setError(err.message || "Error desconocido al cargar lenguajes.");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const usrs = await getUsers();
            setUsers(usrs);
            setData(usrs);
        } catch (err: any) {
            console.error(`Error cargando datos para usuarios:`, err);
            setError(err.message || "Error desconocido al cargar usuarios.");
        } finally {
            setLoading(false);
        }
    };

    const fetchEntities = async () => {
        setLoading(true);
        setError(null);
        try {
            const ents = await getEntities();
            setEntities(ents);
            setData(ents);
        } catch (err: any) {
            console.error(`Error cargando datos para entidades:`, err);
            // Mejorar el mensaje de error para SyntaxError
            if (err instanceof SyntaxError) {
                setError(`Error de formato de datos para entidades. El servidor devolvió una respuesta no válida (no es JSON). Esto a menudo indica un error en el backend (PHP). Mensaje detallado: ${err.message}`);
            } else {
                setError(err.message || "Error desconocido al cargar entidades.");
            }
        } finally {
            setLoading(false);
        }
    };


    // Este useEffect reaccionará a los cambios en dataType para cargar los datos correctos
    useEffect(() => {
        if (dataType === 'lenguajes') {
            fetchLanguages();
        } else if (dataType === 'usuarios') {
            fetchUsers();
        } else if (dataType === 'entidades') {
            fetchEntities();
        }
    }, [dataType]); // Vuelve a ejecutar este efecto cada vez que dataType cambie

    const setCurrentDataType = (type: DataType) => {
        setDataType(type);
    };

    // Lenguajes
    const getAllLanguages = (): Language[] => languages;
    const getLanguageByName = (name: string): Language | undefined => languages.find(lang => lang.nombre.toLowerCase() === name.toLowerCase());

    const addLanguage = async (newLanguage: Language): Promise<void> => {
        try {
            await createLanguage(newLanguage);
            await fetchLanguages(); // <--- Vuelve a obtener todos los lenguajes
        } catch (error) {
            console.error('Error al añadir lenguaje:', error);
            setError('Error al añadir lenguaje.');
        }
    };
    const updateLanguage = async (id: string, updatedData: Partial<Language>): Promise<void> => {
        try {
            await updateLanguageById(id, updatedData);
            await fetchLanguages(); // <--- Vuelve a obtener todos los lenguajes
        } catch (error) {
            console.error('Error al actualizar lenguaje:', error);
            setError('Error al actualizar lenguaje.');
        }
    };
    const deleteLanguage = async (id: string): Promise<void> => {
        try {
            await deleteLanguageById(id);
            await fetchLanguages(); // <--- Vuelve a obtener todos los lenguajes
        } catch (error) {
            console.error('Error al eliminar lenguaje:', error);
            setError('Error al eliminar lenguaje.');
        }
    };

    // Usuarios
    const getAllUsers = (): User[] => users;
    const getUserByEmail = (email: string): User | undefined => {
        if (!email) {
            console.warn("Attempted to get user by an undefined or null email.");
            return undefined;
        }
        return users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
    };
    const addUser = async (newUser: User): Promise<void> => {
        try {
            await createUser(newUser);
            await fetchUsers(); // <--- Vuelve a obtener todos los usuarios
        } catch (error) {
            console.error('Error al añadir usuario:', error);
            setError('Error al añadir usuario.');
        }
    };
    const updateUser = async (id: string, updatedData: Partial<User>): Promise<void> => {
        try {
            await updateUserById(id, updatedData);
            await fetchUsers(); // <--- Vuelve a obtener todos los usuarios
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            setError('Error al actualizar usuario.');
        }
    };
    const deleteUser = async (id: string): Promise<void> => {
        try {
            await deleteUserById(id);
            await fetchUsers(); // <--- Vuelve a obtener todos los usuarios
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            setError('Error al eliminar usuario.');
        }
    };

    // Entidades
    const getAllEntities = (): Entity[] => entities;
    const getEntityByName = (name: string): Entity | undefined => entities.find(e => e.nombre.toLowerCase() === name.toLowerCase());

    const addEntity = async (newEntity: Entity): Promise<void> => {
        try {
            await createEntity(newEntity);
            await fetchEntities(); // <--- Vuelve a obtener todas las entidades
        } catch (error) {
            console.error('Error al añadir entidad:', error);
            setError('Error al añadir entidad.');
        }
    };
    const updateEntity = async (id: string, updatedData: Partial<Entity>): Promise<void> => {
        try {
            await updateEntityById(id, updatedData);
            await fetchEntities(); // <--- Vuelve a obtener todas las entidades
        } catch (error) {
            console.error('Error al actualizar entidad:', error);
            setError('Error al actualizar entidad.');
        }
    };
    const deleteEntity = async (id: string): Promise<void> => {
        try {
            await deleteEntityById(id);
            await fetchEntities(); // <--- Vuelve a obtener todas las entidades
        } catch (error) {
            console.error('Error al eliminar entidad:', error);
            setError('Error al eliminar entidad.');
        }
    };

    return (
        <WikiContext.Provider
            value={{
                dataType,
                data,
                setCurrentDataType,
                loading, // Exportar estado de carga
                error,   // Exportar estado de error
                languages,
                getAllLanguages,
                getLanguageByName,
                addLanguage,
                updateLanguage,
                deleteLanguage,
                users,
                getAllUsers,
                getUserByEmail,
                addUser,
                updateUser,
                deleteUser,
                entities,
                getAllEntities,
                getEntityByName,
                addEntity,
                updateEntity,
                deleteEntity,
            }}
        >
            {children}
        </WikiContext.Provider>
    );
};
