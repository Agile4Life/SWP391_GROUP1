# Sports Center Management System - Swimlane Diagrams (SWP391)

Tài liệu này chuẩn hóa toàn bộ sơ đồ Swimlane Diagram cho đề tài **Hệ thống Quản lý Trung tâm Thể thao (Sports Center Management)** môn **SWP391** theo đúng chuẩn thiết kế của file mẫu **`swimlane-mau.drawio`** và **Báo cáo rà soát Main Flow**:
- **Định dạng làn:** Làn nằm ngang xếp chồng (`horizontal=1`), tiêu đề nằm trên thanh đầu mỗi làn.
- **Tone màu Pastel quy ước chuẩn:**
  - 👤 **Hội viên / Khách hàng (Member):** `#dae8fc` (Xanh pastel dương), viền `#6c8ebf`
  - 💁 **Bộ phận Lễ tân (Receptionist):** `#d5e8d4` (Xanh pastel lá), viền `#82b366`
  - ⚙️ **Hệ thống phần mềm (System):** `#ffe6cc` (Cam pastel), viền `#d79b00`
  - 🏋️ **Bộ phận Huấn luyện viên (Coach):** `#f8cecc` (Hồng pastel), viền `#b85450`
  - 🤖 **Trợ lý AI (AI Engine):** `#fff2cc` (Vàng pastel), viền `#d6b656`
  - 👔 **Quản lý Trung tâm (Center Manager):** `#e1d5e7` (Tím pastel), viền `#9673a6`
- **Tiến trình thời gian:** Di chuyển tuần tự và rõ ràng từ **Trái sang Phải (Left-to-Right)**. Mỗi bước sở hữu tọa độ X riêng biệt, **hoàn toàn không đè lên nhau** (Zero Overlap).
- **Hình khối chuẩn:**
  - `( Bắt đầu / Hoàn thành )`: Hình Oval/Ellipse trắng viền đen.
  - `[ Tác vụ / Hành động ]`: Hình chữ nhật góc vuông trắng viền đen (`rounded=0`).
  - `{ Điểm kiểm tra điều kiện }`: Hình thoi Rhombus trắng viền đen.

---

## 1. SƠ ĐỒ TỔNG THỂ (MASTER SWIMLANE): QUY TRÌNH NGHIỆP VỤ HOÀN CHỈNH (END-TO-END)

Sơ đồ tích hợp xuyên suốt toàn bộ hành trình với 6 vai trò, chia làm 5 mốc phân vùng nghiệp vụ (Phases):

