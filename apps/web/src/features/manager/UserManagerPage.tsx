import { useState, useEffect, useMemo } from "react";
import {
  userApi,
  UserAccount,
  SystemRole,
  CORE_ROLES,
  Permission,
} from "./userApi";

export function UserManagerPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [rolePerms, setRolePerms] = useState<Record<SystemRole, string[]>>({
    CENTER_MANAGER: [],
    COACH: [],
    RECEPTIONIST: [],
    MEMBER: [],
  });
  const [activeTab, setActiveTab] = useState<"USERS" | "ROLES">("ROLES");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "COACH" as SystemRole,
  });

  // Quản lý lỗi hiển thị trực tiếp dưới từng ô input
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      setLoadError("");
      const [u, r, p] = await Promise.all([
        userApi.getUsers(),
        userApi.getRolePermissions(),
        userApi.getPermissions(),
      ]);
      setUsers(u);
      setRolePerms(r);
      setPermissions(p);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.phone.includes(searchTerm);
      const matchRole = roleFilter === "ALL" || u.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [users, searchTerm, roleFilter]);

  async function handleToggleLock(user: UserAccount) {
    const actionName =
      user.status === "ACTIVE" ? "khóa (soft-delete)" : "mở khóa";
    if (
      !window.confirm(
        `Bạn có chắc muốn ${actionName} tài khoản "${user.name}"?`,
      )
    )
      return;

    try {
      const updated = await userApi.toggleLockUser(user.id);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch (err) {
      alert((err as Error).message || "Thao tác thất bại.");
    }
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.phone.trim();

    const errors: { name?: string; email?: string; phone?: string; password?: string } = {};

    // 1. Kiểm tra Họ và tên
    if (!cleanName) {
      errors.name = "Vui lòng nhập họ và tên.";
    } else if (cleanName.length < 2) {
      errors.name = "Họ và tên quá ngắn (tối thiểu 2 ký tự).";
    }

    // 2. Kiểm tra Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!cleanEmail) {
      errors.email = "Vui lòng nhập email liên hệ.";
    } else if (cleanEmail.toLowerCase().endsWith("@gmail.co")) {
      errors.email = "Có vẻ bạn gõ nhầm @gmail.co? Vui lòng sửa thành @gmail.com";
    } else if (!emailRegex.test(cleanEmail)) {
      errors.email = "Email liên hệ không đúng định dạng (vd: mai@fitcenter.com).";
    }

    // 3. Kiểm tra Số điện thoại Việt Nam (10 số, bắt đầu 03, 05, 07, 08, 09)
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!cleanPhone) {
      errors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!phoneRegex.test(cleanPhone)) {
      errors.phone = "Số điện thoại không hợp lệ (Phải là 10 số, vd: 0912345678).";
    }

    // Nếu có lỗi ở trường nào, set lỗi vào state để hiển thị ngay bên dưới
    if (formData.password.length < 6 || formData.password.length > 50) {
      errors.password = "Mật khẩu phải từ 6 đến 50 ký tự.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    try {
      const created = await userApi.createUser({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        password: formData.password,
        role: formData.role,
      });
      setUsers((prev) => [created, ...prev]);
      setIsModalOpen(false);
      setFormData({ name: "", email: "", phone: "", password: "", role: "COACH" });
    } catch (err) {
      alert((err as Error).message || "Không thể tạo người dùng.");
    }
  }

  async function handleTogglePermission(role: SystemRole, permId: string) {
    if (role === "CENTER_MANAGER") return;

    await userApi.toggleRolePermission(role, permId);
    const updated = await userApi.getRolePermissions();
    setRolePerms({ ...updated });
  }

  const getRoleBadge = (role: SystemRole) => {
    switch (role) {
      case "CENTER_MANAGER":
        return (
          <span
            style={{
              ...styles.badge,
              backgroundColor: "#FEF3C7",
              color: "#92400E",
            }}
          >
            Quản lý
          </span>
        );
      case "COACH":
        return (
          <span
            style={{
              ...styles.badge,
              backgroundColor: "#E0E7FF",
              color: "#3730A3",
            }}
          >
            Huấn luyện viên
          </span>
        );
      case "RECEPTIONIST":
        return (
          <span
            style={{
              ...styles.badge,
              backgroundColor: "#E0F2FE",
              color: "#0369A1",
            }}
          >
            Lễ tân
          </span>
        );
      case "MEMBER":
        return (
          <span
            style={{
              ...styles.badge,
              backgroundColor: "#F1F5F9",
              color: "#475569",
            }}
          >
            Hội viên
          </span>
        );
    }
  };

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Quản lý Người dùng & Phân quyền</h1>
        </div>
        <div style={styles.tabGroup}>
          <button
            onClick={() => setActiveTab("USERS")}
            style={
              activeTab === "USERS" ? styles.tabActive : styles.tabInactive
            }
          >
            Danh sách Tài khoản
          </button>
          <button
            onClick={() => setActiveTab("ROLES")}
            style={
              activeTab === "ROLES" ? styles.tabActive : styles.tabInactive
            }
          >
            Phân quyền Vai trò
          </button>
        </div>
      </div>

      {loading && <div role="status">{"\u0110ang t\u1ea3i d\u1eef li\u1ec7u..."}</div>}

      {loadError && (
        <div role="alert" style={{ color: "#B91C1C", marginBottom: 12 }}>
          {loadError}{" "}
          <button type="button" onClick={() => void loadData()}>
            Thử lại
          </button>
        </div>
      )}

      {activeTab === "USERS" ? (
        <div>
          {/* Controls Bar */}
          <div style={styles.controlsBar}>
            <div style={styles.filterGroup}>
              <input
                type="text"
                placeholder="Tìm theo tên, email hoặc SĐT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={styles.selectInput}
              >
                <option value="ALL">Tất cả vai trò</option>
                <option value="CENTER_MANAGER">Quản lý trung tâm</option>
                <option value="COACH">Huấn luyện viên</option>
                <option value="RECEPTIONIST">Lễ tân</option>
                <option value="MEMBER">Hội viên</option>
              </select>
            </div>
            <button
              onClick={() => {
                setFieldErrors({});
                setIsModalOpen(true);
              }}
              style={styles.primaryBtn}
            >
              + Thêm tài khoản mới
            </button>
          </div>

          {/* User Table */}
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeadRow}>
                  <th style={styles.th}>Họ và tên</th>
                  <th style={styles.th}>Liên hệ</th>
                  <th style={styles.th}>Vai trò</th>
                  <th style={styles.th}>Trạng thái</th>
                  <th style={styles.th}>Ngày tạo</th>
                  <th style={{ ...styles.th, textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 600, color: "#0F172A" }}>
                        {u.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "#94A3B8" }}>
                        ID: {u.id}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div>{u.email}</div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>
                        {u.phone}
                      </div>
                    </td>
                    <td style={styles.td}>{getRoleBadge(u.role)}</td>
                    <td style={styles.td}>
                      {u.status === "ACTIVE" ? (
                        <span style={styles.activeDot}>● Hoạt động</span>
                      ) : (
                        <div>
                          <span style={styles.lockedDot}>● Đã khóa</span>
                          <div
                            style={{
                              fontSize: "10px",
                              color: "#94A3B8",
                              marginTop: "2px",
                            }}
                          >
                            Soft-delete:{" "}
                            {new Date(u.deleted_at!).toLocaleDateString("vi-VN")}
                          </div>
                        </div>
                      )}
                    </td>
                    <td style={styles.td}>{u.created_at}</td>
                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <button
                        onClick={() => handleToggleLock(u)}
                        disabled={u.role === "CENTER_MANAGER"}
                        style={
                          u.status === "ACTIVE"
                            ? styles.lockBtn
                            : styles.unlockBtn
                        }
                      >
                        {u.status === "ACTIVE" ? "Khóa" : "Kích hoạt"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Matrix Phân quyền RBAC */
        <div style={styles.tableCard}>
          <div style={{ padding: "20px", borderBottom: "1px solid #E2E8F0" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                margin: 0,
                color: "#0F172A",
              }}
            >
              Ma trận Phân quyền & Vai trò (RBAC)
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#64748B",
                margin: "4px 0 0 0",
              }}
            >
              4 vai trò gốc cố định. Quản lý trung tâm mặc định giữ toàn quyền bảo mật. Click vào các ô vuông để phân quyền cho Huấn luyện viên, Lễ tân hoặc Hội viên.
            </p>
          </div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeadRow}>
                <th style={{ ...styles.th, width: "40%" }}>
                  Chức năng / Quyền hạn
                </th>
                {CORE_ROLES.map((r) => (
                  <th key={r.id} style={{ ...styles.th, textAlign: "center" }}>
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm) => (
                <tr key={perm.id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={{ fontWeight: 600, color: "#1E293B" }}>
                      {perm.name}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#64748B",
                        marginTop: "2px",
                      }}
                    >
                      Mã: <code>{perm.code}</code> • Phân hệ: {perm.module}
                    </div>
                  </td>
                  {CORE_ROLES.map((role) => {
                    const isManager = role.id === "CENTER_MANAGER";
                    const isChecked = rolePerms[role.id]?.includes(perm.id);

                    return (
                      <td
                        key={role.id}
                        style={{ ...styles.td, textAlign: "center" }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isManager}
                          title={
                            isManager
                              ? "Quyền mặc định của Quản lý trung tâm (không thể hủy)"
                              : "Click để gán hoặc hủy quyền"
                          }
                          onChange={() =>
                            handleTogglePermission(role.id, perm.id)
                          }
                          style={{
                            width: "18px",
                            height: "18px",
                            accentColor: "#046A38",
                            cursor: isManager ? "not-allowed" : "pointer",
                            opacity: isManager ? 0.65 : 1,
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Thêm tài khoản */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                Thêm tài khoản mới
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setFieldErrors({});
                }}
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} style={styles.form} noValidate>
              {/* Ô Họ và tên */}
              <div>
                <label style={styles.label}>Họ và tên</label>
                <input
                  type="text"
                  placeholder="Vd: Nguyễn Thị Mai"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (fieldErrors.name) {
                      setFieldErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  style={{
                    ...styles.modalInput,
                    borderColor: fieldErrors.name ? "#DC2626" : "#CBD5E1",
                  }}
                />
                {fieldErrors.name && (
                  <p style={styles.fieldErrorText}>{fieldErrors.name}</p>
                )}
              </div>

              {/* Ô Email */}
              <div>
                <label style={styles.label}>Email liên hệ</label>
                <input
                  type="email"
                  placeholder="mai.nguyen@fitcenter.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) {
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  style={{
                    ...styles.modalInput,
                    borderColor: fieldErrors.email ? "#DC2626" : "#CBD5E1",
                  }}
                />
                {fieldErrors.email && (
                  <p style={styles.fieldErrorText}>{fieldErrors.email}</p>
                )}
              </div>

              {/* Ô Số điện thoại */}
              <div>
                <label style={styles.label}>Số điện thoại</label>
                <input
                  type="tel"
                  placeholder="0912345678"
                  maxLength={11}
                  value={formData.phone}
                  onChange={(e) => {
                    // Tự động loại bỏ chữ cái, chỉ nhận ký tự số
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                    setFormData({ ...formData, phone: onlyNumbers });
                    if (fieldErrors.phone) {
                      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                    }
                  }}
                  style={{
                    ...styles.modalInput,
                    borderColor: fieldErrors.phone ? "#DC2626" : "#CBD5E1",
                  }}
                />
                {fieldErrors.phone && (
                  <p style={styles.fieldErrorText}>{fieldErrors.phone}</p>
                )}
              </div>

              <div>
                <label style={styles.label}>Mật khẩu ban đầu</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Tối thiểu 6 ký tự"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  style={{
                    ...styles.modalInput,
                    borderColor: fieldErrors.password ? "#DC2626" : "#CBD5E1",
                  }}
                />
                {fieldErrors.password && (
                  <p style={styles.fieldErrorText}>{fieldErrors.password}</p>
                )}
              </div>

              {/* Ô Role */}
              <div>
                <label style={styles.label}>Gán vai trò (Role)</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as SystemRole,
                    })
                  }
                  style={styles.modalInput}
                >
                  <option value="COACH">Huấn luyện viên (Coach)</option>
                  <option value="RECEPTIONIST">
                    Lễ tân / Thu ngân (Receptionist)
                  </option>
                  <option value="MEMBER">Hội viên (Member)</option>
                </select>
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFieldErrors({});
                  }}
                  style={styles.secondaryBtn}
                >
                  Hủy
                </button>
                <button type="submit" style={styles.primaryBtn}>
                  Xác nhận tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: { fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: 0 },
  subtitle: { fontSize: "13px", color: "#64748B", marginTop: "4px" },
  tabGroup: {
    display: "flex",
    backgroundColor: "#E2E8F0",
    padding: "4px",
    borderRadius: "12px",
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
    color: "#046A38",
    fontWeight: 700,
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  tabInactive: {
    backgroundColor: "transparent",
    color: "#64748B",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  controlsBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    gap: "16px",
  },
  filterGroup: { display: "flex", gap: "12px", flex: 1 },
  searchInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
    outline: "none",
    fontSize: "13px",
  },
  selectInput: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
    outline: "none",
    fontSize: "13px",
    backgroundColor: "#FFFFFF",
  },
  primaryBtn: {
    backgroundColor: "#046A38",
    color: "#FFFFFF",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
  },
  secondaryBtn: {
    backgroundColor: "#F1F5F9",
    color: "#475569",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
  },
  tableCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "13px",
  },
  tableHeadRow: {
    backgroundColor: "#F8FAFC",
    borderBottom: "1px solid #E2E8F0",
  },
  th: {
    padding: "14px 18px",
    fontWeight: 600,
    color: "#475569",
    fontSize: "12px",
  },
  tr: { borderBottom: "1px solid #F1F5F9" },
  td: { padding: "14px 18px", verticalAlign: "middle" },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: 700,
  },
  activeDot: { color: "#046A38", fontWeight: 600 },
  lockedDot: { color: "#DC2626", fontWeight: 600 },
  lockBtn: {
    backgroundColor: "#FEE2E2",
    color: "#991B1B",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 600,
  },
  unlockBtn: {
    backgroundColor: "#E0F2FE",
    color: "#0284C7",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 600,
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "440px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#64748B",
  },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  label: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#334155",
    display: "block",
    marginBottom: "4px",
  },
  modalInput: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #CBD5E1",
    fontSize: "13px",
    boxSizing: "border-box",
    outline: "none",
  },
  fieldErrorText: {
    color: "#DC2626",
    fontSize: "11px",
    marginTop: "4px",
    marginBottom: "0px",
    fontWeight: 500,
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  },
};