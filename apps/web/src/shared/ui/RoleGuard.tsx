import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser, homePath } from '../api/client';

export function RoleGuard({ allowedRoles }: { allowedRoles: string[] }) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={homePath(user.role)} replace />;
  }
  return <Outlet />;
}
