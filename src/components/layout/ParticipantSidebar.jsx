import React from 'react';
import { Layout, Menu, theme as antdTheme } from 'antd';
import {
    LayoutDashboard,
    Trophy,
    UsersRound,
    User,
    LogOut,
    Moon,
    Sun,
    BarChart3,
    House
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAuth } from '../../hooks/useAuth';
const { Sider } = Layout;
const { useToken } = antdTheme;

export default function ParticipantSidebar({ collapsed, onCollapse }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { token } = useToken();

    const menuItems = [
        {
            key: '/participante/home',
            icon: <House size={18} />,
            label: 'Inicio',
        },
        {
            key: '/participante/predicciones',
            icon: <UsersRound size={18} />,
            label: 'Predicciones',
        },
        {
            key: '#',
            icon: <Trophy size={18} />,
            label: 'Ranking',
        },
        {
            key: '#',
            icon: <BarChart3 size={18} />,
            label: 'Mis Estadísticas',
        },
    ];

    const handleMenuClick = ({ key }) => {
        navigate(key);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getSelectedKey = () => {
        const exactMatch = menuItems.find(item => item.key === location.pathname);
        if (exactMatch) return [location.pathname];
        return ['/participante/home'];
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            breakpoint="lg"
            width={200}
            trigger={null}
            collapsedWidth={80}
            theme={isDarkMode ? 'dark' : 'light'}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: token.colorBgContainer,
                borderRight: `1px solid ${token.colorBorderSecondary}`,
            }}
        >
            <div
                className="flex flex-col h-full"
                style={{
                    backgroundColor: token.colorBgContainer,
                    color: token.colorText
                }}
            >
                <div
                    className="h-16 flex items-center justify-center"
                    style={{
                        borderBottom: `1px solid ${token.colorBorderSecondary}`,
                        backgroundColor: token.colorBgContainer
                    }}
                >
                    {!collapsed ? (
                        <div className="flex items-center space-x-2">
                            <img src="/Logo-vifac.webp" alt="VIFAC" className="w-10 h-10" />
                            <div>
                                <h1
                                    className="text-base font-bold leading-none mb-0"
                                    style={{ color: token.colorText }}
                                >
                                    VIFAC
                                </h1>
                                <h1
                                    className="text-xs leading-none mt-0"
                                    style={{ color: token.colorTextSecondary }}
                                >
                                    Mundial 2026
                                </h1>
                            </div>
                        </div>
                    ) : (
                        <img src="/Logo-vifac.webp" alt="VIFAC" className="w-8 h-8" />
                    )}
                </div>

                <div className="flex-1 overflow-y-auto">
                    <Menu
                        mode="inline"
                        selectedKeys={getSelectedKey()}
                        items={menuItems}
                        onClick={handleMenuClick}
                        style={{
                            border: 0,
                            backgroundColor: token.colorBgContainer
                        }}
                    />
                </div>

                <div
                    className="p-2 space-y-2"
                    style={{
                        borderTop: `1px solid ${token.colorBorderSecondary}`,
                        backgroundColor: token.colorBgContainer
                    }}
                >
                    <div>
                        <button
                            onClick={toggleDarkMode}
                            className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors"
                            style={{
                                backgroundColor: token.colorBgTextHover,
                                color: token.colorText
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = token.colorBgTextActive;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = token.colorBgTextHover;
                            }}
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            {!collapsed && <span className="text-sm">Modo {isDarkMode ? 'Claro' : 'Oscuro'}</span>}
                        </button>
                    </div>

                    <div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg text-white transition-colors"
                            style={{ backgroundColor: token.colorError }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = token.colorErrorHover}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = token.colorError}
                        >
                            <LogOut size={18} />
                            {!collapsed && <span className="text-sm">Cerrar sesión</span>}
                        </button>
                    </div>

                </div>
            </div>
        </Sider>
    );
}