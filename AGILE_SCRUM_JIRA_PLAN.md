# Kế hoạch Agile Scrum — Sports Center Management System

> **Dự án:** SWP391 — Sports Center Management System  
> **Nhóm:** 5 người (3 Backend, 2 Frontend) · **Thời lượng:** 3 sprint × 2 tuần  
> **Stack chốt:** React.js + Vite + TypeScript, Java 17 + Spring Boot 3, SQL Server 2019+  
> **Phạm vi:** web responsive cho Member, Receptionist, Coach và Center Manager. Mobile native và tích hợp AI thật không thuộc MVP 3 sprint; AI được để dưới dạng mock/stub nếu còn thời gian.

## 1. Mục tiêu demo sau Sprint 3

Một hội viên có thể đăng nhập, xem/cập nhật hồ sơ, xem gói tập và thẻ QR, xem lịch lớp, đặt/hủy chỗ. Lễ tân có thể tìm hội viên, bán/ghi nhận thanh toán gói, quét/nhập QR để check-in. Coach có thể xem lịch dạy và điểm danh. Manager có thể quản lý danh mục lớp/phòng/gói, tài khoản và xem báo cáo doanh thu cơ bản.

Các quy tắc bắt buộc từ schema phải còn hiệu lực: chỉ người có gói `active` chưa hết hạn mới book/check-in; không vượt `capacity`; không trùng lịch phòng/coach; `users` bị xóa mềm không được đăng nhập. Trigger SQL Server là lớp bảo vệ cuối cùng, Backend đổi lỗi trigger thành HTTP `409 Conflict` hoặc `400 Bad Request` có thông điệp tiếng Việt.

## 2. Team, ownership theo **màn hình**

Thay `BE-1`… bằng tên thành viên khi tạo Jira. Một người là owner chịu trách nhiệm luồng end-to-end của màn hình: API, DTO, validation, test cho Backend; UI, responsive, state/error/loading cho Frontend. Các owner khác chỉ review hoặc hỗ trợ khi ticket được gắn phụ trách.

| Thành viên | Vai trò | Cụm màn hình sở hữu | Màn hình cụ thể | API/domain chính |
|---|---|---|---|---|
| Dev BE-1 | Backend | Identity & hồ sơ | Đăng nhập; Hồ sơ của tôi; Quản lý tài khoản/role | auth, users, roles, member profile |
| Dev BE-2 | Backend | Lịch lớp & huấn luyện | Danh sách/chi tiết lớp; thời khóa biểu; đặt/hủy/waitlist; lịch dạy; điểm danh | classes, sessions, enrollments, waitlist, attendance |
| Dev BE-3 | Backend | Lễ tân, gói & quản trị vận hành | Tìm hội viên; bán gói/thanh toán; check-in QR; quản lý gói/phòng/bộ môn; báo cáo | packages, subscriptions, payments, invoices, check-ins, reports |
| Dev FE-1 | Frontend | Member portal | Login; Member dashboard; hồ sơ; gói/thẻ QR; lịch lớp; chi tiết lớp; đặt chỗ; lịch của tôi | toàn bộ UI Member; tích hợp API BE-1/BE-2/BE-3 |
| Dev FE-2 | Frontend | Staff portal | Dashboard staff; POS/tìm hội viên; check-in; CRUD danh mục; lịch lớp; Coach attendance; User admin; báo cáo | toàn bộ UI Receptionist/Coach/Manager; tích hợp API BE-1/BE-2/BE-3 |
| PM (bạn) | Product owner/Scrum master | Nghiệm thu màn hình, backlog & demo | wireframe/luồng, acceptance criteria, Jira, Sprint Review, UAT | không cần code bắt buộc; hỗ trợ test xuyên màn hình |

**Quy ước phối hợp:** Backend chỉ nhận ticket API của cụm màn hình mình sở hữu. Frontend tạo màn hình bằng dữ liệu mock ngay khi contract chưa sẵn, sau đó thay bằng API thật. Không chờ toàn bộ Backend hoàn thành mới dựng UI.

