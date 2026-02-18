// modals/MatchModal_Admin.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Modal, Form, Select, Button, message, Space, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { useApi } from '../../../../hooks/useApi';
import DateTimePicker from '../../../../components/common/datePickers/DateTimePicker';

const MatchModal_Admin = ({
    visible,
    onClose,
    onSave,
    editData = null,
    isEditing = false,
    phasesData = [],
    groupsData = [] // Ahora recibimos los grupos como prop
}) => {
    const [form] = Form.useForm();
    const [hasChanges, setHasChanges] = useState(false);
    const [initialData, setInitialData] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupTeams, setGroupTeams] = useState([]);
    const [selectedTeamA, setSelectedTeamA] = useState(null);
    const [selectedTeamB, setSelectedTeamB] = useState(null);

    // API Hooks
    const { postData: createMatch, loading: creatingMatch } = useApi('/matches', {}, false);
    const { patchData: updateMatch, loading: updatingMatch } = useApi('/matches', {}, false);

    // Obtener equipos del grupo seleccionado
    const {
        data: groupDetailsData,
        loading: loadingGroupDetails,
        fetchData: fetchGroupDetails
    } = useApi(`/groups/${selectedGroup}`, {}, false);

    // Función para comparar si hay cambios
    const checkForChanges = (changedValues, allValues) => {
        if (!isEditing || !initialData) {
            setHasChanges(true);
            return;
        }

        const hasChanged =
            allValues.id_phase !== initialData.id_phase ||
            allValues.id_group !== initialData.id_group ||
            allValues.id_teamA !== initialData.id_teamA ||
            allValues.id_teamB !== initialData.id_teamB ||
            !dayjs(allValues.matchDate).isSame(initialData.matchDate);

        setHasChanges(hasChanged);
    };

    // Efecto para cargar equipos cuando se selecciona un grupo
    useEffect(() => {
        if (selectedGroup) {
            fetchGroupDetails();
        } else {
            setGroupTeams([]);
        }
    }, [selectedGroup]);

    // Efecto para actualizar equipos cuando se cargan los detalles del grupo
    useEffect(() => {
        if (groupDetailsData?.teams) {
            setGroupTeams(groupDetailsData.teams);
        }
    }, [groupDetailsData]);

    useEffect(() => {
        if (visible) {
            if (isEditing && editData) {
                const initialValues = {
                    id_phase: editData.phase?.id_phase || undefined,
                    id_group: editData.group?.id_group || undefined,
                    id_teamA: editData.teamA?.id_team || undefined,
                    id_teamB: editData.teamB?.id_team || undefined,
                    matchDate: editData.matchDate ? dayjs(editData.matchDate) : dayjs(),
                };

                form.setFieldsValue(initialValues);
                setInitialData(initialValues);
                setSelectedGroup(editData.group?.id_group);
                setSelectedTeamA(editData.teamA?.id_team);
                setSelectedTeamB(editData.teamB?.id_team);
                setHasChanges(false);
            } else {
                form.resetFields();
                form.setFieldsValue({ matchDate: dayjs() });
                setInitialData(null);
                setSelectedGroup(null);
                setGroupTeams([]);
                setSelectedTeamA(null);
                setSelectedTeamB(null);
                setHasChanges(false);
            }
        }
    }, [visible, isEditing, editData, form]);

    const handleGroupChange = (groupId) => {
        setSelectedGroup(groupId);
        // Limpiar selección de equipos cuando cambia el grupo
        form.setFieldsValue({
            id_teamA: undefined,
            id_teamB: undefined
        });
        setSelectedTeamA(null);
        setSelectedTeamB(null);
    };

    const handleTeamAChange = (teamId) => {
        setSelectedTeamA(teamId);
    };

    const handleTeamBChange = (teamId) => {
        setSelectedTeamB(teamId);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const dataToSend = {
                id_phase: values.id_phase,
                id_group: values.id_group,
                id_teamA: values.id_teamA,
                id_teamB: values.id_teamB,
                matchDate: values.matchDate.format('YYYY-MM-DD HH:mm:ss'),
            };

            if (isEditing) {
                await updateMatch(dataToSend, editData.id_match);
                message.success('Partido actualizado correctamente');
            } else {
                await createMatch(dataToSend);
                message.success('Partido agregado correctamente');
            }

            form.resetFields();
            onSave();
        } catch (error) {
            if (error.errorFields) {
                return;
            }

            message.error(error.message || 'No se pudo guardar el partido');
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setSelectedGroup(null);
        setGroupTeams([]);
        setSelectedTeamA(null);
        setSelectedTeamB(null);
        onClose();
    };

    // Verificar si hay datos en los selects
    const hasPhases = phasesData && phasesData.length > 0;
    const hasGroups = groupsData && groupsData.length > 0;
    const hasTeams = groupTeams && groupTeams.length > 0;

    // Filtrar equipos disponibles para cada select
    const availableTeamsForA = groupTeams.filter(team => team.id_team !== selectedTeamB);
    const availableTeamsForB = groupTeams.filter(team => team.id_team !== selectedTeamA);

    if (!visible) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black opacity-50 z-50 transition-opacity"
                onClick={handleCancel}
            />

            <div className="fixed inset-0 z-50 flex items-center backdrop-blur-md justify-center p-4 overflow-y-auto">
                <div
                    className="bg-white dark:bg-zinc-900  rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                            {isEditing ? 'Editar partido' : 'Agregar partido'}
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
                            <Row gutter={16}>
                                {/* Fase */}
                                <Col xs={24} md={12}>
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
                                </Col>

                                {/* Grupo */}
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="id_group"
                                        label="Grupo"
                                        rules={[
                                            { required: true, message: 'El grupo es requerido' },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Selecciona un grupo"
                                            size="large"
                                            showSearch
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            notFoundContent={!hasGroups ? "No hay grupos disponibles" : "No se encontraron resultados"}
                                            onChange={handleGroupChange}
                                            options={groupsData?.map((group) => ({
                                                value: group.id_group,
                                                label: group.name,
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>

                                {/* Equipo A */}
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="id_teamA"
                                        label="Equipo A"
                                        rules={[
                                            { required: true, message: 'El equipo A es requerido' },
                                        ]}
                                    >
                                        <Select
                                            placeholder={
                                                !selectedGroup
                                                    ? "Primero selecciona un grupo"
                                                    : "Selecciona el equipo A"
                                            }
                                            size="large"
                                            showSearch
                                            disabled={!selectedGroup}
                                            loading={loadingGroupDetails}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            notFoundContent={
                                                !selectedGroup
                                                    ? "Selecciona un grupo primero"
                                                    : !hasTeams
                                                        ? "No hay equipos en este grupo"
                                                        : "No se encontraron resultados"
                                            }
                                            onChange={handleTeamAChange}
                                            options={availableTeamsForA?.map((team) => ({
                                                value: team.id_team,
                                                label: team.name,
                                            }))}
                                            optionRender={(option) => {
                                                const team = availableTeamsForA.find(t => t.id_team === option.value);
                                                return (
                                                    <Space>
                                                        <img
                                                            src={team?.flagUrl}
                                                            alt={team?.name}
                                                            style={{ width: 20, height: 15 }}
                                                        />
                                                        {option.label}
                                                    </Space>
                                                );
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                {/* Equipo B */}
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="id_teamB"
                                        label="Equipo B"
                                        rules={[
                                            { required: true, message: 'El equipo B es requerido' },
                                        ]}
                                    >
                                        <Select
                                            placeholder={
                                                !selectedGroup
                                                    ? "Primero selecciona un grupo"
                                                    : "Selecciona el equipo B"
                                            }
                                            size="large"
                                            showSearch
                                            disabled={!selectedGroup}
                                            loading={loadingGroupDetails}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            notFoundContent={
                                                !selectedGroup
                                                    ? "Selecciona un grupo primero"
                                                    : !hasTeams
                                                        ? "No hay equipos en este grupo"
                                                        : "No se encontraron resultados"
                                            }
                                            onChange={handleTeamBChange}
                                            options={availableTeamsForB?.map((team) => ({
                                                value: team.id_team,
                                                label: team.name,
                                            }))}
                                            optionRender={(option) => {
                                                const team = availableTeamsForB.find(t => t.id_team === option.value);
                                                return (
                                                    <Space>
                                                        <img
                                                            src={team?.flagUrl}
                                                            alt={team?.name}
                                                            style={{ width: 20, height: 15 }}
                                                        />
                                                        {option.label}
                                                    </Space>
                                                );
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                {/* Fecha y hora */}
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="matchDate"
                                        label="Fecha y hora del partido"
                                        rules={[
                                            { required: true, message: 'La fecha y hora son requeridas' },
                                        ]}
                                    >
                                        <DateTimePicker
                                            placeholder="Selecciona fecha y hora"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            {isEditing && !hasChanges && (
                                <div className="text-sm text-blue-600 dark:text-blue-400 text-center mt-2">
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
                            loading={creatingMatch || updatingMatch}
                            disabled={(isEditing && !hasChanges) || !hasPhases || !hasGroups}
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

export default MatchModal_Admin;