export interface UserSession {
  id: string;
  name: string;
  identifier: string;
  role: 'MEMBER' | 'STAFF' | 'COACH' | 'MANAGER';
}

export interface LoginResponse {
  token: string;
  user: UserSession;
}

export const AUTH_STORAGE_KEY = 'fitcenter_auth_session';

// Lấy thông tin user hiện tại
export function getCurrentUser(): UserSession | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserSession) : null;
  } catch {
    return null;
  }
}

// Xóa session (Logout hoặc khi gặp 401)
export function clearAuthSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem('fitcenter_token');
}

// Mock API Contract cho US01 (Khi BE xong chỉ cần đổi logic bên trong thành fetch/axios)
export async function loginApi(identifier: string, password: string): Promise<LoginResponse> {
  // Giả lập độ trễ mạng 600ms
  await new Promise((resolve) => setTimeout(resolve, 600));

  const cleanId = identifier.trim().toLowerCase();

  // Validate nghiệp vụ mẫu
  if (password === 'wrongpass') {
    const error = new Error('Tài khoản hoặc mật khẩu không chính xác.') as Error & { status?: number };
    error.status = 401;
    throw error;
  }

  // Tự động phân vai trò dựa vào thông tin nhập để bạn test luồng (US01-F03)
  let role: UserSession['role'] = 'MEMBER';
  let name = 'Nguyễn Văn An';

  if (cleanId.includes('admin') || cleanId.includes('manager')) {
    role = 'MANAGER';
    name = 'Quản lý Hệ thống';
  } else if (cleanId.includes('coach')) {
    role = 'COACH';
    name = 'HLV Trần Hùng';
  } else if (cleanId.includes('staff') || cleanId.includes('letan')) {
    role = 'STAFF';
    name = 'Lễ tân Minh Thư';
  }

  const responseData: LoginResponse = {
    token: `mock_jwt_token_${Date.now()}`,
    user: {
      id: 'USR_001',
      name,
      identifier: cleanId,
      role,
    },
  };

  localStorage.setItem('fitcenter_token', responseData.token);
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(responseData.user));

  return responseData;
}