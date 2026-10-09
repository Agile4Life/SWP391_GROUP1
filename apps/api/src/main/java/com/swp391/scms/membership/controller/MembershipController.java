package com.swp391.scms.membership.controller;

import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.common.i18n.MessageService;
import com.swp391.scms.membership.dto.MembershipSubscriptionDto;
import com.swp391.scms.membership.service.MembershipService;
import com.swp391.scms.security.AuthenticatedPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "Membership subscriptions", description = "Quản lý gói thành viên")
@RestController
@RequestMapping("/api/v1/memberships")
public class MembershipController {

    private final MembershipService membershipService;
    private final MessageService messageService;

    public MembershipController(MembershipService membershipService) {
        this(membershipService, null);
    }

    public MembershipController(MembershipService membershipService, MessageService messageService) {
        this.membershipService = membershipService;
        this.messageService = messageService;
    }

    private String msg(String key) {
        return messageService != null ? messageService.getMessage(key) : key;
    }

    @Operation(summary = "Tạo subscription mới cho member")
    @PostMapping("/subscriptions")
    public ResponseEntity<ApiResponse<MembershipSubscriptionDto>> createSubscription(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @RequestBody Map<String, Object> payload) {
        Long packageId = payload.get("packageId") == null ? null : ((Number) payload.get("packageId")).longValue();
        MembershipSubscriptionDto dto = membershipService.createSubscription(packageId, principal.id());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(msg("membership.subscription.created"), dto));
    }

    @Operation(summary = "Gia hạn subscription hiện tại")
    @PostMapping("/subscriptions/{id}/renew")
    public ResponseEntity<ApiResponse<MembershipSubscriptionDto>> renewSubscription(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @PathVariable Long id) {
        MembershipSubscriptionDto dto = membershipService.renewSubscription(id, principal.id());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(msg("membership.subscription.renewed"), dto));
    }

    @Operation(summary = "Lấy danh sách gói của member")
    @GetMapping("/subscriptions/my")
    public ApiResponse<List<MembershipSubscriptionDto>> getMySubscriptions(
            @AuthenticationPrincipal AuthenticatedPrincipal principal) {
        return ApiResponse.ok(msg("membership.subscription.list"), membershipService.getMySubscriptions(principal.id()));
    }
}
