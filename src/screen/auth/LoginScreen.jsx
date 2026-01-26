import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginAPI } from '../../hooks/authService';
import { useLoginCleanup } from '../../hooks/useLoginCleanup';
import { useNotification } from '../../hooks/useNotification';
import { useFormValidation } from '../../hooks/useFormValidation';

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showSuccess, showError, contextHolder } = useNotification();

    // Definir reglas de validación
    const validationRules = {
        email: {
            required: true,
            message: 'Por favor ingrese su correo electrónico',
            email: true,
            emailMessage: 'Por favor ingrese un correo válido'
        },
        password: {
            required: true,
            message: 'Por favor ingrese su contraseña',
            minLength: 8,
            minLengthMessage: 'La contraseña debe tener al menos 8 caracteres'
        }
    };

    const { errors, validateForm, touchAllFields } = useFormValidation(validationRules);

    useLoginCleanup();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            const userData = JSON.parse(user);
            if (userData.role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else if (userData.role === 'participante') {
                navigate('/participante/home', { replace: true });
            }
        }
    }, [navigate]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleLogin = async () => {
        // Marcar todos los campos como tocados
        touchAllFields(formData);

        // Validar el formulario
        const isValid = validateForm(formData);
        
        if (!isValid) {
            // Mostrar el primer error encontrado
            const firstError = Object.values(errors)[0];
            if (firstError) {
                showError('Error de validación', firstError);
            }
            return;
        }

        setLoading(true);

        try {
            const result = await loginAPI(formData.email, formData.password);

            if (result.success) {
                await login(result.user, result.token);
                showSuccess('¡Éxito!', '¡Inicio de sesión exitoso!');

                if (result.user.role === 'admin') {
                    navigate('/admin/dashboard', { replace: true });
                } else if (result.user.role === 'participante') {
                    navigate('/participante/home', { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            } else {
                showError('Error de autenticación', result.message || 'Error al iniciar sesión');
                setLoading(false);
            }
        } catch (error) {
            showError('Error inesperado', 'Error inesperado. Intente nuevamente.');
            setLoading(false);
        }
    };

    // Manejar Enter en los inputs
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <>
            {contextHolder}
            <div className="flex h-screen">
                {/* Formulario de login - lado izquierdo */}
                <div className="flex items-center justify-center w-full lg:w-1/3 bg-white dark:bg-zinc-950 px-6 lg:px-16">
                    <div className="w-full max-w-md">
                        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-10 ">
                            Inicia sesión para ingresar
                        </h2>

                        <div>
                            <div className="mb-4 mt-10">
                                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                    Correo electrónico
                                </label>
                                <Input
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    prefix={<UserOutlined className="text-gray-400" />}
                                    placeholder="Ingrese su correo electrónico"
                                    size="large"
                                    disabled={loading}
                                    status={errors.email ? 'error' : ''}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-xs mt-1">{errors.email}</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-200  mb-2">
                                    Contraseña
                                </label>
                                <Input.Password
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    prefix={<LockOutlined className="text-gray-400" />}
                                    placeholder="Ingrese su contraseña"
                                    size="large"
                                    disabled={loading}
                                    status={errors.password ? 'error' : ''}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-xs mt-1">{errors.password}</span>
                                )}
                            </div>

                            <div className="w-full flex justify-center mt-10 mb-10">
                                <Button
                                    type="primary"
                                    loading={loading}
                                    size="large"
                                    className="w-40"
                                    disabled={loading}
                                    onClick={handleLogin}
                                >
                                    INGRESAR
                                </Button>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 text-center mt-12">
                            © 2026 VIFAC (Vida y Familia, A.C.) - Todos los derechos reservados.
                        </p>
                    </div>
                </div>

                {/* Panel informativo - lado derecho */}
                <div className="hidden lg:flex lg:w-2/3 relative overflow-hidden bg-linear-to-br from-cyan-600 via-cyan-700 to-cyan-700">
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float-delayed"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/10 rounded-full blur-3xl animate-float-slow"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                        <div className="absolute inset-0 opacity-[0.1]">
                            <div className="absolute top-10 left-20 text-9xl animate-spin-slow">⚽</div>
                            <div className="absolute top-40 right-32 text-7xl animate-spin-reverse">⚽</div>
                            <div className="absolute bottom-20 left-40 text-8xl animate-spin-slow">⚽</div>
                            <div className="absolute bottom-40 right-20 text-6xl animate-spin-reverse">⚽</div>
                        </div>
                    </div>

                    <div className="relative z-20 flex flex-col justify-between p-12 w-full">
                        <div>
                            <div className="flex items-center space-x-3 mb-8">
                                <img src="/Logo-vifac.webp" alt="logo" className="w-20" loading="lazy" />
                                <div>
                                    <h1 className="text-3xl font-bold text-white">VIFAC</h1>
                                    <p className="text-green-100">Celebramos la vida</p>
                                </div>
                            </div>

                            <div className="mt-12 space-y-8">
                                <h2 className="text-4xl font-bold text-white leading-tight">
                                    Mérida, Yucatán
                                </h2>
                                <p className="text-xl text-green-50 max-w-xl">
                                    Sistema de gestión de ranking del mundial 2026.
                                </p>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-20px); }
                        }
                        @keyframes float-delayed {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-30px); }
                        }
                        @keyframes float-slow {
                            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
                            50% { transform: translate(-50%, -50%) translateY(-15px); }
                        }
                        @keyframes spin-slow {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        @keyframes spin-reverse {
                            from { transform: rotate(360deg); }
                            to { transform: rotate(0deg); }
                        }
                        .animate-float { animation: float 8s ease-in-out infinite; }
                        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; animation-delay: 1s; }
                        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; animation-delay: 2s; }
                        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
                        .animate-spin-reverse { animation: spin-reverse 40s linear infinite; }
                    `}</style>
                </div>
            </div>
        </>
    );
}