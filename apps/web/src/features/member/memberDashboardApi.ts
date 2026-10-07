import { apiFetch } from '../../shared/api/client';

// Contract frontend chờ backend SCRUM-71: GET /api/v1/memberships/subscriptions/my.
// Trả null khi member không có gói active.
export interface MemberSubscription {
  packageName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  durationDays: number;
  status: string;
}

// Contract frontend chờ backend scheduling: GET /api/v1/enrollments/my.
// `to` là ngày kết thúc loại trừ; backend chỉ trả enrollment của principal.
export interface BookedClass {
  id: number;
  className: string;
  sessionDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm[:ss]
  endTime: string; // HH:mm[:ss]
  roomName: string;
  status: string;
}

function dateParam(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getCurrentMembership = () =>
  apiFetch<MemberSubscription | null>('/memberships/subscriptions/my');

export const getUpcomingBookings = () => {
  const today = new Date();
  const until = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  return apiFetch<BookedClass[]>(`/enrollments/my?from=${dateParam(today)}&to=${dateParam(until)}`);
};
