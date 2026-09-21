import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { LoginPage } from '../features/auth/LoginPage';
import { AppLayout } from '../shared/ui/AppLayout';
import { PlaceholderPage } from '../shared/ui/PlaceholderPage';
import { getCurrentUser } from '../shared/api/client';

// Component bảo vệ Route theo Role (US01-F03)
function RoleGuard({ allowedRoles }: { allowedRoles: string[] }) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    // Không đủ quyền -> Trả về màn hình tương ứng quyền của họ
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/member/dashboard" replace /> },

      // Group Member Routes
      {
        element: <RoleGuard allowedRoles={['MEMBER']} />,
        children: [
          { path: 'member/dashboard', element: <PlaceholderPage title="Member dashboard" owner="FE-1" /> },
          { path: 'member/profile', element: <PlaceholderPage title="Hồ sơ của tôi" owner="FE-1 + BE-1" /> },
          { path: 'member/classes', element: <PlaceholderPage title="Lịch lớp & đặt chỗ" owner="FE-1 + BE-2" /> },
          { path: 'member/card', element: <PlaceholderPage title="Gói tập & thẻ QR" owner="FE-1 + BE-3" /> },
        ],
      },

      // Group Staff / Coach Routes
      {
        element: <RoleGuard allowedRoles={['STAFF', 'COACH']} />,
        children: [
          { path: 'staff/reception', element: <PlaceholderPage title="Lễ tân & thanh toán" owner="FE-2 + BE-3" /> },
          { path: 'staff/check-in', element: <PlaceholderPage title="Check-in" owner="FE-2 + BE-3" /> },
          { path: 'staff/classes', element: <PlaceholderPage title="Quản lý lớp" owner="FE-2 + BE-2" /> },
          { path: 'staff/attendance', element: <PlaceholderPage title="Điểm danh Coach" owner="FE-2 + BE-2" /> },
        ],
      },

      // Group Manager Routes
      {
        element: <RoleGuard allowedRoles={['MANAGER']} />,
        children: [
          { path: 'manager/catalogs', element: <PlaceholderPage title="Danh mục vận hành" owner="FE-2 + BE-3" /> },
          { path: 'manager/users', element: <PlaceholderPage title="Quản lý tài khoản" owner="FE-2 + BE-1" /> },
          { path: 'manager/reports', element: <PlaceholderPage title="Báo cáo" owner="FE-2 + BE-3" /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
]);