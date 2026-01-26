import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Modal, Form, Input, Button, message, Avatar } from 'antd';
import { FlagOutlined, TeamOutlined } from '@ant-design/icons';
import { useApi } from '../../../../../hooks/useApi';

const TeamModal_Admin = ({
    visible,
    onClose,
    onSave,
    editData = null,
    isEditing = false
}) => {
    const [form] = Form.useForm();
    const formValues = Form.useWatch([], form);
    const [hasChanges, setHasChanges] = useState(false);
    const [initialData, setInitialData] = useState(null);
    const [previewFlag, setPreviewFlag] = useState(null);

    // API Hooks
    const { postData: createTeam, loading: creatingTeam } = useApi('/team', {}, false);
    const { patchData: updateTeam, loading: updatingTeam } = useApi('/team', {}, false);

    // Función para comparar si hay cambios
    const checkForChanges = (changedValues, allValues) => {
        if (!isEditing || !initialData) {
            setHasChanges(true);
            setPreviewFlag(allValues.flagUrl);
            return;
        }

        const hasChanged =
            allValues.name !== initialData.name ||
            allValues.flagUrl !== initialData.flagUrl;

        setHasChanges(hasChanged);
        setPreviewFlag(allValues.flagUrl);
    };

    useEffect(() => {
        if (visible) {
            if (isEditing && editData) {
                const initialValues = {
                    name: editData.name || '',
                    flagUrl: editData.flagUrl || '',
                };

                form.setFieldsValue(initialValues);
                setInitialData(initialValues);
                setPreviewFlag(editData.flagUrl);
                setHasChanges(false);
            } else {
                form.resetFields();
                setInitialData(null);
                setPreviewFlag(null);
                setHasChanges(false);
            }
        }
    }, [visible, isEditing, editData, form]);

    const isFormComplete = () => {
        if (!formValues) return false;

        return formValues.name?.trim() &&
            formValues.flagUrl?.trim() &&
            /^https?:\/\/.+/.test(formValues.flagUrl);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const dataToSend = {
                name: values.name,
                flagUrl: values.flagUrl,
            };

            if (isEditing) {
                await updateTeam(dataToSend, editData.id_team);
                message.success('Equipo actualizado correctamente');
            } else {
                await createTeam(dataToSend);
                message.success('Equipo agregado correctamente');
            }

            form.resetFields();
            setPreviewFlag(null);
            onSave();
        } catch (error) {
            if (error.errorFields) {
                return;
            }

            message.error(error.message || 'No se pudo guardar el equipo');
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setPreviewFlag(null);
        onClose();
    };

    if (!visible) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black opacity-50 z-50 transition-opacity"
                onClick={handleCancel}
            />

            <div className="fixed inset-0 z-50 flex items-center backdrop-blur-md justify-center p-4 overflow-y-auto">
                <div
                    className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                            {isEditing ? 'Editar equipo' : 'Agregar equipo'}
                        </h2>
                        <button
                            onClick={handleCancel}>
                            <X size={24} className='text-gray-400 hover:text-gray-600 transition-colors' />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-5">
                        <Form
                            form={form}
                            layout="vertical"
                            onValuesChange={checkForChanges}>
                            {/* Preview de la bandera */}
                            {previewFlag && (
                                <div className="flex justify-center mb-6">
                                    <Avatar
                                        src={previewFlag}
                                        size={80}
                                        shape="square"
                                        style={{ border: '3px solid #f0f0f0' }}
                                        icon={<FlagOutlined />}
                                    />
                                </div>
                            )}

                            <Form.Item
                                name="name"
                                label="Nombre del equipo"
                                rules={[
                                    { required: true, message: 'El nombre es requerido' },
                                    { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
                                ]}
                            >
                                <Input
                                    placeholder="Ej: México"
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                name="flagUrl"
                                label="URL de la bandera"
                                rules={[
                                    { required: true, message: 'La URL de la bandera es requerida' },
                                    {
                                        pattern: /^https?:\/\/.+/,
                                        message: 'Ingresa una URL válida que comience con http:// o https://'
                                    }
                                ]}
                                extra={
                                    <>
                                        Recomendado: https://flagcdn.com/w80/[código].webp
                                        <br />
                                        (ej: mx.webp para México)
                                    </>
                                }
                            >
                                <Input
                                    placeholder="https://flagcdn.com/w80/mx.webp"
                                    size="large"
                                />
                            </Form.Item>

                            {isEditing && !hasChanges && (
                                <div className="text-sm text-blue-600 dark:text-blue-400">
                                    No hay cambios para guardar
                                </div>
                            )}
                        </Form>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 p-4 border-t dark:border-zinc-700 border-gray-200">
                        <Button
                            onClick={handleCancel}
                            size="large"
                            type="primary"
                            danger
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            size="large"
                            loading={creatingTeam || updatingTeam}
                            disabled={(isEditing && !hasChanges) || !isFormComplete()}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {isEditing ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamModal_Admin;