```mermaid
swimlane-beta LR
accTitle: Sports Center Complete End-to-End Business Flow
accDescr: Master swimlane diagram across 5 phases integrating 6 actors: Member, Receptionist, System, Coach, AI Assistant, and Center Manager.

subgraph member [Hội viên (Member)]
  m_start([Bắt đầu])
  m_auth[Đăng ký / Đăng nhập hệ thống]
  m_update_info[Cập nhật TT cá nhân & Hồ sơ sức khỏe]
  m_buy_renew[Xem danh sách gói & Mua mới / Gia hạn]
  m_reg_class[Xem lịch & Đăng ký lớp học]
  m_cancel_class[Hủy đăng ký lớp (App / Lễ tân)]
  m_arrive[Đến trung tâm & Xuất trình mã QR]
  m_mem_view[Xem nhận xét HLV, bài tập & Lịch sử]
  m_end([Hoàn thành quy trình])
end

subgraph receptionist [Bộ phận Lễ tân (Receptionist)]
  m_rec_lookup[Tra cứu thông tin HV & Thu tiền (POS/CK/TM)]
  m_rec_chk[Quét mã QR Check-in & Kiểm tra hạn thẻ]
end

subgraph system [Hệ thống phần mềm (System)]
  m_auth_chk{Tài khoản hợp lệ?}
  m_pay_chk{Thanh toán hợp lệ?}
  m_sys_act[Kích hoạt gói tập & Cấp/Cập nhật thẻ QR]
  m_chk_class{Gói còn hạn & Lớp còn chỗ?}
  m_conf_class[Xác nhận giữ chỗ & Gửi lịch vào App]
  m_sys_cancel[Hủy giữ chỗ & Hoàn lại lượt đăng ký]
  m_sys_save[Lưu kết quả tập & Cập nhật hồ sơ HV]
  m_sys_invoice[Xuất hóa đơn & Cập nhật công nợ]
  m_sys_audit[Ghi nhận Audit Log & Đồng bộ CSDL]
end

subgraph coach [Bộ phận Huấn luyện viên (Coach)]
  m_cch_attend[Xem danh sách lớp & Điểm danh học viên]
  m_cch_plan[Xem mục tiêu HV & Lập kế hoạch tập]
  m_cch_req_ai[Yêu cầu AI gợi ý bài tập & giáo án]
  m_cch_train[Áp dụng giáo án, buổi tập & Giám sát kỹ thuật]
  m_cch_eval[Ghi nhận kết quả, đánh giá & Gửi bài tập về nhà]
end

subgraph ai [Trợ lý AI (AI Engine)]
  m_ai_suggest[AI phân tích thể trạng & Trả về gợi ý bài tập]
end

subgraph manager [Quản lý Trung tâm (Center Manager)]
  m_mgr_view_rpt[Truy cập Báo cáo Doanh thu, HV & Lớp học]
  m_mgr_config[Quản trị Danh mục, Gói tập, Phân công HLV & RBAC]
  m_mgr_export[Xuất file báo cáo Excel / PDF]
end

%% MỤC 1: ĐĂNG KÝ, QUẢN LÝ TÀI KHOẢN & MUA/GIA HẠN GÓI
m_start --> m_auth
m_auth -->|Thông tin| m_auth_chk
m_auth_chk -->|Sai thông tin| m_auth
m_auth_chk -->|Đúng| m_update_info
m_update_info -->|Xem gói| m_buy_renew
m_buy_renew -->|Yêu cầu mua/gia hạn| m_rec_lookup
m_rec_lookup -->|Ghi nhận thu| m_pay_chk
m_pay_chk -->|Thiếu/Lỗi| m_rec_lookup
m_pay_chk -->|Đạt| m_sys_act

%% MỤC 2: ĐĂNG KÝ LỚP HỌC & GIỮ CHỖ (HỖ TRỢ HỦY LỚP)
m_sys_act -->|Cấp thẻ QR| m_reg_class
m_reg_class -->|Chọn lớp| m_chk_class
m_chk_class -->|Hết chỗ / Hết hạn| m_reg_class
m_chk_class -->|Đạt| m_conf_class
m_conf_class -.->|Nếu cần hủy| m_cancel_class
m_cancel_class -->|Yêu cầu hủy| m_sys_cancel
m_sys_cancel -->|Hoàn lại chỗ| m_reg_class
m_conf_class -->|Đến ngày học| m_arrive

%% MỤC 3: CHECK-IN VÀO CỔNG & ĐIỂM DANH
m_arrive -->|Xuất trình QR| m_rec_chk
m_rec_chk -->|Vào sảnh tập| m_cch_attend

%% MỤC 4: LẬP KẾ HOẠCH AI, HUẤN LUYỆN & ĐÁNH GIÁ
m_cch_attend -->|Xem mục tiêu| m_cch_plan
m_cch_plan -->|Cần bài tập| m_cch_req_ai
m_cch_req_ai -->|Gọi AI| m_ai_suggest
m_ai_suggest -->|Gợi ý bài tập| m_cch_train
m_cch_train -->|Kết thúc bài| m_cch_eval
m_cch_eval -->|Gửi kết quả| m_sys_save
m_sys_save -->|Thông báo| m_mem_view

%% MỤC 5: THANH TOÁN, BÁO CÁO & QUẢN TRỊ HỆ THỐNG
m_sys_act -.->|Tạo hóa đơn| m_sys_invoice
m_sys_invoice -->|Dữ liệu tài chính| m_mgr_view_rpt
m_mgr_view_rpt -->|Điều chỉnh cấu hình| m_mgr_config
m_mgr_config -->|Lưu thay đổi| m_sys_audit
m_mgr_view_rpt -->|Xuất file| m_mgr_export
m_mem_view --> m_end
```

