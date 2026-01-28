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
    const { token } = useToken();

    // Colores estáticos para el sidebar
    const SIDEBAR_COLORS = {
        background: '#00b8db',
        backgroundHover: '#00d3f2',
        backgroundActive: '#53eafd',
        submenuBg: '#008fb3',
        text: '#ffffff',
        textSecondary: '#e0e0e0',
        border: '#0092b8',
        error: '#e74c3c',
        errorHover: '#c0392b',
        menuSelected: '#007595',
        darkModeButton: '#104e64',
        darkModeButtonHover: '#0d3b4a',
        lightModeButton: '#efb100',
        lightModeButtonHover: '#c78e00',
    };
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
        
        /* Títulos de submenú */
        .custom-sidebar-menu.ant-menu-dark .ant-menu-submenu-title {
            background-color: ${SIDEBAR_COLORS.background} !important;
            color: ${SIDEBAR_COLORS.text} !important;
        }
        
        .custom-sidebar-menu.ant-menu-dark .ant-menu-submenu-title:hover {
            background-color: ${SIDEBAR_COLORS.backgroundHover} !important;
            color: ${SIDEBAR_COLORS.text} !important;
        }
        
        /* Submenú abierto */
        .custom-sidebar-menu.ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title {
            background-color: ${SIDEBAR_COLORS.backgroundHover} !important;
            color: ${SIDEBAR_COLORS.text} !important;
        }
        
        /* Contenedor de items del submenú */
        .custom-sidebar-menu.ant-menu-dark .ant-menu-sub.ant-menu-inline {
            background-color: ${SIDEBAR_COLORS.submenuBg} !important;
        }
        
        /* Items dentro del submenú */
        .custom-sidebar-menu.ant-menu-dark .ant-menu-sub .ant-menu-item {
            background-color: transparent !important;
            color: ${SIDEBAR_COLORS.textSecondary} !important;
        }
        
        .custom-sidebar-menu.ant-menu-dark .ant-menu-sub .ant-menu-item:hover {
            background-color: ${SIDEBAR_COLORS.backgroundActive} !important;
            color: ${SIDEBAR_COLORS.text} !important;
        }
        
        .custom-sidebar-menu.ant-menu-dark .ant-menu-sub .ant-menu-item-selected {
            background-color: ${SIDEBAR_COLORS.menuSelected} !important;
            color: ${SIDEBAR_COLORS.text} !important;
        }
        
        /* Flecha del submenú */
        .custom-sidebar-menu.ant-menu-dark .ant-menu-submenu-arrow {
            color: ${SIDEBAR_COLORS.text} !important;
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
                            <h1 className="text-base font-bold leading-none mb-0 text-white">
                                VIFAC
                            </h1>
                            <h1 className="text-xs leading-none mt-0 text-gray-700">
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
                    defaultOpenKeys={getOpenKeys()}
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
                            backgroundColor: isDarkMode
                                ? SIDEBAR_COLORS.lightModeButton
                                : SIDEBAR_COLORS.darkModeButton,
                            color: SIDEBAR_COLORS.text,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isDarkMode
                                ? SIDEBAR_COLORS.lightModeButtonHover
                                : SIDEBAR_COLORS.darkModeButtonHover;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isDarkMode
                                ? SIDEBAR_COLORS.lightModeButton
                                : SIDEBAR_COLORS.darkModeButton;
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
                width={280}
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