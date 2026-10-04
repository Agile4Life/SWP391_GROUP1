---
name: scms-development
description: Implement or review a Sports Center Management System ticket using this repository's React, Spring Boot, SQL Server, and Jira conventions.
---

# SCMS development

## 1. Bắt buộc đọc Rules & Tài liệu trước khi làm việc
Trước khi sửa hoặc thêm bất kỳ dòng code nào, Agent PHẢI đọc:
1. `AGENTS.md` (root): Quy tắc bất biến dữ liệu, trigger, bảo mật và phạm vi MVP.
2. `docs/rules/backend-architecture.md`: Kiến trúc 3 lớp, SOLID, IoC, Code-First & ORM Polymorphism, và chuẩn i18n.
3. `.agents/rules/mandatory-rules.md`: Bảng quy tắc bắt buộc về phân định squad và cấm hard-code.
4. `.agents/workflows/scms-development.md`: Quy trình 6 bước chuẩn mực để triển khai ticket.
5. `docs/plans/AGILE_SCRUM_JIRA_PLAN.md` & `docs/PROJECT_MASTER_GUIDE.md`: Xem Jira key, Acceptance Criteria và luồng nghiệp vụ.

## 2. Squad Boundaries (Ranh giới trách nhiệm)
- **Phong**: Backend Core Architecture, Hạ tầng Trigger Strategy, Global Exception, i18n, Phân hệ Finance (`payments`, `invoices`, computed columns), AI Services.
- **Tài**: Phân hệ Identity & Access Management (User Management, RBAC, Roles, Permissions, User Profile).
- **An**: Phân hệ Core Operations (Classes, Schedules, Enrollments, Check-in, Facilities, Subscriptions).
- **Tuyệt đối không can thiệp code vào phân hệ của người khác.**

## 3. Bất biến kiến trúc bắt buộc (Architectural Invariants)
- **Code-First & ORM Polymorphism:** Toàn bộ bảng, cột, quan hệ định nghĩa qua Java JPA Entity; Hibernate ORM đẩy thẳng (`ddl-auto: update`), không tạo file DDL thủ công.
- **Trigger đa hình:** Trigger được nạp tự động qua Strategy Polymorphism (`DatabaseTriggerProvider`) theo loại CSDL đang kết nối (`SqlServerTriggerStrategy`, `PostgresTriggerStrategy`, `H2TriggerStrategy`), không ghim cứng DDL.
- **Đa ngôn ngữ (i18n bắt buộc):** Mọi response API message, exception message, validation message PHẢI dùng message key qua `MessageService`. Cấm tuyệt đối hard-code chuỗi tiếng Việt/tiếng Anh. Bắt buộc cập nhật đồng thời cả 3 file:
  + `apps/api/src/main/resources/i18n/messages_vi.properties`
  + `apps/api/src/main/resources/i18n/messages_en.properties`
  + `apps/api/src/main/resources/i18n/messages.properties`
- **Tương thích Standalone Unit Tests:** Controllers & Services khi inject `MessageService` luôn dùng constructor chaining null-safe để không làm gãy các test standalone.

## 4. Routing & Implementation
- **Backend (`apps/api`):** Tổ chức package-by-feature; DTOs ở ranh giới; Service quản lý transaction và ném `AppException` con kèm `(errorCode, messageKey, messageArgs, fallbackMessage)`; Controller chỉ điều phối và trả về `ApiResponse<T>`.
- **Frontend (`apps/web`):** Đặt UI trong `src/features/<feature>`; page chỉ compose feature; luôn có trạng thái loading, empty, error và forbidden.
- **Verification:** Chạy `./mvnw test` (100% tests pass) và cập nhật `graphify update .` trước khi commit.
