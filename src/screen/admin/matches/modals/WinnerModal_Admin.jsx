import { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';
import { Form, Select, Button, Space, message } from 'antd';
import api from '../../../../api/axiosConfig';

const WinnerModal_Admin = ({
    visible,
    onClose,
    onSave,
    matchData = null
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible && matchData) {
            form.setFieldsValue({
                id_winner: matchData.winner?.id_team || undefined
            });
        } else {
            form.resetFields();
        }
    }, [visible, matchData, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            
            const response = await api.patch(
                `/user-prediction/close-match/${matchData.id_match}/${values.id_winner}`
            );
            
            message.success('Ganador asignado correctamente');
            form.resetFields();
            onSave();
        } catch (error) {
            if (error.errorFields) {
                return;
            }
            const errorMessage = error.response?.data?.message || error.message || 'No se pudo asignar el ganador';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    if (!visible || !matchData) return null;

    const teams = [
        {
            id_team: matchData.teamA?.id_team,
            name: matchData.teamA?.name,
            flagUrl: matchData.teamA?.flagUrl
        },
        {
            id_team: matchData.teamB?.id_team,
            name: matchData.teamB?.name,
            flagUrl: matchData.teamB?.flagUrl
        }
    ];

    return (
        <>
            <div
                className="fixed inset-0 bg-black opacity-50 z-50 transition-opacity"
                onClick={handleCancel}
            />

            <div className="fixed inset-0 z-50 flex items-center backdrop-blur-md justify-center p-4 overflow-y-auto">
                <div
                    className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                Asignar ganador
                            </h2>
                        </div>
                        <button onClick={handleCancel}>
                            <X size={24} className="text-gray-400 hover:text-gray-600 transition-colors" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-5">
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Partido:
                            </p>
                            <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                                <Space>
                                    <img
                                        src={matchData.teamA?.flagUrl}
                                        alt={matchData.teamA?.name}
                                        style={{ width: 24, height: 18 }}
                                    />
                                    <span className="font-semibold">{matchData.teamA?.name}</span>
                                </Space>
                                <span className="text-red-500 font-bold">VS</span>
                                <Space>
                                    <img
                                        src={matchData.teamB?.flagUrl}
                                        alt={matchData.teamB?.name}
                                        style={{ width: 24, height: 18 }}
                                    />
                                    <span className="font-semibold">{matchData.teamB?.name}</span>
                                </Space>
                            </div>
                        </div>

                        <Form
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item
                                name="id_winner"
                                label="Selecciona el equipo ganador"
                                rules={[
                                    { required: true, message: 'Debes seleccionar un ganador' },
                                ]}
                            >
                                <Select
                                    placeholder="Selecciona el ganador"
                                    size="large"
                                    options={teams.map((team) => ({
                                        value: team.id_team,
                                        label: team.name,
                                    }))}
                                    optionRender={(option) => {
                                        const team = teams.find(t => t.id_team === option.value);
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
                        </Form>

                        {matchData.winner && (
                            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-sm text-blue-600 dark:text-blue-400">
                                    <strong>Nota:</strong> Este partido ya tiene un ganador asignado. Si continúas, se actualizará.
                                </p>
                            </div>
                        )}
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
                            loading={loading}
                        >
                            Aceptar
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WinnerModal_Admin;