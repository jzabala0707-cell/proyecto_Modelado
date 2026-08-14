import { Routes, Route, Navigate } from "react-router";
import { LandingPage } from "@/features/landing/pages/LandingPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { DashboardPage } from "@/features/admin/layout/pages/DashboardPage";
import { UsersPage } from "@/features/admin/usuario/pages/UsersPage";
import { RolesPage } from "@/features/admin/usuario/pages/RolesPage";
import { GuidesPage } from "@/features/admin/guias/pages/GuidesPage";
import { ToursPage } from "@/features/admin/tours/pages/ToursPage";
import { TourTypesPage } from "@/features/admin/tours/pages/TourTypesPage";
import { BookingsPage } from "@/features/admin/reservas/pages/BookingsPage";
import { ClientsPage } from "@/features/admin/clientes/pages/ClientsPage";
import { SalesPage } from "@/features/admin/pagos/pages/SalesPage";
import { GroupsPage } from "@/features/admin/tours/pages/GroupsPage";
import { PaymentsPage } from "@/features/admin/pagos/pages/PaymentsPage";
import { ReportsPage } from "@/features/admin/reportes/pages/ReportsPage";
import { SettingsPage } from "@/features/admin/configuracion/pages/SettingsPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
export function AppRoutes() {
    return (<Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>}/>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>}/>
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>}/>
      <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>}/>

      {/* Rutas Protegidas de Administración */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/>
      <Route path="/dashboard/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>}/>
      <Route path="/dashboard/roles" element={<ProtectedRoute><RolesPage /></ProtectedRoute>}/>
      <Route path="/dashboard/guides" element={<ProtectedRoute><GuidesPage /></ProtectedRoute>}/>
      <Route path="/dashboard/tours" element={<ProtectedRoute><ToursPage /></ProtectedRoute>}/>
      <Route path="/dashboard/tour-types" element={<ProtectedRoute><TourTypesPage /></ProtectedRoute>}/>
      <Route path="/dashboard/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>}/>
      <Route path="/dashboard/clients" element={<ProtectedRoute><ClientsPage /></ProtectedRoute>}/>
      <Route path="/dashboard/sales" element={<ProtectedRoute><SalesPage /></ProtectedRoute>}/>
      <Route path="/dashboard/groups" element={<ProtectedRoute><GroupsPage /></ProtectedRoute>}/>
      <Route path="/dashboard/payments" element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>}/>
      <Route path="/dashboard/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>}/>
      <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}/>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>);
}
