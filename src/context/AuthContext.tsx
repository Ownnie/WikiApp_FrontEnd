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

/**
 * Helper function to decode the payload of a JWT.
 * @param token The JWT string.
 * @returns The decoded payload object, or null if decoding fails.
 */
const decodeJwtPayload = (token: string): any => {
    try {
        // JWTs have three parts: header.payload.signature
        const base64Url = token.split('.')[1];
        // Replace URL-safe characters with standard base64 characters
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Decode base64 and then decode URI components for special characters
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
            // IMPORTANT: Check if storedUser is the string "undefined" or "null"
            // These are not valid JSON strings for JSON.parse()
            if (storedUser === "undefined" || storedUser === "null") {
                console.warn("Invalid user data in localStorage, clearing it.");
                localStorage.removeItem('user');
                storedUser = null; // Treat as if no user was stored
            }

            if (storedUser) { // Only attempt to parse if storedUser is not null after the check
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } catch (error) {
                    console.error('Error al parsear user del localStorage:', error);
                    // If parsing fails, remove the invalid item to prevent future errors
                    localStorage.removeItem('user');
                }
            }
        }
    }, []);

    // 🔓 Función para iniciar sesión
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

            const data = await res.json(); // This should contain { token: '...' }

            if (data.token) {
                const decodedPayload = decodeJwtPayload(data.token);

                if (decodedPayload) {
                    // Construct a User object from the decoded payload
                    // Note: 'nombre' and 'apellido' might be missing if not explicitly added to JWT payload by backend
                    const userFromToken: User = {
                        id: decodedPayload.id,
                        email: decodedPayload.email,
                        rol: decodedPayload.rol,
                        nombre: decodedPayload.nombre || '', // Provide default if not in payload
                        apellido: decodedPayload.apellido || '', // Provide default if not in payload
                        // Password should never be stored on the client or derived from token
                        password: '', // This field is typically not populated from JWT for security reasons
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
                // This case should ideally not happen if the backend always returns a token on success
                console.error('Login successful but token is missing from API response.', data);
                throw new Error('Token de autenticación incompleto en la respuesta.');
            }

        } catch (err: any) { // Cast err to any to access message property
            console.error('Error al iniciar sesión:', err.message);
            // Use a custom modal or toast instead of alert()
            // For now, let's just log it. In a real app, you'd show a user-friendly message.
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
            // Assuming successful registration doesn't return user data to log in immediately
            // If it does, you might want to call login(email, password) here or process data.
            return true;
        } catch (err: any) { // Cast err to any to access message property
            console.error('Error al registrar usuario:', err.message);
            // Use a custom modal or toast instead of alert()
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
