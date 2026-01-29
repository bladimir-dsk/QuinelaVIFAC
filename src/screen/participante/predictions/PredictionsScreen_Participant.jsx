import React, { useState, useEffect } from "react";
import { Progress, message } from "antd";
import { CheckCircle, Calendar } from "lucide-react";
import { useApi } from "../../../hooks/useApi";

export default function PredictionsScreen_Participant() {
  const {
    data: matches,
    loading,
    fetchData: refetchMatches,
  } = useApi("/matches/available-for-voting");

  const { data: userPredictions, fetchData: refetchPredictions } = useApi("/user-prediction");

  const {
    postData,
    patchData,
    deleteData,
    loading: submitting,
  } = useApi("/user-prediction", {}, false);

  const [selectedPicks, setSelectedPicks] = useState({});
  const [submittingPicks, setSubmittingPicks] = useState({});

  // Cargar predicciones existentes cuando cambien
  useEffect(() => {
    if (userPredictions && matches && Array.isArray(userPredictions)) {
      const predictions = {};
      userPredictions.forEach((pred) => {
        const match = matches.find((m) => m.id_match === pred.id_match);
        if (match) {
          const teamSide = pred.id_team === match.teamA.id_team ? "A" : "B";
          predictions[pred.id_match] = {
            teamSide,
            id_team: pred.id_team,
          };
        }
      });
      setSelectedPicks(predictions);
    }
  }, [userPredictions, matches]);

  const totalMatches = matches?.length || 0;
  const votedMatches = Object.keys(selectedPicks).length;
  const progressPercent =
    totalMatches > 0 ? (votedMatches / totalMatches) * 100 : 0;

  const handleSelectTeam = async (matchId, teamSide) => {
    const match = matches.find((m) => m.id_match === matchId);
    if (!match) return;

    const id_team =
      teamSide === "A" ? match.teamA.id_team : match.teamB.id_team;
    const alreadySelected = selectedPicks[matchId];

    // Si ya está seleccionado el mismo equipo, eliminar la predicción
    if (alreadySelected?.teamSide === teamSide) {
      await handleDeletePrediction(matchId);
      return;
    }

    setSubmittingPicks((prev) => ({ ...prev, [matchId]: true }));

    try {
      const payload = {
        id_match: matchId,
        id_team: id_team,
      };

      if (alreadySelected) {
        // PATCH - Cambiar predicción
        await patchData(payload);
        message.success("Predicción actualizada correctamente");
      } else {
        // POST - Nueva predicción
        await postData(payload);
        message.success("Predicción guardada correctamente");
      }

      // Actualizar estado local inmediatamente para mejor UX
      setSelectedPicks((prev) => ({
        ...prev,
        [matchId]: { teamSide, id_team },
      }));

      // Refrescar predicciones y matches desde el servidor
      await refetchPredictions();
      await refetchMatches();
    } catch (error) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else if (error.message) {
        message.error(error.message);
      } else {
        message.error("Error al guardar la predicción");
      }
    } finally {
      setSubmittingPicks((prev) => ({ ...prev, [matchId]: false }));
    }
  };

  const handleDeletePrediction = async (matchId) => {
    setSubmittingPicks((prev) => ({ ...prev, [matchId]: true }));

    try {
      await deleteData(matchId);

      // Actualizar estado local inmediatamente
      setSelectedPicks((prev) => {
        const newPicks = { ...prev };
        delete newPicks[matchId];
        return newPicks;
      });

      message.success("Predicción eliminada");

      // Refrescar predicciones y matches desde el servidor
      await refetchPredictions();
      await refetchMatches();
    } catch (error) {
      if (error.message) {
        message.error(error.message);
      } else {
        message.error("Error al eliminar la predicción");
      }
    } finally {
      setSubmittingPicks((prev) => ({ ...prev, [matchId]: false }));
    }
  };

  const formatMatchDate = (date) => {
    const matchDate = new Date(date);
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const month = months[matchDate.getMonth()];
    const day = matchDate.getDate().toString().padStart(2, "0");

    let hours = matchDate.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursFormatted = hours.toString().padStart(2, "0");
    const minutes = matchDate.getMinutes().toString().padStart(2, "0");

    return `${month} ${day}, ${hoursFormatted}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 dark:bg-zinc-900 bg-white rounded-lg">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header y Progress Card en la misma fila (responsive) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 md:gap-6 items-start">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              <span className="dark:text-cyan-400 text-cyan-700">
                PREDICCIONES 2026
              </span>
            </h1>
            <p className="dark:text-gray-500 text-gray-600 text-sm md:text-base">
              Selecciona tus predicciones para los próximos partidos. Cada voto
              correcto suma puntos.
            </p>
          </div>

          {/* Progress Card - Solo mostrar si hay partidos */}
          {totalMatches > 0 && (
            <div className="dark:bg-[#132942] bg-cyan-100 dark:border-gray-700 border-cyan-300 border rounded-xl p-2 md:p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="dark:text-gray-400 text-gray-600 text-xs md:text-sm uppercase tracking-wider font-semibold">
                  Progreso de votación
                </span>
                <span className="dark:text-cyan-400 text-cyan-700 text-sm md:text-base font-bold">
                  {votedMatches} / {totalMatches} Votados
                </span>
              </div>
              <Progress
                percent={progressPercent}
                showInfo={false}
                strokeColor="#00d4ff"
                railColor="#99a1af"
                strokeWidth={8}
              />
              <p className="dark:text-gray-500 text-gray-600 text-xs mt-2">
                {totalMatches - votedMatches} PARTIDOS RESTANTES
              </p>
            </div>
          )}
        </div>

        {/* Mensaje cuando no hay partidos */}
        {!loading && totalMatches === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 md:py-5">
            <div className="dark:bg-[#132942] bg-cyan-50 rounded-2xl p-8 md:p-12 max-w-md text-center border-2 dark:border-gray-700 border-cyan-200">
              <Calendar
                size={64}
                className="md:w-20 md:h-20 mx-auto mb-6 dark:text-cyan-400 text-cyan-600 opacity-50"
                strokeWidth={1.5}
              />
              <h3 className="text-xl md:text-2xl font-bold dark:text-white text-gray-900 mb-3">
                No hay partidos disponibles
              </h3>
              <p className="dark:text-gray-400 text-gray-600 text-sm md:text-base">
                Aún no se han programado partidos para realizar predicciones.
                Vuelve pronto para participar.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Match Schedule Title */}
            <h2 className="text-center dark:text-gray-400 text-gray-600 pb-5 text-xs md:text-sm uppercase tracking-widest font-semibold">
              Calendario de Partidos
            </h2>

            {/* Matches List */}
            <div className="space-y-4 md:space-y-6">
              {matches?.map((match) => {
                const isTeamAPicked =
                  selectedPicks[match.id_match]?.teamSide === "A";
                const isTeamBPicked =
                  selectedPicks[match.id_match]?.teamSide === "B";
                const isSubmitting = submittingPicks[match.id_match];

                return (
                  <div key={match.id_match} className="space-y-3 md:space-y-0">
                    {/* Layout móvil (vertical) */}
                    <div className="md:hidden">
                      {/* Team A */}
                      <button
                        onClick={() => handleSelectTeam(match.id_match, "A")}
                        disabled={isSubmitting}
                        className={`
                                                    w-full flex items-center justify-between p-4 rounded-xl
                                                    transition-all duration-300 hover:scale-[1.02]
                                                    ${
                                                      isTeamAPicked
                                                        ? "dark:bg-[#0c4a5a] bg-cyan-100 border-2 dark:border-cyan-400 border-cyan-500 dark:shadow-lg dark:shadow-cyan-400/20 shadow-md shadow-cyan-500/20"
                                                        : "dark:bg-[#132942] bg-cyan-100 border-2 border-transparent dark:hover:border-gray-600 hover:border-cyan-400"
                                                    }
                                                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                                                `}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 dark:bg-gray-700 bg-white rounded-lg flex items-center justify-center border-2 dark:border-gray-600 border-gray-300 shrink-0">
                            <img
                              src={match.teamA.flagUrl}
                              alt={match.teamA.name}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-1">
                              {isTeamAPicked ? "Seleccionado" : "Equipo A"}
                            </p>
                            <p className="text-base font-bold uppercase italic dark:text-white text-gray-900">
                              {match.teamA.name}
                            </p>
                          </div>
                        </div>
                        {isTeamAPicked && (
                          <CheckCircle
                            size={24}
                            className="dark:text-cyan-400 text-cyan-600 shrink-0"
                          />
                        )}
                      </button>

                      {/* VS Indicator móvil */}
                      <div className="flex items-center justify-center gap-2 py-2">
                        <div className="flex-1 h-[2px] dark:bg-gray-700 bg-cyan-200"></div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#132942] bg-cyan-50 border-2 dark:border-cyan-600 border-cyan-300">
                          <span className="text-xs font-bold dark:text-cyan-400 text-cyan-700">
                            VS
                          </span>
                          <Calendar
                            size={12}
                            className="dark:text-gray-500 text-gray-600"
                          />
                          <span className="text-[10px] dark:text-gray-400 text-gray-600 whitespace-nowrap">
                            {formatMatchDate(match.matchDate)}
                          </span>
                        </div>
                        <div className="flex-1 h-[2px] dark:bg-gray-700 bg-cyan-200"></div>
                      </div>

                      {/* Team B */}
                      <button
                        onClick={() => handleSelectTeam(match.id_match, "B")}
                        disabled={isSubmitting}
                        className={`
                                                    w-full flex items-center justify-between p-4 rounded-xl
                                                    transition-all duration-300 hover:scale-[1.02]
                                                    ${
                                                      isTeamBPicked
                                                        ? "dark:bg-[#0c4a5a] bg-cyan-100 border-2 dark:border-cyan-400 border-cyan-500 dark:shadow-lg dark:shadow-cyan-400/20 shadow-md shadow-cyan-500/20"
                                                        : "dark:bg-[#132942] bg-cyan-100 border-2 border-transparent dark:hover:border-gray-600 hover:border-cyan-400"
                                                    }
                                                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                                                `}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 dark:bg-gray-700 bg-white rounded-lg flex items-center justify-center border-2 dark:border-gray-600 border-gray-300 shrink-0">
                            <img
                              src={match.teamB.flagUrl}
                              alt={match.teamB.name}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-1">
                              {isTeamBPicked ? "Seleccionado" : "Equipo B"}
                            </p>
                            <p className="text-base font-bold uppercase italic dark:text-white text-gray-900">
                              {match.teamB.name}
                            </p>
                          </div>
                        </div>
                        {isTeamBPicked && (
                          <CheckCircle
                            size={24}
                            className="dark:text-cyan-400 text-cyan-600 shrink-0"
                          />
                        )}
                      </button>

                      {/* Separador móvil */}
                      {match.id_match !==
                        matches[matches.length - 1]?.id_match && (
                        <div className="md:hidden py-3">
                          <div className="w-full h-[2px] rounded-full"></div>
                        </div>
                      )}
                    </div>

                    {/* Layout desktop (horizontal) */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                      {/* Team A */}
                      <button
                        onClick={() => handleSelectTeam(match.id_match, "A")}
                        disabled={isSubmitting}
                        className={`
                                                    flex items-center justify-between p-4 rounded-xl
                                                    transition-all duration-300 hover:scale-[1.02]
                                                    ${
                                                      isTeamAPicked
                                                        ? "dark:bg-[#0c4a5a] bg-cyan-100 border-2 dark:border-cyan-400 border-cyan-500 dark:shadow-lg dark:shadow-cyan-400/20 shadow-md shadow-cyan-500/20"
                                                        : "dark:bg-[#132942] bg-cyan-100 border-2 border-transparent dark:hover:border-gray-600 hover:border-cyan-400"
                                                    }
                                                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                                                `}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 dark:bg-gray-700 bg-white rounded-lg flex items-center justify-center border-2 dark:border-gray-600 border-gray-300 shrink-0">
                            <img
                              src={match.teamA.flagUrl}
                              alt={match.teamA.name}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <div className="text-left">
                            <p className="text-xs dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-1">
                              {isTeamAPicked ? "Seleccionado" : "Equipo A"}
                            </p>
                            <p className="text-lg lg:text-xl font-bold uppercase italic dark:text-white text-gray-900">
                              {match.teamA.name}
                            </p>
                          </div>
                        </div>
                        {isTeamAPicked && (
                          <CheckCircle
                            size={24}
                            className="dark:text-cyan-400 text-cyan-600 shrink-0"
                          />
                        )}
                      </button>

                      {/* VS Indicator desktop */}
                      <div className="flex flex-col items-center justify-center gap-3 px-6">
                        <div className="w-12 h-12 rounded-full dark:bg-[#132942] bg-cyan-100 border-2 dark:border-cyan-600 border-cyan-300 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold dark:text-white text-gray-900">
                            VS
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="text-xs dark:text-gray-500 text-gray-600 whitespace-nowrap">
                            {formatMatchDate(match.matchDate)}
                          </p>
                        </div>
                      </div>

                      {/* Team B */}
                      <button
                        onClick={() => handleSelectTeam(match.id_match, "B")}
                        disabled={isSubmitting}
                        className={`
                                                    flex items-center justify-between p-4 rounded-xl
                                                    transition-all duration-300 hover:scale-[1.02]
                                                    ${
                                                      isTeamBPicked
                                                        ? "dark:bg-[#0c4a5a] bg-cyan-100 border-2 dark:border-cyan-400 border-cyan-500 dark:shadow-lg dark:shadow-cyan-400/20 shadow-md shadow-cyan-500/20"
                                                        : "dark:bg-[#132942] bg-cyan-100 border-2 border-transparent dark:hover:border-gray-600 hover:border-cyan-400"
                                                    }
                                                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                                                `}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 dark:bg-gray-700 bg-white rounded-lg flex items-center justify-center border-2 dark:border-gray-600 border-gray-300 shrink-0">
                            <img
                              src={match.teamB.flagUrl}
                              alt={match.teamB.name}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <div className="text-left">
                            <p className="text-xs dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-1">
                              {isTeamBPicked ? "Seleccionado" : "Equipo B"}
                            </p>
                            <p className="text-lg lg:text-xl font-bold uppercase italic dark:text-white text-gray-900">
                              {match.teamB.name}
                            </p>
                          </div>
                        </div>
                        {isTeamBPicked && (
                          <CheckCircle
                            size={24}
                            className="dark:text-cyan-400 text-cyan-600 shrink-0"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* More matches placeholder */}
            <div className="flex flex-col items-center justify-center py-12 md:py-16 dark:text-gray-500 text-gray-600">
              <Calendar
                size={48}
                className="md:w-16 md:h-16 mb-4 opacity-50"
                strokeWidth={1}
              />
              <p className="text-xs md:text-sm uppercase tracking-wider font-semibold">
                Más partidos serán anunciados
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
