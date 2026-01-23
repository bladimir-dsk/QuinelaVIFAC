import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePermissionsStore = create(
    persist(
        (set, get) => ({
            userModules: [],
            allModules: [],
            loading: false,
            error: null,
            initialized: false,
            userRole: null,

            loadUserPermissions: async (userRole, userEmail) => {
                const state = get();

                if (state.initialized && state.userRole === userRole) {
                    return;
                }

                set({ loading: true, error: null, userRole, initialized: true, loading: false });
            },

            hasModuleAccess: (moduleName) => {
                const { userRole } = get();
                // Admin tiene acceso a todo
                if (userRole === 'admin') return true;
                return false;
            },

            hasRouteAccess: (path) => {
                const { userRole } = get();
                
                // Admin tiene acceso a todo en /admin
                if (userRole === 'admin' && path.startsWith('/admin')) {
                    return true;
                }
                
                // Participante tiene acceso a todo en /participante
                if (userRole === 'participante' && path.startsWith('/participante')) {
                    return true;
                }

                return false;
            },

            getFirstAvailableRoute: () => {
                const { userRole } = get();
                return userRole === 'admin' ? '/admin/dashboard' : '/participante/dashboard';
            },

            getUserModules: () => {
                return get().userModules;
            },

            clearPermissions: () => {
                set({
                    userModules: [],
                    allModules: [],
                    loading: false,
                    error: null,
                    initialized: false,
                    userRole: null
                });
            },

            forceReload: async (userRole, userEmail) => {
                set({ initialized: false });
                await get().loadUserPermissions(userRole, userEmail);
            }
        }),
        {
            name: 'permissions-storage',
            partialize: (state) => ({
                initialized: state.initialized,
                userRole: state.userRole
            })
        }
    )
);

export default usePermissionsStore;