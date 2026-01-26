import React, { useState, useRef, useEffect } from 'react';
import {
    User,
    Bell,
    Settings,
    LogOut,
    Menu as MenuIcon,
    X,
    ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ParticipantNavbar({ collapsed, onToggle }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const userMenuItems = [
        {
            key: 'profile',
            icon: <User size={16} />,
            label: 'Mi perfil',
            onClick: () => {
                navigate('/participante/mi-perfil');
                setDropdownOpen(false);
            },
        },
        {
            key: 'settings',
            icon: <Settings size={16} />,
            label: 'Configuración',
            onClick: () => {
                navigate('/participante/configuracion');
                setDropdownOpen(false);
            },
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogOut size={16} />,
            label: 'Cerrar sesión',
            onClick: () => {
                handleLogout();
                setDropdownOpen(false);
            },
            danger: true,
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <header
            className="bg-white dark:bg-[#141414] px-4 flex items-center fixed top-0 right-0 z-40"
            style={{
                height: '64px',
                width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)',
                transition: 'width 0.2s',
            }}>
            <button
                onClick={onToggle}
                className="text-gray-600 dark:text-white hover:dark:text-black transition-colors p-2 rounded-lg hover:bg-cyan-200/50 dark:hover:bg-cyan-700/30"
            >
                {collapsed ? <MenuIcon size={20} /> : <X size={20} />}
            </button>

            <div className="flex items-center ml-auto">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 cursor-pointer rounded-lg transition-colors p-2 hover:bg-cyan-200/50 dark:hover:bg-cyan-700/30"
                    >
                        <div className="flex flex-col justify-center  text-right space-y-1">
                            <span className="text-sm font-medium dark:text-white text-gray-900">
                                {user?.name || 'Participante'}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Participante
                            </span>
                        </div>
                        <div
                            className="rounded-full flex items-center justify-center"
                            style={{
                                width: '40px',
                                height: '40px',
                                background: '#00b8db'
                            }}
                        >
                            <User size={16} className="text-white" />
                        </div>
                        <ChevronDown size={16} className="text-gray-500" />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            {userMenuItems.map((item) => {
                                if (item.type === 'divider') {
                                    return (
                                        <div
                                            key={item.key || 'divider'}
                                            className="border-t border-gray-200 my-1"
                                        />
                                    );
                                }

                                return (
                                    <button
                                        key={item.key}
                                        onClick={item.onClick}
                                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${item.danger
                                                ? 'text-red-600 hover:bg-red-50'
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}