## 3. Jira setup (tạo một lần)

| Thuộc tính | Giá trị đề xuất |
|---|---|
| Project type | Scrum software project |
| Project name/key | `Sports Center Management System` / `SCMS` |
| Issue types | Epic, Story, Task, Bug, Sub-task |
| Workflow | To Do → In Progress → Code Review → QA/UAT → Done; Blocked là cờ/label, không phải trạng thái cuối |
| Components | `frontend-member`, `frontend-staff`, `backend-identity`, `backend-class`, `backend-reception`, `database`, `devops`, `qa` |
| Labels | `sprint-1`, `sprint-2`, `sprint-3`, `mvp`, `api-contract`, `demo-critical` |
| Estimation | Story Points: 1, 2, 3, 5, 8; không giao ticket quá 5 SP nếu có thể tách |
| Board quick filters | Assignee = me; Component = frontend/backend; label = demo-critical; Flagged = impediment |

Tạo 3 Sprint trên Jira: `Sprint 1 – Foundation`, `Sprint 2 – Core operations`, `Sprint 3 – Complete & demo`. Mỗi sprint kéo dài 10 ngày làm việc. PM chỉ đưa Story vào sprint khi đủ acceptance criteria, mock/wireframe tham chiếu và API contract (nếu cần).

## 4. Backlog Jira sẵn sàng để tạo issue

### Epic

| ID đề xuất | Epic | Mục tiêu | Component |
|---|---|---|---|
| SCMS-E1 | Foundation & Identity | Chạy được hệ thống, bảo mật JWT/RBAC, quản lý hồ sơ | devops, database, backend-identity |
| SCMS-E2 | Member self-service | Hội viên tự xem gói, thẻ, lịch và booking | frontend-member, backend-class |
| SCMS-E3 | Reception & Membership | Lễ tân tra cứu, bán gói, thanh toán, check-in | frontend-staff, backend-reception |
| SCMS-E4 | Class & Coaching | Quản lý lớp/buổi và điểm danh | frontend-staff, backend-class |
| SCMS-E5 | Manager & Reporting | Danh mục, tài khoản, báo cáo | frontend-staff, backend-identity, backend-reception |
| SCMS-E6 | Quality & Release | Test, UAT, tài liệu, triển khai demo | qa, devops |

### Sprint 1 — Foundation & happy-path screens (40 SP)

**Sprint goal:** Có môi trường chạy chung, đăng nhập theo role, và các màn hình đọc dữ liệu thật để demo luồng “đăng nhập → xem lịch lớp / tra cứu hội viên”.

