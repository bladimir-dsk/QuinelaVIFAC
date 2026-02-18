import { Card, Avatar, Space } from "antd";
import { TrophyOutlined, UserOutlined, StarOutlined } from "@ant-design/icons";

export default function Top10Card({ data = [] }) {
    const getMedalColor = (position) => {
        const colors = {
            1: "#ffd700",
            2: "#c0c0c0",
            3: "#cd7f32"
        };
        return colors[position] || "#00b8db";
    };

    return (
        <Card
            title={
                <Space>
                    <StarOutlined style={{ color: "#faad14" }} />
                    <span>Top 10 mejores participantes</span>
                </Space>
            }
            className="mb-6 shadow-sm"
        >
            {/* Contenedor con scroll horizontal */}
            <div className="overflow-x-auto pb-2">
                <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
                    {data.slice(0, 10).map((user) => (
                        <Card
                            key={user.userEmail}
                            size="small"
                            className="text-center hover:shadow-sm transition-shadow shrink-0"
                            style={{
                                borderTop: `4px solid ${getMedalColor(user.position)}`,
                                width: '200px',
                            }}>
                            <div className="flex flex-col items-center gap-2">
                                <div className="relative">
                                    <Avatar
                                        size={64}
                                        icon={<UserOutlined />}
                                        style={{
                                            backgroundColor: getMedalColor(user.position),
                                        }}
                                    />
                                    {user.position <= 3 && (
                                        <div className="absolute -top-2 -right-2 bg-white rounded-full p-1">
                                            <TrophyOutlined
                                                style={{
                                                    fontSize: "20px",
                                                    color: getMedalColor(user.position),
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <div className="font-bold text-2xl">
                                        #{user.position}
                                    </div>
                                    <div className="font-semibold truncate px-2">
                                        {user.username}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate px-2">
                                        {user.userEmail}
                                    </div>
                                </div>
                                <div className="w-full pt-2 border-t">
                                    <div className="font-bold text-green-600 text-lg">
                                        {user.points} pts
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        {user.totalPredictions} predicciones
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Card>
    );
}