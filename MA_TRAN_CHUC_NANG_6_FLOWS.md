# Ma Trận Chức Năng Hoàn Chỉnh (6 Flows) – Sports Center Management System

> Tài liệu chuẩn hóa ma trận chức năng cho đề tài **Hệ thống Quản lý Trung tâm Thể thao (Sports Center Management)** môn **SWP391**, giải quyết triệt để các khoảng trống (gán rõ Flow 4, Flow 5, Flow 6) và đối chiếu chi tiết giữa 4 vai trò chính + Trợ lý AI với 6 luồng nghiệp vụ.

---

## 1. Danh Sách 6 Luồng Nghiệp Vụ Chuẩn Hóa

| Mã Flow | Tên Flow (Tiếng Anh) | Tên Flow (Tiếng Việt) | Vai trò chính tham gia |
|---|---|---|---|
| **Flow 1** | **User and Membership Management** | Quản lý Người dùng & Gói thành viên | Member, Receptionist, System |
| **Flow 2** | **Class Booking and Schedule Management** | Đăng ký Lớp học & Quản lý Lịch tập | Member, Receptionist, System |
| **Flow 3** | **Payment and Report Management** | Quản lý Thanh toán & Báo cáo Thống kê | Receptionist, Center Manager, System, Member |
| **Flow 4** | **System Administration & Configuration** | Quản trị & Cấu hình Hệ thống | Center Manager, System |
| **Flow 5** | **Training Planning & AI-assisted Coaching** | Kế hoạch Huấn luyện & Hỗ trợ AI cho HLV | Coach, AI Engine, Member, System |
| **Flow 6** | **AI Assistant & Notification Management** | Trợ lý AI & Quản lý Thông báo Hội viên | Member, AI Engine, System |

---

## 2. Bảng Ma Trận Chức Năng Tổng Hợp (Actor × Flow Matrix)

| Chức năng chi tiết | Flow | Member | Receptionist | Coach | Center Manager | AI Engine | System |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Đăng ký / Đăng nhập hệ thống** | Flow 1 | **X** | **X** | **X** | **X** | | **X** |
| **Cập nhật thông tin cá nhân & hồ sơ sức khỏe** | Flow 1 | **X** | | | | | **X** |
| **Tra cứu / Tìm kiếm thông tin hội viên** | Flow 1 | | **X** | | **X** | | **X** |
| **Xem danh sách gói tập (mới & gia hạn)** | Flow 1 | **X** | **X** | | **X** | | **X** |
| **Mua gói mới / Gia hạn gói tập** | Flow 1 | **X** | **X** | | | | **X** |
| **Kích hoạt gói tập & Cấp thẻ QR** | Flow 1 | | | | | | **X** |
| **Xem thời khóa biểu & lịch dạy HLV** | Flow 2 | **X** | **X** | **X** | **X** | | **X** |
| **Đăng ký lớp học & giữ chỗ** | Flow 2 | **X** | **X** | | | | **X** |
| **Kiểm tra điều kiện gói & sĩ số lớp** | Flow 2 | | | | | | **X** |
| **Hội viên tự hủy đăng ký lớp (trên App)** | Flow 2 | **X** | | | | | **X** |
| **Lễ tân hỗ trợ hủy lớp giúp hội viên** | Flow 2 | | **X** | | | | **X** |
| **Hoàn lại lượt học & cập nhật sĩ số** | Flow 2 | | | | | | **X** |
| **Thu tiền đa kênh (POS, CK, Tiền mặt, Online)** | Flow 3 | **X** | **X** | | | | **X** |
| **Phát hành, in & xuất hóa đơn điện tử** | Flow 3 | **X** | **X** | | | | **X** |
| **Cập nhật công nợ & số dư trả góp** | Flow 3 | | | | | | **X** |
| **Xem báo cáo doanh thu đa chiều (ngày/tháng/gói/HLV)** | Flow 3 | | | | **X** | | **X** |
| **Xem báo cáo lấp đầy lớp học & tỷ lệ hủy lớp** | Flow 3 | | | | **X** | | **X** |
| **Xem báo cáo tăng trưởng & biến động hội viên** | Flow 3 | | | | **X** | | **X** |
| **Xuất báo cáo tài chính / thống kê (Excel, PDF)** | Flow 3 | | | | **X** | | **X** |
| **Quản lý người dùng (CRUD: Member, Coach, Staff)** | Flow 4 | | | | **X** | | **X** |
| **Quản lý danh mục: Lớp học, bộ môn, phòng tập** | Flow 4 | | | | **X** | | **X** |
| **Phân công Huấn luyện viên phụ trách lớp** | Flow 4 | | | | **X** | | **X** |
| **Cấu hình gói tập (tạo gói mới, chỉnh giá, hạn dùng)** | Flow 4 | | | | **X** | | **X** |
| **Quản lý phân quyền truy cập vai trò (RBAC)** | Flow 4 | | | | **X** | | **X** |
| **Giám sát nhật ký hoạt động hệ thống (Audit Log)** | Flow 4 | | | | **X** | | **X** |
| **Xem danh sách lớp & mục tiêu thể trạng học viên** | Flow 5 | | | **X** | | | **X** |
| **Lập kế hoạch huấn luyện (lớp / cá nhân)** | Flow 5 | | | **X** | | | **X** |
| **Yêu cầu AI gợi ý bài tập & giáo án cá nhân hóa** | Flow 5 | | | **X** | | **X** | **X** |
| **AI phân tích thể trạng & gợi ý bài tập** | Flow 5 | | | | | **X** | |
| **Coach tinh chỉnh, phê duyệt & áp dụng giáo án** | Flow 5 | | | **X** | | | **X** |
| **Giao bài tập về nhà (homework) cho học viên** | Flow 5 | **X** | | **X** | | | **X** |
| **Điểm danh học viên vào lớp tập** | Flow 5 | | | **X** | | | **X** |
| **Tiến hành buổi tập & giám sát kỹ thuật động tác** | Flow 5 | **X** | | **X** | | | |
| **Ghi nhận kết quả tập & đánh giá tiến độ học viên** | Flow 5 | | | **X** | | | **X** |
| **Đồng bộ kết quả vào hồ sơ sức khỏe hội viên** | Flow 5 | | | | | | **X** |
| **Hội viên xem nhận xét HLV & tiến độ thể lực trên App**| Flow 5 | **X** | | | | | **X** |
| **Hội viên trò chuyện hỏi-đáp với Chatbot AI** | Flow 6 | **X** | | | | **X** | **X** |
| **AI tra cứu tri thức & trả lời tức thì trên App** | Flow 6 | | | | | **X** | |
| **Giám sát sự kiện nền (đổi lịch, hủy lớp, đổi HLV)** | Flow 6 | | | | | | **X** |
| **Cảnh báo gói tập sắp hết hạn (trước 7 ngày)** | Flow 6 | **X** | **X** | | | | **X** |
| **Nhắc nhở lịch tập sắp tới (trước 2 giờ)** | Flow 6 | **X** | | | | | **X** |
| **Tự động đẩy thông báo (Push/SMS/In-App)** | Flow 6 | | | | | | **X** |
| **Tra cứu lịch sử thông báo trên ứng dụng** | Flow 6 | **X** | | | | | **X** |