| Key | Issue type / Epic | Ticket Jira (mô tả ngắn) | Owner | SP | Phụ thuộc / Acceptance criteria |
|---|---|---|---|---:|---|
| SCMS-1 | Task / E6 | Khởi tạo monorepo, README, `.env.example`, Docker Compose cho SQL Server | BE-1 | 3 | `web`, `api`, `db`; một lệnh tài liệu hóa để chạy local; không commit secret |
| SCMS-2 | Task / E6 | Áp dụng `databaseschema.sql`, seed 4 role và dữ liệu demo | BE-3 | 3 | Script chạy lặp được trên DB local; có mỗi role ít nhất 1 tài khoản demo |
| SCMS-3 | Story / E1 | API Login, JWT refresh/expiry, route guard RBAC | BE-1 | 5 | `POST /api/v1/auth/login`, `GET /users/me`; password BCrypt; role không hợp lệ trả 403 |
| SCMS-4 | Story / E1 | Màn hình Login + điều hướng theo role | FE-1 | 3 | Dùng API thật/mock contract; loading, lỗi đăng nhập, logout; Member vào portal, staff vào staff portal |
| SCMS-5 | Story / E2 | API danh sách/chi tiết lớp và lịch tuần (read-only) | BE-2 | 5 | Filter date/discipline/level; trả remaining seats; pagination; không lộ dữ liệu nhạy cảm |
| SCMS-6 | Story / E2 | Màn hình Member dashboard, danh sách/chi tiết lớp, thời khóa biểu | FE-1 | 5 | Có empty/loading/error; lọc; link chi tiết lớp; responsive từ 1280px đến mobile |
| SCMS-7 | Story / E1 | API hồ sơ Member và quản lý user cơ bản cho Manager | BE-1 | 3 | `GET/PUT /users/me`, `GET /users`; soft-deleted user không xuất hiện/đăng nhập |
| SCMS-8 | Story / E1 | Màn hình Hồ sơ của tôi | FE-1 | 2 | Sửa các trường cho phép; validate email/số điện thoại; thông báo lưu thành công/thất bại |
| SCMS-9 | Story / E3 | API tra cứu hội viên và gói đang hiệu lực cho lễ tân | BE-3 | 3 | Tìm theo tên, phone, membership code; chỉ staff có quyền truy cập |
| SCMS-10 | Story / E3 | Màn hình Staff dashboard + Tra cứu hội viên | FE-2 | 4 | Bảng kết quả, search debounce, trang chi tiết tóm tắt gói; trạng thái không tìm thấy |
| SCMS-11 | Task / E6 | Thiết lập Swagger/OpenAPI, global error format, CORS, health endpoint | BE-1 | 2 | `/swagger-ui`, `/actuator/health`; format lỗi thống nhất `{code,message,details}` |
| SCMS-12 | Task / E6 | CI kiểm tra build/lint/test cơ bản cho web và API | FE-2 | 2 | PR phải chạy build frontend và backend; kết quả hiển thị trên CI |

**Sprint 1 review checklist:** 4 role đăng nhập được; Member xem lớp; Receptionist tra cứu Member; Swagger và DB seed chạy được trên máy người khác; không còn blocker mức Critical.

### Sprint 2 — Booking, membership và vận hành (42 SP)

**Sprint goal:** Hoàn tất luồng có giá trị cao nhất: Member mua/được kích hoạt gói → đặt lớp → lễ tân check-in; Manager quản lý dữ liệu cần thiết.

