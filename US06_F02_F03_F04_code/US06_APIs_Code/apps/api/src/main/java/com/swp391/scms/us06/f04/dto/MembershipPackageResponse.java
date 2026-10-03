package com.swp391.scms.us06.f04.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record MembershipPackageResponse(Long id, String name, String description, BigDecimal price, Integer durationDays, Integer classCreditLimit, String status, Long createdBy, LocalDateTime createdAt, LocalDateTime updatedAt) {}
