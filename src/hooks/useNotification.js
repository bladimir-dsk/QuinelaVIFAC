import { notification } from 'antd';

/**
 * Hook reutilizable para mostrar notificaciones
 * @returns {Object} - { showSuccess, showError, showWarning, showInfo }
 */
export const useNotification = () => {
    const [api, contextHolder] = notification.useNotification();

    const showSuccess = (message, description) => {
        api.success({
            message: message || 'Éxito',
            description: description,
            placement: 'topRight',
            duration: 3,
        });
    };

    const showError = (message, description) => {
        api.error({
            message: message || 'Error',
            description: description,
            placement: 'topRight',
            duration: 4,
        });
    };

    const showWarning = (message, description) => {
        api.warning({
            message: message || 'Advertencia',
            description: description,
            placement: 'topRight',
            duration: 3,
        });
    };

    const showInfo = (message, description) => {
        api.info({
            message: message || 'Información',
            description: description,
            placement: 'topRight',
            duration: 3,
        });
    };

    return {
        showSuccess,
        showError,
        showWarning,
        showInfo,
        contextHolder, // Necesario para renderizar las notificaciones
    };
};