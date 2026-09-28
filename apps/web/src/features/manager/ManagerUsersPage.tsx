import { useState } from 'react';

interface UserRecord {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: 'MEMBER' | 'COACH' | 'RECEPTIONIST' | 'CENTER_MANAGER';
  status: 'ACTIVE' | 'LOCKED';
  joinedDate: string;
  deletedAt: string | null;
}

export function ManagerUsersPage() {
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const [users, setUsers] = useState<UserRecord[]>([
    {
      id: 1,
      fullName: 'Nguyễn Văn An',
      email: 'an.member@sol-wellness.vn',
      phone: '0908 123 456',
      role: 'MEMBER',
      status: 'ACTIVE',
      joinedDate: '15/09/2026',
      deletedAt: null,
    },
    {
      id: 2,
      fullName: 'Master Elena Vũ',
      email: 'elena.vu@sol-wellness.vn',
      phone: '0912 345 678',
      role: 'COACH',
      status: 'ACTIVE',
      joinedDate: '01/08/2026',
      deletedAt: null,
    },
    {
      id: 3,
      fullName: 'Lễ Tân Thịnh',
      email: 'thinh.reception@sol-wellness.vn',
      phone: '0933 888 999',
      role: 'RECEPTIONIST',
      status: 'ACTIVE',
      joinedDate: '10/09/2026',
      deletedAt: null,
    },
    {
      id: 4,
      fullName: 'Trần Công Tuấn Anh',
      email: 'admin.manager@sol-wellness.vn',
      phone: '0909 000 111',
      role: 'CENTER_MANAGER',
      status: 'ACTIVE',
      joinedDate: '01/07/2026',
      deletedAt: null,
    },
    {
      id: 5,
      fullName: 'Lê Hoàng Minh',
      email: 'minh.lh@gmail.com',
      phone: '0944 555 666',
      role: 'MEMBER',
      status: 'LOCKED',
      joinedDate: '12/08/2026',
      deletedAt: null,
    },
  ]);

  const toggleLock = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE' } : u))
    );
  };

  const handleSoftDelete = (id: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa mềm (soft delete) tài khoản ${name}?`)) {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, deletedAt: new Date().toISOString() } : u))
      );
      alert('Tài khoản đã được cập nhật deleted_at (Không còn hiển thị trong danh sách mặc định).');
    }
  };

  // Rule: users.deleted_at IS NOT NULL không được hiện trong list mặc định
  const visibleUsers = users.filter((u) => {
    if (u.deletedAt !== null) return false;
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Quản Lý Người Dùng &amp; Phân Quyền (RBAC)</h1>
          <p className="portal-subtitle">
            Quản trị tài khoản 4 vai trò, kiểm soát trạng thái khóa và bảo mật quyền hạn (SCMS Module A: Identity)
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => alert('Mở hộp thoại tạo tài khoản mới')}
        >
          + Thêm Tài Khoản Mới
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="portal-card" style={{ marginBottom: '24px', padding: '20px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Role Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'MEMBER', 'COACH', 'RECEPTIONIST', 'CENTER_MANAGER'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                style={{
                  background: roleFilter === r ? '#1A1614' : '#FFFFFF',
                  color: roleFilter === r ? '#FAF8F5' : '#7E7771',
                  border: '1px solid rgba(33, 28, 24, 0.15)',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {r === 'ALL'
                  ? 'Tất Cả'
                  : r === 'MEMBER'
                  ? 'Hội Viên'
                  : r === 'COACH'
                  ? 'HLV'
                  : r === 'RECEPTIONIST'
                  ? 'Lễ Tân'
                  : 'Quản Lý'}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ width: '280px' }}>
            <input
              type="text"
              className="portal-input"
              placeholder="Tìm theo tên, email, SĐT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px', fontSize: '0.82rem' }}
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="portal-card">
        <div className="portal-table-wrapper">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Họ Và Tên</th>
                <th>Email / Tài Khoản</th>
                <th>Số Điện Thoại</th>
                <th>Vai Trò (Role)</th>
                <th>Trạng Thái</th>
                <th>Ngày Gia Nhập</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <strong>{u.fullName}</strong>
                  </td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.role === 'CENTER_MANAGER'
                          ? 'badge-warning'
                          : u.role === 'COACH'
                          ? 'badge-info'
                          : u.role === 'RECEPTIONIST'
                          ? 'badge-neutral'
                          : 'badge-success'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${u.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                      {u.status === 'ACTIVE' ? 'Hoạt Động' : 'Đã Khóa'}
                    </span>
                  </td>
                  <td>{u.joinedDate}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        className="btn-secondary btn-sm"
                        onClick={() => toggleLock(u.id)}
                      >
                        {u.status === 'ACTIVE' ? 'Khóa' : 'Mở Khóa'}
                      </button>
                      <button
                        type="button"
                        className="btn-danger btn-sm"
                        onClick={() => handleSoftDelete(u.id, u.fullName)}
                      >
                        Xóa Mềm
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
