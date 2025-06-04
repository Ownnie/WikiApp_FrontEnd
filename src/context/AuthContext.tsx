import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

const API_URL = 'http://localhost:8080/login';


const decodeJwtPayload = (token: string): any => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error decoding JWT payload:", e);
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Al iniciar, revisar si hay token y usuario en localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        let storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            if (storedUser === "undefined" || storedUser === "null") {
                console.warn("Invalid user data in localStorage, clearing it.");
                localStorage.removeItem('user');
                storedUser = null;
            }

            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } catch (error) {
                    console.error('Error al parsear user del localStorage:', error);
                    localStorage.removeItem('user');
                }
            }
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Credenciales inválidas' }));
                throw new Error(errorData.message || 'Credenciales inválidas');
            }

            const data = await res.json();

            if (data.token) {
                const decodedPayload = decodeJwtPayload(data.token);

                if (decodedPayload) {
                    const userFromToken: User = {
                        id: decodedPayload.id,
                        email: decodedPayload.email,
                        rol: decodedPayload.rol,
                        nombre: decodedPayload.nombre || '',
                        apellido: decodedPayload.apellido || '',
                        password: '',
                    };

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(userFromToken));
                    setUser(userFromToken);
                    return true;
                } else {
                    console.error('Login successful but failed to decode JWT payload.', data);
                    throw new Error('Error al procesar el token de autenticación.');
                }
            } else {
                console.error('Login successful but token is missing from API response.', data);
                throw new Error('Token de autenticación incompleto en la respuesta.');
            }

        } catch (err: any) {
            console.error('Error al iniciar sesión:', err.message);
            console.log('Mostrar mensaje al usuario: Credenciales incorrectas');
            return false;
        }
    };

    // 🚪 Cerrar sesión
    const logout = (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    // 🧾 Registro
    const register = async (
        nombre: string,
        apellido: string,
        email: string,
        password: string,
        rol: 'writer' | 'reader'
    ): Promise<boolean> => {
        try {
            const res = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, apellido, email, password, rol }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Error al registrar usuario' }));
                throw new Error(errorData.message || 'Error al registrar usuario');
            }
            return true;
        } catch (err: any) {
            console.error('Error al registrar usuario:', err.message);
            console.log('Mostrar mensaje al usuario: Error al registrar usuario');
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
