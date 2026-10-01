# SCMS API

Run with Java 21 and Maven 3.9+:

```bash
mvn spring-boot:run
```

Set `APP_JWT_SECRET` and `SPRING_DATASOURCE_*` in the environment before running. Use `SPRING_PROFILES_ACTIVE=sqlserver` (default) or `postgresql`; the active profile selects its JDBC driver and connection settings. The PostgreSQL profile applies the versioned baseline and invariant-trigger migrations. SQL Server continues to use `databaseschema.sql` as its schema bootstrap. Schema generation is intentionally disabled (`ddl-auto: none`): the database must be created from the repository DDL/migrations.

Organize new code by feature and use `controller`, `service`, `repository`, `entity`, and `dto` packages where applicable. Never put feature business logic in global `controller` or `service` packages. `run-local.ps1` loads the root `.env` and generates a temporary JWT signing key for local runs; manual and deployed runs must provide a private `APP_JWT_SECRET`.
