package com.swp391.scms.config.trigger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

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
        try {
            ClassPathResource resource = new ClassPathResource("db/triggers/sqlserver-triggers.sql");
            if (!resource.exists()) {
                return;
            }
            try (InputStream is = resource.getInputStream()) {
                String fullSql = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                String[] statements = fullSql.split("---SPLIT---");
                for (String statement : statements) {
                    String trimmed = statement.trim();
                    if (!trimmed.isEmpty()) {
                        jdbcTemplate.execute(trimmed);
                    }
                }
                log.info("SQL Server invariant triggers applied via polymorphism.");
            }
        } catch (Exception e) {
            log.warn("SQL Server triggers skipped: {}", e.getMessage());
        }
    }
}
