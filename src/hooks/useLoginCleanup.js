import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logoutAPI } from './authService';
import usePermissionsStore from '../stores/usePermissionsStore';

export const useLoginCleanup = () => {
    const location = useLocation();
    const { clearPermissions } = usePermissionsStore();

    useEffect(() => {
        // Si estamos en la ruta del login, limpiar todo
        if (location.pathname === '/login') {
            
            // Limpiar tokens y usuario
            logoutAPI();
            
            // Limpiar store de permisos
            clearPermissions();
        }
    }, [location.pathname, clearPermissions]);
};