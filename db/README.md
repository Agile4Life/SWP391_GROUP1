# SQL Server local setup

1. Start SQL Server with `docker compose --env-file .env up -d sqlserver`, or use a local SQL Server 2019+ instance.
2. Open `databaseschema.sql` in Azure Data Studio/SSMS and execute it. The script creates `SportsCenterDB` when absent.
3. Add non-production demo users through a future migration/seed script; never commit production information.

`databaseschema.sql` remains the source schema while the base project is being established. Once the team shares environments, adopt Flyway and add only forward migrations under `db/migrations/`; do not rewrite a migration already applied by teammates.
