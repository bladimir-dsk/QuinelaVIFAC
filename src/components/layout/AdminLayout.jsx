import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const { Content } = Layout;

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Detectar tamaño de pantalla
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleToggle = () => {
        if (isMobile) {
            setDrawerOpen(!drawerOpen);
        } else {
            setCollapsed(!collapsed);
        }
    };

    return (
        <Layout className="min-h-screen">
            <AdminSidebar 
                collapsed={collapsed} 
                onCollapse={setCollapsed}
                isMobile={isMobile}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            
            <Layout
                style={{
                    marginLeft: isMobile ? 0 : (collapsed ? 80 : 200),
                    transition: 'margin-left 0.2s',
                }}
            >
                <AdminNavbar 
                    collapsed={collapsed} 
                    onToggle={handleToggle}
                    isMobile={isMobile}
                />
                
                <Content
                    className="mt-16 p-4 md:p-6 bg-gray-100 dark:bg-zinc-900"
                    style={{
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}