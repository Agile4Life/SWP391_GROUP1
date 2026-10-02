package com.swp391.scms.config.trigger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Component
public class PostgreSqlTriggerProvider implements DatabaseTriggerProvider {

    private static final Logger log = LoggerFactory.getLogger(PostgreSqlTriggerProvider.class);

    @Override
    public boolean supports(String databaseProductName) {
        return databaseProductName != null && databaseProductName.toLowerCase().contains("postgresql");
    }

    @Override
    public void applyTriggers(JdbcTemplate jdbcTemplate) {
        try {
            ClassPathResource resource = new ClassPathResource("db/triggers/postgresql-triggers.sql");
            if (!resource.exists()) {
                return;
            }
            try (InputStream is = resource.getInputStream()) {
                String sql = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                jdbcTemplate.execute(sql);
                log.info("PostgreSQL invariant triggers applied via polymorphism.");
            }
        } catch (Exception e) {
            log.warn("PostgreSQL triggers skipped: {}", e.getMessage());
        }
    }
}
