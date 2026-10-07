import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../shared/api/client';
import { PageHeader } from '../../shared/ui/PageHeader';
import {
  getCurrentMembership,
  getUpcomingBookings,
  type MemberSubscription,
  type BookedClass,
} from './memberDashboardApi';

const DAY_MS = 86_400_000;

function localDate(value: string): Date {
  const [year, month, day] = value.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
}

function dayNumber(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / DAY_MS);
}

function remainingDays(endDate: string, today: Date): number {
  return Math.max(0, dayNumber(localDate(endDate)) - dayNumber(today));
}

function membershipProgress(subscription: MemberSubscription, today: Date): number {
  if (subscription.durationDays <= 0) return 0;
  const used = dayNumber(today) - dayNumber(localDate(subscription.startDate));
  return Math.min(100, Math.max(0, (used / subscription.durationDays) * 100));
}

function upcomingBookedClasses(classes: BookedClass[], today: Date): BookedClass[] {
  const start = dayNumber(today);
  const currentTime = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
  return classes
    .filter((item) => {
      const day = dayNumber(localDate(item.sessionDate));
      return item.status.toLowerCase() === 'booked'
        && day >= start && day < start + 7
        && (day !== start || item.startTime.slice(0, 5) >= currentTime);
    })
    .sort((a, b) =>
      `${a.sessionDate}T${a.startTime}`.localeCompare(`${b.sessionDate}T${b.startTime}`),
    );
}

function formatDate(value: string): string {
  return localDate(value).toLocaleDateString('vi-VN');
}

type DashboardState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; membership: MemberSubscription | null; classes: BookedClass[] };

export function MemberDashboardPage() {
  const userName = getCurrentUser()?.name || 'Hội viên';
  const [state, setState] = useState<DashboardState>({ status: 'loading' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const [membership, classes] = await Promise.all([getCurrentMembership(), getUpcomingBookings()]);
      setState({ status: 'success', membership, classes });
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Không thể tải trang tổng quan.',
      });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const today = new Date();
  const membership = state.status === 'success' && state.membership?.status.toLowerCase() === 'active'
    && dayNumber(localDate(state.membership.endDate)) >= dayNumber(today)
    ? state.membership : null;
  const classes = state.status === 'success' ? upcomingBookedClasses(state.classes, today) : [];

  return (
    <div className="portal-container">
      <PageHeader eyebrow="Hội viên" title={`Xin chào, ${userName}`} />

      {state.status === 'loading' && (
        <div className="portal-card" role="status">Đang tải trang tổng quan…</div>
      )}

      {state.status === 'error' && (
        <div className="portal-card portal-empty" role="alert">
          <h2 className="portal-card-title">Không thể tải dữ liệu</h2>
          <p>Không thể tải thông tin tổng quan của bạn. Vui lòng thử lại.</p>
          <button type="button" className="btn-secondary" style={{ marginTop: 20 }} onClick={() => void load()}>
            Thử lại
          </button>
        </div>
      )}

      {state.status === 'success' && (
        <>
          {membership ? (
            <section className="portal-card" aria-labelledby="membership-title">
              <div className="meta-label">Gói tập hiện tại</div>
              <h2 id="membership-title" className="portal-card-title" style={{ marginTop: 12 }}>
                {membership.packageName}
              </h2>
              <p className="row-card__meta">
                {formatDate(membership.startDate)} – {formatDate(membership.endDate)} · Còn {remainingDays(membership.endDate, today)} ngày
              </p>
              <div
                role="progressbar"
                aria-label="Thời hạn gói tập đã sử dụng"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(membershipProgress(membership, today))}
                style={{ height: 5, background: 'var(--color-border-subtle)', marginTop: 24 }}
              >
                <div style={{ width: `${membershipProgress(membership, today)}%`, height: '100%', background: 'var(--color-accent-gold)' }} />
              </div>
            </section>
          ) : (
            <section className="portal-card portal-card--feature portal-empty" aria-labelledby="membership-empty-title">
              <div className="meta-label">SÖL WELLNESS</div>
              <h2 id="membership-empty-title" className="portal-card-title" style={{ margin: '16px 0 10px' }}>
                Hành trình của bạn bắt đầu tại đây
              </h2>
              <p>Chọn gói tập phù hợp với nhịp sống của bạn.</p>
              <Link to="/#packages" className="btn-primary" style={{ marginTop: 24 }}>
                Khám phá các gói tập ngay
              </Link>
            </section>
          )}

          <section className="portal-card" aria-labelledby="upcoming-title">
            <div className="portal-card-header">
              <h2 id="upcoming-title" className="portal-card-title">Lịch học 7 ngày tới</h2>
            </div>
            {classes.length === 0 ? (
              <p className="row-card__meta">Bạn chưa có buổi học đã đặt trong 7 ngày tới.</p>
            ) : (
              <div className="stack">
                {classes.map((item) => (
                  <div key={item.id} className="row-card">
                    <h3 className="row-card__title">{item.className}</h3>
                    <div className="row-card__meta">
                      {formatDate(item.sessionDate)} · {item.startTime.slice(0, 5)}–{item.endTime.slice(0, 5)} · {item.roomName}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
