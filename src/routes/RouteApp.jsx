import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
    AdminDashboard,
    AdminManagementTeamScreen_Admin,
    AdminMatchesRegistrationScreen_Admin,
    AdminPhasesRegistrationScreen,
    AdminRankingsScreen_Admin,
    AdminTeamGroupsScreen_Admin,
    LandingPage,
    Login,
    MyProfileSCreen_Participant,
    ParticipantHomeScreen,
    PredictionsScreen_Participant,
    RankingsScreen_Participant
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
                    <Route path='partidos' element={<AdminMatchesRegistrationScreen_Admin />} />
                    <Route path='rankings' element={<AdminRankingsScreen_Admin />} />
                </Route>

                {/* Participante */}

                <Route path='/participante' element={<ProtectedRoute requiredRole="participante">
                    <ParticipantLayout />
                </ProtectedRoute>}>
                    <Route index element={<Navigate to="/participante/home" replace />} />
                    <Route path='home' element={<ParticipantHomeScreen />} />
                    <Route path='predicciones' element={<PredictionsScreen_Participant />} />
                    <Route path='mi-perfil' element={<MyProfileSCreen_Participant />} />
                    <Route path='rankings' element={<RankingsScreen_Participant />} />
                </Route>

                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    )
}
