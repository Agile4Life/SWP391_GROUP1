package com.swp391.scms.membership.mapper;

import com.swp391.scms.membership.dto.SubscriptionDto;
import com.swp391.scms.membership.entity.MembershipSubscription;
import org.springframework.stereotype.Component;

@Component
public class MembershipSubscriptionMapper {

    public SubscriptionDto toDto(MembershipSubscription subscription) {
        var pkg = subscription.getMembershipPackage();
        return new SubscriptionDto(
                subscription.getId(),
                subscription.getMember().getUserId(),
                pkg.getId(),
                pkg.getName(),
                pkg.getPrice(),
                pkg.getDurationDays(),
                subscription.getPreviousSubscription() != null ? subscription.getPreviousSubscription().getId() : null,
                subscription.getStartDate(),
                subscription.getEndDate(),
                subscription.getStatus(),
                subscription.getQrCode()
        );
    }
}
