package com.swp391.scms.notifications.dto;

import java.time.LocalDateTime;

public record NotificationDto(
    Long id,
    String title,
    String content,
    String type,
    String referenceId,
    boolean isRead,
    LocalDateTime createdAt
) {}

