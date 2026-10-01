package com.swp391.scms.common.exception;

import org.springframework.http.HttpStatus;

public class ServiceUnavailableException extends AppException {
    public ServiceUnavailableException(String message) {
        super(HttpStatus.SERVICE_UNAVAILABLE, "SERVICE_UNAVAILABLE", message);
    }
}
