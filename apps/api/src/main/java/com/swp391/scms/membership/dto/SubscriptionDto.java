package com.swp391.scms.membership.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record SubscriptionDto(
        Long id,
        Long memberId,
        Long packageId,
        String packageName,
        BigDecimal packagePrice,
        Integer durationDays,
        Long previousSubscriptionId,
        LocalDate startDate,
        LocalDate endDate,
        String status,
        String qrCode
) {
}
