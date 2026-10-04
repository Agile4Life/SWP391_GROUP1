import { apiFetch } from '../../shared/api/client';

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  phone?: string;
}

export const register = (input: RegisterInput) =>
  apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(input) });

export const sendOtp = (email: string) =>
  apiFetch<{ debugOtp?: string }>('/auth/send-otp', { method: 'POST', body: JSON.stringify({ email }) });

export const verifyOtp = (target: string, otpCode: string) =>
  apiFetch('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ target, otpCode }) });
