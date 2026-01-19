import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Volleyball, Trophy, Medal, Target, Award, Sparkles } from 'lucide-react';

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            console.log('Login values:', values);
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Formulario de login - lado izquierdo */}
            <div className="flex items-center justify-center w-full lg:w-1/3 bg-white px-6 lg:px-16">
                <div className="w-full max-w-md">
                    
                    <h2 className="text-2xl font-medium text-gray-900 mb-6">
                        Inicia sesión para ingresar
                    </h2>

                    <Form
                        name="login"
                        onFinish={onFinish}
                        layout="vertical"
                        requiredMark={false}
                    >
                        <Form.Item
                            label={<span className="text-gray-700">Correo electrónico</span>}
                            name="email"
                            rules={[
                                { required: true, message: 'Por favor ingrese su correo electrónico' },
                                { type: 'email', message: 'Por favor ingrese un correo válido' }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="text-gray-400" />}
                                placeholder="Ingrese su correo electrónico"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700">Contraseña</span>}
                            name="password"
                            rules={[
                                { required: true, message: 'Por favor ingrese su contraseña' },
                                { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="Ingrese su contraseña"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item className="mb-0">
                            <div className="w-full flex justify-center mt-10">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    size="large"
                                    className="w-40 bg-green-700 hover:bg-green-600 font-semibold"
                                >
                                    INGRESAR
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>

                    <p className="text-sm text-gray-500 text-center mt-12">
                        © 2026 VIFAC (Vida y Familia, A.C.) - Todos los derechos reservados.
                    </p>
                </div>
            </div>

            {/* Panel informativo - lado derecho */}
            <div className="hidden lg:flex lg:w-2/3 relative overflow-hidden bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-700">
                {/* Animated Background Elements - igual que en Hero */}
                <div className="absolute inset-0">
                    {/* Animated circles */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float-delayed"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/10 rounded-full blur-3xl animate-float-slow"></div>
                    
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                    
                    {/* Football pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.1]">
                        <div className="absolute top-10 left-20 text-9xl animate-spin-slow">⚽</div>
                        <div className="absolute top-40 right-32 text-7xl animate-spin-reverse">⚽</div>
                        <div className="absolute bottom-20 left-40 text-8xl animate-spin-slow">⚽</div>
                        <div className="absolute bottom-40 right-20 text-6xl animate-spin-reverse">⚽</div>
                    </div>
                </div>

                {/* Contenido - ENCIMA de todo */}
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

                {/* Estilos de animación */}
                <style>{`
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-20px);
                        }
                    }

                    @keyframes float-delayed {
                        0%, 100% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-30px);
                        }
                    }

                    @keyframes float-slow {
                        0%, 100% {
                            transform: translate(-50%, -50%) translateY(0px);
                        }
                        50% {
                            transform: translate(-50%, -50%) translateY(-15px);
                        }
                    }

                    @keyframes spin-slow {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }

                    @keyframes spin-reverse {
                        from {
                            transform: rotate(360deg);
                        }
                        to {
                            transform: rotate(0deg);
                        }
                    }

                    .animate-float {
                        animation: float 8s ease-in-out infinite;
                    }

                    .animate-float-delayed {
                        animation: float-delayed 10s ease-in-out infinite;
                        animation-delay: 1s;
                    }

                    .animate-float-slow {
                        animation: float-slow 12s ease-in-out infinite;
                        animation-delay: 2s;
                    }

                    .animate-spin-slow {
                        animation: spin-slow 30s linear infinite;
                    }

                    .animate-spin-reverse {
                        animation: spin-reverse 40s linear infinite;
                    }
                `}</style>
            </div>
        </div>
    );
}