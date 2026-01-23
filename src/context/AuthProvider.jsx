import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import usePermissionsStore from '../stores/usePermissionsStore';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { loadUserPermissions, clearPermissions } = usePermissionsStore();

    useEffect(() => {
        // Verificar si hay un usuario en localStorage al cargar la app
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setIsAuthenticated(true);
                
                // Cargar permisos automáticamente
                loadUserPermissions(userData.role, userData.email);
            } catch (error) {
                // Si hay error, limpiar todo
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('permissions-storage');
            }
        }
        setLoading(false);
    }, [loadUserPermissions]);

    const login = async (userData, token) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        if (token) {
            localStorage.setItem('token', token);
        }
        
        // Cargar permisos al hacer login
        await loadUserPermissions(userData.role, userData.email);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
        // Limpiar permisos al cerrar sesión
        clearPermissions();
        
        // Limpiar el storage de Zustand
        localStorage.removeItem('permissions-storage');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};