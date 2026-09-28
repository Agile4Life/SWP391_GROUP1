import { useState } from 'react';

export function ManagerCatalogsPage() {
  const [activeTab, setActiveTab] = useState<'disciplines' | 'rooms' | 'packages'>('disciplines');

  const [disciplines, setDisciplines] = useState([
    { id: 1, name: 'Reformer Pilates', desc: 'Định hình vóc dáng, phục hồi cột sống và cơ lõi trên máy Reformer', classes: 8 },
    { id: 2, name: 'Olympic Strength', desc: 'Rèn luyện sức mạnh bộc phát với tạ đòn chuẩn Olympic', classes: 12 },
    { id: 3, name: 'Mindful Yoga', desc: 'Tập trung hơi thở, kéo giãn cơ sâu và thiền định chuông xoay', classes: 10 },
    { id: 4, name: 'Boxing & Kickfit', desc: 'Chiến thuật đối kháng, phản xạ và đốt mỡ cường độ cao', classes: 6 },
    { id: 5, name: 'Thermal Aquatics', desc: 'Bơi lội hydrodynamic và liệu pháp phục hồi nước khoáng ấm', classes: 4 },
  ]);

  const [rooms, setRooms] = useState([
    { id: 1, name: 'Studio 01', location: 'Level 2 - North Wing', capacity: 12, status: 'AVAILABLE' },
    { id: 2, name: 'Arena 02 (Strength)', location: 'Level 1 - Main Floor', capacity: 25, status: 'AVAILABLE' },
    { id: 3, name: 'Zen Garden Studio', location: 'Tầng Thượng Penthouse', capacity: 18, status: 'AVAILABLE' },
    { id: 4, name: 'Ring Arena 01', location: 'Level 1 - East Wing', capacity: 14, status: 'MAINTENANCE' },
    { id: 5, name: 'Oasis Lap Pool', location: 'Sub-level Oasis', capacity: 20, status: 'AVAILABLE' },
  ]);

  const [packages] = useState([
    { id: 1, name: 'The Essential', price: '2.800.000 đ', duration: '30 ngày', credits: '8 buổi', status: 'ACTIVE' },
    { id: 2, name: 'The Sanctuary VIP', price: '7.500.000 đ', duration: '90 ngày', credits: 'Không giới hạn', status: 'ACTIVE' },
    { id: 3, name: 'The Sovereign Annual', price: '26.000.000 đ', duration: '365 ngày', credits: 'Không giới hạn + 24 PT', status: 'ACTIVE' },
  ]);

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Quản Trị Danh Mục &amp; Cơ Sở Vật Chất</h1>
          <p className="portal-subtitle">
            Cấu hình bộ môn thể thao, phòng tập và bảng giá gói dịch vụ (SCMS Module B: Master Facilities)
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => alert(`Mở hộp thoại thêm mới vào danh mục: ${activeTab.toUpperCase()}`)}
        >
          + Thêm Mục Mới
        </button>
      </div>

      {/* Tabs */}
      <div className="portal-tabs">
        <button
          type="button"
          className={`portal-tab ${activeTab === 'disciplines' ? 'active' : ''}`}
          onClick={() => setActiveTab('disciplines')}
        >
          Danh Mục Bộ Môn ({disciplines.length})
        </button>
        <button
          type="button"
          className={`portal-tab ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          Phòng Tập &amp; Cơ Sở ({rooms.length})
        </button>
        <button
          type="button"
          className={`portal-tab ${activeTab === 'packages' ? 'active' : ''}`}
          onClick={() => setActiveTab('packages')}
        >
          Gói Dịch Vụ Thành Viên ({packages.length})
        </button>
      </div>

      {/* Disciplines Tab */}
      {activeTab === 'disciplines' && (
        <div className="portal-card">
          <div className="portal-table-wrapper">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Tên Bộ Môn</th>
                  <th>Mô Tả Nghiệp Vụ</th>
                  <th>Số Lớp Đang Mở</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {disciplines.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.name}</strong></td>
                    <td style={{ color: '#6A635D', maxWidth: '400px' }}>{d.desc}</td>
                    <td><span className="badge badge-info">{d.classes} lớp học</span></td>
                    <td>
                      <button
                        type="button"
                        className="btn-secondary btn-sm"
                        onClick={() => {
                          const newName = prompt('Đổi tên bộ môn:', d.name);
                          if (newName) setDisciplines(disciplines.map((item) => (item.id === d.id ? { ...item, name: newName } : item)));
                        }}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rooms Tab */}
      {activeTab === 'rooms' && (
        <div className="portal-card">
          <div className="portal-table-wrapper">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Tên Phòng Tập</th>
                  <th>Vị Trí / Tầng</th>
                  <th>Sức Chứa Tối Đa</th>
                  <th>Tình Trạng</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.name}</strong></td>
                    <td>{r.location}</td>
                    <td><strong>{r.capacity} người</strong></td>
                    <td>
                      <span className={`badge ${r.status === 'AVAILABLE' ? 'badge-success' : 'badge-warning'}`}>
                        {r.status === 'AVAILABLE' ? 'Đang Hoạt Động' : 'Bảo Trì'}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-secondary btn-sm"
                        onClick={() => {
                          setRooms(rooms.map((rm) => (rm.id === r.id ? { ...rm, status: rm.status === 'AVAILABLE' ? 'MAINTENANCE' : 'AVAILABLE' } : rm)));
                        }}
                      >
                        Chuyển Trạng Thái
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Packages Tab */}
      {activeTab === 'packages' && (
        <div className="portal-card">
          <div className="portal-table-wrapper">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Tên Gói Tập</th>
                  <th>Đơn Giá</th>
                  <th>Thời Hạn (Ngày)</th>
                  <th>Lớp Kèm Theo</th>
                  <th>Tình Trạng</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((p) => (
                  <tr key={p.id}>
                    <td><strong>{p.name}</strong></td>
                    <td style={{ fontWeight: 600, color: '#1A1614' }}>{p.price}</td>
                    <td>{p.duration}</td>
                    <td>{p.credits}</td>
                    <td><span className="badge badge-success">{p.status}</span></td>
                    <td>
                      <button
                        type="button"
                        className="btn-secondary btn-sm"
                        onClick={() => alert(`Cập nhật biểu giá gói ${p.name}`)}
                      >
                        Chỉnh Giá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
