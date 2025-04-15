import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import usersData from '../data/users.json';  // Los datos predeterminados desde JSON
import entitiesData from '../data/entities.json';  // Los datos predeterminados desde JSON
import articlesData from '../data/articles.json'; // Datos predeterminados de lenguajes
import type { Language, User, Entity } from '../types/index';  // Tipos de datos

export type DataType = 'lenguajes' | 'usuarios' | 'entidades';

interface WikiContextType {
    dataType: DataType;
    data: Language[] | User[] | Entity[];
    setCurrentDataType: (type: DataType) => void;

    // Funciones específicas de lenguajes
    languages: Language[];
    getAllLanguages: () => Language[];
    getLanguageByName: (name: string) => Language | undefined;
    addLanguage: (newLanguage: Language) => void;
    updateLanguage: (name: string, updatedData: Partial<Language>) => void;
    deleteLanguage: (name: string) => void;

    // Funciones específicas de usuarios
    users: User[];
    getAllUsers: () => User[];
    getUserByEmail: (email: string) => User | undefined;
    addUser: (newUser: User) => void;
    updateUser: (id: string, updatedData: Partial<User>) => void;
    deleteUser: (email: string) => void;

    // Funciones específicas de entidades
    entities: Entity[];
    getAllEntities: () => Entity[];
    getEntityByName: (name: string) => Entity | undefined;
    addEntity: (newEntity: Entity) => void;
    updateEntity: (id: string, updatedData: Partial<Entity>) => void;
    deleteEntity: (name: string) => void;
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
    const [dataType, setDataType] = useState<DataType>('lenguajes');
    const [data, setData] = useState<Language[] | User[] | Entity[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [users, setUsers] = useState<User[]>(usersData.Usuarios);
    const [entities, setEntities] = useState<Entity[]>(entitiesData.Entidades);

    useEffect(() => {
        setCurrentDataType('lenguajes');
    }, []);

    // Funciones de lenguajes
    const getAllLanguages = (): Language[] => languages;
    const getLanguageByName = (name: string): Language | undefined => {
        return languages.find((lang) => lang.Nombre.toLowerCase() === name.toLowerCase());
    };
    const addLanguage = (newLanguage: Language): void => {
        const updated = [...languages, newLanguage];
        setLanguages(updated);
        if (dataType === 'lenguajes') setData(updated);
    };
    const updateLanguage = (name: string, updatedData: Partial<Language>): void => {
        const updatedLanguages = languages.map((lang) =>
            lang.Nombre.toLowerCase() === name.toLowerCase() ? { ...lang, ...updatedData } : lang
        );
        setLanguages(updatedLanguages);
        if (dataType === 'lenguajes') setData(updatedLanguages);
    };
    const deleteLanguage = (name: string): void => {
        const updatedLanguages = languages.filter((lang) => lang.Nombre.toLowerCase() !== name.toLowerCase());
        setLanguages(updatedLanguages);
        if (dataType === 'lenguajes') setData(updatedLanguages);
    };

    // Funciones de usuarios
    const getAllUsers = (): User[] => users;
    const getUserByEmail = (email: string): User | undefined =>
        users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const addUser = (newUser: User): void => {
        const updated = [...users, newUser];
        setUsers(updated);
        if (dataType === 'usuarios') setData(updated);
    };
    const updateUser = (id: string, updatedData: Partial<User>): void => {
        const updated = users.map((u) => (u.id === id ? { ...u, ...updatedData } : u));
        setUsers(updated);
        if (dataType === 'usuarios') setData(updated);
    };
    const deleteUser = (email: string): void => {
        const updated = users.filter((u) => u.email !== email);
        setUsers(updated);
        if (dataType === 'usuarios') setData(updated);
    };

    // Funciones de entidades
    const getAllEntities = (): Entity[] => entities;
    const getEntityByName = (name: string): Entity | undefined =>
        entities.find((e) => e.nombre.toLowerCase() === name.toLowerCase());
    const addEntity = (newEntity: Entity): void => {
        const updated = [...entities, newEntity];
        setEntities(updated);
        if (dataType === 'entidades') setData(updated);
    };
    const updateEntity = (id: string, updatedData: Partial<Entity>): void => {
        const updated = entities.map((e) => (e.id === id ? { ...e, ...updatedData } : e));
        setEntities(updated);
        if (dataType === 'entidades') setData(updated);
    };
    const deleteEntity = (name: string): void => {
        const updated = entities.filter((e) => e.nombre !== name);
        setEntities(updated);
        if (dataType === 'entidades') setData(updated);
    };

    const setCurrentDataType = (type: DataType) => {
        setDataType(type);
        switch (type) {
            case 'lenguajes':
                setLanguages(articlesData.Lenguajes);
                setData(articlesData.Lenguajes);
                break;
            case 'usuarios':
                setData(users);
                break;
            case 'entidades':
                setData(entities);
                break;
        }
    };

    return (
        <WikiContext.Provider
            value={{
                dataType,
                data,
                setCurrentDataType,
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
