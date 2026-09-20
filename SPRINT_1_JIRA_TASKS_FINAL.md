# Sprint 1 — Kế hoạch Jira chuẩn

> **Sprint:** Sprint 1 — Foundation & Read-only Flows  
> **Thời gian:** 19/09/2026–02/10/2026  
> **Development/code freeze:** 19/09–28/09  
> **Testing, bug fix, UAT, Sprint Review:** 29/09–02/10  
> **Sprint goal:** Đăng nhập theo role → Member xem lịch lớp → Receptionist tra cứu hội viên.

## 1. Phân công nhóm

| Thành viên | Vai trò | Ownership |
|---|---|---|
| **Tài** | Backend | API foundation, Auth/JWT/RBAC, Member profile, User list Manager |
| **Phong** | Backend | API class catalog, class detail, weekly schedule |
| **An** | Backend | SQL Server schema/demo seed, Receptionist member search API |
| **Khoa** | Frontend | Login, Member dashboard, class list/detail/schedule, Member profile |
| **Thịnh** | Frontend | Staff dashboard và Receptionist member search |
| **PM** | PO / Scrum Master | Jira, nghiệm thu, UAT, blocker, demo, retro |

## 2. Scope

### Bao gồm

- Login JWT, phân quyền theo role và route guard.
- Member dashboard; danh sách, detail, lịch lớp; profile.
- Receptionist tra cứu Member theo tên, phone hoặc membership code.
- Demo data SQL Server, OpenAPI và kiểm thử nghiệp vụ cơ bản.

### Không bao gồm

- Docker, CI/CD, deployment hay bất kỳ DevOps ticket nào.
- Payment, booking, QR check-in, quản lý lớp CRUD, báo cáo, AI, mobile app.

## 3. Issue list để nhập Jira

Tạo Epic: `Foundation & Identity`, `Member self-service`, `Reception & Membership`, `Quality & Release`.

| Ref | Type | Summary | Assignee | Epic / Component | SP | Start | Due date | Dependency |
|---|---|---|---|---|---:|---|---|---|
| S1-01 | Task | `[S1-01] Khởi tạo SQL Server schema và dữ liệu demo` | An | Quality & Release / database | 3 | 19/09 | **20/09** | — |
| S1-02 | Task | `[S1-02] Chuẩn hóa API foundation: health, CORS, error response, OpenAPI` | Tài | Foundation & Identity / backend-identity | 2 | 19/09 | **21/09** | — |
| S1-03 | Story | `[S1-03] Màn hình đăng nhập và điều hướng theo role` | Khoa | Foundation & Identity / frontend-member | 3 | 19/09 | **22/09** | S1-05 khi tích hợp API thật |
| S1-04 | Story | `[S1-04] API danh sách lớp, chi tiết lớp và lịch tuần` | Phong | Member self-service / backend-class | 5 | 19/09 | **23/09** | S1-01 |
| S1-05 | Story | `[S1-05] API đăng nhập JWT và phân quyền role` | Tài | Foundation & Identity / backend-identity | 5 | 21/09 | **24/09** | S1-01, S1-02 |
| S1-06 | Story | `[S1-06] API tra cứu hội viên cho lễ tân` | An | Reception & Membership / backend-reception | 3 | 21/09 | **24/09** | S1-01, S1-05 |
| S1-07 | Story | `[S1-07] Màn hình Member dashboard, lịch lớp và chi tiết lớp` | Khoa | Member self-service / frontend-member | 5 | 22/09 | **26/09** | S1-04 |
| S1-08 | Story | `[S1-08] Màn hình Staff dashboard và tra cứu hội viên` | Thịnh | Reception & Membership / frontend-staff | 4 | 24/09 | **26/09** | S1-06 |
| S1-09 | Story | `[S1-09] API hồ sơ Member và danh sách user Manager` | Tài | Foundation & Identity / backend-identity | 3 | 25/09 | **27/09** | S1-05 |
| S1-10 | Story | `[S1-10] Màn hình Hồ sơ của tôi` | Khoa | Foundation & Identity / frontend-member | 2 | 27/09 | **28/09** | S1-09 |

**Tổng development: 35 SP.** Mốc 28/09 có các ngày cuối tuần 19–20 và 26–27; cần xác nhận nhóm vẫn có thời gian làm việc/cập nhật vào những ngày này. Nếu không làm cuối tuần, chuyển S1-09/S1-10 sang Sprint 2.

## 4. Acceptance Criteria

### S1-01 — SQL Server schema và demo seed

- Tạo thành công `SportsCenterDB` từ `databaseschema.sql`; không sửa trigger/constraint hiện có.
- Có account demo cho Member, Receptionist, Coach, Manager; có class, session và package cho demo.
- Có hướng dẫn reset/seed, không commit password hoặc dữ liệu thật.

### S1-02 — API foundation

- `GET /api/v1/health` public và trả `UP`.
- Error response thống nhất gồm `timestamp`, `status`, `code`, `message`, `details`.
- CORS chỉ cho phép frontend origin cấu hình; OpenAPI/Swagger truy cập được.

### S1-03 — Login UI

- Validate email/password, loading state, disable submit và hiển thị lỗi API thân thiện.
- Member đến Member portal; Receptionist/Coach/Manager đến Staff portal.
- Logout xóa session; xử lý UI cho 401/403.

