import { NavLink, Outlet } from 'react-router-dom';

const links = [
  ['Member', '/member/dashboard'], ['Lịch lớp', '/member/classes'], ['Thẻ QR', '/member/card'],
  ['Lễ tân', '/staff/reception'], ['Check-in', '/staff/check-in'], ['Quản lý lớp', '/staff/classes'],
  ['Điểm danh', '/staff/attendance'], ['Danh mục', '/manager/catalogs'], ['Tài khoản', '/manager/users'], ['Báo cáo', '/manager/reports'],
];

export function AppLayout() {
  return <div className="app-shell"><aside><strong>SCMS</strong><nav>{links.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}</nav></aside>
    <main><header><span>Sports Center Management System</span><NavLink to="/login">Đăng xuất</NavLink></header><Outlet /></main></div>;
}
