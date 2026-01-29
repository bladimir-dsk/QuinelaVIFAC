import { useState } from "react";
import { Alert } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { useApi } from "../../../hooks/useApi";
import Top10Card from "../../../components/rankings/Top10Card";
import RankingTable from "../../../components/rankings/RankingTable";

export default function RankingScreen_Participant() {
    const [currentPage, setCurrentPage] = useState(1);

    const endpoint = `/user-prediction/public/ranking/global?page=${currentPage}`;

    const {
        data,
        loading,
        error
    } = useApi(endpoint);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (error) {
        return (
            <div className="p-4">
                <Alert
                    title="Error"
                    description={error}
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    return (
        <div className="p-3 sm:p-4">
            {/* Encabezado */}
            <div className="bg-linear-to-r from-yellow-500 to-orange-600 rounded-lg p-4 sm:p-6 mb-6 shadow-lg">
                <div className="flex flex-row items-center gap-3">
                    <div className="flex-1">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                            Ranking global de participantes
                        </h1>
                        <p className="text-white/90 text-sm sm:text-base">
                            {data?.total || 0} participantes registrados
                        </p>
                    </div>
                </div>
            </div>

            {/* Top 10 Card */}
            {data?.top10 && data.top10.length > 0 && (
                <Top10Card data={data.top10} />
            )}

            {/* Tabla de Ranking */}
            <div className="bg-white rounded-lg dark:bg-[#141414] shadow-sm mt-5 p-4">
                <h2 className="text-lg font-semibold mb-4">
                    Ranking completo
                </h2>
                <RankingTable
                    data={data?.ranking || []}
                    loading={loading}
                    pagination={data?.paginacion}
                    total={data?.total || 0}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}