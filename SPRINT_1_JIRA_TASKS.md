# Sprint 1 — Jira Task Plan (17/09/2026–30/09/2026)

> **Sprint:** `Sprint 1 – Foundation`  
> **Thời lượng:** 10 ngày làm việc, từ Thứ Năm 17/09 đến Thứ Tư 30/09/2026  
> **Sprint goal:** Demo được luồng: đăng nhập theo role → Member xem lịch lớp → Receptionist tra cứu hội viên.  
> **Capacity:** 40 Story Points. Các ngày 26–27/09 là cuối tuần, không giao ticket mới.

## Cách tạo trên Jira theo board hiện tại

Với từng dòng ở phần 2, nhấn **Create** và điền:

- **Issue type:** theo cột `Type`.
- **Summary:** chép nguyên cột `Summary` (có mã `S1-xx` để dễ theo dõi; Jira tự sinh key thật).
- **Assignee:** thay `BE-1`, `BE-2`, `BE-3`, `FE-1`, `FE-2` bằng tài khoản thành viên thực tế.
- **Sprint:** `Sprint 1 – Foundation`.
- **Due date:** theo cột `Due date`.
- **Epic link / Component:** theo cột tương ứng.
- **Story points:** theo cột `SP`.
- **Description:** chép block mô tả tương ứng ở phần 3.

Tạo 6 Epic trước: `Foundation & Identity`, `Member self-service`, `Reception & Membership`, `Quality & Release`. Với board trong ảnh chỉ có To Do/In Progress/Done, dùng **comment `Blocked by: <Jira key>`** khi ticket bị phụ thuộc; không chuyển Done nếu chưa thỏa Acceptance Criteria.

## 1. Lịch làm việc 2 tuần

| Ngày | Mục tiêu ngày | BE-1 | BE-2 | BE-3 | FE-1 | FE-2 | PM |
|---|---|---|---|---|---|---|---|
| **17/09 Thu** | Kickoff + môi trường chung | S1-01 bắt đầu | S1-05 bắt đầu | S1-02 bắt đầu | S1-04 dựng UI mock | S1-12 bắt đầu | Chốt account, Sprint goal, tạo ticket |
| **18/09 Fri** | Chạy được local/DB | Hoàn tất S1-01 | API class query | Hoàn tất S1-02 | Login form/error UI | Hoàn tất S1-12 | Kiểm tra repo chạy trên máy khác |
| **21/09 Mon** | Contract/API nền | S1-11, S1-03 bắt đầu | Tiếp S1-05 | S1-09 bắt đầu | Tích hợp mock contract | S1-10 bắt đầu | Daily + rà dependency |
| **22/09 Tue** | Lớp và auth | S1-03 | Hoàn tất S1-05 | S1-09 | S1-06 bắt đầu | S1-10 | Kiểm tra Swagger/API response |
| **23/09 Wed** | Staff lookup sẵn sàng | S1-03 | Hỗ trợ integration S1-06 | Hoàn tất S1-09 | S1-06 | S1-10 | Mid-sprint integration test |
| **24/09 Thu** | Auth thật + integration | Hoàn tất S1-03 | Code review/API fix | Hỗ trợ seed/search | S1-04 tích hợp API | S1-10 | Nghiệm thu login flow |
| **25/09 Fri** | Màn hình đọc dữ liệu | S1-07 bắt đầu | Hỗ trợ bug class | Buffer/integration | Hoàn tất S1-06 | Hoàn tất S1-10 | Demo nội bộ lần 1 |
| **28/09 Mon** | Hồ sơ + hardening | Tiếp S1-07 | Test API class | Test search/seed | S1-08 bắt đầu | Regression Staff UI | UAT checklist lần 1 |
| **29/09 Tue** | Hoàn tất màn hình | Hoàn tất S1-07 | Fix blocker | Fix blocker | Hoàn tất S1-08 | Fix blocker | Chốt bug P0/P1 |
| **30/09 Wed** | Review/Retro | Support demo | Support demo | Support demo | Support demo | Support demo | Sprint Review, Retro, move ticket Done |

## 2. Danh sách ticket để tạo trên Jira

