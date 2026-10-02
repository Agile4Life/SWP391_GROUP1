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

// 4 Role gốc bắt buộc của hệ thống
export const CORE_ROLES: { id: SystemRole; name: string; description: string }[] = [
  { id: 'CENTER_MANAGER', name: 'Quản lý trung tâm', description: 'Toàn quyền kiểm soát và cấu hình hệ thống' },
  { id: 'COACH', name: 'Huấn luyện viên', description: 'Quản lý lịch dạy, giáo án tập luyện và học viên' },
  { id: 'RECEPTIONIST', name: 'Lễ tân / Thu ngân', description: 'Tiếp đón, check-in và ghi nhận thanh toán' },
  { id: 'MEMBER', name: 'Hội viên', description: 'Đặt lớp, quản lý thẻ thành viên và xem lịch tập' },
];

export const SYSTEM_PERMISSIONS: Permission[] = [
  { id: 'p1', code: 'USER_MANAGE', name: 'Tạo và khóa tài khoản', module: 'Hệ thống' },
  { id: 'p2', code: 'ROLE_CONFIG', name: 'Cấu hình phân quyền RBAC', module: 'Hệ thống' },
  { id: 'p3', code: 'CLASS_MANAGE', name: 'Tạo môn và mở lớp học', module: 'Lớp học' },
  { id: 'p4', code: 'CHECKIN_VERIFY', name: 'Quét mã và xác nhận check-in', module: 'Lễ tân' },
  { id: 'p5', code: 'PAYMENT_RECEIVE', name: 'Ghi nhận thanh toán gói tập', module: 'Tài chính' },
  { id: 'p6', code: 'TRAINING_PLAN', name: 'Tạo giáo án và theo dõi học viên', module: 'Tập luyện' },
  { id: 'p7', code: 'BOOKING_MAKE', name: 'Đặt chỗ và hủy lịch lớp', module: 'Hội viên' },
];

let mockUsers: UserAccount[] = [
  { id: 'USR_01', name: 'Trần Văn Quản Lý', email: 'manager@fitcenter.com', phone: '0901112222', role: 'CENTER_MANAGER', status: 'ACTIVE', deleted_at: null, created_at: '2026-01-10' },
  { id: 'USR_02', name: 'Lê Hoàng Coach', email: 'coach.hoang@fitcenter.com', phone: '0912345678', role: 'COACH', status: 'ACTIVE', deleted_at: null, created_at: '2026-02-15' },
  { id: 'USR_03', name: 'Nguyễn Thu Lễ Tân', email: 'letan.thu@fitcenter.com', phone: '0988776655', role: 'RECEPTIONIST', status: 'ACTIVE', deleted_at: null, created_at: '2026-03-01' },
  { id: 'USR_04', name: 'Phạm Khắc Đăng Khoa', email: 'khoa.member@gmail.com', phone: '0933221100', role: 'MEMBER', status: 'ACTIVE', deleted_at: null, created_at: '2026-03-12' },
  { id: 'USR_05', name: 'Vũ Đức Nghỉ Việc', email: 'cuu.nv@fitcenter.com', phone: '0977112233', role: 'COACH', status: 'LOCKED', deleted_at: '2026-03-25T10:00:00Z', created_at: '2026-01-05' },
];

// role_permissions có ràng buộc UNIQUE(role_id, permission_id)
let mockRolePermissions: Record<SystemRole, Set<string>> = {
  CENTER_MANAGER: new Set(['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7']),
  COACH: new Set(['p6']),
  RECEPTIONIST: new Set(['p4', 'p5']),
  MEMBER: new Set(['p7']),
};

export const userApi = {
  async getUsers(): Promise<UserAccount[]> {
    await new Promise((r) => setTimeout(r, 200));
    return [...mockUsers];
  },

  async createUser(payload: Omit<UserAccount, 'id' | 'status' | 'deleted_at' | 'created_at'>): Promise<UserAccount> {
    await new Promise((r) => setTimeout(r, 300));
    const newUser: UserAccount = {
      ...payload,
      id: `USR_${Date.now().toString().slice(-4)}`,
      status: 'ACTIVE',
      deleted_at: null,
      created_at: new Date().toISOString().split('T')[0],
    };
    mockUsers = [newUser, ...mockUsers];
    return newUser;
  },

  // Soft Delete: Gán deleted_at và chuyển status LOCKED
  async toggleLockUser(userId: string): Promise<UserAccount> {
    await new Promise((r) => setTimeout(r, 250));
    const target = mockUsers.find((u) => u.id === userId);
    if (!target) throw new Error('Không tìm thấy tài khoản.');

    if (target.status === 'ACTIVE') {
      target.status = 'LOCKED';
      target.deleted_at = new Date().toISOString();
    } else {
      target.status = 'ACTIVE';
      target.deleted_at = null;
    }
    return { ...target };
  },

  async getRolePermissions(): Promise<Record<SystemRole, string[]>> {
    await new Promise((r) => setTimeout(r, 150));
    return {
      CENTER_MANAGER: Array.from(mockRolePermissions.CENTER_MANAGER),
      COACH: Array.from(mockRolePermissions.COACH),
      RECEPTIONIST: Array.from(mockRolePermissions.RECEPTIONIST),
      MEMBER: Array.from(mockRolePermissions.MEMBER),
    };
  },

 async toggleRolePermission(role: SystemRole, permId: string): Promise<void> {
  const currentSet = new Set(mockRolePermissions[role]);
  if (currentSet.has(permId)) {
    currentSet.delete(permId); // Bỏ tích quyền
  } else {
    currentSet.add(permId);    // Thêm quyền
  }
  mockRolePermissions[role] = currentSet; // Gán Set mới để cập nhật dữ liệu
},
};