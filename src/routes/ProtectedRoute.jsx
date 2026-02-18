import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import usePermissionsStore from '../stores/usePermissionsStore';
import { useEffect, useState } from 'react';

export const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();
    const { hasRouteAccess, loadUserPermissions, initialized, loading, getFirstAvailableRoute } = usePermissionsStore();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const initPermissions = async () => {
            // Verificar token primero
            const token = localStorage.getItem('token');
            if (!token) {
                setChecking(false);
                return;
            }

            if (isAuthenticated && user && !initialized) {
                await loadUserPermissions(user.role, user.email);
            }
            setChecking(false);
        };

        initPermissions();
    }, [isAuthenticated, user, initialized, loadUserPermissions]);

    // Mostrar loading mientras se cargan permisos
    if (checking || loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si requiere un rol específico y el usuario no lo tiene
    if (requiredRole && user?.role !== requiredRole) {
        const redirectPath = user?.role === 'admin' ? '/admin/dashboard' : '/client/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    // Verificar acceso al módulo (solo para admin)
    if (user?.role === 'admin' && !hasRouteAccess(location.pathname)) {
        const firstRoute = getFirstAvailableRoute();
        return <Navigate to={firstRoute} replace />;
    }

    return children;
};