---

## 2. CHI TIẾT 6 FLOWS NGHIỆP VỤ (SUB-FLOW SWIMLANES)

### Flow 1: User and Membership Management
- **Vai trò:** Hội viên (Xanh dương), Lễ tân (Xanh lá), Hệ thống (Cam).
- **Mô tả:** Đăng ký/đăng nhập, cập nhật hồ sơ cá nhân/sức khỏe, xem danh sách gói tập (mua mới / gia hạn), lễ tân tra cứu & thu tiền tại quầy, kích hoạt gói và cấp mã QR.

```mermaid
swimlane-beta LR
accTitle: Flow 1 - User and Membership Management

subgraph f1_mem [Hội viên / Khách hàng (Member)]
  f1_start([Bắt đầu])
  f1_login[Đăng ký / Đăng nhập tài khoản]
  f1_update_info[Cập nhật thông tin cá nhân & Hồ sơ sức khỏe]
  f1_choose_pkg[Xem danh sách gói tập (Mua mới / Gia hạn)]
  f1_receive_qr[Nhận thẻ QR & Xem hạn gói trên App]
  f1_end([Hoàn thành quản lý HV])
end

subgraph f1_rec [Bộ phận Lễ tân (Receptionist)]
  f1_rec_search[Tra cứu thông tin HV & Tiếp nhận thu tiền]
end

subgraph f1_sys [Hệ thống phần mềm (System)]
  f1_chk_auth{Tài khoản hợp lệ?}
  f1_chk_pay{Thanh toán hợp lệ?}
  f1_activate[Kích hoạt gói tập & Tạo/Cập nhật mã QR]
end

f1_start --> f1_login
f1_login -->|Gửi đăng nhập| f1_chk_auth
f1_chk_auth -->|Sai mật khẩu| f1_login
f1_chk_auth -->|Hợp lệ| f1_update_info
f1_update_info -->|Xem gói| f1_choose_pkg
f1_choose_pkg -->|Gửi yêu cầu mua/gia hạn| f1_rec_search
f1_rec_search -->|Hóa đơn| f1_chk_pay
f1_chk_pay -->|Lỗi thu tiền| f1_rec_search
f1_chk_pay -->|Thành công| f1_activate
f1_activate -->|Đồng bộ App| f1_receive_qr
f1_receive_qr --> f1_end
```

---

### Flow 2: Class Booking and Schedule Management
- **Vai trò:** Hội viên, Lễ tân, Hệ thống.
- **Mô tả:** Xem lịch học/HLV, đăng ký giữ chỗ lớp, kiểm tra điều kiện & sĩ số; nhánh hủy lớp tự hủy trên App hoặc Lễ tân hỗ trợ tại quầy, hoàn lại lượt học.

