import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import ParticipantSidebar from './ParticipantSidebar';
import ParticipantNavbar from './ParticipantNavbar';

const { Content } = Layout;

export default function ParticipantLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="min-h-screen">
            <ParticipantSidebar collapsed={collapsed} onCollapse={setCollapsed} />
            
            <Layout
                style={{
                    marginLeft: collapsed ? 80 : 200,
                    transition: 'margin-left 0.2s',
                }}
            >
                <ParticipantNavbar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
                
                <Content
                    className="mt-16 p-6 bg-gray-100"
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