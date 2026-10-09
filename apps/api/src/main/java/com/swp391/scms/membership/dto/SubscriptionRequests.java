package com.swp391.scms.membership.dto;

import jakarta.validation.constraints.NotNull;

public final class SubscriptionRequests {
    private SubscriptionRequests() {}
    public record Create(@NotNull Long packageId) {}
}
