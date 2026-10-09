package com.swp391.scms.support.dto;

import com.swp391.scms.support.entity.SupportRequest;
import java.time.LocalDateTime;

public class SupportRequestResponse {
    private Long id;
    private String subject;
    private String description;
    private String status;
    private LocalDateTime createdAt;

    public SupportRequestResponse(SupportRequest req) {
        this.id = req.getId();
        this.subject = req.getSubject();
        this.description = req.getDescription();
        this.status = req.getStatus();
        this.createdAt = req.getCreatedAt();
    }

    public Long getId() { return id; }
    public String getSubject() { return subject; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}

