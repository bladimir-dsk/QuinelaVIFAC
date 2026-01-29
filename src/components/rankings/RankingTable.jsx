import { Table, Tag, Avatar } from "antd";
import { TrophyOutlined, UserOutlined } from "@ant-design/icons";

export default function RankingTable({
    data = [],
    loading = false,
    pagination = null,
    onPageChange = () => { },
    total = 0,
}) {
    const columns = [
        {
            title: "Posición",
            dataIndex: "position",
            key: "position",
            align: "center",
            width: 100,
            render: (position) => {
                const colors = {
                    1: "gold",
                    2: "silver",
                    3: "#cd7f32"
                };

                return (
                    <div className="flex items-center justify-center gap-2">
                        {position <= 3 && (
                            <TrophyOutlined
                                style={{
                                    fontSize: "20px",
                                    color: colors[position]
                                }}
                            />
                        )}
                        <span className={`font-bold ${position <= 3 ? 'text-lg' : ''}`}>
                            #{position}
                        </span>
                    </div>
                );
            },
        },
        {
            title: "Participante",
            key: "usuario",
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <Avatar
                        icon={<UserOutlined />}
                        style={{
                            backgroundColor: record.position <= 3
                                ? (record.position === 1 ? "#ffd700"
                                    : record.position === 2 ? "#c0c0c0"
                                        : "#cd7f32")
                                : "#00b8db"
                        }}
                    />
                    <div>
                        <div className="font-semibold text-base">
                            {record.username}
                        </div>
                        <div className="text-gray-500 text-xs dark:text-gray-400">
                            {record.userEmail}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Puntos",
            dataIndex: "points",
            key: "points",
            align: "center",
            sorter: (a, b) => b.points - a.points,
            render: (points) => (
                <Tag
                    color="green"
                    style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "4px 12px"
                    }}
                >
                    {points} pts
                </Tag>
            ),
        },
        {
            title: "Predicciones",
            key: "predicciones",
            align: "center",
            render: (_, record) => (
                <div className="space-y-1">
                    <div className="font-semibold">
                        Total: <span className="text-blue-600">{record.totalPredictions}</span>
                    </div>
                    <div className="flex gap-3 justify-center text-xs">
                        <span className="text-green-600">
                            ✓ {record.correctPredictions}
                        </span>
                        <span className="text-red-600">
                            ✗ {record.incorrectPredictions}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: "Precisión",
            dataIndex: "accuracy",
            key: "accuracy",
            align: "center",
            sorter: (a, b) => b.accuracy - a.accuracy,
            render: (accuracy) => {
                const color = accuracy >= 70 ? "green"
                    : accuracy >= 50 ? "orange"
                        : accuracy > 0 ? "red"
                            : "default";

                return (
                    <Tag
                        color={color}
                        style={{
                            fontSize: "13px",
                            fontWeight: "600"
                        }}
                    >
                        {accuracy.toFixed(1)}%
                    </Tag>
                );
            },
        },
    ];

    const dataSource = data.map((item) => ({
        key: item.userEmail,
        ...item,
    }));

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            scroll={{ x: "max-content" }}
            pagination={
                pagination ? {
                    current: pagination.page,
                    pageSize: pagination.limit,
                    total: total, 
                    showTotal: (total) => `Total ${total} participantes`,
                    onChange: onPageChange,
                    showSizeChanger: false,
                } : false
            }
            locale={{
                emptyText: "No hay datos de ranking disponibles",
            }}
        />
    );
}