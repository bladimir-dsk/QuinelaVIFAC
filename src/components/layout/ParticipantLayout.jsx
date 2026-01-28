import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import ParticipantSidebar from './ParticipantSidebar';
import ParticipantNavbar from './ParticipantNavbar';

const { Content } = Layout;

export default function ParticipantLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

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
        <Layout className="h-screen overflow-hidden">
            <ParticipantSidebar 
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
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <ParticipantNavbar 
                    collapsed={collapsed} 
                    onToggle={handleToggle}
                    isMobile={isMobile}
                />
                
                <Content
                    className="p-4 md:p-6 bg-gray-100 dark:bg-zinc-800"
                    style={{
                        marginTop: '64px',
                        height: 'calc(100vh - 64px)',
                        overflow: 'auto',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}