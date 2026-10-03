import { apiFetch } from '../../shared/api/client';

export type SystemRole = 'CENTER_MANAGER' | 'COACH' | 'RECEPTIONIST' | 'MEMBER';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: SystemRole;
  status: 'ACTIVE' | 'LOCKED';
  deleted_at: string | null;
  created_at: string;
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  module: string;
}

// 4 role gốc bất biến của hệ thống
export const CORE_ROLES: { id: SystemRole; name: string; description: string }[] = [
  { id: 'CENTER_MANAGER', name: 'Quản lý trung tâm', description: 'Toàn quyền kiểm soát và cấu hình hệ thống' },
  { id: 'COACH', name: 'Huấn luyện viên', description: 'Quản lý lịch dạy, giáo án tập luyện và học viên' },
  { id: 'RECEPTIONIST', name: 'Lễ tân / Thu ngân', description: 'Tiếp đón, check-in và ghi nhận thanh toán' },
  { id: 'MEMBER', name: 'Hội viên', description: 'Đặt lớp, quản lý thẻ thành viên và xem lịch tập' },
];

interface UserDto {
  id: number;
  roleCode: SystemRole;
  fullName: string;
  email: string;
  phone: string | null;
  status: string;
  createdAt: string;
}

interface RoleDto {
  id: number;
  code: SystemRole;
}

interface PermissionDto {
  id: number;
  code: string;
  name: string;
  module: string;
}

const toAccount = (u: UserDto): UserAccount => ({
  id: String(u.id),
  name: u.fullName,
  email: u.email,
  phone: u.phone ?? '',
  role: u.roleCode,
  status: u.status === 'active' ? 'ACTIVE' : 'LOCKED',
  deleted_at: null,
  created_at: u.createdAt?.split('T')[0] ?? '',
});

const roleIds = async (): Promise<Record<string, number>> =>
  Object.fromEntries((await apiFetch<RoleDto[]>('/roles')).map((r) => [r.code, r.id]));

export interface CreateUserPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: SystemRole;
}

export const userApi = {
  async getUsers(): Promise<UserAccount[]> {
    return (await apiFetch<UserDto[]>('/users')).map(toAccount);
  },

  async createUser(payload: CreateUserPayload): Promise<UserAccount> {
    const roleId = (await roleIds())[payload.role];
    const created = await apiFetch<UserDto>('/users', {
      method: 'POST',
      body: JSON.stringify({
        fullName: payload.name,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        roleId,
      }),
    });
    return toAccount(created);
  },

  // Khóa / mở khóa tài khoản theo trạng thái hiện tại trên server
  async toggleLockUser(userId: string): Promise<UserAccount> {
    const current = await apiFetch<UserDto>(`/users/${userId}`);
    const action = current.status === 'active' ? 'lock' : 'unlock';
    return toAccount(await apiFetch<UserDto>(`/users/${userId}/${action}`, { method: 'PATCH' }));
  },

  async getPermissions(): Promise<Permission[]> {
    return (await apiFetch<PermissionDto[]>('/roles/permissions')).map((p) => ({ ...p, id: String(p.id) }));
  },

  async getRolePermissions(): Promise<Record<SystemRole, string[]>> {
    const ids = await roleIds();
    const entries = await Promise.all(
      CORE_ROLES.map(async (r) => {
        const perms = ids[r.id] ? await apiFetch<PermissionDto[]>(`/roles/${ids[r.id]}/permissions`) : [];
        return [r.id, perms.map((p) => String(p.id))] as const;
      }),
    );
    return Object.fromEntries(entries) as Record<SystemRole, string[]>;
  },

  // Bật/tắt một quyền của role: PUT nếu chưa có, DELETE nếu đã có
  async toggleRolePermission(role: SystemRole, permId: string): Promise<void> {
    const roleId = (await roleIds())[role];
    const granted = (await apiFetch<PermissionDto[]>(`/roles/${roleId}/permissions`)).some((p) => String(p.id) === permId);
    await apiFetch(`/roles/${roleId}/permissions/${permId}`, { method: granted ? 'DELETE' : 'PUT' });
  },
};