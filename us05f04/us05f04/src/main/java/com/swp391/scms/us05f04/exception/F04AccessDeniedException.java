package com.swp391.scms.us05f04.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class F04AccessDeniedException
        extends RuntimeException {

    public F04AccessDeniedException(String message) {
        super(message);
    }
}