---

## 3. Bóc Tách Chi Tiết Chức Năng Theo Từng Vai Trò (Actors)

### 3.1. Quản lý Trung tâm (Center Manager)
- **Flow 3 (Payment & Report):**
  - Xem Dashboard tài chính và tổng quan trung tâm.
  - Báo cáo doanh thu theo thời gian thực (ngày, tuần, tháng, quý, năm).
  - Báo cáo doanh thu theo từng gói tập và theo từng HLV/bộ môn.
  - Báo cáo biến động số lượng thành viên (mới, gia hạn, sắp hết hạn, đã hủy).
  - Báo cáo tỷ lệ lấp đầy phòng học và thống kê hủy lớp.
  - Bộ lọc tùy biến và xuất báo cáo dưới định dạng file Excel (.xlsx) / PDF.
- **Flow 4 (System Administration & Configuration):**
  - Quản lý tài khoản toàn hệ thống (CRUD: Hội viên, HLV, Lễ tân).
  - Quản lý cơ sở vật chất & danh mục: Lớp học, môn thể thao, phòng tập, ca học.
  - Phân công Huấn luyện viên phụ trách lớp và thiết lập lịch giảng dạy.
  - Quản trị gói dịch vụ: Thêm gói mới, sửa giá, cấu hình ưu đãi, quy định số buổi & hạn dùng.
  - Cấu hình phân quyền theo vai trò (Role-Based Access Control - RBAC).
  - Giám sát nhật ký kiểm toán (Audit Log / Activity Log) để bảo đảm an toàn thông tin.

### 3.2. Huấn luyện viên (Coach)
- **Flow 2 (Schedule):** Xem lịch dạy cá nhân, danh sách lớp phụ trách.
- **Flow 5 (Training Planning & AI-assisted Coaching):**
  - Truy cập danh sách học viên trong lớp, xem thông tin thể trạng, chỉ số BMI và mục tiêu cá nhân.
  - Tạo giáo án và kế hoạch huấn luyện theo chu kỳ hoặc từng buổi.
  - Gửi yêu cầu AI gợi ý bài tập phù hợp với thể trạng học viên.
  - Xem xét gợi ý của AI, chỉnh sửa và phê duyệt giáo án chính thức.
  - Giao bài tập về nhà (homework) kèm video hướng dẫn cho học viên qua ứng dụng.
  - Điểm danh học viên khi vào lớp học.
  - Giám sát kỹ thuật động tác trong suốt buổi tập.
  - Đánh giá mức độ hoàn thành và ghi nhận kết quả tiến độ sau buổi tập.

