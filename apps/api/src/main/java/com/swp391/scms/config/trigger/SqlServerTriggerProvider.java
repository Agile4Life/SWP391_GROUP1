package com.swp391.scms.config.trigger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Component
public class SqlServerTriggerProvider implements DatabaseTriggerProvider {

    private static final Logger log = LoggerFactory.getLogger(SqlServerTriggerProvider.class);

    @Override
    public boolean supports(String databaseProductName) {
        return databaseProductName != null && databaseProductName.toLowerCase().contains("sql server");
    }

    @Override
    public void applyTriggers(JdbcTemplate jdbcTemplate) {
        ClassPathResource resource = new ClassPathResource("db/triggers/sqlserver-triggers.sql");
        if (!resource.exists()) {
            return;
        }
        try (InputStream is = resource.getInputStream()) {
            String fullSql = new String(is.readAllBytes(), StandardCharsets.UTF_8);
            for (String statement : fullSql.split("---SPLIT---")) {
                String trimmed = statement.trim();
                if (!trimmed.isEmpty()) {
                    execute(jdbcTemplate, trimmed);
                }
            }
            log.info("SQL Server invariant triggers applied via polymorphism.");
        } catch (IOException e) {
            throw new IllegalStateException("Cannot read SQL Server trigger script", e);
        }
    }

    private void execute(JdbcTemplate jdbcTemplate, String statement) {
        try {
            jdbcTemplate.execute(statement);
        } catch (DataAccessException e) {
            if (!TriggerErrors.isMissingTable(e)) {
                throw new IllegalStateException("Mandatory SQL Server trigger failed: " + e.getMessage(), e);
            }
            log.warn("Trigger skipped, target table is not mapped yet: {}", e.getMessage());
        }
    }
}
