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

1. Cài Java 21+, Maven 3.9+, Node.js 20+ và SQL Server 2019+.
2. Sao chép `.env.example` thành `.env` và thay `MSSQL_SA_PASSWORD` bằng mật khẩu mạnh hợp lệ.
3. Tạo database bằng `databaseschema.sql` theo [db/README.md](db/README.md).
4. Chạy API: `cd apps/api && mvn spring-boot:run`.
5. Chạy Web: `cd apps/web && npm install && npm run dev`.

Web: `http://localhost:5173` · API: `http://localhost:8080/api/v1/health`.

## Quy ước làm việc

- Đọc [AGENTS.md](AGENTS.md) và [AGILE_SCRUM_JIRA_PLAN.md](AGILE_SCRUM_JIRA_PLAN.md) trước khi nhận ticket.
- Mỗi PR chỉ xử lý một Jira ticket, đặt tên `SCMS-123/short-description`.
- Không sửa `databaseschema.sql` trong feature PR nếu chưa có migration, review và cập nhật tài liệu liên quan.
- Không commit `.env`, password, JWT secret hoặc dữ liệu thật.
