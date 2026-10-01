# SQL Server local setup

1. Start SQL Server with `docker compose --env-file .env up -d sqlserver`, or use a local SQL Server 2019+ instance.
2. Open `databaseschema.sql` in Azure Data Studio/SSMS and execute it. The script creates `SportsCenterDB` when absent.
3. Add non-production demo users through a future migration/seed script; never commit production information.

`databaseschema.sql` remains the SQL Server source schema. Existing SQL Server databases should apply forward scripts under `db/migrations/` (including username and OTP challenge migrations); do not rewrite an applied migration. PostgreSQL uses Flyway migrations in `apps/api/src/main/resources/db/migration/postgresql/` when the `postgresql` profile is active.
