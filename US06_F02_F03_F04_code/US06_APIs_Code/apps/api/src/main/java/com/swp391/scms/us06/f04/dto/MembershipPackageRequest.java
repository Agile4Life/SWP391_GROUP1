package com.swp391.scms.us06.f04.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record MembershipPackageRequest(
        @NotBlank(message = "Tên gói không được để trống") @Size(max = 150, message = "Tên gói tối đa 150 ký tự") String name,
        String description,
        @NotNull(message = "Giá không được để trống") @DecimalMin(value = "0.00", inclusive = true, message = "Giá không được âm") BigDecimal price,
        @NotNull(message = "Thời hạn không được để trống") @Min(value = 1, message = "Thời hạn phải lớn hơn 0") Integer durationDays,
        @Min(value = 0, message = "Class credit limit không được âm") Integer classCreditLimit,
        @NotBlank(message = "Status không được để trống") String status,
        Long createdBy
) {}
