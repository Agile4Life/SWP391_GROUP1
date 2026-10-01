# Hướng dẫn cho contributor và coding agent

Quy tắc chi tiết về kiến trúc backend, ba lớp, SOLID, IoC, JPA và hỗ trợ PostgreSQL/SQL Server nằm tại `rules/backend-architecture.md`; mọi contributor và agent làm backend phải tuân theo cả hai tài liệu.

## Bối cảnh

- Nguồn nghiệp vụ: `PROJECT_MASTER_GUIDE.md`; schema nguồn chân lý: `databaseschema.sql`; backlog: `AGILE_SCRUM_JIRA_PLAN.md`.
- Stack cố định: React + TypeScript ở `apps/web`, Java 21 + Spring Boot 3 ở `apps/api`, Microsoft SQL Server.

## Cách làm một ticket

1. Xác định Jira key, owner màn hình và acceptance criteria trong backlog.
2. Nếu đổi API, cập nhật OpenAPI ở `docs/api-contracts/` trước hoặc cùng PR.
3. Backend: giữ package-by-feature, dùng DTO, validation, service transaction và global error handler. Không trả entity trực tiếp.
4. Frontend: đặt UI trong `features/<feature>`, page chỉ compose feature; luôn có loading, empty và error state.
5. Chạy test/lint phù hợp trước khi mở PR và ghi Jira key trong mô tả PR.

## Bất biến nghiệp vụ và kiến trúc dữ liệu

- **Code-First & ORM Polymorphism bắt buộc:** Toàn bộ bảng, cột, khóa và quan hệ định nghĩa qua Java Entity; chuyển đổi CSDL không viết lại DDL thủ công mà dùng Hibernate ORM đẩy thẳng (`ddl-auto: update`).
- **Trigger đa hình:** Các trigger nghiệp vụ bắt buộc (capacity, trùng lịch) được nạp tự động qua Strategy Polymorphism (`DatabaseTriggerProvider`) dựa trên CSDL đang kết nối, không ghim cứng DDL.
- Chỉ Member có subscription `active` và chưa hết hạn được booking/check-in.
- Database trigger kiểm tra capacity và trùng lịch là bắt buộc. Map lỗi SQL đó thành lỗi HTTP dễ hiểu, không vô hiệu trigger.
- `users.deleted_at IS NOT NULL` không được xác thực hoặc hiện trong list mặc định.
- Backend luôn kiểm tra role; ẩn menu ở frontend không phải là authorization.

## Phạm vi MVP

Không tự thêm mobile native, payment gateway thật, AI provider thật, PDF/export hoặc đổi database nếu ticket không nêu rõ.
