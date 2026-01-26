import React from 'react';
import { Layout, Menu, Drawer, theme as antdTheme } from 'antd';
import {
    LayoutDashboard,
    Users,
    Trophy,
    BarChart3,
    UsersRound,
    Settings,
    LogOut,
    Moon,
    Sun,
    TrendingUpDown,
    TrendingUp
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDarkMode } from '../../context/DarkModeContext';
const { Sider } = Layout;
const { useToken } = antdTheme;

export default function AdminSidebar({ collapsed, onCollapse, isMobile, open, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { token } = useToken(); // Obtener tokens del tema actual

    const menuItems = [
        {
            key: '/admin/dashboard',
            icon: <LayoutDashboard size={18} />,
            label: 'Dashboard',
        },
        {
            key: 'equipos',
            icon: <UsersRound size={18} />,
            label: 'Equipos',
            children: [
                {
                    key: '/admin/equipos/gestion',
                    label: 'Gestión de equipos',
                },
                {
                    key: '/admin/equipos/grupos',
                    label: 'Grupos',
                },
            ],
        },
        {
            key: '/admin/fases',
            icon: <TrendingUpDown size={18} />,
            label: 'Fases'
        },
        {
            key: '/admin/partidos',
            icon: <Trophy size={18} />,
            label: 'Partidos',
        },
        {
            key: 'ranking',
            icon: <TrendingUp size={18} />,
            label: 'Ranking',
            children: [
                {
                    key: '#',
                    label: 'Ranking general',
                },
                {
                    key: '#',
                    label: 'Por equipos',
                },
            ],
        },
    ];

    const handleMenuClick = ({ key }) => {
        navigate(key);
        if (isMobile) {
            onClose();
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getSelectedKey = () => {
        const exactMatch = menuItems.find(item => item.key === location.pathname);
        if (exactMatch) return [location.pathname];

        for (const item of menuItems) {
            if (item.children) {
                const childMatch = item.children.find(child => child.key === location.pathname);
                if (childMatch) return [childMatch.key];
            }
        }
        return ['/admin/dashboard'];
    };

    const getOpenKeys = () => {
        for (const item of menuItems) {
            if (item.children) {
                const childMatch = item.children.find(child => child.key === location.pathname);
                if (childMatch) return [item.key];
            }
        }
        return [];
    };

    const sidebarContent = (
        <div
            className="flex flex-col h-full"
            style={{
                backgroundColor: token.colorBgContainer,
                color: token.colorText
            }}
        >
            {/* Header del Sidebar */}
            <div
                className="h-16 flex items-center justify-center"
                style={{
                    borderBottom: `1px solid ${token.colorBorderSecondary}`,
                    backgroundColor: token.colorBgContainer
                }}
            >
                {(!collapsed || isMobile) ? (
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

            {/* Menu */}
            <div className="flex-1 overflow-y-auto">
                <Menu
                    mode="inline"
                    selectedKeys={getSelectedKey()}
                    defaultOpenKeys={getOpenKeys()}
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{
                        border: 0,
                        backgroundColor: token.colorBgContainer
                    }}
                />
            </div>

            {/* Footer con botones */}
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
                        {(!collapsed || isMobile) && (
                            <span className="text-sm">Modo {isDarkMode ? 'Claro' : 'Oscuro'}</span>
                        )}
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
                        {(!collapsed || isMobile) && <span className="text-sm">Cerrar sesión</span>}
                    </button>
                </div>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <Drawer
                placement="left"
                onClose={onClose}
                open={open}
                closable={false}
                width={280}
                styles={{
                    body: {
                        padding: 0,
                        backgroundColor: token.colorBgContainer
                    },
                    header: { display: 'none' }
                }}
            >
                {sidebarContent}
            </Drawer>
        );
    }

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
                backgroundColor: token.colorBgContainer
            }}
        >
            {sidebarContent}
        </Sider>
    );
}