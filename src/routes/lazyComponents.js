import { lazy } from "react";

// Componentes publicos
export const Login = lazy(() => import("../screen/auth/LoginScreen"));
export const LandingPage = lazy(() => import("../screen/landing/LandingPage"));

// Componentes privados - PARTICIPANTE

export const ParticipantHomeScreen = lazy(
  () => import("../screen/participante/home/ParticipantHomeScreen"),
);
export const PredictionsScreen_Participant = lazy(() => import("../screen/participante/predictions/PredictionsScreen_Participant"));
export const MyProfileSCreen_Participant = lazy(() => import("../screen/participante/myProfile/MyProfileScreen_Participant"));
export const RankingsScreen_Participant = lazy(() => import("../screen/participante/ranking/RankingScreen_Participant"));

// Componentes privados - Admin
export const AdminDashboard = lazy(
  () => import("../screen/admin/dashboard/AdminDashboard"),
);
export const AdminManagementTeamScreen_Admin = lazy(() => import("../screen/admin/teams/management_Admin/TeamManagementScreen_Admin"));
export const AdminPhasesRegistrationScreen = lazy(() => import("../screen/admin/phases/PhasesRegistrationScreen_Admin"));
export const AdminTeamGroupsScreen_Admin = lazy(() => import("../screen/admin/teams/groups_admin/TeamGroupsScreen_Admin"));
export const AdminMatchesRegistrationScreen_Admin = lazy(() => import("../screen/admin/matches/MatchesRegistrationScreen_Admin"));
export const AdminRankingsScreen_Admin = lazy(() => import("../screen/admin/ranking/RankingScreen_Admin"));