# Sports Center Management System - Swimlane Diagrams (SWP391)

Tài liệu này chuẩn hóa toàn bộ sơ đồ Swimlane Diagram cho môn **SWP391** theo đúng chuẩn thiết kế của file mẫu **`swimlane-mau.drawio`**:
- **Định dạng làn:** Làn nằm ngang xếp chồng (`horizontal=1`), tiêu đề nằm trên thanh đầu mỗi làn.
- **Tone màu Pastel:** Chuẩn draw.io: Hội viên (`#dae8fc` Xanh dương) ➔ Lễ tân (`#d5e8d4` Xanh lá) ➔ Hệ thống (`#ffe6cc` Cam) ➔ Huấn luyện viên (`#f8cecc` Hồng).
- **Tiến trình thời gian:** Di chuyển tuần tự và rõ ràng từ **Trái sang Phải (Left-to-Right)**, phân rõ 4 Mục chính. Mỗi bước sở hữu tọa độ X riêng biệt, **hoàn toàn không đè lên nhau** và không có đường nối cắt xuyên khối.
- **Hình khối chuẩn:**
  - `( Bắt đầu / Hoàn thành )`: Hình Oval/Ellipse trắng nền viền đen.
  - `[ Tác vụ / Hành động ]`: Hình chữ nhật góc vuông trắng nền viền đen (`rounded=0`).
  - `{ Điểm kiểm tra điều kiện }`: Hình thoi Rhombus trắng nền viền đen.

---

## 1. SƠ ĐỒ CHÍNH (MASTER): QUY TRÌNH NGHIỆP VỤ HOÀN CHỈNH (END-TO-END)

Sơ đồ kết nối liền mạch toàn bộ 4 giai đoạn cốt lõi của trung tâm thể thao với 4 vai trò chính:

```mermaid
swimlane-beta LR
accTitle: Sports Center Complete End-to-End Business Flow
accDescr: Master swimlane diagram across 4 phases: Registration & Package Purchase, Class Booking, Check-in & Attendance, and Training & Evaluation.

subgraph member [Hội viên (Khách hàng)]
  m_start([Bắt đầu])
  m_auth[Đăng ký / Đăng nhập hệ thống]
  m_buy_pkg[Xem danh sách & Chọn mua gói tập]
  m_reg_class[Xem lịch học & Đăng ký lớp học]
  m_arrive[Đến trung tâm & Xuất trình mã QR]
  m_mem_view[Xem nhận xét HLV & Lịch sử tập trên App]
  m_end([Hoàn thành buổi tập])
end

subgraph receptionist [Bộ phận Lễ tân]
  m_rec_pay[Tiếp nhận yêu cầu & Thu tiền / POS / Online]
  m_rec_chk[Quét mã QR Check-in vào cửa]
end

subgraph system [Hệ thống phần mềm]
  m_auth_chk{Tài khoản hợp lệ?}
  m_pay_chk{Thanh toán hợp lệ?}
  m_sys_act[Kích hoạt gói tập & Cấp thẻ QR Hội viên]
  m_chk_class{Gói còn hạn & Lớp còn chỗ?}
  m_conf_class[Xác nhận giữ chỗ & Gửi lịch vào App HV]
  m_sys_save[Lưu kết quả tập & Cập nhật hồ sơ HV]
end

subgraph coach [Bộ phận Huấn luyện viên (Coach)]
  m_cch_attend[Xem danh sách lớp & Điểm danh học viên]
  m_cch_train[Tiến hành buổi tập & Giám sát kỹ thuật]
  m_cch_eval[Ghi nhận kết quả & Đánh giá tiến độ]
end

%% MỤC 1: ĐĂNG KÝ & MUA GÓI TẬP
m_start --> m_auth
m_auth --> m_auth_chk
m_auth_chk -->|Sai thông tin| m_auth
m_auth_chk -->|Đúng| m_buy_pkg
m_buy_pkg -->|Yêu cầu mua| m_rec_pay
m_rec_pay -->|Hóa đơn| m_pay_chk
m_pay_chk -->|Thiếu / Lỗi| m_rec_pay
m_pay_chk -->|Đạt| m_sys_act

%% MỤC 2: ĐĂNG KÝ LỚP HỌC & GIỮ CHỖ
m_sys_act -->|Cấp thẻ QR| m_reg_class
m_reg_class -->|Chọn lớp| m_chk_class
m_chk_class -->|Hết chỗ / Hết hạn| m_reg_class
m_chk_class -->|Đạt| m_conf_class

%% MỤC 3: CHECK-IN VÀO CỔNG & ĐIỂM DANH
m_conf_class -->|Đến ngày học| m_arrive
m_arrive -->|Xuất trình QR| m_rec_chk
m_rec_chk -->|Vào sảnh| m_cch_attend

%% MỤC 4: HUẤN LUYỆN, ĐÁNH GIÁ & HOÀN THÀNH
m_cch_attend -->|Vào lớp tập| m_cch_train
m_cch_train -->|Kết thúc bài| m_cch_eval
m_cch_eval -->|Gửi kết quả| m_sys_save
m_sys_save -->|Thông báo| m_mem_view
m_mem_view --> m_end
```