```mermaid
swimlane-beta LR
accTitle: Flow 2 - Class Booking and Schedule Management

subgraph f2_mem [Hội viên (Member)]
  f2_start([Bắt đầu])
  f2_view_sched[Xem lịch học, HLV & Danh sách lớp mở]
  f2_book_class[Chọn lớp & Gửi yêu cầu đăng ký]
  f2_has_cancel{Có nhu cầu Hủy lớp?}
  f2_mem_cancel[Hội viên bấm Hủy lớp trực tiếp trên App]
  f2_attend_class[Nhận thông báo lịch học & Tham gia lớp]
  f2_end([Hoàn thành lịch học])
end

subgraph f2_rec [Bộ phận Lễ tân (Receptionist)]
  f2_rec_cancel[Lễ tân tiếp nhận & Hỗ trợ hủy lớp tại quầy]
end

subgraph f2_sys [Hệ thống phần mềm (System)]
  f2_chk_avail{Gói còn hạn & Lớp còn chỗ?}
  f2_conf_book[Xác nhận giữ chỗ & Cập nhật lịch vào App]
  f2_sys_cancel[Hoàn lại lượt học & Cập nhật lại sĩ số]
end

f2_start --> f2_view_sched
f2_view_sched -->|Đăng ký| f2_book_class
f2_book_class -->|Kiểm tra| f2_chk_avail
f2_chk_avail -->|Hết chỗ / Hết hạn| f2_view_sched
f2_chk_avail -->|Đạt| f2_conf_book
f2_conf_book -->|Lịch học| f2_has_cancel
f2_has_cancel -->|Không hủy| f2_attend_class
f2_has_cancel -->|Tự hủy| f2_mem_cancel
f2_has_cancel -->|Nhờ Lễ tân| f2_rec_cancel
f2_mem_cancel -->|Gửi yêu cầu| f2_sys_cancel
f2_rec_cancel -->|Xác nhận hủy| f2_sys_cancel
f2_sys_cancel -->|Chọn lớp khác| f2_view_sched
f2_attend_class --> f2_end
```

---

### Flow 3: Payment and Report Management
- **Vai trò:** Hội viên, Lễ tân, Hệ thống, Quản lý Trung tâm (Center Manager).
- **Mô tả:** Đa dạng kênh thanh toán (POS/Online/Tiền mặt), in hóa đơn điện tử, cập nhật công nợ/trả góp; Center Manager truy cập báo cáo doanh thu, tỷ lệ lấp đầy lớp & hội viên mới/hết hạn, xuất file Excel/PDF.

```mermaid
swimlane-beta LR
accTitle: Flow 3 - Payment and Report Management

subgraph f3_mem [Khách hàng / Hội viên (Member)]
  f3_start([Bắt đầu])
  f3_mem_pay[Chọn phương thức & Thanh toán (POS/CK/TM)]
  f3_mem_inv[Nhận hóa đơn điện tử & Kiểm tra lịch sử GD]
end

subgraph f3_rec [Bộ phận Lễ tân (Receptionist)]
  f3_rec_record[Ghi nhận thanh toán & Tiếp nhận hỗ trợ]
  f3_rec_print[Bàn giao hóa đơn / Gửi biên lai cho HV]
end

subgraph f3_sys [Hệ thống phần mềm (System)]
  f3_sys_process[Xử lý giao dịch & Cập nhật công nợ/trả góp]
  f3_sys_invoice[Tự động phát hành & In/Xuất hóa đơn]
end

subgraph f3_mgr [Quản lý Trung tâm (Center Manager)]
  f3_mgr_access[Truy cập phân hệ Báo cáo & Thống kê]
  f3_mgr_view_rpt[Xem báo cáo Doanh thu, Tỷ lệ lấp đầy & HV]
  f3_mgr_export[Bộ lọc thời gian & Xuất báo cáo (Excel/PDF)]
  f3_end([Hoàn thành báo cáo])
end

f3_start --> f3_mem_pay
f3_mem_pay -->|Giao dịch| f3_rec_record
f3_rec_record -->|Gửi thanh toán| f3_sys_process
f3_sys_process -->|Hợp lệ| f3_sys_invoice
f3_sys_invoice -->|Bản in/PDF| f3_rec_print
f3_rec_print -->|Bàn giao| f3_mem_inv
f3_sys_invoice -->|Đồng bộ số liệu| f3_mgr_access
f3_mgr_access -->|Xem số liệu| f3_mgr_view_rpt
f3_mgr_view_rpt -->|Xuất file| f3_mgr_export
f3_mgr_export --> f3_end
```

---

