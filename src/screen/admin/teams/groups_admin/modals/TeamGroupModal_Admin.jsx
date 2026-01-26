import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Form, Input, Select, Button, message } from 'antd';
import { useApi } from '../../../../../hooks/useApi';

const TeamGroupModal_Admin = ({
    visible,
    onClose,
    onSave,
    editData = null,
    isEditing = false,
    phasesData = [],
    teamsData = []
}) => {
    const [form] = Form.useForm();
    const [hasChanges, setHasChanges] = useState(false);
    const [initialData, setInitialData] = useState(null);

    // API Hooks
    const { postData: createGroup, loading: creatingGroup } = useApi('/groups', {}, false);
    const { patchData: updateGroup, loading: updatingGroup } = useApi('/groups', {}, false);

    // Función para comparar si hay cambios
    const checkForChanges = (changedValues, allValues) => {
        if (!isEditing || !initialData) {
            setHasChanges(true);
            return;
        }

        const hasChanged =
            allValues.name !== initialData.name ||
            allValues.id_phase !== initialData.id_phase ||
            JSON.stringify(allValues.id_team?.sort()) !== JSON.stringify(initialData.id_team?.sort());

        setHasChanges(hasChanged);
    };

    useEffect(() => {
        if (visible) {
            if (isEditing && editData) {
                const initialValues = {
                    name: editData.name || '',
                    id_phase: editData.id_phase || undefined,
                    id_team: editData.id_team || [],
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

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const dataToSend = {
                name: values.name,
                id_phase: values.id_phase,
                id_team: values.id_team || [],
            };

            if (isEditing) {
                await updateGroup(dataToSend, editData.id_group);
                message.success('Grupo actualizado correctamente');
            } else {
                await createGroup(dataToSend);
                message.success('Grupo agregado correctamente');
            }

            form.resetFields();
            onSave();
        } catch (error) {
            if (error.errorFields) {
                return;
            }

            message.error(error.message || 'No se pudo guardar el grupo');
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    // Verificar si hay datos en los selects
    const hasPhases = phasesData && phasesData.length > 0;
    const hasTeams = teamsData && teamsData.length > 0;

    if (!visible) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black  opacity-50 z-50 transition-opacity"
                onClick={handleCancel}
            />

            <div className="fixed inset-0 z-50 flex items-center backdrop-blur-md justify-center p-4 overflow-y-auto">
                <div
                    className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700 border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                            {isEditing ? 'Editar grupo' : 'Agregar grupo'}
                        </h2>
                        <button onClick={handleCancel}>
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
                                label="Nombre del grupo"
                                rules={[
                                    { required: true, message: 'El nombre es requerido' },
                                    { min: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                                ]}
                            >
                                <Input
                                    placeholder="Ej: Grupo A"
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                name="id_phase"
                                label="Fase"
                                rules={[
                                    { required: true, message: 'La fase es requerida' },
                                ]}
                            >
                                <Select
                                    placeholder="Selecciona una fase"
                                    size="large"
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    notFoundContent={!hasPhases ? "No hay fases disponibles" : "No se encontraron resultados"}
                                    options={phasesData?.map((phase) => ({
                                        value: phase.id_phase,
                                        label: phase.name,
                                    }))}
                                />
                            </Form.Item>

                            <Form.Item
                                name="id_team"
                                label="Equipos"
                                rules={[
                                    { required: true, message: 'Debes seleccionar al menos un equipo' },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Selecciona los equipos"
                                    size="large"
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    notFoundContent={!hasTeams ? "No hay equipos disponibles" : "No se encontraron resultados"}
                                    options={teamsData?.map((team) => ({
                                        value: team.id_team.toString(),
                                        label: team.name,
                                    }))}
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
                            type="primary" 
                            danger
                            onClick={handleCancel}
                            size="large"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            size="large"
                            loading={creatingGroup || updatingGroup}
                            disabled={(isEditing && !hasChanges) || !hasPhases || !hasTeams}
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

export default TeamGroupModal_Admin;