# SCMS API

Run with Java 21 and Maven 3.9+:

```bash
mvn spring-boot:run
```

Set `SPRING_DATASOURCE_*` environment variables from the root `.env.example` before running. Schema generation is intentionally disabled (`ddl-auto: none`): the database must be created from the repository DDL/migrations.

Feature packages are intentionally empty until their Jira tickets start. Add `controller`, `service`, `repository`, `dto` and `entity` under the applicable business package; do not put new business code in a global `controller` or `service` folder.
