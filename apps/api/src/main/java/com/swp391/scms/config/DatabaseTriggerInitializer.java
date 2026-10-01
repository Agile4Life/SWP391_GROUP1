package com.swp391.scms.config;

import com.swp391.scms.config.trigger.DatabaseTriggerProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.util.List;

/**
 * Initializes invariant business database triggers after Hibernate Code-First
 * schema generation has completed, dispatching polymorphically to providers.
 */
@Component
public class DatabaseTriggerInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseTriggerInitializer.class);

    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;
    private final List<DatabaseTriggerProvider> triggerProviders;

    public DatabaseTriggerInitializer(DataSource dataSource,
                                      JdbcTemplate jdbcTemplate,
                                      List<DatabaseTriggerProvider> triggerProviders) {
        this.dataSource = dataSource;
        this.jdbcTemplate = jdbcTemplate;
        this.triggerProviders = triggerProviders;
    }

    @Override
    public void run(ApplicationArguments args) {
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            String dbProduct = metaData.getDatabaseProductName();
            log.info("Detected database product: {}", dbProduct);

            boolean providerFound = false;
            for (DatabaseTriggerProvider provider : triggerProviders) {
                if (provider.supports(dbProduct)) {
                    provider.applyTriggers(jdbcTemplate);
                    providerFound = true;
                    break;
                }
            }

            if (!providerFound) {
                log.info("Database {} does not require vendor-specific invariant triggers.", dbProduct);
            }
        } catch (Exception e) {
            log.warn("Could not complete database trigger initialization: {}. " +
                    "Application continues normally.", e.getMessage());
        }
    }
}