| Key | Issue type / Epic | Ticket Jira (mô tả ngắn) | Owner | SP | Phụ thuộc / Acceptance criteria |
|---|---|---|---|---:|---|
| SCMS-13 | Story / E2 | API đặt/hủy lớp và waitlist | BE-2 | 5 | `POST /classes/{id}/book|cancel`; gói inactive/hết hạn bị 409; lớp đầy trả waitlist hoặc 409; cùng Member không book trùng |
| SCMS-14 | Story / E2 | Màn hình chi tiết lớp: đặt/hủy, trạng thái chỗ, lịch của tôi | FE-1 | 4 | Confirm dialog; thông báo server-friendly; Member thấy booking của mình và không thấy action sai quyền |
| SCMS-15 | Story / E3 | API mua/gia hạn gói, thanh toán cash/POS/bank-transfer, hóa đơn | BE-3 | 5 | Transaction nguyên tử: payment success kích hoạt subscription và tạo invoice; idempotency/không tạo hóa đơn đôi |
| SCMS-16 | Story / E3 | Màn hình lễ tân: Member detail, bán gói, thanh toán, hóa đơn | FE-2 | 3 | Tìm member → chọn package → xác nhận payment → receipt; kiểm tra amount/method và feedback lỗi |
| SCMS-17 | Story / E3 | API QR/manual check-in | BE-3 | 3 | `POST /checkin/scan-qr`; chỉ QR của subscription active, chưa hết hạn; ghi `recorded_by`, trả lý do từ chối rõ ràng |
| SCMS-18 | Story / E3 | Màn hình quét/nhập QR check-in | FE-2 | 2 | Camera scanner nếu khả thi, luôn có input/manual fallback; hiển thị member và kết quả pass/fail lớn, rõ |
| SCMS-19 | Story / E3 | API thẻ Member: gói active và QR an toàn | BE-3 | 3 | `GET /subscriptions/my-card`; không đưa private data vào QR raw; token/QR có expiry hoặc tối thiểu random unique code |
| SCMS-20 | Story / E2 | Màn hình gói của tôi & thẻ QR Member | FE-1 | 2 | Chỉ hiển thị subscription hiện hành; cảnh báo expiry; QR render được và có empty state |
| SCMS-21 | Story / E5 | API CRUD disciplines, rooms, membership packages | BE-3 | 3 | Manager-only; validation capacity/price/duration; không hard-delete bản ghi đang được tham chiếu |
| SCMS-22 | Story / E5 | Màn hình Manager quản lý Bộ môn, Phòng, Gói tập | FE-2 | 3 | List/create/edit/deactivate; table paging/filter; form validation và confirm deactivation |
| SCMS-23 | Story / E4 | API CRUD class/session và kiểm tra conflict | BE-2 | 4 | Manager-only; SQL trigger conflict chuyển 409; không cho room maintenance/closed dùng lịch mới |
| SCMS-24 | Story / E4 | Màn hình Manager tạo/sửa lớp và lịch buổi học | FE-2 | 3 | Chọn coach/room/time; hiển thị lỗi overlap từ server ở form; lịch cập nhật ngay khi lưu |
| SCMS-25 | Task / E6 | Viết integration test cho auth, booking, payment, check-in | BE-1 (điều phối) | 2 | Ít nhất happy + forbidden/expired/full cho từng luồng; test chạy trên CI |

**Sprint 2 review checklist:** Demo end-to-end từ bán gói cho Member demo đến quét/check-in và booking; thử lớp đầy/gói hết hạn/trùng lịch phải bị chặn; Manager tạo được phòng, gói, lớp và session.

### Sprint 3 — Coaching, reporting, hardening & release (38 SP)

**Sprint goal:** Hoàn thiện màn hình nghiệp vụ còn lại, kiểm thử luồng xuyên vai trò, làm sạch demo và chuẩn bị trình bày.

| Key | Issue type / Epic | Ticket Jira (mô tả ngắn) | Owner | SP | Phụ thuộc / Acceptance criteria |
|---|---|---|---|---:|---|
| SCMS-26 | Story / E4 | API lịch dạy Coach, roster và điểm danh session | BE-2 | 5 | Coach chỉ thấy lớp được gán; một Member/session một bản ghi attendance; trạng thái present/absent/late/excused |
| SCMS-27 | Story / E4 | Màn hình Coach: lịch dạy, roster, điểm danh | FE-2 | 5 | Chọn session, check status hàng loạt rồi submit; tránh mất thay đổi chưa lưu; thông báo thành công/lỗi |
| SCMS-28 | Story / E5 | API báo cáo dashboard: doanh thu, active memberships, class utilization | BE-3 | 5 | Manager-only; date range; số liệu query từ source tables, không hard-code; định nghĩa công thức ở Swagger |
| SCMS-29 | Story / E5 | Màn hình Manager dashboard & báo cáo | FE-2 | 5 | KPI cards, chart/bảng theo date range, empty state; số chart khớp API; export CSV là stretch goal |
| SCMS-30 | Story / E5 | API quản lý User cơ bản: list, tạo staff/coach, activate/lock/soft-delete | BE-1 | 4 | Manager-only; tạo profile subtype theo role; không cho tự lock/xóa manager cuối cùng; audit log cho hành động nhạy cảm |
| SCMS-31 | Story / E5 | Màn hình Manager quản lý tài khoản | FE-2 | 3 | List/filter by role/status; create/lock; confirm action; không hiển thị password hash |
| SCMS-32 | Story / E2 | Hoàn thiện thông báo trực quan và error states Member | FE-1 | 3 | Toast thống nhất, 401 tự logout, 403/404/error UI; thông báo booking/payment/check-in không làm hỏng flow |
| SCMS-33 | Task / E6 | Accessibility/responsive/UI regression toàn bộ màn hình | FE-1 | 2 | Keyboard cho form chính, label/input, contrast hợp lý; test desktop 1280px và mobile 375px |
| SCMS-34 | Task / E6 | E2E smoke test theo 4 role và UAT checklist | PM + cả nhóm | 3 | Có test case và evidence screenshot/video; mọi lỗi P0/P1 được fix hoặc PM chấp nhận loại khỏi scope |
| SCMS-35 | Task / E6 | Seed demo cuối, hướng dẫn chạy, API docs, slide demo & release tag | BE-1 + PM | 3 | Fresh clone chạy theo README; 4 account demo; tag release; script DB không gây lỗi lần hai |

