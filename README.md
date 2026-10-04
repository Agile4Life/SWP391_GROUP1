# Sports Center Management System

Monorepo khởi tạo cho SWP391, gồm React web portal và Spring Boot REST API.

## Cấu trúc

```text
apps/api/       Spring Boot API (Java 21)
apps/web/       React + Vite + TypeScript
db/             CSDL, migration và schema SQL Server (databaseschema.sql)
docs/           toàn bộ tài liệu (plans, diagrams, rules, guides, api-contracts, specs)
scripts/        bộ script tự động hóa khởi chạy local (run-local, stop-local, init-db)
.agents/        quy ước cho các agent phát triển tiếp
```

## Khởi động local

### Cách 1: 1-Click (Khuyên dùng trên Windows)
- Chạy `npm start` (hoặc bấm đúp vào [`scripts/run-local.bat`](scripts/run-local.bat) / chạy `.\scripts\run-local.ps1`).
- Bộ chạy sẽ tự động kiểm tra môi trường, khởi tạo database `SportsCenterDB` nếu chưa có, và mở Web + API.
- Để dừng hệ thống: chạy `npm run stop` (hoặc bấm đúp [`scripts/stop-local.bat`](scripts/stop-local.bat)).

Chi tiết xem tại [docs/LOCAL_DEV_GUIDE.md](docs/LOCAL_DEV_GUIDE.md).

### Cách 2: Khởi động thủ công
1. Cài Java 21+, Maven 3.9+, Node.js 20+ và SQL Server 2019+.
2. Sao chép `.env.example` thành `.env` (hoặc cấu hình lại thông số kết nối).
3. Khởi tạo database: chạy `npm run db:init` hoặc thực thi [db/databaseschema.sql](db/databaseschema.sql).
4. Chạy API: `cd apps/api && .\mvnw.cmd spring-boot:run`.
5. Chạy Web: `cd apps/web && npm install && npm run dev`.

Web: `http://localhost:5173` · API: `http://localhost:8080/api/v1/health` · Swagger: `http://localhost:8080/swagger-ui/index.html`.

## Quy ước làm việc

- Đọc [AGENTS.md](AGENTS.md) và [docs/plans/AGILE_SCRUM_JIRA_PLAN.md](docs/plans/AGILE_SCRUM_JIRA_PLAN.md) trước khi nhận ticket.
- Mỗi PR chỉ xử lý một Jira ticket, đặt tên `SCMS-123/short-description`.
- Không sửa `db/databaseschema.sql` trong feature PR nếu chưa có migration, review và cập nhật tài liệu liên quan.
- Không commit `.env`, password, JWT secret hoặc dữ liệu thật.
