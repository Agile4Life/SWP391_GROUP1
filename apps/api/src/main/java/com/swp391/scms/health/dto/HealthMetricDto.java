package com.swp391.scms.health.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record HealthMetricDto(
    Long id,
    @NotBlank(message = "Tên chỉ số không được để trống")
    String metricName,
    @NotNull(message = "Giá trị chỉ số không được để trống")
    @DecimalMin(value = "0.01", message = "Giá trị phải lớn hơn 0")
    BigDecimal metricValue,
    String unit,
    Long recordedBy,
    LocalDateTime recordedAt
) {}
