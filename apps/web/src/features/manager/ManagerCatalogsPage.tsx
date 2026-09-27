import { useState, useEffect } from 'react';
import { useTheme } from '../../shared/context/ThemeContext';

const SOL_DISCIPLINES = [
  { id: 1, name: 'Reformer Pilates', desc: 'Định hình vóc dáng, phục hồi cột sống và cơ lõi trên máy Reformer', classes: 8 },
  { id: 2, name: 'Olympic Strength', desc: 'Rèn luyện sức mạnh bộc phát với tạ đòn chuẩn Olympic', classes: 12 },
  { id: 3, name: 'Mindful Yoga', desc: 'Tập trung hơi thở, kéo giãn cơ sâu và thiền định chuông xoay', classes: 10 },
  { id: 4, name: 'Boxing & Kickfit', desc: 'Chiến thuật đối kháng, phản xạ và đốt mỡ cường độ cao', classes: 6 },
  { id: 5, name: 'Thermal Aquatics', desc: 'Bơi lội hydrodynamic và liệu pháp phục hồi nước khoáng ấm', classes: 4 },
];

const RUNOVA_DISCIPLINES = [
  { id: 1, name: 'Tennis (Quần Vợt)', desc: 'Sân cứng chuẩn ITF, hỗ trợ cảm biến AI đo lực và tốc độ giao bóng', classes: 12 },
  { id: 2, name: 'Cầu Lông (Badminton)', desc: 'Sân thảm PVC giảm chấn 5 lớp, ánh sáng chống chói chuẩn BWF', classes: 16 },
  { id: 3, name: 'Padel Court', desc: 'Môn thể thao vợt bùng nổ, sân lồng kính Panorama 360 độ hiện đại', classes: 10 },
  { id: 4, name: 'Squash Tốc Độ', desc: 'Sân bóng quần phản xạ cực đại, tôi luyện sức bền và chuyển động linh hoạt', classes: 8 },
  { id: 5, name: 'Athletic Conditioning', desc: 'Huấn luyện thể lực bổ trợ, tăng tốc độ bứt phá và sức bền sân đấu', classes: 14 },
];

const SOL_ROOMS = [
  { id: 1, name: 'Studio 01', location: 'Level 2 - North Wing', capacity: 12, status: 'AVAILABLE' },
  { id: 2, name: 'Arena 02 (Strength)', location: 'Level 1 - Main Floor', capacity: 25, status: 'AVAILABLE' },
  { id: 3, name: 'Zen Garden Studio', location: 'Tầng Thượng Penthouse', capacity: 18, status: 'AVAILABLE' },
  { id: 4, name: 'Ring Arena 01', location: 'Level 1 - East Wing', capacity: 14, status: 'MAINTENANCE' },
  { id: 5, name: 'Oasis Lap Pool', location: 'Sub-level Oasis', capacity: 20, status: 'AVAILABLE' },
];

const RUNOVA_ROOMS = [
  { id: 1, name: 'Center Tennis Arena 01', location: 'Tầng 1 - Cụm Sân Trung Tâm', capacity: 4, status: 'AVAILABLE' },
  { id: 2, name: 'Sân Padel Kính VIP 02', location: 'Tầng 1 - Khu Padel Panorama', capacity: 4, status: 'AVAILABLE' },
  { id: 3, name: 'Cụm Sân Cầu Lông Đôi 03', location: 'Tầng 2 - Hall Thi Đấu BWF', capacity: 16, status: 'AVAILABLE' },
  { id: 4, name: 'Sân Squash Tốc Độ 01', location: 'Tầng 1 - Cụm Sân Phản Xạ', capacity: 4, status: 'AVAILABLE' },
  { id: 5, name: 'Phòng Gym Thể Lực Sân Đấu', location: 'Tầng 2 - Performance Center', capacity: 20, status: 'AVAILABLE' },
];

const SOL_PACKAGES = [
  { id: 1, name: 'The Essential', price: '2.800.000 đ', duration: '30 ngày', credits: '8 buổi', status: 'ACTIVE' },
  { id: 2, name: 'The Sanctuary VIP', price: '7.500.000 đ', duration: '90 ngày', credits: 'Không giới hạn', status: 'ACTIVE' },
  { id: 3, name: 'The Sovereign Annual', price: '26.000.000 đ', duration: '365 ngày', credits: 'Không giới hạn + 24 PT', status: 'ACTIVE' },
];

const RUNOVA_PACKAGES = [
  { id: 1, name: 'Club Player', price: '1.800.000 đ', duration: '30 ngày', credits: 'Giờ tiêu chuẩn (6h - 17h)', status: 'ACTIVE' },
  { id: 2, name: 'Championship Pro', price: '4.900.000 đ', duration: '90 ngày', credits: 'Giờ vàng + Cảm biến AI + 4 PT', status: 'ACTIVE' },
  { id: 3, name: 'Tournament Master', price: '16.500.000 đ', duration: '365 ngày', credits: 'Không giới hạn 24/7 + Video AI', status: 'ACTIVE' },
];

export function ManagerCatalogsPage() {
  const { theme } = useTheme();
  const isRunova = theme === 'runova';

  const [activeTab, setActiveTab] = useState<'disciplines' | 'rooms' | 'packages'>('disciplines');

  const [disciplines, setDisciplines] = useState(isRunova ? RUNOVA_DISCIPLINES : SOL_DISCIPLINES);
  const [rooms, setRooms] = useState(isRunova ? RUNOVA_ROOMS : SOL_ROOMS);
  const [packages, setPackages] = useState(isRunova ? RUNOVA_PACKAGES : SOL_PACKAGES);

  useEffect(() => {
    setDisciplines(isRunova ? RUNOVA_DISCIPLINES : SOL_DISCIPLINES);
    setRooms(isRunova ? RUNOVA_ROOMS : SOL_ROOMS);
    setPackages(isRunova ? RUNOVA_PACKAGES : SOL_PACKAGES);
  }, [isRunova]);

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">
            {isRunova ? 'Quản Trị Cụm Sân & Danh Mục Thể Thao' : 'Quản Trị Danh Mục & Cơ Sở Vật Chất'}
          </h1>
          <p className="portal-subtitle">
            {isRunova
              ? 'Cấu hình bộ môn thi đấu, cụm sân bãi và bảng giá thẻ Court Pass (SCMS Module B: Master Facilities)'
              : 'Cấu hình bộ môn thể thao, phòng tập và bảng giá gói dịch vụ (SCMS Module B: Master Facilities)'}
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          style={{
            backgroundColor: isRunova ? '#16382C' : undefined,
            color: isRunova ? '#D4E95C' : undefined,
            borderRadius: isRunova ? '9999px' : undefined,
            fontWeight: 700,
          }}
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
          {isRunova ? 'Danh Mục Bộ Môn Vợt' : 'Danh Mục Bộ Môn'} ({disciplines.length})
        </button>
        <button
          type="button"
          className={`portal-tab ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          {isRunova ? 'Cụm Sân & Phòng Tập' : 'Phòng Tập & Cơ Sở'} ({rooms.length})
        </button>
        <button
          type="button"
          className={`portal-tab ${activeTab === 'packages' ? 'active' : ''}`}
          onClick={() => setActiveTab('packages')}
        >
          {isRunova ? 'Bảng Giá Thẻ Court Pass' : 'Gói Dịch Vụ Thành Viên'} ({packages.length})
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