| Ref | Type | Summary | Assignee | Epic / Component | SP | Start | Due date | Depends on |
|---|---|---|---|---|---:|---|---|---|
| S1-01 | Task | `[S1-01] Khởi tạo monorepo và môi trường local` | BE-1 | Quality & Release / devops | 3 | 17/09 | **18/09** | — |
| S1-02 | Task | `[S1-02] Khởi tạo SQL Server schema và dữ liệu demo` | BE-3 | Quality & Release / database | 3 | 17/09 | **18/09** | S1-01 |
| S1-03 | Story | `[S1-03] API đăng nhập JWT và phân quyền role` | BE-1 | Foundation & Identity / backend-identity | 5 | 21/09 | **24/09** | S1-01, S1-02 |
| S1-04 | Story | `[S1-04] Màn hình đăng nhập và điều hướng theo role` | FE-1 | Foundation & Identity / frontend-member | 3 | 17/09 | **24/09** | S1-03 (tích hợp từ 24/09) |
| S1-05 | Story | `[S1-05] API danh sách lớp, chi tiết lớp và lịch tuần` | BE-2 | Member self-service / backend-class | 5 | 17/09 | **22/09** | S1-02 |
| S1-06 | Story | `[S1-06] Màn hình Member dashboard, lịch lớp và chi tiết lớp` | FE-1 | Member self-service / frontend-member | 5 | 21/09 | **25/09** | S1-05 |
| S1-07 | Story | `[S1-07] API hồ sơ Member và danh sách user Manager` | BE-1 | Foundation & Identity / backend-identity | 3 | 25/09 | **29/09** | S1-03 |
| S1-08 | Story | `[S1-08] Màn hình Hồ sơ của tôi` | FE-1 | Foundation & Identity / frontend-member | 2 | 28/09 | **29/09** | S1-07 |
| S1-09 | Story | `[S1-09] API tra cứu hội viên cho lễ tân` | BE-3 | Reception & Membership / backend-reception | 3 | 21/09 | **23/09** | S1-02, S1-03 |
| S1-10 | Story | `[S1-10] Màn hình Staff dashboard và tra cứu hội viên` | FE-2 | Reception & Membership / frontend-staff | 4 | 21/09 | **25/09** | S1-09 |
| S1-11 | Task | `[S1-11] Chuẩn hóa API: health, CORS, error response và OpenAPI` | BE-1 | Quality & Release / backend-identity | 2 | 21/09 | **22/09** | S1-01 |
| S1-12 | Task | `[S1-12] Thiết lập CI build/lint/test cho FE và BE` | FE-2 | Quality & Release / devops | 2 | 17/09 | **18/09** | S1-01 |

### Tải theo người

| Assignee | Ticket | Tổng SP | Nhận xét |
|---|---|---:|---|
| BE-1 | S1-01, S1-03, S1-07, S1-11 | **13** | Có 30/09 làm buffer hỗ trợ auth/profile và demo |
| BE-2 | S1-05 | **5** | Sau 22/09 ưu tiên code review, integration và xử lý API class blocker; không kéo ticket Sprint 2 sớm |
| BE-3 | S1-02, S1-09 | **6** | Sau 23/09 hỗ trợ seed, lookup integration và demo data |
| FE-1 | S1-04, S1-06, S1-08 | **10** | Owner toàn bộ Member screens của Sprint 1 |
| FE-2 | S1-10, S1-12 | **6** | Owner toàn bộ Staff screens của Sprint 1 |

> Tổng point của ticket product là **40 SP**. Việc review, support, UAT và demo trong nửa sau sprint là capacity dự phòng, không mở ticket mới trừ Bug P0/P1.

## 3. Description để copy vào từng Jira issue

### S1-01 — Khởi tạo monorepo và môi trường local

**Mục tiêu:** Có codebase chung gồm `apps/api`, `apps/web`, `db`, `.env.example`, README và Docker Compose cho SQL Server.

**Acceptance Criteria**

- Cấu trúc thư mục khớp `README.md`; không commit `.env`, password hoặc secret.
- Một thành viên mới có thể đọc README để chạy web/API/SQL Server local.
- Có `.gitignore`, `.editorconfig`, quy ước branch/PR và health endpoint API.

**Done evidence:** Link PR + screenshot/terminal chạy API health và web.

### S1-02 — Khởi tạo SQL Server schema và dữ liệu demo

**Mục tiêu:** Áp dụng `databaseschema.sql` vào SQL Server local và chuẩn bị dữ liệu không nhạy cảm để demo 4 role.

**Acceptance Criteria**

- `SportsCenterDB` khởi tạo thành công từ DDL; không sửa constraint/trigger hiện có.
- Có ít nhất 1 account demo cho Member, Receptionist, Coach, Center Manager và có dữ liệu lớp/gói phù hợp.
- Hướng dẫn seed/reset rõ ràng; chạy lại không sinh dữ liệu trùng ngoài ý muốn.

**Done evidence:** Script/hướng dẫn + ảnh query xác nhận dữ liệu demo.

### S1-03 — API đăng nhập JWT và phân quyền role

**Mục tiêu:** Cung cấp `POST /api/v1/auth/login` và `GET /api/v1/users/me` để UI xác thực role.

**Acceptance Criteria**

- Password được so sánh bằng BCrypt; response không chứa password hash.
- Token hợp lệ trả user/role cần thiết; sai credential trả `401`, role không được phép trả `403`.
- User `deleted_at IS NOT NULL`, inactive hoặc locked không đăng nhập được.
- OpenAPI có request, success response và error response.

**Done evidence:** Unit/integration test happy path + 401/403, Swagger screenshot.

### S1-04 — Màn hình đăng nhập và điều hướng theo role

**Mục tiêu:** Tạo login screen, loading/error state, lưu session an toàn và điều hướng tới portal phù hợp role.

**Acceptance Criteria**

- Form validate email/password; disable submit khi đang gửi; hiển thị lỗi API thân thiện.
- Member vào `/member/dashboard`; Receptionist/Coach/Manager vào staff portal tương ứng.
- Logout xóa session và đưa về `/login`; route guard xử lý 401/403.

