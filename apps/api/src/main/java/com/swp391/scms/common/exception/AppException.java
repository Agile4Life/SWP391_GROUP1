package com.swp391.scms.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Base custom runtime exception for SCMS application.
 */
public class AppException extends RuntimeException {

    private final HttpStatus status;
    private final String errorCode;
    private final Object details;

    public AppException(HttpStatus status, String errorCode, String message, Object details) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        this.details = details;
    }

    public AppException(HttpStatus status, String errorCode, String message) {
        this(status, errorCode, message, null);
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public Object getDetails() {
        return details;
    }
}
