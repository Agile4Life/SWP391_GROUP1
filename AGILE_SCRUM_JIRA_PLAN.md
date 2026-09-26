# KẾ HOẠCH CHI TIẾT THEO SPRINT — CHO TỪNG NGƯỜI
# Sports Center Management System (SWP391) — GROUP1_SWP

> Lịch giả định: mỗi Sprint 2 tuần (14 ngày), bắt đầu Sprint 1 từ **19/09/2026**. Điều chỉnh lại ngày thật với nhóm nếu lịch học/lịch thi khác đi — cấu trúc và thứ tự công việc vẫn giữ nguyên.
> Người: **Tài, An, Phong** (Backend) — **Khoa, Thịnh** (Frontend).

---

# SPRINT 1 — Nền tảng & Định danh (19/09 – 02/10/2026)

## Lịch sinh hoạt Scrum
| Nghi thức | Ngày | Nội dung |
|---|---|---|
| Sprint Planning | Thứ Bảy 19/09/2026 | Chốt US01–US06, tách subtask F01–F05, gán người, ước lượng điểm |
| Daily Standup | T2 21/09, T4 23/09, T6 25/09, T2 28/09, T4 30/09, T6 02/10 | 15 phút: hôm qua làm gì / hôm nay làm gì / vướng gì |
| Backlog Refinement | Thứ Sáu 25/09/2026 | Rà lại backlog Sprint 2, làm rõ US07+ trước khi Planning Sprint 2 |
| Sprint Review/Demo | Thứ Năm 01/10/2026 | Demo Login, Register, OTP, RBAC, Profile, Danh mục |
| Sprint Retrospective | Thứ Sáu 02/10/2026 | Nhìn lại: cái gì tốt / cái gì cần cải thiện cho Sprint 2 |

## Kế hoạch cá nhân

### 🔵 Tài — Backend, Identity Squad
| # | Công việc | Loại | Từ ngày | Đến ngày | Mã Jira |
|---|---|---|---|---|---|
| 1 | Khởi tạo Spring Boot + kết nối SQL Server + Flyway | Setup | 19/09 | 20/09 | — |
| 2 | Cấu hình Spring Security + JWT | Setup | 21/09 | 23/09 | — |
| 3 | API đăng nhập & tạo JWT/session theo role | API | 24/09 | 24/09 | SCRUM-35 |
| 4 | AOP ghi Audit Log tự động | Setup | 25/09 | 26/09 | — |
| 5 | Verify OTP, expiry và attempt limit | API | 27/09 | 27/09 | SCRUM-46 |
| 6 | Confirm OTP completion/status | API | 28/09 | 28/09 | SCRUM-48 |
| 7 | CRUD user và lock/unlock API | API | 29/09 | 29/09 | SCRUM-50 |
| 8 | Role/permission API và RBAC checks | API | 30/09 | 01/10 | SCRUM-52 |
| 9 | Profile/health API | API | 02/10 | 02/10 | SCRUM-55 |

### 🟢 An — Backend, Operations Squad
| # | Công việc | Loại | Từ ngày | Đến ngày | Mã Jira |
|---|---|---|---|---|---|
| 1 | Rà soát Flyway migration cùng Tài | Setup | 19/09 | 20/09 | — |
| 2 | Seed dữ liệu danh mục mẫu (bộ môn/phòng/gói) | Setup | 21/09 | 21/09 | — |
| 3 | Discipline API | API | 22/09 | 22/09 | SCRUM-58 |
| 4 | Room API | API | 23/09 | 23/09 | SCRUM-59 |
| 5 | Package API/status | API | 24/09 | 25/09 | SCRUM-60 |
| 6 | Register API *(nhận từ Tài để cân bằng)* | API | 26/09 | 27/09 | SCRUM-38 |
| 7 | Duplicate email/SĐT check *(nhận từ Tài)* | API | 28/09 | 28/09 | SCRUM-39 |
| 8 | Access và health data validation *(nhận từ Tài)* | API | 29/09 | 30/09 | SCRUM-56 |
| 9 | API tra cứu nhanh hội viên cho Lễ tân | API | 01/10 | 02/10 | — |

