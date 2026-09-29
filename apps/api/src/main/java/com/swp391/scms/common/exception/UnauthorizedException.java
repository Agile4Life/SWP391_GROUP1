package com.swp391.scms.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Thrown when an unauthenticated user attempts an action (HTTP 401).
 */
public class UnauthorizedException extends AppException {

    public UnauthorizedException(String message) {
        super(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", message);
    }

    public UnauthorizedException(String errorCode, String message) {
        super(HttpStatus.UNAUTHORIZED, errorCode, message);
    }
}
