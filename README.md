# Sports Center Management System

Monorepo khởi tạo cho SWP391, gồm React web portal và Spring Boot REST API.

## Cấu trúc

```text
apps/api/       Spring Boot API (Java 21)
apps/web/       React + Vite + TypeScript
db/             hướng dẫn SQL Server và dữ liệu demo
docs/           API contracts, ADR và test cases
.agents/        quy ước cho các agent phát triển tiếp
```

## Khởi động local

### Cách 1: 1-Click (Khuyên dùng trên Windows)
- Click đúp vào file `run-local.bat` (hoặc chạy `.\run-local.ps1` trong PowerShell).
- Bộ chạy sẽ tự động kiểm tra môi trường, khởi tạo database `SportsCenterDB` nếu chưa có, và mở Web + API.
- Để dừng hệ thống: chạy `stop-local.bat` (hoặc `.\stop-local.ps1`).

Chi tiết xem tại [LOCAL_DEV_GUIDE.md](LOCAL_DEV_GUIDE.md).

### Cách 2: Khởi động thủ công
1. Cài Java 21+, Maven 3.9+, Node.js 20+ và SQL Server 2019+.
2. Sao chép `.env.example` thành `.env` (hoặc cấu hình lại thông số kết nối).
3. Khởi tạo database: chạy `.\init-db.bat` hoặc thực thi [databaseschema.sql](databaseschema.sql).
4. Chạy API: `cd apps/api && .\mvnw.cmd spring-boot:run`.
5. Chạy Web: `cd apps/web && npm install && npm run dev`.

Web: `http://localhost:5173` · API: `http://localhost:8080/api/v1/health` · Swagger: `http://localhost:8080/swagger-ui/index.html`.

## Quy ước làm việc

- Đọc [AGENTS.md](AGENTS.md) và [AGILE_SCRUM_JIRA_PLAN.md](AGILE_SCRUM_JIRA_PLAN.md) trước khi nhận ticket.
- Mỗi PR chỉ xử lý một Jira ticket, đặt tên `SCMS-123/short-description`.
- Không sửa `databaseschema.sql` trong feature PR nếu chưa có migration, review và cập nhật tài liệu liên quan.
- Không commit `.env`, password, JWT secret hoặc dữ liệu thật.
