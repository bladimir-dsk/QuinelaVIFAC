import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
    AdminDashboard,
    AdminManagementTeamScreen_Admin,
    AdminPhasesRegistrationScreen,
    AdminTeamGroupsScreen_Admin,
    LandingPage,
    Login,
    ParticipantHomeScreen
} from './lazyComponents'
import { ProtectedRoute } from './ProtectedRoute'
import ParticipantLayout from '../components/layout/ParticipantLayout'
import AdminLayout from '../components/layout/AdminLayout'
import LoadingFallback from '../components/common/fallbacks/LoadingFallback'

export default function RouteApp() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />

                <Route path='/admin' element={<ProtectedRoute requiredRole="admin">
                    <AdminLayout />
                </ProtectedRoute>}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path='dashboard' element={<AdminDashboard />} />
                    <Route path='equipos/gestion' element={<AdminManagementTeamScreen_Admin />} />
                    <Route path='fases' element={<AdminPhasesRegistrationScreen />} />
                    <Route path='equipos/grupos' element={<AdminTeamGroupsScreen_Admin />} />
                </Route>

                {/* Participante */}

                <Route path='/participante' element={<ProtectedRoute requiredRole="participante">
                    <ParticipantLayout />
                </ProtectedRoute>}>
                    <Route index element={<Navigate to="/participante/home" replace />} />
                    <Route path='home' element={<ParticipantHomeScreen />} />
                </Route>

                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    )
}