### Flow 4: System Administration & Configuration
- **Vai trò:** Quản lý Trung tâm (Center Manager), Hệ thống phần mềm.
- **Mô tả:** Nghiệp vụ backend setup độc lập: Quản lý CRUD người dùng, danh mục lớp/môn/phòng, phân công HLV, cấu hình gói tập, phân quyền RBAC và tra cứu Audit Log.

```mermaid
swimlane-beta LR
accTitle: Flow 4 - System Administration and Configuration

subgraph f4_mgr [Quản lý Trung tâm (Center Manager)]
  f4_start([Bắt đầu])
  f4_auth_admin[Đăng nhập Cổng Quản trị (Admin Portal)]
  f4_user_crud[1. Quản lý Người dùng (CRUD): HV, HLV, Staff]
  f4_cat_manage[2. Quản lý Danh mục: Lớp, bộ môn, phòng tập]
  f4_assign_cch[3. Phân công Huấn luyện viên phụ trách lớp]
  f4_pkg_config[4. Cấu hình Gói thành viên: Tạo mới, giá, hạn]
  f4_rbac_setup[5. Phân quyền vai trò (RBAC): Cấp quyền chức năng]
  f4_audit_log[6. Giám sát & Tra cứu Lịch sử thao tác (Audit Log)]
  f4_end([Hoàn tất quản trị])
end

subgraph f4_sys [Hệ thống phần mềm (System)]
  f4_sys_auth[Xác thực quyền Manager & Tải Dashboard]
  f4_sys_save[Ghi nhận Audit Log, Lưu cấu hình & Cập nhật CSDL]
end

f4_start --> f4_auth_admin
f4_auth_admin -->|Xác thực| f4_sys_auth
f4_sys_auth -->|Quyền hợp lệ| f4_user_crud
f4_user_crud --> f4_cat_manage
f4_cat_manage --> f4_assign_cch
f4_assign_cch --> f4_pkg_config
f4_pkg_config --> f4_rbac_setup
f4_rbac_setup --> f4_audit_log
f4_audit_log -->|Lưu thay đổi| f4_sys_save
f4_sys_save -->|Xác nhận thành công| f4_end
```

---

### Flow 5: Training Planning & AI-assisted Coaching
- **Vai trò:** Huấn luyện viên (Coach), Trợ lý AI (AI Engine), Hệ thống phần mềm, Học viên (Member).
- **Mô tả:** Coach xem thể trạng/mục tiêu HV, yêu cầu AI gợi ý bài tập/giáo án, chỉnh sửa & phê duyệt, giao bài tập về nhà; điểm danh, giám sát kỹ thuật, đánh giá tiến độ và đồng bộ hồ sơ sức khỏe.

