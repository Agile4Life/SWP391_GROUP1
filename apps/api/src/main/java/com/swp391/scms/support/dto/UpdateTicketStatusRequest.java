package com.swp391.scms.support.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UpdateTicketStatusRequest {

    @NotBlank(message = "ticket.status.required")
    @Pattern(regexp = "^(open|in_progress|resolved|closed)$", message = "ticket.status.invalid")
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