**Stretch only (không làm trước ticket Sprint 3 trên):** thông báo database-backed, support ticket, training plan/AI stub, PDF invoice, waitlist auto-promote, export Excel/PDF. Đưa vào Backlog sau Sprint 3 và chỉ kéo vào khi velocity thực tế cho phép.

## 5. Thứ tự phụ thuộc và cách chia việc trong sprint

```text
S1: DB seed + API security ─┬─ Member UI (auth/profile/class read)
                            └─ Staff UI (dashboard/member lookup)
S2: Package/payment ──> active subscription ─┬─ QR card/check-in
                                               └─ booking validation
    Manager catalogs ──> class/session management ──> booking screens
S3: class/session ──> coach roster/attendance
    payment + booking + classes ──> manager reports ──> UAT/release
```

Mỗi story screen có hai ticket liên kết khi có cả FE và BE. Ví dụ `SCMS-13` **blocks** `SCMS-14`; FE-1 vẫn khởi động SCMS-14 bằng mock JSON trước, sau đó gắn endpoint thật. PM tạo issue link này trên Jira và dùng trường `Fix Version = S1/S2/S3`.

## 6. Thiết kế codebase để agent code khởi tạo

Khởi tạo workspace theo cấu trúc sau. DDL hiện có ở root được **giữ nguyên nguồn chân lý**, chỉ copy/đưa vào thư mục DB có kiểm soát version khi agent tạo base code.

```text
SWP391/
├─ apps/
│  ├─ web/                              # React + Vite + TypeScript
│  │  └─ src/
│  │     ├─ app/                        # router, providers, app shell
│  │     ├─ shared/                     # ui, api client, types, utils, hooks
│  │     ├─ features/
│  │     │  ├─ auth/
│  │     │  ├─ member/                  # dashboard, profile, card
│  │     │  ├─ classes/                 # catalog, schedule, booking
│  │     │  ├─ reception/               # lookup, POS, check-in
│  │     │  ├─ coaching/                # roster, attendance
│  │     │  └─ manager/                 # catalogs, users, reports
│  │     └─ pages/                      # role routes only; page composes features
│  └─ api/                              # Spring Boot 3 / Maven wrapper
│     └─ src/main/java/com/swp391/scms/
│        ├─ config/ common/ security/ exception/
│        ├─ auth/ users/ membership/ classes/
│        ├─ reception/ coaching/ reporting/ catalog/
│        └─ audit/
├─ db/
│  ├─ schema/                            # versioned original DDL or Flyway migrations
│  ├─ seed/                              # demo roles/users/classes
│  └─ README.md                          # SQL Server local setup
├─ docs/
│  ├─ api-contracts/                     # OpenAPI exported JSON/YAML
│  ├─ test-cases/
│  └─ adr/                               # Architecture Decision Records
├─ databaseschema.sql                    # source schema, do not silently edit
├─ PROJECT_MASTER_GUIDE.md
└─ AGILE_SCRUM_JIRA_PLAN.md
```

