US06 F02/F03/F04 - standalone new classes

Copy the folder:
apps/api/src/main/java/com/swp391/scms/us06
into your group's:
apps/api/src/main/java/com/swp391/scms/us06

No existing teammate class is overwritten.

F02 endpoints: /api/v1/disciplines
F03 endpoints: /api/v1/rooms
F04 endpoints: /api/v1/membership-packages

The project already has JdbcTemplate through spring-jdbc transitively from Spring Boot starters, so no pom change is intended.
