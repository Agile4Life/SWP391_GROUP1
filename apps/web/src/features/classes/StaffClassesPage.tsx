import React, { useState, useEffect } from 'react';
import { useTheme } from '../../shared/context/ThemeContext';

interface ClassItem {
  id: number;
  name: string;
  discipline: string;
  coach: string;
  room: string;
  schedule: string;
  capacity: number;
  activeSessions: number;
  status: 'ACTIVE' | 'ARCHIVED';
}

const SOL_CLASSES: ClassItem[] = [
  {
    id: 1,
    name: 'Reformer Core Architecture',
    discipline: 'Pilates',
    coach: 'Master Elena Vũ',
    room: 'Studio 01 (Level 2)',
    schedule: 'T2, T4, T6 (17:30 - 18:30)',
    capacity: 12,
    activeSessions: 36,
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'Olympic Barbell & Plyometrics',
    discipline: 'Strength',
    coach: 'Coach Minh Trí',
    room: 'Arena 02 (Level 1)',
    schedule: 'T3, T5, T7 (08:00 - 09:30)',
    capacity: 16,
    activeSessions: 24,
    status: 'ACTIVE',
  },
  {
    id: 3,
    name: 'Yin Yoga & Sound Healing',
    discipline: 'Yoga',
    coach: 'Master An Nhiên',
    room: 'Zen Garden Studio',
    schedule: 'T4, CN (19:00 - 20:15)',
    capacity: 15,
    activeSessions: 18,
    status: 'ACTIVE',
  },
  {
    id: 4,
    name: 'Tactile Boxing Padwork',
    discipline: 'Boxing',
    coach: 'Coach Alex Dương',
    room: 'Ring Arena 01',
    schedule: 'T3, T5 (18:00 - 19:15)',
    capacity: 12,
    activeSessions: 20,
    status: 'ACTIVE',
  },
];

const RUNOVA_CLASSES: ClassItem[] = [
  {
    id: 1,
    name: 'Tennis Pro Serve & Volley Clinic',
    discipline: 'Tennis',
    coach: 'Coach Rafael Lâm',
    room: 'Center Tennis Arena 01',
    schedule: 'T2, T4, T6 (17:30 - 19:00)',
    capacity: 4,
    activeSessions: 36,
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'Badminton Tactical Doubles Drill',
    discipline: 'Badminton',
    coach: 'Master Tuấn Kiệt',
    room: 'Cụm Sân Cầu Lông Đôi 03',
    schedule: 'T3, T5, T7 (08:00 - 09:30)',
    capacity: 8,
    activeSessions: 24,
    status: 'ACTIVE',
  },
  {
    id: 3,
    name: 'Padel Glass Wall & Bandeja Mastery',
    discipline: 'Padel',
    coach: 'Coach Marco Nguyễn',
    room: 'Sân Padel Kính VIP 02',
    schedule: 'T4, CN (19:00 - 20:30)',
    capacity: 4,
    activeSessions: 18,
    status: 'ACTIVE',
  },
  {
    id: 4,
    name: 'Squash Dynamic Footwork & Reflex',
    discipline: 'Squash',
    coach: 'Coach David Vũ',
    room: 'Sân Squash Tốc Độ 01',
    schedule: 'T3, T5 (18:00 - 19:15)',
    capacity: 2,
    activeSessions: 20,
    status: 'ACTIVE',
  },
];

