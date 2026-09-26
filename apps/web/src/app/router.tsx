import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '../features/landing/LandingPage';
import { LoginPage } from '../features/auth/LoginPage';
import { AppLayout } from '../shared/ui/AppLayout';
import { PlaceholderPage } from '../shared/ui/PlaceholderPage';
import { RoleGuard } from '../shared/ui/RoleGuard';

export const router = createBrowserRouter([
  // Public Quiet Luxury Editorial Landing Page
  { path: '/', element: <LandingPage /> },

  // Public Auth Route
  { path: '/login', element: <LoginPage /> },

  // Protected Portal App Shell
  {
    element: <AppLayout />,
    children: [
      { path: '/portal', element: <Navigate to="/member/dashboard" replace /> },

      // Group Member Routes
      {
        element: <RoleGuard allowedRoles={['MEMBER']} />,
        children: [
          { path: '/member/dashboard', element: <PlaceholderPage title="Member dashboard" owner="FE-1" /> },
          { path: '/member/profile', element: <PlaceholderPage title="Hồ sơ của tôi" owner="FE-1 + BE-1" /> },
          { path: '/member/classes', element: <PlaceholderPage title="Lịch lớp & đặt chỗ" owner="FE-1 + BE-2" /> },
          { path: '/member/card', element: <PlaceholderPage title="Gói tập & thẻ QR" owner="FE-1 + BE-3" /> },
        ],
      },

      // Group Staff / Coach Routes
      {
        element: <RoleGuard allowedRoles={['STAFF', 'COACH']} />,
        children: [
          { path: '/staff/reception', element: <PlaceholderPage title="Lễ tân & thanh toán" owner="FE-2 + BE-3" /> },
          { path: '/staff/check-in', element: <PlaceholderPage title="Check-in" owner="FE-2 + BE-3" /> },
          { path: '/staff/classes', element: <PlaceholderPage title="Quản lý lớp" owner="FE-2 + BE-2" /> },
          { path: '/staff/attendance', element: <PlaceholderPage title="Điểm danh Coach" owner="FE-2 + BE-2" /> },
        ],
      },

      // Group Manager Routes
      {
        element: <RoleGuard allowedRoles={['MANAGER']} />,
        children: [
          { path: '/manager/catalogs', element: <PlaceholderPage title="Danh mục vận hành" owner="FE-2 + BE-3" /> },
          { path: '/manager/users', element: <PlaceholderPage title="Quản lý tài khoản" owner="FE-2 + BE-1" /> },
          { path: '/manager/reports', element: <PlaceholderPage title="Báo cáo" owner="FE-2 + BE-3" /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);