### 3.3. Hội viên / Khách hàng (Member)
- **Flow 1 (User & Membership):**
  - Đăng ký tài khoản mới / Đăng nhập.
  - Cập nhật thông tin cá nhân, hồ sơ bệnh lý / sức khỏe, mục tiêu luyện tập.
  - Xem danh mục gói tập; thực hiện mua mới hoặc gia hạn gói tập.
  - Nhận thẻ thành viên QR điện tử trên ứng dụng di động.
- **Flow 2 (Booking & Cancel):**
  - Tra cứu thời khóa biểu các lớp học, xem thông tin HLV phụ trách.
  - Đăng ký giữ chỗ lớp học theo nhu cầu.
  - Chủ động bấm Hủy đăng ký lớp học trên App (nếu bận đột xuất trước giờ quy định).
- **Flow 3 (Payment):**
  - Thanh toán online hoặc tại quầy; nhận hóa đơn điện tử; tra cứu lịch sử giao dịch & công nợ.
- **Flow 5 (Coaching):**
  - Check-in vào cổng trung tâm bằng mã QR.
  - Tham gia buổi tập cùng HLV.
  - Xem nhận xét, kết quả đánh giá từ HLV và theo dõi biểu đồ tiến độ thể lực trên App.
- **Flow 6 (AI Assistant & Notification):**
  - Trò chuyện với Chatbot AI để hỏi về lịch tập, kỹ thuật bài tập, chế độ dinh dưỡng, chính sách gói.
  - Nhận thông báo tự động khi lớp đổi giờ, đổi HLV, hủy lớp do sự cố.
  - Nhận thông báo nhắc lịch tập trước 2 giờ và cảnh báo gói tập sắp hết hạn trước 7 ngày.
  - Xem lịch sử thông báo trên App.

### 3.4. Nhân viên Lễ tân (Receptionist)
- **Flow 1 (Membership):**
  - Tiếp đón khách hàng tại quầy; tra cứu hồ sơ hội viên nhanh qua SĐT/CCCD/Mã HV.
  - Tạo mới tài khoản hội viên tại quầy.
  - Hỗ trợ hội viên chọn mua gói tập mới hoặc gia hạn gói tập.
- **Flow 2 (Class Support):**
  - Tra cứu tình trạng lớp học, hỗ trợ đăng ký lớp cho hội viên tại quầy.
  - Hỗ trợ hội viên hủy lớp học khi hội viên liên hệ trực tiếp quầy lễ tân hoặc hotline.
- **Flow 3 (Payment):**
  - Tiếp nhận và ghi nhận thanh toán đa phương thức (Tiền mặt, quẹt thẻ POS, Chuyển khoản ngân hàng).
  - In hóa đơn / biên lai thanh toán bàn giao cho hội viên.
  - Tiếp nhận và ghi nhận các khiếu nại, yêu cầu hỗ trợ tài chính từ hội viên.
- **Flow 3 (Check-in):**
  - Quét mã QR check-in sảnh khi hội viên đến trung tâm; kiểm tra tính hợp lệ và thời hạn gói tập.

### 3.5. Trợ lý AI (AI Engine)
- **Flow 5:** Phân tích dữ liệu học viên (mục tiêu, thể lực, lịch sử chấn thương) và gợi ý bài tập / biến thể động tác / giáo án cho HLV.
- **Flow 6:** Xử lý ngôn ngữ tự nhiên (NLP) phục vụ chatbot tương tác 24/7, cung cấp kiến thức thể thao, dinh dưỡng và giải đáp chính sách dịch vụ của trung tâm.

### 3.6. Hệ thống phần mềm (System Core)
- Xác thực đăng nhập, kiểm soát quyền hạn (RBAC).
- Kiểm tra điều kiện gói tập, tự động đối soát chỗ trống lớp học.
- Kích hoạt gói, phát sinh mã QR định danh duy nhất cho hội viên.
- Xử lý giao dịch thanh toán, tự động xuất hóa đơn điện tử, quản lý công nợ.
- Tự động đồng bộ kết quả tập luyện vào hồ sơ y tế/thể chất của hội viên.
- Ghi nhận nhật ký kiểm toán (Audit Trail) phục vụ bảo mật và hậu kiểm.
- Bộ máy lập lịch (Scheduler/Cron) chạy ngầm quét sự kiện và đẩy thông báo tự động (Push Notifications).
