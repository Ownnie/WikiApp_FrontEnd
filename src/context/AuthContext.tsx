import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import usersData from '../data/users.json';
import type { User } from '../types/index';
import type { AuthContextType } from '../types/index';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    // 🚀 Cargar usuarios desde localStorage o JSON
    useEffect(() => {
        const storedUsers = localStorage.getItem('usuarios');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            setUsers(usersData.Usuarios);
            localStorage.setItem('usuarios', JSON.stringify(usersData.Usuarios));
        }
    }, []);

    // 🔐 Función para encriptar contraseñas
    const encryptPassword = (password: string): string => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    };

    // 🔓 Función para iniciar sesión
    const login = (email: string, password: string): boolean => {
        const foundUser = users.find((u) => u.email === email);

        if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
            setUser(foundUser);
            return true;
        }

        alert('Credenciales incorrectas');
        return false;
    };

    // 🚪 Función para cerrar sesión
    const logout = (): void => {
        setUser(null);
    };

    // 🧾 Función para registrar un nuevo usuario y guardarlo en localStorage
    const register = (
        nombre: string,
        apellido: string,
        email: string,
        password: string,
        rol: 'writer' | 'reader'
    ): boolean => {
        const hashedPassword = encryptPassword(password);
        const newUser: User = {
            id: uuidv4(),
            nombre,
            apellido,
            email,
            password: hashedPassword,
            rol
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('usuarios', JSON.stringify(updatedUsers)); // ⏺ persistencia

        return true;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
