import React from 'react';
import { Layout, Menu, Drawer } from 'antd';
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
    TrendingUpDown
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDarkMode } from '../../hooks/useDarkMode';
const { Sider } = Layout;

export default function AdminSidebar({ collapsed, onCollapse, isMobile, open, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

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
            key: 'ranking',
            icon: <Trophy size={18} />,
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
        <div className="flex flex-col h-full bg-white">
            <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-white">
                {(!collapsed || isMobile) ? (
                    <div className="flex items-center space-x-2">
                        <img src="/Logo-vifac.webp" alt="VIFAC" className="w-10 h-10" />
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">VIFAC</h1>
                            <p className="text-xs text-gray-500">Admin</p>
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
                    defaultOpenKeys={getOpenKeys()}
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{ 
                        border: 0, 
                        background: '#ffffff'
                    }}
                />
            </div>

            <div className="border-t border-gray-200 p-2 space-y-2 bg-white">
                <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    {(!collapsed || isMobile) && <span className="text-sm">Modo {isDarkMode ? 'Claro' : 'Oscuro'}</span>}
                </button>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                >
                    <LogOut size={18} />
                    {(!collapsed || isMobile) && <span className="text-sm">Cerrar sesión</span>}
                </button>
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
                    body: { padding: 0, background: '#ffffff' },
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
            collapsedWidth={80}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                background: '#ffffff',
            }}
        >
            {sidebarContent}
        </Sider>
    );
}