### 🟠 Phong — Backend, Finance & AI Squad
| # | Công việc | Loại | Từ ngày | Đến ngày | Mã Jira |
|---|---|---|---|---|---|
| 1 | Global Exception Handler & ApiResponse wrapper | Setup | 19/09 | 20/09 | — |
| 2 | Cấu hình Swagger/OpenAPI | Setup | 21/09 | 21/09 | — |
| 3 | Entity/DTO mapping Payments-Invoices (MapStruct) | Setup | 22/09 | 23/09 | — |
| 4 | Cấu hình Computed Column PERSISTED | Setup | 24/09 | 24/09 | — |
| 5 | PoC tích hợp OpenAI/Gemini API | PoC | 25/09 | 26/09 | — |
| 6 | Tích hợp FE-BE luồng đăng nhập + test | Integration | 27/09 | 27/09 | SCRUM-61 |
| 7 | Tích hợp luồng đăng ký + OTP + test | Integration | 28/09 | 28/09 | SCRUM-62 |
| 8 | Tích hợp RBAC + kiểm tra ma trận quyền | Integration | 29/09 | 29/09 | SCRUM-63 |
| 9 | Tích hợp Profile + dữ liệu sức khỏe | Integration | 30/09 | 30/09 | SCRUM-64 |
| 10 | Tích hợp quản lý danh mục + test CRUD | Integration | 01/10 | 02/10 | SCRUM-65 |

### 🟣 Khoa — Frontend, Staff & Admin Console
| # | Màn hình | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | Đăng nhập & Điều hướng theo Vai trò | 19/09 | 22/09 |
| 2 | Quản lý Người dùng & Phân quyền (RBAC) | 23/09 | 28/09 |
| 3 | Quản lý Danh mục (Bộ môn/Phòng/Gói tập) | 29/09 | 02/10 |

### 🟡 Thịnh — Frontend, Member App
| # | Màn hình | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | Đăng ký tài khoản | 19/09 | 22/09 |
| 2 | Xác thực OTP | 23/09 | 26/09 |
| 3 | Hồ sơ cá nhân & Chỉ số sức khỏe | 27/09 | 02/10 |

---

# SPRINT 2 — Gói tập, Lớp học, Thanh toán, Check-in (03/10 – 16/10/2026)

## Lịch sinh hoạt Scrum
| Nghi thức | Ngày | Nội dung |
|---|---|---|
| Sprint Planning | Thứ Bảy 03/10/2026 | Chốt US07–US15, tách subtask, gán người |
| Daily Standup | T2 05/10, T4 07/10, T6 09/10, T2 12/10, T4 14/10, T6 16/10 | 15 phút |
| Backlog Refinement | Thứ Sáu 09/10/2026 | Rà backlog Sprint 3 (AI, Coaching, Reports) |
| Sprint Review/Demo | Thứ Năm 15/10/2026 | Demo mua gói, đặt lớp, thanh toán, check-in QR |
| Sprint Retrospective | Thứ Sáu 16/10/2026 | Rút kinh nghiệm, đặc biệt về tải nặng của An |

## Kế hoạch cá nhân

### 🔵 Tài — Backend, Identity Squad
| # | Công việc | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | API Hồ sơ cá nhân (member/coach/receptionist profile update) | 03/10 | 04/10 |
| 2 | API Notifications (danh sách, đánh dấu đã đọc, tạo thông báo) | 05/10 | 07/10 |
| 3 | API Support Requests (tạo/danh sách/cập nhật trạng thái) | 08/10 | 10/10 |
| 4 | Áp dụng `@PreAuthorize` theo ma trận RBAC cho toàn bộ endpoint | 11/10 | 13/10 |
| 5 | Unit test cho module Identity | 14/10 | 16/10 |

