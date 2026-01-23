import React, { useState, useEffect } from 'react';
import { X, Trophy } from 'lucide-react';
import { Modal, Form, Input, InputNumber, Button, message } from 'antd';
import { useApi } from '../../../../hooks/useApi';

const PhaseModal_Admin = ({
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

    // API Hooks
    const { postData: createPhase, loading: creatingPhase } = useApi('/phases', {}, false);
    const { patchData: updatePhase, loading: updatingPhase } = useApi('/phases', {}, false);

    // Función para comparar si hay cambios
    const checkForChanges = (changedValues, allValues) => {
        if (!isEditing || !initialData) {
            setHasChanges(true);
            return;
        }

        const hasChanged =
            allValues.name !== initialData.name ||
            allValues.order !== initialData.order;

        setHasChanges(hasChanged);
    };

    useEffect(() => {
        if (visible) {
            if (isEditing && editData) {
                const initialValues = {
                    name: editData.name || '',
                    order: editData.order || 1,
                };

                form.setFieldsValue(initialValues);
                setInitialData(initialValues);
                setHasChanges(false);
            } else {
                form.resetFields();
                setInitialData(null);
                setHasChanges(false);
            }
        }
    }, [visible, isEditing, editData, form]);

    const isFormComplete = () => {
        if (!formValues) return false;

        return formValues.name?.trim() &&
            formValues.order &&
            formValues.order > 0;
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const dataToSend = {
                name: values.name,
                order: values.order,
            };

            if (isEditing) {
                await updatePhase(dataToSend, editData.id_phase);
                message.success('Fase actualizada correctamente');
            } else {
                await createPhase(dataToSend);
                message.success('Fase agregada correctamente');
            }

            form.resetFields();
            onSave();
        } catch (error) {
            if (error.errorFields) {
                return;
            }

            message.error(error.message || 'No se pudo guardar la fase');
        }
    };

    const handleCancel = () => {
        form.resetFields();
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
                    className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {isEditing ? 'Editar fase' : 'Agregar fase'}
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
                            onValuesChange={checkForChanges}
                        >
                            <Form.Item
                                name="name"
                                label="Nombre de la fase"
                                rules={[
                                    { required: true, message: 'El nombre es requerido' },
                                    { min: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                                ]}
                            >
                                <Input
                                    placeholder="Ej: Cuartos de final"
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                name="order"
                                label="Orden"
                                rules={[
                                    { required: true, message: 'El orden es requerido' },
                                    { type: 'number', min: 1, message: 'El orden debe ser mayor a 0' },
                                ]}
                                initialValue={1}
                            >
                                <InputNumber
                                    placeholder="Ej: 3"
                                    size="large"
                                    min={1}
                                    style={{ width: '100%' }}
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
                    <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
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
                            loading={creatingPhase || updatingPhase}
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

export default PhaseModal_Admin;