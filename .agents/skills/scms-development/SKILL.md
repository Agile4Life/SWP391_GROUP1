---
name: scms-development
description: Implement or review a Sports Center Management System ticket using this repository's React, Spring Boot, SQL Server, and Jira conventions.
---

# SCMS development

Read `AGENTS.md`, the applicable ticket in `AGILE_SCRUM_JIRA_PLAN.md`, and the relevant section of `PROJECT_MASTER_GUIDE.md` before changing code.

## Routing

- For backend screen/API work, use the matching feature package in `apps/api`; define DTOs and validation at the boundary, and map SQL business errors to stable HTTP errors.
- For frontend work, use the matching `apps/web/src/features` directory; use the shared API client and role route shell, and include loading, empty, error and forbidden states.
- For a database change, add a forward migration in `db/migrations` only after checking that it preserves the business triggers and constraints documented in the master guide.

## Project constraints

- SQL Server constraints and triggers are part of the application contract. Never bypass a trigger in application code.
- A feature is not complete until its role/permission check is server-side and its API failure state is visible in the UI.
- Keep a pull request scoped to a Jira key. Document adjacent improvements separately rather than expanding a ticket silently.
