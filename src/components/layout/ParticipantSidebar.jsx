import React, { lazy } from 'react';
import { Layout, Menu, Drawer, theme as antdTheme } from 'antd';
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

export default function ParticipantSidebar({ collapsed, onCollapse, isMobile, open, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { token } = useToken();

    // Colores estáticos para el sidebar
    const SIDEBAR_COLORS = {
        background: '#00b8db',
        backgroundHover: '#00d3f2',
        backgroundActive: '#104e64',
        text: '#ffffff',
        textSecondary: '#a0a0a0',
        border: '#0092b8',
        error: '#e74c3c',
        errorHover: '#c0392b',
        menuSelected: '#007595'
    };

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
            key: '/participante/rankings',
            icon: <Trophy size={18} />,
            label: 'Ranking',
        },
        {
            key: '/participante/mi-perfil',
            icon: <User size={18} />,
            label: 'Mi perfil'
        }
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
        return ['/participante/home'];
    };

    // Estilos CSS en línea para sobrescribir Ant Design
    const menuStyles = `
        .custom-sidebar-menu.ant-menu-dark {
            background-color: ${SIDEBAR_COLORS.background} !important;
        }
        .custom-sidebar-menu.ant-menu-dark .ant-menu-item {
            background-color: ${SIDEBAR_COLORS.background} !important;
            color: ${SIDEBAR_COLORS.text} !important;
        }
        .custom-sidebar-menu.ant-menu-dark .ant-menu-item:hover {
            background-color: ${SIDEBAR_COLORS.backgroundHover} !important;
            color: ${SIDEBAR_COLORS.text} !important;
        }
        .custom-sidebar-menu.ant-menu-dark .ant-menu-item-selected {
            background-color: ${SIDEBAR_COLORS.menuSelected} !important;
            color: ${SIDEBAR_COLORS.text} !important;
        }
        .custom-sidebar-menu.ant-menu-dark .ant-menu-item-selected:hover {
            background-color: ${SIDEBAR_COLORS.menuSelected} !important;
        }
        .custom-sidebar-menu.ant-menu-dark .ant-menu-item-active {
            background-color: ${SIDEBAR_COLORS.backgroundHover} !important;
        }
    `;

    const sidebarContent = (
        <div
            className="flex flex-col h-full"
            style={{
                backgroundColor: SIDEBAR_COLORS.background,
                color: SIDEBAR_COLORS.text
            }}
        >
            <style>{menuStyles}</style>
            
            {/* Header del Sidebar */}
            <div
                className="h-16 flex items-center justify-center"
                style={{
                    borderBottom: `1px solid ${SIDEBAR_COLORS.border}`,
                    backgroundColor: SIDEBAR_COLORS.background
                }}
            >
                {(!collapsed || isMobile) ? (
                    <div className="flex items-center space-x-2">
                        <img src="/Logo-vifac.webp" alt="VIFAC" className="w-10 h-10" />
                        <div>
                            <h1
                                className="text-base font-bold leading-none mb-0 text-white"
                            >
                                VIFAC
                            </h1>
                            <h1
                                className="text-xs leading-none mt-0 text-gray-700"
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
            <div className="flex-1 overflow-y-auto" style={{ backgroundColor: SIDEBAR_COLORS.background }}>
                <Menu
                    mode="inline"
                    selectedKeys={getSelectedKey()}
                    items={menuItems}
                    onClick={handleMenuClick}
                    theme="dark"
                    className="custom-sidebar-menu"
                    style={{
                        border: 0,
                        backgroundColor: SIDEBAR_COLORS.background,
                    }}
                />
            </div>

            {/* Footer con botones */}
            <div
                className="p-2 space-y-2"
                style={{
                    borderTop: `1px solid ${SIDEBAR_COLORS.border}`,
                    backgroundColor: SIDEBAR_COLORS.background
                }}
            >
                <div>
                    <button
                        onClick={toggleDarkMode}
                        className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors"
                        style={{
                            backgroundColor: SIDEBAR_COLORS.backgroundHover,
                            color: SIDEBAR_COLORS.text
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = SIDEBAR_COLORS.backgroundActive;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = SIDEBAR_COLORS.backgroundHover;
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
                        style={{ backgroundColor: SIDEBAR_COLORS.error }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = SIDEBAR_COLORS.errorHover}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = SIDEBAR_COLORS.error}
                    >
                        <LogOut size={18} />
                        {(!collapsed || isMobile) && <span className="text-sm">Cerrar sesión</span>}
                    </button>
                </div>
            </div>
        </div>
    );

    // Renderizar Drawer en móvil
    if (isMobile) {
        return (
            <Drawer
                placement="left"
                onClose={onClose}
                open={open}
                closable={false}
                size={280}
                styles={{
                    body: {
                        padding: 0,
                        backgroundColor: SIDEBAR_COLORS.background
                    },
                    header: { display: 'none' }
                }}
            >
                {sidebarContent}
            </Drawer>
        );
    }

    // Renderizar Sider en desktop
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            breakpoint="lg"
            width={200}
            trigger={null}
            collapsedWidth={80}
            theme="dark"
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: SIDEBAR_COLORS.background
            }}
        >
            {sidebarContent}
        </Sider>
    );
}