**Done evidence:** Video ngắn đăng nhập Member và Receptionist.

### S1-05 — API danh sách lớp, chi tiết lớp và lịch tuần

**Mục tiêu:** Cung cấp API read-only cho màn hình Member lịch lớp.

**Acceptance Criteria**

- Có list, detail, schedule tuần; filter theo ngày, discipline, level; phân trang list.
- Response có số chỗ còn lại, coach/room/session cần hiển thị và không trả dữ liệu nhạy cảm.
- Dữ liệu từ schema demo, xử lý empty result chuẩn response chung.

**Done evidence:** Swagger + test filter/date/empty list.

### S1-06 — Màn hình Member dashboard, lịch lớp và chi tiết lớp

**Mục tiêu:** Member xem được summary, danh sách lớp, lịch tuần và detail lớp bằng API S1-05.

**Acceptance Criteria**

- Có loading, empty, error state; filter hoạt động và reset được.
- Click class mở detail; hiển thị thông tin lịch, HLV, phòng, level và số chỗ còn lại.
- Responsive tối thiểu tại 1280px và 375px; chưa có nút booking thật trong Sprint 1.

**Done evidence:** Screenshot desktop/mobile + link PR.

### S1-07 — API hồ sơ Member và danh sách user Manager

**Mục tiêu:** Cho Member đọc/sửa hồ sơ cá nhân; Manager đọc list user cơ bản.

**Acceptance Criteria**

- `GET/PUT /api/v1/users/me` chỉ thao tác user hiện tại; validate email/số điện thoại.
- List user manager không trả `password_hash`, mặc định loại soft-deleted user.
- Authorization server-side, lỗi validation theo common error format.

**Done evidence:** Tests GET/PUT/forbidden + OpenAPI update.

### S1-08 — Màn hình Hồ sơ của tôi

**Mục tiêu:** Member xem/sửa các trường profile được phép qua API S1-07.

**Acceptance Criteria**

- Dữ liệu hiện tại được load; form validate và có save success/error feedback.
- Không hiển thị/sửa role, password hash, trạng thái quản trị.
- Có loading/empty/error state và không mất dữ liệu khi API lỗi.

**Done evidence:** Screenshot trước/sau cập nhật profile.

### S1-09 — API tra cứu hội viên cho lễ tân

**Mục tiêu:** Receptionist tìm Member theo tên, phone hoặc membership code và xem tóm tắt gói active.

**Acceptance Criteria**

- Search có pagination; không tìm thấy trả list rỗng hợp lệ.
- Chỉ role staff được gọi; Member bị `403`.
- Kết quả có đủ name, code, phone được che hợp lý nếu cần, trạng thái gói và ngày hết hạn; không có hash/sensitive fields.

**Done evidence:** Test staff/member permission và Swagger request mẫu.

### S1-10 — Màn hình Staff dashboard và tra cứu hội viên

**Mục tiêu:** Lễ tân có bảng tìm kiếm member, detail summary và thông tin gói từ API S1-09.

**Acceptance Criteria**

- Search debounce, loading, empty result và server error state rõ ràng.
- Table có phân trang; click row xem summary gói của hội viên.
- Không render dữ liệu nhạy cảm; responsive desktop cho quầy lễ tân.

**Done evidence:** Video search tên/phone/code và empty state.

### S1-11 — Chuẩn hóa API: health, CORS, error response và OpenAPI

**Mục tiêu:** Thiết lập cross-cutting foundation để FE có contract ổn định.

**Acceptance Criteria**

- `GET /api/v1/health` public, CORS chỉ chấp nhận web origin cấu hình.
- Error format thống nhất: `timestamp`, `status`, `code`, `message`, `details`.
- OpenAPI/Swagger truy cập được và có mô tả auth bearer (khi S1-03 hoàn tất).

**Done evidence:** Swagger URL + thử CORS/error response.

### S1-12 — Thiết lập CI build/lint/test cho FE và BE

**Mục tiêu:** Mỗi pull request phải kiểm tra build/lint frontend và compile/test backend.

**Acceptance Criteria**

- GitHub Actions (hoặc CI đang dùng) chạy khi pull request và push `main/develop`.
- Frontend chạy `npm ci`, `npm run build`, `npm run lint`; Backend dùng Java 21 và `mvn test`.
- CI phải fail khi build/test fail; README ghi trạng thái/điều kiện chạy local.

**Done evidence:** Link workflow run xanh trong PR.

## 4. Quy tắc cập nhật Board mỗi ngày

1. Đầu ngày: assignee kéo đúng ticket được giao sang **In Progress**; không có quá 1 Story chính đang In Progress/người.
2. Có blocker quá 2 giờ: comment `Blocked by: <key> — <lý do>`, tag PM; vẫn để In Progress.
3. Trước khi kéo **Done**: gắn PR, evidence ở phần 3, test result và PM xác nhận Acceptance Criteria.
4. Ngày 30/09: ticket chưa Done quay về Backlog hoặc tạo phần còn lại theo estimate mới; không “Done ảo” để đẹp số liệu sprint.
