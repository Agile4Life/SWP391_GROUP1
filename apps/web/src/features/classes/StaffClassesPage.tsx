import React, { useState } from 'react';
import { Modal } from '../../shared/ui/Modal';
import { toast } from '../../shared/ui/toast';

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

export function StaffClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([
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
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    discipline: 'Pilates',
    coach: 'Master Elena Vũ',
    room: 'Studio 01 (Level 2)',
    schedule: 'T2, T4, T6 (09:00 - 10:00)',
    capacity: 12,
  });

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name.trim()) {
      toast('Vui lòng nhập tên lớp học.', 'error');
      return;
    }

    const item: ClassItem = {
      id: Date.now(),
      name: newClass.name.trim(),
      discipline: newClass.discipline,
      coach: newClass.coach,
      room: newClass.room,
      schedule: newClass.schedule.trim(),
      capacity: Number(newClass.capacity),
      activeSessions: 12,
      status: 'ACTIVE',
    };

    setClasses([...classes, item]);
    setShowModal(false);
    setNewClass({
      name: '',
      discipline: 'Pilates',
      coach: 'Master Elena Vũ',
      room: 'Studio 01 (Level 2)',
      schedule: 'T2, T4, T6 (09:00 - 10:00)',
      capacity: 12,
    });
    toast('Đã tạo lớp học mới thành công!', 'success');
  };

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Quản Lý Lớp Học</h1>
        </div>
        <button type="button" className="btn-primary" onClick={() => setShowModal(true)}>
          + Tạo Lớp Học Mới
        </button>
      </div>

      {/* Classes Table */}
      <div className="portal-card">
        <div className="portal-table-wrapper">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Tên Lớp Học</th>
                <th>Bộ Môn</th>
                <th>Huấn Luyện Viên</th>
                <th>Phòng Tập</th>
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
                    <strong>{cls.capacity} học viên</strong>
                  </td>
                  <td>
                    <span className="badge badge-success">{cls.status}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-secondary btn-sm"
                      onClick={() => toast(`Đang tải danh sách 12 học viên lớp ${cls.name}...`, 'success')}
                    >
                      Danh Sách Học Viên
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
        <Modal title="Tạo Lớp Học Mới" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreateClass} style={{ display: 'grid', gap: 14 }}>
            <div className="portal-form-group">
              <label className="portal-label">Tên Lớp Học *</label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Ví dụ: Reformer Pilates Level 2..."
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
                  <option value="Pilates">Pilates</option>
                  <option value="Strength">Strength &amp; Conditioning</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Boxing">Boxing</option>
                  <option value="Aquatics">Aquatics</option>
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
                <option value="Master Elena Vũ">Master Elena Vũ (Head Pilates Coach)</option>
                <option value="Coach Minh Trí">Coach Minh Trí (CSCS Strength Coach)</option>
                <option value="Master An Nhiên">Master An Nhiên (Senior Yoga Teacher)</option>
                <option value="Coach Alex Dương">Coach Alex Dương (Boxing Specialist)</option>
              </select>
            </div>

            <div className="portal-form-group">
              <label className="portal-label">Phòng Tập</label>
              <select
                className="portal-select"
                value={newClass.room}
                onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
              >
                <option value="Studio 01 (Level 2)">Studio 01 (Level 2 - Reformer)</option>
                <option value="Arena 02 (Level 1)">Arena 02 (Level 1 - Barbell Rack)</option>
                <option value="Zen Garden Studio">Zen Garden Studio (Tầng Thượng)</option>
                <option value="Ring Arena 01">Ring Arena 01 (Khu Boxing)</option>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
              <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                Hủy Bỏ
              </button>
              <button type="submit" className="btn-primary">
                Lưu &amp; Lên Lịch Buổi
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