### 🟢 An — Backend, Operations Squad *(sprint nặng nhất — cần theo sát tiến độ)*
| # | Công việc | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | Membership Subscriptions: mua mới/gia hạn + sinh mã QR | 03/10 | 05/10 |
| 2 | Classes & Class Sessions (xử lý lỗi trigger trùng lịch) | 06/10 | 08/10 |
| 3 | Class Enrollments: đăng ký/hủy lớp | 09/10 | 11/10 |
| 4 | Class Waitlists: tham gia & tự động mời khi có chỗ trống | 12/10 | 14/10 |
| 5 | Center Check-in: quét QR, kiểm tra hạn gói, check-out | 15/10 | 16/10 |

### 🟠 Phong — Backend, Finance & AI Squad
| # | Công việc | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | Payments API: xử lý thanh toán đa kênh | 03/10 | 06/10 |
| 2 | Invoices & Invoice Items: tự động phát hành hóa đơn | 07/10 | 09/10 |
| 3 | Report Snapshots: báo cáo doanh thu theo ngày/tháng | 10/10 | 12/10 |
| 4 | Luồng hoàn tiền (refund) | 13/10 | 16/10 |

### 🟣 Khoa — Frontend, Staff & Admin Console
| # | Màn hình | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | Quản lý Lớp học & Phân công HLV | 03/10 | 06/10 |
| 2 | Lễ tân — Tra cứu & Thu ngân | 07/10 | 10/10 |
| 3 | Lễ tân — Check-in QR & Hỗ trợ đặt lớp | 11/10 | 13/10 |
| 4 | Dashboard Doanh thu cơ bản | 14/10 | 16/10 |

### 🟡 Thịnh — Frontend, Member App
| # | Màn hình | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | Trang chủ / Dashboard hội viên | 03/10 | 05/10 |
| 2 | Danh mục & Mua/Gia hạn gói tập | 06/10 | 10/10 |
| 3 | Thẻ hội viên QR Code | 11/10 | 12/10 |
| 4 | Thời khóa biểu & Đặt/Hủy lớp + Waitlist | 13/10 | 16/10 |

---

# SPRINT 3 — AI, Huấn luyện, Thông báo & Hoàn thiện (17/10 – 30/10/2026)

## Lịch sinh hoạt Scrum
| Nghi thức | Ngày | Nội dung |
|---|---|---|
| Sprint Planning | Thứ Bảy 17/10/2026 | Chốt US16–US23, tách subtask, gán người |
| Daily Standup | T2 19/10, T4 21/10, T6 23/10, T2 26/10, T4 28/10, T6 30/10 | 15 phút |
| Backlog Refinement | Thứ Sáu 23/10/2026 | Rà lại phần còn thiếu, chuẩn bị demo cuối kỳ |
| Sprint Review/Demo | Thứ Năm 29/10/2026 | Demo toàn bộ hệ thống end-to-end |
| Sprint Retrospective | Thứ Sáu 30/10/2026 | Tổng kết dự án, rút kinh nghiệm chung |

## Kế hoạch cá nhân

### 🔵 Tài — Backend, Identity Squad
| # | Công việc | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | Support Request Messages (trao đổi trong ticket) | 17/10 | 18/10 |
| 2 | Background Job: cảnh báo hết hạn gói (7 ngày) & nhắc lịch học (2 giờ) | 19/10 | 23/10 |
| 3 | Tích hợp gửi thông báo đa kênh (mock Push/Email) | 24/10 | 26/10 |
| 4 | API Audit Log viewer (lọc theo entity/user/thời gian) | 27/10 | 28/10 |
| 5 | Bảo mật & rà soát cuối (CORS, rate limit) + Dockerfile backend | 29/10 | 30/10 |

