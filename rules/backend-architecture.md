# Backend architecture rules

These rules apply to all new backend work and refactors in `apps/api`. Follow the project business invariants in the root `AGENTS.md` as well; this file does not replace them.

## Required structure

Organize Java code by business feature under `com.swp391.scms.<feature>`. A feature that owns HTTP endpoints, business behavior, and persistence uses its own `controller`, `service`, `repository`, `entity`, `dto`, and (when mapping warrants it) `mapper` packages. Do not put feature logic in global `controller` or `service` packages. Keep `common` limited to genuinely cross-cutting concerns.

Use a strict three-layer flow:

1. **Controller:** HTTP routing, request/response DTOs, validation entry point, status/header mapping, and delegation to a service. Never call a repository directly, implement business rules, parse JWT manually, or catch domain exceptions to decide status codes.
2. **Service/use case:** business rules, authorization decisions that depend on domain state, orchestration, and transaction boundaries. Services coordinate repositories and outbound ports. Use `@Transactional` for writes and `@Transactional(readOnly = true)` for read-only use cases where appropriate.
3. **Repository:** persistence queries only, implemented with Spring Data JPA. Put filtering, sorting, and pagination in database queries rather than loading all rows for in-memory filtering.

## SOLID and dependency injection

- Give each class one primary responsibility; split classes when independent reasons to change emerge.
- Extend behavior through small, stable contracts where alternatives are real (for example OTP delivery or provider-specific persistence error translation). Do not add abstraction layers or interfaces that only duplicate one implementation without a replaceability or testing benefit.
- Keep interfaces focused on the methods each consumer needs. Implementations must preserve the contract's behavior.
- Keep business rules independent of infrastructure details. Services may depend on repositories and outbound ports; provider-specific and external integrations implement those ports.
- Use Spring constructor injection with `final` dependencies. Do not use field injection, service locators, static mutable state, or manually instantiate Spring-managed collaborators.
- Prefer explicit, named implementations and configuration conditions so selected adapters are visible during debugging.

## JPA, database support, and migrations

- Use Jakarta Persistence and Spring Data JPA. Prefer portable mappings, derived queries, JPQL, and standard transaction behavior. Avoid vendor-specific native SQL in business services.
- PostgreSQL is the deployment target. Keep SQL Server operational during the transition. Configure each engine with a separate Spring profile and environment-provided connection settings; never commit credentials.
- Version schema changes with migrations. Keep PostgreSQL and SQL Server migration scripts separate when SQL syntax or features differ. Do not use `ddl-auto: update` in deployed environments.
- Keep entities inside persistence boundaries. Do not serialize entities as API responses or use them as request payloads.
- Isolate database-specific behavior (native queries, error codes, computed columns, triggers, generated values) behind provider configuration or focused adapters. Do not make a database-specific exception code a feature-service concern.
- Claim an engine is supported only after its migration and integration behavior have been checked on that engine. H2 is useful for fast tests but does not prove PostgreSQL or SQL Server compatibility.
- Preserve required database triggers for capacity and schedule-overlap enforcement. Translate known constraint failures into stable client-safe errors; never disable the trigger to make an application test pass.

## API, validation, security, and errors

- Use dedicated request and response DTOs. Apply Jakarta Bean Validation to request DTOs and `@Valid` at controller boundaries.
- Keep API contracts stable during refactors. If a route, DTO, or status code must change, update `docs/api-contracts/` before or alongside the implementation.
- Keep role checks in the backend. Use the authenticated Spring Security principal and authorities; do not manually decode the bearer token in feature controllers.
- Throw typed domain/application exceptions for expected failures. Map them in the global exception handler to the shared error response shape. Do not return stack traces, SQL messages, or internal identifiers to clients.
- Do not authenticate users whose `deleted_at` is set; exclude them from default lists.
- Do not log passwords, OTP secrets, bearer tokens, database credentials, or sensitive health data. Add contextual IDs and operation names to logs where they help diagnose failures.

## Change workflow checklist

Before opening or completing a backend change:

- Identify the feature owner, acceptance criteria, and relevant invariants in `AGILE_SCRUM_JIRA_PLAN.md`, `PROJECT_MASTER_GUIDE.md`, and `databaseschema.sql`.
- Keep controller, service, repository, entity, and DTO responsibilities separated; inject dependencies through constructors.
- Keep transaction boundaries in service/use-case code and persistence logic in JPA repositories.
- Check both PostgreSQL and SQL Server implications for entity mappings, migrations, generated columns, and constraint errors.
- Preserve role/subscription authorization and trigger-enforced constraints.
- Update API contracts and OpenAPI when public behavior changes.
- Add or update focused tests for changed behavior and run the relevant Maven checks before committing.
- Review `git status` and stage only files belonging to the current feature-sized change. Make one small, descriptive commit per independently reviewable refactor part.