```mermaid
swimlane-beta LR
accTitle: Flow 5 - Training Planning & AI-assisted Coaching

subgraph f5_cch [Huấn luyện viên (Coach)]
  f5_start([Bắt đầu])
  f5_view_profile[Xem thông tin & mục tiêu tập của HV]
  f5_create_plan[Tạo kế hoạch huấn luyện (lớp / cá nhân)]
  f5_req_ai[Yêu cầu AI gợi ý bài tập theo mục tiêu & lịch sử]
  f5_cch_review[Chỉnh sửa, tối ưu hóa & Áp dụng giáo án]
  f5_cch_send_hw[Gửi thông báo lộ trình & Bài tập về nhà]
  f5_cch_attend[Điểm danh học viên khi vào buổi học]
  f5_cch_conduct[Tiến hành buổi tập & Giám sát kỹ thuật]
  f5_cch_eval[Ghi nhận kết quả tập & Đánh giá tiến độ]
end

subgraph f5_ai [Trợ lý AI (AI Engine)]
  f5_ai_analyze[Phân tích dữ liệu & Trả về gợi ý bài tập/giáo án]
end

subgraph f5_sys [Hệ thống phần mềm (System)]
  f5_sys_sync[Lưu kết quả & Đồng bộ vào hồ sơ sức khỏe HV]
end

subgraph f5_mem [Học viên / Hội viên (Member)]
  f5_mem_receive[Xem lộ trình & bài tập về nhà trên App]
  f5_mem_progress[Theo dõi tiến độ, nhận xét & biểu đồ cải thiện]
  f5_end([Hoàn thành buổi tập])
end

f5_start --> f5_view_profile
f5_view_profile -->|Lập giáo án| f5_create_plan
f5_create_plan -->|Cần AI hỗ trợ| f5_req_ai
f5_req_ai -->|Gọi AI gợi ý| f5_ai_analyze
f5_ai_analyze -->|Trả kết quả gợi ý| f5_cch_review
f5_cch_review -->|Giao bài tập| f5_cch_send_hw
f5_cch_send_hw -->|Thông báo App| f5_mem_receive
f5_cch_send_hw -->|Đến giờ học| f5_cch_attend
f5_cch_attend -->|Vào buổi tập| f5_cch_conduct
f5_cch_conduct -->|Kết thúc bài tập| f5_cch_eval
f5_cch_eval -->|Lưu đánh giá| f5_sys_sync
f5_sys_sync -->|Cập nhật hồ sơ| f5_mem_progress
f5_mem_progress --> f5_end
```

---

### Flow 6: AI Assistant & Notification Management
- **Vai trò:** Hội viên (Member), Trợ lý AI (AI Engine), Hệ thống phần mềm.
- **Mô tả:** Phân luồng kép: (1) Hội viên hỏi đáp AI trực tiếp trên App về lịch tập/kỹ thuật/dinh dưỡng/dịch vụ; (2) Hệ thống chạy ngầm tự động phát hiện sự kiện và đẩy thông báo (đổi lịch, hủy lớp, đổi HLV, hạn gói tập, nhắc giờ tập).

```mermaid
swimlane-beta LR
accTitle: Flow 6 - AI Assistant & Notification Management

subgraph f6_mem [Hội viên (Member)]
  f6_start([Bắt đầu])
  f6_open_chat[Mở Trợ lý AI Chatbot trên ứng dụng]
  f6_send_query[Gửi câu hỏi về lịch tập, kỹ thuật, dinh dưỡng]
  f6_mem_rate[Nhận câu trả lời & Đánh giá chất lượng tư vấn]
  f6_mem_noti[Nhận thông báo, xem chi tiết & Tra cứu lịch sử]
  f6_end([Hoàn thành tương tác])
end

subgraph f6_ai [Trợ lý AI (AI Engine)]
  f6_ai_process[Xử lý NLP, tra cứu cơ sở tri thức & hồ sơ HV]
  f6_ai_response[Phản hồi tư vấn tức thì & Gợi ý hành động]
end

subgraph f6_sys [Hệ thống phần mềm (System)]
  f6_sys_monitor[Hệ thống giám sát sự kiện thời gian thực nền]
  f6_sys_event_chk{Phát hiện: Đổi lịch, Hạn gói, Nhắc giờ?}
  f6_sys_push[Tự động gửi thông báo chủ động (Push/SMS/App)]
end

%% Nhánh tương tác hỏi đáp AI
f6_start --> f6_open_chat
f6_open_chat -->|Nhập câu hỏi| f6_send_query
f6_send_query -->|Gửi truy vấn| f6_ai_process
f6_ai_process -->|Phân tích xong| f6_ai_response
f6_ai_response -->|Hiển thị câu trả lời| f6_mem_rate

%% Nhánh thông báo tự động (chạy ngầm song song)
f6_mem_rate -.->|Kênh song song| f6_sys_monitor
f6_sys_monitor -->|Kiểm tra sự kiện| f6_sys_event_chk
f6_sys_event_chk -->|Có sự kiện mới| f6_sys_push
f6_sys_push -->|Đẩy thông báo| f6_mem_noti
f6_mem_noti --> f6_end
```
