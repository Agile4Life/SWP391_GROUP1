package com.swp391.scms.membership.dto;

import com.swp391.scms.membership.entity.MembershipSubscription;

import java.time.LocalDate;

public record MembershipSubscriptionDto(
        Long id,
        Long memberId,
        Long packageId,
        String status,
        LocalDate startDate,
        LocalDate endDate,
        String qrCode,
        Long previousSubscriptionId
) {
    public static MembershipSubscriptionDto from(MembershipSubscription subscription) {
        return new MembershipSubscriptionDto(
                subscription.getId(),
                subscription.getMember() != null ? subscription.getMember().getUserId() : null,
                subscription.getMembershipPackage() != null ? subscription.getMembershipPackage().getId() : null,
                subscription.getStatus(),
                subscription.getStartDate(),
                subscription.getEndDate(),
                subscription.getQrCode(),
                subscription.getPreviousSubscription() != null ? subscription.getPreviousSubscription().getId() : null
        );
    }
}