---

## 2. PHÂN LUỒNG CHI TIẾT THEO TỪNG MỤC (SUB-FLOWS)

### Mục 1: Đăng ký & Kích hoạt gói tập (Membership & Payment)
- **3 làn:** Hội viên (Xanh dương) ➔ Lễ tân (Xanh lá) ➔ Hệ thống (Cam).

```mermaid
swimlane-beta LR
accTitle: Membership Purchase and Activation Flow

subgraph p_mem [Khách hàng / Hội viên]
  pn1([Bắt đầu])
  pn2[Xem & Chọn gói tập]
  pn6([Nhận thẻ QR & Hoàn thành])
end

subgraph p_rec [Bộ phận Lễ tân]
  pn3[Tiếp nhận yêu cầu & Thu tiền mặt/POS]
end

subgraph p_sys [Hệ thống phần mềm]
  pn4{Thanh toán hợp lệ?}
  pn5[Kích hoạt gói tập & Tạo mã QR Hội viên]
end

pn1 --> pn2
pn2 -->|Gửi yêu cầu| pn3
pn3 -->|Hóa đơn| pn4
pn4 -->|Đạt| pn5
pn4 -->|Không đạt - Thu lại| pn3
pn5 -->|Gửi về App| pn6
```

### Mục 2 & 3: Đăng ký lớp, Check-in & Huấn luyện (Class Booking & Training)
- **4 làn:** Hội viên ➔ Lễ tân ➔ Hệ thống ➔ Huấn luyện viên.

```mermaid
swimlane-beta LR
accTitle: Class Booking and Training Session Flow

subgraph c_mem [Hội viên (Khách hàng)]
  cn1([Bắt đầu])
  cn2[Chọn lớp học & Gửi đăng ký]
  cn5[Đến trung tâm & Xuất trình mã QR]
  cn8([Hoàn thành buổi học])
end

subgraph c_rec [Bộ phận Lễ tân]
  cn6[Quét mã QR Check-in vào cửa]
end

subgraph c_sys [Hệ thống phần mềm]
  cn3{Đủ điều kiện & Lớp còn chỗ?}
  cn4[Xác nhận giữ chỗ & Cập nhật lịch học]
end

subgraph c_cch [Bộ phận Huấn luyện viên]
  cn7[Điểm danh học viên & Huấn luyện buổi tập]
end

cn1 --> cn2
cn2 -->|Đăng ký| cn3
cn3 -->|Đạt| cn4
cn3 -->|Hết chỗ / Hết hạn| cn2
cn4 -->|Đến ngày học| cn5
cn5 -->|Xuất trình QR| cn6
cn6 -->|Vào lớp| cn7
cn7 -->|Kết thúc buổi| cn8
```
