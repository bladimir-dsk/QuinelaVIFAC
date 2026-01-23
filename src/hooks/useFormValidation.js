import { useState } from 'react';

/**
 * Hook reutilizable para validación de formularios
 * @param {Object} validationRules - Objeto con reglas de validación
 * @returns {Object} - { errors, touched, validateForm, setErrors, setTouched, touchAllFields }
 */
export function useFormValidation(validationRules) {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    /**
     * Valida el formulario basándose en las reglas proporcionadas
     * @param {Object} formData - Datos del formulario a validar
     * @returns {boolean} - true si es válido, false si hay errores
     */
    const validateForm = (formData) => {
        const newErrors = {};

        Object.keys(validationRules).forEach(field => {
            const rules = validationRules[field];
            const value = formData[field];

            // Validación: required
            if (rules.required && !value?.toString().trim()) {
                newErrors[field] = rules.message || `${field} es requerido`;
                return;
            }

            // Validación: email
            if (rules.email && value && !/\S+@\S+\.\S+/.test(value)) {
                newErrors[field] = rules.emailMessage || 'Correo electrónico inválido';
                return;
            }

            // Validación: minLength
            if (rules.minLength && value && value.length < rules.minLength) {
                newErrors[field] = rules.minLengthMessage || 
                    `Debe tener al menos ${rules.minLength} caracteres`;
                return;
            }

            // Validación: maxLength
            if (rules.maxLength && value && value.length > rules.maxLength) {
                newErrors[field] = rules.maxLengthMessage || 
                    `Debe tener máximo ${rules.maxLength} caracteres`;
                return;
            }

            // Validación: pattern (regex)
            if (rules.pattern && value && !rules.pattern.test(value)) {
                newErrors[field] = rules.patternMessage || 'Formato inválido';
                return;
            }

            // Validación: custom (función personalizada)
            if (rules.custom && value) {
                const customError = rules.custom(value, formData);
                if (customError) {
                    newErrors[field] = customError;
                    return;
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Marca todos los campos como touched
     * @param {Object} formData - Datos del formulario
     */
    const touchAllFields = (formData) => {
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);
    };

    /**
     * Resetea los errores
     */
    const resetErrors = () => setErrors({});

    /**
     * Resetea los touched
     */
    const resetTouched = () => setTouched({});

    return {
        errors,
        touched,
        validateForm,
        setErrors,
        setTouched,
        touchAllFields,
        resetErrors,
        resetTouched
    };
}