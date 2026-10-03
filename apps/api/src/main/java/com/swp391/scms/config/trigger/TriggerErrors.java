package com.swp391.scms.config.trigger;

import java.sql.SQLException;

/** Classifies trigger-installation failures. */
final class TriggerErrors {
    private static final String PG_UNDEFINED_TABLE = "42P01";
    private static final int SQLSERVER_INVALID_OBJECT_NAME = 208;

    private TriggerErrors() {}

    /**
     * True when the failure is only "target table is not mapped yet" (entity not created in this
     * sprint). Any other failure means a mandatory invariant trigger is broken and must be fatal.
     */
    static boolean isMissingTable(Throwable failure) {
        for (Throwable t = failure; t != null; t = t.getCause()) {
            if (t instanceof SQLException sql
                    && (PG_UNDEFINED_TABLE.equals(sql.getSQLState()) || sql.getErrorCode() == SQLSERVER_INVALID_OBJECT_NAME)) {
                return true;
            }
        }
        return false;
    }
}
