import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LandingPage } from '../features/landing/LandingPage';
import { LoginPage } from '../features/auth/LoginPage';
import { RegisterPage } from '../features/auth/RegisterPage';
import { VerifyOtpPage } from '../features/auth/VerifyOtpPage';

import { AppLayout } from '../shared/ui/AppLayout';
import { RoleGuard } from '../shared/ui/RoleGuard';

// Member Feature Pages
import { MemberDashboardPage } from '../features/member/MemberDashboardPage';
import { MemberProfilePage } from '../features/member/MemberProfilePage';
import { MemberClassesPage } from '../features/member/MemberClassesPage';
import { MemberCardPage } from '../features/member/MemberCardPage';

// Staff & Coach Feature Pages
import { StaffReceptionPage } from '../features/reception/StaffReceptionPage';
import { StaffCheckInPage } from '../features/reception/StaffCheckInPage';
import { StaffClassesPage } from '../features/classes/StaffClassesPage';
import { CoachAttendancePage } from '../features/coaching/CoachAttendancePage';

// Manager Feature Pages
import { ManagerCatalogsPage } from '../features/manager/ManagerCatalogsPage';
import { UserManagerPage } from '../features/manager/UserManagerPage';
import { ManagerReportsPage } from '../features/manager/ManagerReportsPage';

export const router = createBrowserRouter([
  // =========================================================
  // PUBLIC ROUTES
  // =========================================================

  // Landing Page
  {
    path: '/',
    element: <LandingPage />,
  },

  // Authentication
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  // SCRUM-40
  // Handoff sang luồng xác thực OTP sau khi đăng ký thành công
  {
    path: '/verify-otp',
    element: <VerifyOtpPage />,
  },

  // =========================================================
  // PROTECTED PORTAL
  // =========================================================
  {
    element: <AppLayout />,

    children: [
      // Portal default redirect
      {
        path: '/portal',
        element: (
          <Navigate
            to="/member/dashboard"
            replace
          />
        ),
      },

      // =====================================================
      // MEMBER ROUTES
      // =====================================================
      {
        element: (
          <RoleGuard
            allowedRoles={[
              'MEMBER',
              'MANAGER',
              'CENTER_MANAGER',
            ]}
          />
        ),

        children: [
          {
            path: '/member/dashboard',
            element: <MemberDashboardPage />,
          },
          {
            path: '/member/profile',
            element: <MemberProfilePage />,
          },
          {
            path: '/member/classes',
            element: <MemberClassesPage />,
          },
          {
            path: '/member/card',
            element: <MemberCardPage />,
          },
        ],
      },

      // =====================================================
      // STAFF / COACH ROUTES
      // =====================================================
      {
        element: (
          <RoleGuard
            allowedRoles={[
              'STAFF',
              'COACH',
              'RECEPTIONIST',
              'MANAGER',
              'CENTER_MANAGER',
            ]}
          />
        ),

        children: [
          {
            path: '/staff/reception',
            element: <StaffReceptionPage />,
          },
          {
            path: '/staff/check-in',
            element: <StaffCheckInPage />,
          },
          {
            path: '/staff/classes',
            element: <StaffClassesPage />,
          },
          {
            path: '/staff/attendance',
            element: <CoachAttendancePage />,
          },
        ],
      },

      // =====================================================
      // MANAGER ROUTES
      // =====================================================
      {
        element: (
          <RoleGuard
            allowedRoles={[
              'MANAGER',
              'CENTER_MANAGER',
            ]}
          />
        ),

        children: [
          {
            path: '/manager/catalogs',
            element: <ManagerCatalogsPage />,
          },
          {
            path: '/manager/users',
            element: <UserManagerPage />,
          },
          {
            path: '/manager/reports',
            element: <ManagerReportsPage />,
          },
        ],
      },
    ],
  },

  // =========================================================
  // FALLBACK
  // =========================================================
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);