package com.swp391.scms.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DatabaseMetaData;

/**
 * Initializes invariant business database triggers after Hibernate Code-First
 * schema generation has completed.
 */
@Component
public class DatabaseTriggerInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseTriggerInitializer.class);

    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;

    public DatabaseTriggerInitializer(DataSource dataSource, JdbcTemplate jdbcTemplate) {
        this.dataSource = dataSource;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(ApplicationArguments args) {
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            String dbProduct = metaData.getDatabaseProductName();
            log.info("Detected database product: {}", dbProduct);

            if (dbProduct != null && dbProduct.toLowerCase().contains("postgresql")) {
                applyPostgresTriggers();
            } else if (dbProduct != null && dbProduct.toLowerCase().contains("sql server")) {
                applySqlServerTriggers();
            } else {
                log.info("Database {} does not require vendor-specific invariant triggers.", dbProduct);
            }
        } catch (Exception e) {
            log.warn("Could not complete database trigger initialization: {}. " +
                    "Application continues normally.", e.getMessage());
        }
    }

    private void applyPostgresTriggers() {
        try {
            ClassPathResource resource = new ClassPathResource("db/triggers/postgresql-triggers.sql");
            if (!resource.exists()) {
                return;
            }
            try (InputStream is = resource.getInputStream()) {
                String sql = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                jdbcTemplate.execute(sql);
                log.info("PostgreSQL invariant business triggers applied successfully.");
            }
        } catch (Exception e) {
            log.warn("PostgreSQL triggers skipped: {}", e.getMessage());
        }
    }

    private void applySqlServerTriggers() {
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
                log.info("SQL Server invariant business triggers applied successfully.");
            }
        } catch (Exception e) {
            log.warn("SQL Server triggers skipped: {}", e.getMessage());
        }
    }
}
