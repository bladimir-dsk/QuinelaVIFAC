import React, { useState, useEffect } from 'react';
import { Input, Button, App } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useApi } from '../../../hooks/useApi';

export default function MyProfileScreen_Participant() {
    const { message } = App.useApp();
    const { data: profile, loading, patchData } = useApi('/auth/profile', {}, true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        phone: '',
        firstName: '',
        middleName: '',
        personEmail: '',
        direction: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                code: profile.code || '',
                phone: profile.phone || '',
                firstName: profile.firstName || '',
                middleName: profile.middleName || '',
                personEmail: profile.personEmail || '',
                direction: profile.direction || ''
            });
        }
    }, [profile]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12;

        return `${day} de ${month} del ${year} ${hours}:${minutes} ${ampm}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await patchData(formData);
            message.success('Perfil actualizado correctamente');
            setIsEditing(false);
        } catch (error) {
            message.error('Error al actualizar el perfil');
        }
    };

    const handleCancel = () => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                code: profile.code || '',
                phone: profile.phone || '',
                firstName: profile.firstName || '',
                middleName: profile.middleName || '',
                personEmail: profile.personEmail || '',
                direction: profile.direction || ''
            });
        }
        setIsEditing(false);
    };

    if (loading && !profile) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg text-cyan-600 font-medium">Cargando perfil...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header with cyan background */}
                <div className="bg-linear-to-r from-cyan-500 to-blue-500 rounded-t-xl p-8 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
                            {profile?.createdAt && (
                                <div className="flex items-center gap-2 text-white/90">
                                    <CalendarOutlined />
                                    <span className="text-sm">Miembro desde: {formatDate(profile.createdAt)}</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30">
                                {profile?.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-b-xl shadow-lg p-8">
                    <div className="space-y-6">
                        {/* Nombre Completo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                Nombre(s)
                            </label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                prefix={<UserOutlined className="text-gray-400" />}
                                size="large"
                                placeholder="Nombre completo"
                            />
                        </div>

                        {/* Apellidos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400  mb-2">
                                    Primer apellido
                                </label>
                                <Input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    size="large"
                                    placeholder="Primer apellido"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                    Segundo apellido
                                </label>
                                <Input
                                    name="middleName"
                                    value={formData.middleName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    size="large"
                                    placeholder="Segundo apellido"
                                />
                            </div>
                        </div>

                        {/* Email (disabled) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400  mb-2">
                                Correo de acceso
                            </label>
                            <Input
                                value={profile?.email}
                                disabled
                                prefix={<MailOutlined className="text-gray-400" />}
                                size="large"
                                className="bg-gray-50"
                            />
                            <p className="text-xs text-gray-500 mt-1">* El correo de acceso no se puede modificar</p>
                        </div>

                        {/* Teléfono */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                    Código de país
                                </label>
                                <Input
                                    name="code"
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    prefix={<PhoneOutlined className="text-gray-400" />}
                                    size="large"
                                    placeholder="52"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                    Teléfono
                                </label>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    prefix={<PhoneOutlined className="text-gray-400" />}
                                    size="large"
                                    placeholder="9991234567"
                                />
                            </div>
                        </div>

                        {/* Email Alternativo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                Correo personal
                            </label>
                            <Input
                                name="personEmail"
                                value={formData.personEmail}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                prefix={<MailOutlined className="text-gray-400" />}
                                size="large"
                                placeholder="email@ejemplo.com"
                            />
                        </div>

                        {/* Dirección */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                Dirección
                            </label>
                            <Input.TextArea
                                name="direction"
                                value={formData.direction}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                rows={4}
                                placeholder="Dirección completa"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                        {!isEditing ? (
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => setIsEditing(true)}
                                className="bg-cyan-500 hover:bg-cyan-600 h-10 px-6"
                            >
                                Editar perfil
                            </Button>
                        ) : (
                            <>
                                <Button
                                    size="large"
                                    onClick={handleCancel}
                                    className="h-10 px-6"
                                    danger
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleSave}
                                    loading={loading}
                                    className="bg-cyan-500 hover:bg-cyan-600 h-10 px-6"
                                >
                                    Guardar cambios
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}