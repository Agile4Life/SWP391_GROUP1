package com.swp391.scms.membership.dto;

import jakarta.validation.constraints.NotNull;

public record SubscriptionCreateRequest(
        @NotNull(message = "{validation.membership.package_required}")
        Long packageId
) {
}
