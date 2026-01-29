import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useApi } from '../../../hooks/useApi';
import { useDeleteConfirmation } from '../../../hooks/useDeleteConfirmation';
import { Pencil, Trash2, Trophy, Calendar, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Modal, Button, Select, message } from 'antd';

export default function ParticipanteHomeScreen() {
    const { user } = useAuth();
    const { data: predictions, loading, fetchData, patchData, deleteData } = useApi('/user-prediction');

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedPrediction, setSelectedPrediction] = useState(null);
    const [newTeamId, setNewTeamId] = useState(null);

    const showDeleteConfirm = useDeleteConfirmation({
        onDelete: deleteData,
    });

    const handleEditClick = (prediction) => {
        setSelectedPrediction(prediction);
        setNewTeamId(prediction.selectedTeam.id_team);
        setEditModalVisible(true);
    };

    const handleUpdatePrediction = async () => {
        try {
            await patchData(
                { id_team: newTeamId },
                selectedPrediction.id_userPrediction
            );
            message.success('Predicción actualizada correctamente');
            setEditModalVisible(false);
            setSelectedPrediction(null);
        } catch (error) {
            message.error('Error al actualizar la predicción');
        }
    };

    const handleDeletePrediction = (prediction) => {
        showDeleteConfirm({
            title: '¿Eliminar predicción?',
            content: `¿Estás seguro de que deseas eliminar tu predicción para el partido ${prediction.match.teamA.name} vs ${prediction.match.teamB.name}?`,
            entityName: 'la predicción',
            recordId: prediction.id_userPrediction,
            successTitle: 'Predicción eliminada',
            successDescription: 'Tu predicción ha sido eliminada correctamente',
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
                    ¡Hola, {user?.name}!
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Estas son tus predicciones para el Mundial 2026
                </p>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-linear-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-lg shadow-sm border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-yellow-500 rounded-lg">
                            <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">Puntos totales</p>
                            <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-200">
                                {predictions?.reduce((sum, p) => sum + p.points, 0) || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg shadow-sm border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500 rounded-lg">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Predicciones</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-200">
                                {predictions?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg shadow-sm border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-500 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-green-700 dark:text-green-300 font-medium">Aciertos</p>
                            <p className="text-3xl font-bold text-green-900 dark:text-green-200">
                                {predictions?.filter(p => p.isCorrect).length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de predicciones */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                        Mis predicciones
                    </h2>
                </div>

                <div className="p-6">
                    {!predictions || predictions.length === 0 ? (
                        <div className="text-center py-12">
                            <Trophy className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                Aún no tienes predicciones
                            </p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                                Comienza a hacer tus predicciones para los próximos partidos, ingresa al modulo de Predicciones
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {predictions.map((prediction) => (
                                <div
                                    key={prediction.id_userPrediction}
                                    className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-5 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all hover:shadow-lg"
                                >
                                    {/* Header: Fase, Grupo y Status */}
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {prediction.match.phase.name}
                                            </span>
                                            {prediction.match.group && (
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {prediction.match.group.name}
                                                </span>
                                            )}
                                        </div>

                                        {/* Status badge */}
                                        {prediction.match.isFinished ? (
                                            <span
                                                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap ${prediction.isCorrect
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                                    }`}
                                            >
                                                {prediction.isCorrect ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span className="hidden xs:inline">¡Acertaste!</span>
                                                        <span className="xs:hidden">Correcto</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="w-4 h-4" />
                                                        <span className="hidden xs:inline">No acertaste</span>
                                                        <span className="xs:hidden">Incorrecto</span>
                                                    </>
                                                )}
                                            </span>
                                        ) : (
                                            <span className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 whitespace-nowrap">
                                                <Clock className="w-4 h-4" />
                                                Pendiente
                                            </span>
                                        )}
                                    </div>

                                    {/* Partido - Centrado en móvil */}
                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 sm:p-4 mb-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                                            {/* Team A */}
                                            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 flex-1">
                                                <img
                                                    src={prediction.match.teamA.flagUrl}
                                                    alt={prediction.match.teamA.name}
                                                    className="w-10 h-8 sm:w-12 sm:h-9 object-cover rounded shadow-sm shrink-0"
                                                />
                                                <span className="font-semibold text-sm sm:text-lg text-gray-900 dark:text-gray-100">
                                                    {prediction.match.teamA.name}
                                                </span>
                                            </div>

                                            {/* VS */}
                                            <div className="px-3 py-1 sm:px-4 sm:py-2 bg-white dark:bg-gray-800 rounded-lg self-center">
                                                <span className="text-gray-500 dark:text-gray-400 font-bold text-xs sm:text-sm">
                                                    VS
                                                </span>
                                            </div>

                                            {/* Team B */}
                                            <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3 flex-1">
                                                <img
                                                    src={prediction.match.teamB.flagUrl}
                                                    alt={prediction.match.teamB.name}
                                                    className="w-10 h-8 sm:w-12 sm:h-9 object-cover rounded shadow-sm shrink-0 sm:order-2"
                                                />
                                                <span className="font-semibold text-sm sm:text-lg text-gray-900 dark:text-gray-100 sm:order-1">
                                                    {prediction.match.teamB.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tu predicción y puntos - En una línea en móvil */}
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Tu predicción:
                                            </span>
                                            <div className="flex items-center gap-2 bg-cyan-500 dark:bg-cyan-600 px-3 py-2 rounded-lg shadow-sm w-fit">
                                                <img
                                                    src={prediction.selectedTeam.flagUrl}
                                                    alt={prediction.selectedTeam.name}
                                                    className="w-6 h-5 object-cover rounded shrink-0"
                                                />
                                                <span className="font-bold text-white text-sm sm:text-base">
                                                    {prediction.selectedTeam.name}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                                            <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                                {prediction.points} pts
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer: Fecha y acciones */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-4 h-4 shrink-0" />
                                            <span>{formatDate(prediction.match.matchDate)}</span>
                                        </div>

                                        {!prediction.match.isFinished && (
                                            <div className="flex gap-2">
                                                <Button
                                                    icon={<Pencil className="w-4 h-4" />}
                                                    onClick={() => handleEditClick(prediction)}
                                                    className="flex items-center gap-2"
                                                    size="small"
                                                >
                                                    <span className="hidden sm:inline">Editar</span>
                                                </Button>
                                                <Button
                                                    icon={<Trash2 className="w-4 h-4" />}
                                                    onClick={() => handleDeletePrediction(prediction)}
                                                    danger
                                                    size="small"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de edición */}
            <Modal
                title={
                    <div className="text-lg font-semibold">
                        Editar Predicción
                    </div>
                }
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    setSelectedPrediction(null);
                }}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => {
                            setEditModalVisible(false);
                            setSelectedPrediction(null);
                        }}
                    >
                        Cancelar
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleUpdatePrediction}
                        disabled={!newTeamId || newTeamId === selectedPrediction?.selectedTeam.id_team}
                    >
                        Guardar cambios
                    </Button>
                ]}
                width={600}
            >
                {selectedPrediction && (
                    <div className="space-y-6 py-4">
                        {/* Partido actual */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                                Partido
                            </p>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={selectedPrediction.match.teamA.flagUrl}
                                        alt={selectedPrediction.match.teamA.name}
                                        className="w-10 h-8 object-cover rounded shadow-sm"
                                    />
                                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                                        {selectedPrediction.match.teamA.name}
                                    </span>
                                </div>
                                <span className="text-gray-400 dark:text-gray-500 font-bold px-3">VS</span>
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                                        {selectedPrediction.match.teamB.name}
                                    </span>
                                    <img
                                        src={selectedPrediction.match.teamB.flagUrl}
                                        alt={selectedPrediction.match.teamB.name}
                                        className="w-10 h-8 object-cover rounded shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Predicción actual */}
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2 uppercase tracking-wide">
                                Tu predicción actual
                            </p>
                            <div className="flex items-center gap-2">
                                <img
                                    src={selectedPrediction.selectedTeam.flagUrl}
                                    alt={selectedPrediction.selectedTeam.name}
                                    className="w-8 h-6 object-cover rounded"
                                />
                                <span className="font-bold text-blue-900 dark:text-blue-100">
                                    {selectedPrediction.selectedTeam.name}
                                </span>
                            </div>
                        </div>

                        {/* Nueva predicción */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Cambiar predicción a:
                            </label>
                            <Select
                                size="large"
                                className="w-full"
                                value={newTeamId}
                                onChange={setNewTeamId}
                                options={[
                                    {
                                        value: selectedPrediction.match.teamA.id_team,
                                        label: (
                                            <div className="flex items-center gap-3 py-1">
                                                <img
                                                    src={selectedPrediction.match.teamA.flagUrl}
                                                    alt={selectedPrediction.match.teamA.name}
                                                    className="w-8 h-6 object-cover rounded"
                                                />
                                                <span className="font-medium">
                                                    {selectedPrediction.match.teamA.name}
                                                </span>
                                            </div>
                                        )
                                    },
                                    {
                                        value: selectedPrediction.match.teamB.id_team,
                                        label: (
                                            <div className="flex items-center gap-3 py-1">
                                                <img
                                                    src={selectedPrediction.match.teamB.flagUrl}
                                                    alt={selectedPrediction.match.teamB.name}
                                                    className="w-8 h-6 object-cover rounded"
                                                />
                                                <span className="font-medium">
                                                    {selectedPrediction.match.teamB.name}
                                                </span>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}