### 🟢 An — Backend, Operations Squad
| # | Công việc | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | Session Attendance (điểm danh 4 trạng thái) | 17/10 | 19/10 |
| 2 | Job tự động hết hạn Waitlist sau 24h & mời người kế tiếp | 20/10 | 22/10 |
| 3 | Xử lý hủy buổi học bởi HLV → thông báo hàng loạt học viên | 23/10 | 25/10 |
| 4 | Kiểm thử tích hợp & tối ưu hiệu năng module Operations | 26/10 | 28/10 |
| 5 | Viết Postman collection & tài liệu API Operations | 29/10 | 30/10 |

### 🟠 Phong — Backend, Finance & AI Squad *(sprint nặng nhất)*
| # | Công việc | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | Training Plans & Training Plan Items (draft → active) | 17/10 | 20/10 |
| 2 | Tích hợp AI Recommendation: `/ai/generate-workout-plan` | 21/10 | 24/10 |
| 3 | API AI Chatbot: ai_chat_sessions & ai_chat_messages | 25/10 | 27/10 |
| 4 | Session Evaluations & Member Progress Logs | 28/10 | 29/10 |
| 5 | Báo cáo nâng cao: tỷ lệ lấp đầy phòng, xuất Excel/PDF | 30/10 | 30/10 |

### 🟣 Khoa — Frontend, Staff & Admin Console
| # | Màn hình | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | HLV — Lớp của tôi & Học viên | 17/10 | 19/10 |
| 2 | HLV — Xây dựng Giáo án + Gợi ý AI | 20/10 | 24/10 |
| 3 | HLV — Điểm danh & Đánh giá buổi tập | 25/10 | 27/10 |
| 4 | Báo cáo & Xuất file (Excel/PDF) | 28/10 | 30/10 |

### 🟡 Thịnh — Frontend, Member App
| # | Màn hình | Từ ngày | Đến ngày |
|---|---|---|---|
| 1 | Lịch sử thanh toán & Hóa đơn của tôi | 17/10 | 19/10 |
| 2 | Trợ lý AI Chatbot | 20/10 | 23/10 |
| 3 | Trung tâm thông báo | 24/10 | 25/10 |
| 4 | Yêu cầu hỗ trợ / Khiếu nại | 26/10 | 27/10 |
| 5 | Tiến độ thể lực & Bài tập về nhà | 28/10 | 30/10 |

---

# TỔNG KẾT TẢI CÔNG VIỆC (3 SPRINT)

| Người | Sprint 1 | Sprint 2 | Sprint 3 | Ghi chú |
|---|---|---|---|---|
| Tài | 9 việc | 5 việc | 5 việc | Nhẹ dần vì Identity đã ổn định từ Sprint 1 |
| An | 9 việc | 5 việc | 5 việc | **Sprint 2 nặng nhất cả dự án** — 5 API lớn (Subscription, Classes, Enrollment, Waitlist, Checkin) |
| Phong | 10 việc | 4 việc | 5 việc | **Sprint 3 nặng nhất** — AI + Coaching dồn vào cuối |
| Khoa | 3 màn hình | 4 màn hình | 4 màn hình | Đều qua các sprint |
| Thịnh | 3 màn hình | 4 màn hình | 5 màn hình | Đều qua các sprint |

**Khuyến nghị theo dõi:**
- Đầu Sprint 2, ưu tiên hỗ trợ **An** nếu chậm tiến độ (khối lượng lớn nhất dự án).
- Đầu Sprint 3, ưu tiên hỗ trợ **Phong** — phần AI (Recommendation + Chatbot) rủi ro cao nhất do phụ thuộc API bên ngoài (OpenAI/Gemini), nên đã bố trí làm PoC từ Sprint 1 để giảm rủi ro.
- Ngày tháng trong bảng là ước lượng ban đầu — chốt lại chính xác trong từng buổi Sprint Planning.
