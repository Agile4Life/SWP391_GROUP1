import { apiFetch } from '../../shared/api/client';

export interface MembershipPackage {
  id: number;
  name: string;
  description: string | null;
  price: number;
  durationDays: number;
  status: 'active' | 'inactive';
}

export const getMembershipPackages = () => apiFetch<MembershipPackage[]>('/packages');
