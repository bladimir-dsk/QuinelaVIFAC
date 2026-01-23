import React from 'react';
import { Layout, Menu } from 'antd';
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
import { useDarkMode } from '../../hooks/useDarkMode';
import { useAuth } from '../../hooks/useAuth';
const { Sider } = Layout;

export default function ParticipantSidebar({ collapsed, onCollapse }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const menuItems = [
        {
            key: '/participante/home',
            icon: <House size={18} />,
            label: 'Inicio',
        },
        {
            key: '#',
            icon: <UsersRound size={18} />,
            label: 'Mi Equipo',
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
        return ['/participante/dashboard'];
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            breakpoint="lg"
            width={200}
            collapsedWidth={80}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                background: '#ffffff',
                borderRight: '1px solid #e5e7eb',
            }}
        >
            <div className="flex flex-col h-full bg-white">
                <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-white">
                    {!collapsed ? (
                        <div className="flex items-center space-x-2">
                            <img src="/Logo-vifac.webp" alt="VIFAC" className="w-10 h-10" />
                            <div>
                                <h1 className="text-base font-bold text-gray-800 leading-none mb-0">VIFAC</h1>
                                <h1 className="text-xs text-gray-500 leading-none mt-0">Mundial 2026</h1>
                            </div>
                        </div>
                    ) : (
                        <img src="/Logo-vifac.webp" alt="VIFAC" className="w-8 h-8" />
                    )}
                </div>

                <div className="flex-1 overflow-y-auto bg-white">
                    <Menu
                        mode="inline"
                        selectedKeys={getSelectedKey()}
                        items={menuItems}
                        onClick={handleMenuClick}
                        style={{
                            border: 0,
                            background: '#ffffff'
                        }}
                    />
                </div>

                <div className="border-t border-gray-200 p-2 space-y-2 bg-white">
                    <div>
                        <button
                            onClick={toggleDarkMode}
                            className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors bg-gray-200 hover:bg-gray-500 text-gray-800"
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            {!collapsed && <span className="text-sm">Modo {isDarkMode ? 'Claro' : 'Oscuro'}</span>}
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
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