### Quy ước backend

- Package-by-feature, mỗi feature có `controller`, `service`, `repository`, `dto`, `entity`, `mapper`; không trả JPA Entity thẳng ra API.
- Spring Security dùng JWT bearer token. `@PreAuthorize`/role authorization đặt ở service/controller; Backend luôn kiểm tra quyền dù frontend đã ẩn menu.
- DTO validation dùng Jakarta Validation; toàn bộ exception đi qua `@RestControllerAdvice` và format `{ timestamp, status, code, message, details, traceId }`.
- Dùng migration có thứ tự (Flyway khuyến nghị). Nếu database hiện tại chỉ chạy DDL nguyên khối, giữ `V1__baseline.sql` có checksum rõ ràng; schema change mới là `V2__...sql`, không sửa âm thầm `V1` sau khi share DB.
- Transaction bao quanh purchase/payment, booking/cancel, check-in và attendance. Bắt `DataIntegrityViolationException` / SQL trigger exception để map nghiệp vụ thành 409.
- Phân trang chuẩn: `page`, `size`, `sort`; chuẩn response danh sách có `content`, `page`, `size`, `totalElements`.

### Quy ước frontend

- React Router theo layout role: `MemberLayout`, `StaffLayout`; route guard đọc role từ session/token nhưng không thay thế authorization server.
- TanStack Query cho server state/cache/invalidation; React Hook Form + Zod cho form; Axios/fetch client có interceptor 401. Chọn một UI kit duy nhất (MUI **hoặc** Ant Design) ngay Sprint 1.
- Mỗi page có `loading`, `empty`, `error`, `forbidden` state; mutation phải disable submit để tránh payment/booking double click.
- Tập trung component dùng lại: `DataTable`, `PageHeader`, `StatusBadge`, `ConfirmDialog`, `ApiErrorAlert`, `DateRangeFilter`, `QrScannerInput`.
- Không hard-code role ID, URL API, currency/date format; dùng constants/config và `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.

## 7. API contracts tối thiểu cần chốt ở Sprint Planning 1

| Cụm màn hình | Endpoint tối thiểu |
|---|---|
| Auth & profile | `POST /api/v1/auth/login`, `GET /api/v1/users/me`, `PUT /api/v1/users/me` |
| Class & booking | `GET /api/v1/classes`, `GET /api/v1/classes/{id}`, `GET /api/v1/classes/schedule`, `POST /api/v1/classes/{id}/book`, `POST /api/v1/classes/{id}/cancel` |
| Membership & reception | `GET /api/v1/members/search`, `GET /api/v1/membership-packages`, `POST /api/v1/subscriptions/purchase`, `GET /api/v1/subscriptions/my-card`, `POST /api/v1/checkin/scan-qr` |
| Manager catalog | `GET/POST/PUT /api/v1/disciplines`, `/rooms`, `/membership-packages`, `/classes`, `/class-sessions` |
| Coach | `GET /api/v1/coach/sessions`, `GET /api/v1/sessions/{id}/roster`, `POST /api/v1/sessions/{id}/attendance` |
| Reporting & users | `GET /api/v1/reports/revenue`, `GET /api/v1/reports/class-utilization`, `GET/POST/PATCH /api/v1/users` |

PM cần yêu cầu BE cập nhật Swagger trước khi FE bắt đầu tích hợp. Ví dụ response/error mẫu được trao đổi qua Swagger/OpenAPI, không gửi “mô tả miệng” trong chat.

## 8. Scrum operating plan

| Hoạt động | Khi nào | Thành phần | Output |
|---|---|---|---|
| Backlog refinement | Trước sprint 1–2 ngày | PM + 5 dev | Story rõ AC, estimate, dependencies, ưu tiên |
| Sprint planning | Ngày đầu sprint, 90 phút | Cả nhóm | Sprint goal, ticket owner, capacity, risk |
| Daily Scrum | Mỗi ngày, 10–15 phút | Cả nhóm | Hôm qua/hôm nay/blocker; PM cập nhật Jira ngay |
| Code review | Mỗi PR | 1 người khác owner | PR nhỏ, CI xanh, không merge self-review |
| Mid-sprint integration | Ngày 5 | FE + BE theo màn hình | Thay mock bằng API, kiểm thử lỗi thật |
| Sprint review | Ngày 10 | Cả nhóm + stakeholder | Demo theo user journey, chỉ issue Done được demo |
| Retrospective | Sau review, 30 phút | Cả nhóm | Start/Stop/Continue và 1–2 action cải tiến có owner |

### Definition of Ready (DoR)

- Có user role, luồng màn hình và acceptance criteria đo được.
- Có owner, estimate, sprint, Epic/component và dependency đã link.
- Nếu là UI: có wireframe hoặc screenshot tham khảo. Nếu là API: có request/response/error mẫu trên Swagger/OpenAPI.

### Definition of Done (DoD)

- Code đã merge qua review, build/CI xanh, không có secret trong repo.
- API có validation, authorization, xử lý lỗi và test tối thiểu (happy path + một lỗi nghiệp vụ); UI có loading/empty/error và responsive cơ bản.
- Ticket được test trên môi trường chung với dữ liệu demo; acceptance criteria pass, bằng chứng screenshot/video/comment trên Jira.
- Cập nhật API docs/README nếu contract hoặc cách chạy thay đổi; không còn bug P0/P1 mở liên quan ticket.

## 9. Rủi ro và quyết định PM cần giữ scope

| Rủi ro | Cách kiểm soát |
|---|---|
| 33 bảng/AI/mobile quá lớn cho 6 tuần | Khóa MVP web trong phần 1; kéo stretch goal chỉ sau khi Sprint 3 core xanh |
| FE bị chờ BE | OpenAPI + mock JSON từ ngày đầu; mid-sprint integration bắt buộc |
| Trigger SQL Server gây lỗi khó hiểu | Test integration sớm; global exception handler map trigger lỗi 409; không cố bỏ trigger |
| Payment thật/QR camera không ổn định | MVP dùng phương thức ghi nhận payment mock (cash/POS/bank transfer) và QR input fallback; không tích hợp cổng thanh toán thật nếu chưa được yêu cầu |
| Merge conflict/không nhất quán UI | Feature branches, PR nhỏ, shared UI kit, owner thư mục feature rõ ràng |
| Thiếu thời gian demo | Seed data cố định, script reset demo, rehearsal theo kịch bản ở phần 1 trước Sprint Review cuối |

## 10. Checklist PM để tạo Jira ngay

1. Tạo project `SCMS`, components, 6 Epic và 3 Sprint như phần 3–4.
2. Tạo 35 issue theo bảng, gán owner, Story Point, component, Epic và Sprint tương ứng. Dùng `SCMS-#` như mã tham chiếu; Jira sẽ sinh key thực tế.
3. Link dependency tối thiểu: `SCMS-2 → SCMS-3/5/9`; `SCMS-3 → SCMS-4`; `SCMS-5 → SCMS-6`; `SCMS-13 → SCMS-14`; `SCMS-15 → SCMS-16`; `SCMS-17 → SCMS-18`; `SCMS-19 → SCMS-20`; `SCMS-23 → SCMS-24`; `SCMS-26 → SCMS-27`; `SCMS-28 → SCMS-29`.
4. Bắt đầu Sprint 1 chỉ với SCMS-1 đến SCMS-12. Không đưa Sprint 2 vào trạng thái In Progress sớm.
5. Tại review, chỉ move `Done` sau khi PM nghiệm thu đúng DoD; phần chưa xong chuyển lại Product Backlog và re-estimate, không kéo dài sprint.