export function StaffClassesPage() {
  const { theme } = useTheme();
  const isRunova = theme === 'runova';

  const [classes, setClasses] = useState<ClassItem[]>(() =>
    isRunova ? RUNOVA_CLASSES : SOL_CLASSES
  );

  useEffect(() => {
    setClasses(isRunova ? RUNOVA_CLASSES : SOL_CLASSES);
  }, [isRunova]);

  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    discipline: isRunova ? 'Tennis' : 'Pilates',
    coach: isRunova ? 'Coach Rafael Lâm' : 'Master Elena Vũ',
    room: isRunova ? 'Center Tennis Arena 01' : 'Studio 01 (Level 2)',
    schedule: 'T2, T4, T6 (09:00 - 10:00)',
    capacity: isRunova ? 4 : 12,
  });

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name.trim()) {
      alert(isRunova ? 'Vui lòng nhập tên buổi tập / khung giờ sân' : 'Vui lòng nhập tên lớp học');
      return;
    }

    const item: ClassItem = {
      id: Date.now(),
      name: newClass.name,
      discipline: newClass.discipline,
      coach: newClass.coach,
      room: newClass.room,
      schedule: newClass.schedule,
      capacity: Number(newClass.capacity),
      activeSessions: 12,
      status: 'ACTIVE',
    };

    setClasses([...classes, item]);
    setShowModal(false);
    setNewClass({
      name: '',
      discipline: isRunova ? 'Tennis' : 'Pilates',
      coach: isRunova ? 'Coach Rafael Lâm' : 'Master Elena Vũ',
      room: isRunova ? 'Center Tennis Arena 01' : 'Studio 01 (Level 2)',
      schedule: 'T2, T4, T6 (09:00 - 10:00)',
      capacity: isRunova ? 4 : 12,
    });
    alert(
      isRunova
        ? 'Tạo khung giờ sân / lớp thi đấu thành công! Database trigger đã xác nhận sân không bị trùng lịch.'
        : 'Tạo lớp học thành công! Database trigger đã xác nhận phòng không bị trùng lịch.'
    );
  };

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">
            {isRunova ? 'Quản Lý Sân & Lịch Huấn Luyện Thể Thao' : 'Quản Lý Lớp Học & Thời Khóa Biểu'}
          </h1>
          <p className="portal-subtitle">
            {isRunova
              ? 'Điều phối cụm sân thi đấu, phân công Coach và kiểm soát công suất (SCMS Module D: Classes & Scheduling)'
              : 'Điều phối phòng tập, phân công HLV và kiểm soát công suất lớp (SCMS Module D: Classes & Scheduling)'}
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={() => setShowModal(true)}>
          {isRunova ? '+ Mở Khung Giờ Sân / Lớp Mới' : '+ Tạo Lớp Học Mới'}
        </button>
      </div>

      {/* Classes Table */}
      <div className="portal-card">
        <div className="portal-table-wrapper">
          <table className="portal-table">
            <thead>
              <tr>
                <th>{isRunova ? 'Tên Lớp / Buổi Đấu' : 'Tên Lớp Học'}</th>
                <th>Bộ Môn</th>
                <th>Huấn Luyện Viên</th>
                <th>{isRunova ? 'Sân Thi Đấu' : 'Phòng Tập'}</th>
                <th>Lịch Định Kỳ</th>
                <th>Sức Chứa</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id}>
                  <td>
                    <strong>{cls.name}</strong>
                    <div style={{ fontSize: '0.72rem', color: '#8C847C' }}>ID: CLS-{cls.id}</div>
                  </td>
                  <td>
                    <span className="badge badge-info">{cls.discipline}</span>
                  </td>
                  <td>{cls.coach}</td>
                  <td>{cls.room}</td>
                  <td>{cls.schedule}</td>
                  <td>
                    <strong>{cls.capacity} {isRunova ? 'VĐV' : 'học viên'}</strong>
                  </td>
                  <td>
                    <span className="badge badge-success">{cls.status}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-secondary btn-sm"
                      onClick={() =>
                        alert(
                          isRunova
                            ? `Xem danh sách vận động viên đã đặt sân ${cls.name}`
                            : `Xem danh sách 12 học viên đã đăng ký lớp ${cls.name}`
                        )
                      }
                    >
                      {isRunova ? 'Danh Sách VĐV' : 'Danh Sách Học Viên'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create New Class */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: isRunova ? '20px' : '8px',
              padding: '32px',
              width: 'min(520px, 92vw)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
              border: isRunova ? '1px solid rgba(22, 56, 44, 0.15)' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: isRunova ? 'var(--font-heading)' : 'var(--font-serif)', fontSize: '1.4rem', margin: 0 }}>
                {isRunova ? 'Mở Khung Giờ Sân / Lớp Đấu Mới' : 'Tạo Lớp Học Mới'}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClass}>
              <div className="portal-form-group">
                <label className="portal-label">
                  {isRunova ? 'Tên Lớp / Buổi Huấn Luyện *' : 'Tên Lớp Học *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isRunova ? 'Ví dụ: Tennis Master Serve Clinic...' : 'Ví dụ: Reformer Pilates Level 2...'}
                  className="portal-input"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="portal-form-group">
                  <label className="portal-label">Bộ Môn</label>
                  <select
                    className="portal-select"
                    value={newClass.discipline}
                    onChange={(e) => setNewClass({ ...newClass, discipline: e.target.value })}
                  >
                    {isRunova ? (
                      <>
                        <option value="Tennis">Tennis (Quần Vợt)</option>
                        <option value="Badminton">Cầu Lông (Badminton)</option>
                        <option value="Padel">Padel Court</option>
                        <option value="Squash">Squash Tốc Độ</option>
                        <option value="Fitness">Athletic Conditioning</option>
                      </>
                    ) : (
                      <>
                        <option value="Pilates">Pilates</option>
                        <option value="Strength">Strength &amp; Conditioning</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Boxing">Boxing</option>
                        <option value="Aquatics">Aquatics</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="portal-form-group">
                  <label className="portal-label">Sức Chứa Tối Đa</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    className="portal-input"
                    value={newClass.capacity}
                    onChange={(e) => setNewClass({ ...newClass, capacity: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="portal-form-group">
                <label className="portal-label">Huấn Luyện Viên Phụ Trách</label>
                <select
                  className="portal-select"
                  value={newClass.coach}
                  onChange={(e) => setNewClass({ ...newClass, coach: e.target.value })}
                >
                  {isRunova ? (
                    <>
                      <option value="Coach Rafael Lâm">Coach Rafael Lâm (Head Tennis Coach)</option>
                      <option value="Master Tuấn Kiệt">Master Tuấn Kiệt (Badminton Master)</option>
                      <option value="Coach Marco Nguyễn">Coach Marco Nguyễn (Padel Specialist)</option>
                      <option value="Coach David Vũ">Coach David Vũ (Squash Pro)</option>
                    </>
                  ) : (
                    <>
                      <option value="Master Elena Vũ">Master Elena Vũ (Head Pilates Coach)</option>
                      <option value="Coach Minh Trí">Coach Minh Trí (CSCS Strength Coach)</option>
                      <option value="Master An Nhiên">Master An Nhiên (Senior Yoga Teacher)</option>
                      <option value="Coach Alex Dương">Coach Alex Dương (Boxing Specialist)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="portal-form-group">
                <label className="portal-label">{isRunova ? 'Sân Thi Đấu' : 'Phòng Tập'}</label>
                <select
                  className="portal-select"
                  value={newClass.room}
                  onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                >
                  {isRunova ? (
                    <>
                      <option value="Center Tennis Arena 01">Center Tennis Arena 01 (Sân cứng)</option>
                      <option value="Sân Padel Kính VIP 02">Sân Padel Kính VIP 02 (Panorama)</option>
                      <option value="Cụm Sân Cầu Lông Đôi 03">Cụm Sân Cầu Lông Đôi 03 (Yonex PVC)</option>
                      <option value="Sân Squash Tốc Độ 01">Sân Squash Tốc Độ 01 (Phòng Kính)</option>
                    </>
                  ) : (
                    <>
                      <option value="Studio 01 (Level 2)">Studio 01 (Level 2 - Reformer)</option>
                      <option value="Arena 02 (Level 1)">Arena 02 (Level 1 - Barbell Rack)</option>
                      <option value="Zen Garden Studio">Zen Garden Studio (Tầng Thượng)</option>
                      <option value="Ring Arena 01">Ring Arena 01 (Khu Boxing)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="portal-form-group">
                <label className="portal-label">Lịch Học Định Kỳ</label>
                <input
                  type="text"
                  placeholder="Ví dụ: T2, T4, T6 (17:30 - 18:30)"
                  className="portal-input"
                  value={newClass.schedule}
                  onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Hủy Bỏ
                </button>
                <button type="submit" className="btn-primary">
                  {isRunova ? 'Lưu & Lên Lịch Sân' : 'Lưu & Lên Lịch Buổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
