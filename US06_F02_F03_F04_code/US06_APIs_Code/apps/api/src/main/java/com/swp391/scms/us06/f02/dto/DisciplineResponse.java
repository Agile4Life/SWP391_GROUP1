package com.swp391.scms.us06.f02.dto;

import java.time.LocalDateTime;

public record DisciplineResponse(Long id, String name, String description, LocalDateTime createdAt) {}
