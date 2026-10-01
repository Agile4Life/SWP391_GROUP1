package com.swp391.scms.finance.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Schema(description = "Yêu cầu cập nhật trạng thái thanh toán")
public record PaymentStatusUpdateRequest(
        @NotBlank(message = "Trạng thái thanh toán không được để trống")
        @Pattern(regexp = "(?i)^(success|pending|failed|refunded)$",
                message = "Trạng thái phải là success, pending, failed hoặc refunded")
        @Schema(description = "Trạng thái mới của giao dịch (success, pending, failed, refunded)", example = "success")
        String status
) {}