### S1-04 — API class catalog và schedule

- Có class list, class detail, schedule tuần, filter date/discipline/level và pagination.
- Response có coach, room, session, level, số chỗ còn lại; không trả dữ liệu nhạy cảm.
- Empty result là response hợp lệ, không 500.

### S1-05 — API JWT/RBAC

- Có `POST /api/v1/auth/login`, `GET /api/v1/users/me`, JWT bearer và role authorization.
- BCrypt password; sai credential trả 401; sai role trả 403.
- User inactive, locked hoặc soft-deleted không đăng nhập được.
- Có OpenAPI và test happy path + auth failure.

### S1-06 — API Receptionist search

- Search theo tên/phone/membership code, có pagination; không có kết quả trả list rỗng.
- Chỉ Staff truy cập; Member bị 403.
- Kết quả có name, membership code, trạng thái/hạn gói; không lộ hash hoặc dữ liệu nhạy cảm.

### S1-07 — Member screens

- Có dashboard, class list/filter, weekly schedule, class detail bằng API S1-04.
- Có loading, empty, error state; class detail hiển thị lịch/HLV/phòng/level/chỗ còn lại.
- Responsive tại 1280px và 375px; chưa có booking trong Sprint 1.

### S1-08 — Staff search screen

- Search debounce tên/phone/code; có loading, empty và server-error state.
- Bảng có pagination, click row xem summary gói Member.
- Không render dữ liệu nhạy cảm.

### S1-09 — Member profile API

- `GET/PUT /api/v1/users/me` chỉ thao tác current user; validate email/phone.
- Manager user list loại soft-deleted user và không trả password hash.
- Có test update, validation error, forbidden access.

### S1-10 — Member profile UI

- Load dữ liệu hiện tại, validate form, hiển thị save success/error.
- Không cho sửa role, password hash hoặc trạng thái quản trị.
- Không mất input khi server trả validation error.

## 5. Lịch development: 19/09–28/09

| Ngày | Tài | Phong | An | Khoa | Thịnh | PM |
|---|---|---|---|---|---|---|
| **19/09** | S1-02 | S1-04 | S1-01 | S1-03 UI mock | Chuẩn bị Staff UI | Tạo Sprint, Epic, issue |
| **20/09** | Hoàn tất S1-02 | S1-04 | Hoàn tất S1-01 | Hoàn tất Login mock | Data table/search UX | Kiểm tra demo data |
| **21/09** | Bắt đầu S1-05 | S1-04 | Bắt đầu S1-06 | Tích hợp mock contract | Chuẩn bị S1-08 | Daily, rà blocker |
| **22/09** | S1-05 | S1-04 | S1-06 | Bắt đầu S1-07 | S1-08 mock | Kiểm tra contract |
| **23/09** | S1-05 | Hoàn tất S1-04 | S1-06 | S1-07 | S1-08 | Integration class API |
| **24/09** | Hoàn tất S1-05 | Review/fix class API | Hoàn tất S1-06 | Tích hợp Login thật | Tích hợp Search API | Nghiệm thu API |
| **25/09** | Bắt đầu S1-09 | Support integration | Seed/search support | S1-07 | S1-08 | Demo nội bộ 1 |
| **26/09** | S1-09 | Review/fix | Review/fix | Hoàn tất S1-07 | Hoàn tất S1-08 | Log bug |
| **27/09** | Hoàn tất S1-09 | Fix blocker | Fix blocker | Bắt đầu S1-10 | Regression staff UI | UAT round 1 |
| **28/09** | Support/code freeze | Support/code freeze | Support/code freeze | Hoàn tất S1-10 | Support/code freeze | Chốt code freeze |

## 6. Testing/UAT: 29/09–02/10

Tạo bốn `Task` sau trong cùng Sprint, không tính Story Point.

| Ref | Summary | Assignee | Due date | Nội dung |
|---|---|---|---|---|
| S1-QA-01 | `[S1-QA-01] Test login JWT và RBAC` | Tài, Khoa, PM | 29/09 | Test 4 role, wrong password, inactive/locked/deleted user, 401/403, logout. |
| S1-QA-02 | `[S1-QA-02] Test Member screens` | Phong, Khoa, PM | 30/09 | Dashboard, class list/filter/detail/schedule, profile validation, responsive. |
| S1-QA-03 | `[S1-QA-03] Test Receptionist search screen` | An, Thịnh, PM | 01/10 | Search name/phone/code, pagination, empty/error state, staff authorization. |
| S1-QA-04 | `[S1-QA-04] Regression, UAT và Sprint Review` | Cả nhóm, PM | 02/10 | Regression demo flow, fix P0/P1, seed demo cuối, rehearsal, Sprint Review. |

## 7. Board rules

1. Mỗi người tối đa một Story ở **In Progress**.
2. Blocker quá hai giờ: comment `Blocked by: <Jira key> — <lý do>` và tag PM.
3. Chỉ chuyển **Done** khi có PR, review, test/evidence và PM nghiệm thu.
4. Sau 28/09 chỉ sửa lỗi P0/P1; feature mới/UI polish chuyển Sprint 2.
