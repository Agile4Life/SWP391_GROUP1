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

<<<<<<< Updated upstream
    public MembershipController(MembershipService membershipService) {
        this(membershipService, null);
    }

=======
>>>>>>> Stashed changes
    public MembershipController(MembershipService membershipService, MessageService messageService) {
        this.membershipService = membershipService;
        this.messageService = messageService;
    }

<<<<<<< Updated upstream
    private String msg(String key) {
        return messageService != null ? messageService.getMessage(key) : key;
    }

=======
>>>>>>> Stashed changes
    @Operation(summary = "Tạo subscription mới cho member")
    @PostMapping("/subscriptions")
    public ResponseEntity<ApiResponse<MembershipSubscriptionDto>> createSubscription(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @RequestBody Map<String, Object> payload) {
        Long packageId = payload.get("packageId") == null ? null : ((Number) payload.get("packageId")).longValue();
        MembershipSubscriptionDto dto = membershipService.createSubscription(packageId, principal.id());
        return ResponseEntity.status(HttpStatus.CREATED)
<<<<<<< Updated upstream
                .body(ApiResponse.created(msg("membership.subscription.created"), dto));
=======
                .body(ApiResponse.created(messageService.getMessage("membership.subscription.created"), dto));
>>>>>>> Stashed changes
    }

    @Operation(summary = "Gia hạn subscription hiện tại")
    @PostMapping("/subscriptions/{id}/renew")
    public ResponseEntity<ApiResponse<MembershipSubscriptionDto>> renewSubscription(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @PathVariable Long id) {
        MembershipSubscriptionDto dto = membershipService.renewSubscription(id, principal.id());
        return ResponseEntity.status(HttpStatus.CREATED)
<<<<<<< Updated upstream
                .body(ApiResponse.created(msg("membership.subscription.renewed"), dto));
=======
                .body(ApiResponse.created(messageService.getMessage("membership.subscription.renewed"), dto));
>>>>>>> Stashed changes
    }

    @Operation(summary = "Lấy danh sách gói của member")
    @GetMapping("/subscriptions/my")
    public ApiResponse<List<MembershipSubscriptionDto>> getMySubscriptions(
            @AuthenticationPrincipal AuthenticatedPrincipal principal) {
<<<<<<< Updated upstream
        return ApiResponse.ok(msg("membership.subscription.list"), membershipService.getMySubscriptions(principal.id()));
=======
        return ApiResponse.ok(messageService.getMessage("membership.subscription.list"),
                membershipService.getMySubscriptions(principal.id()));
>>>>>>> Stashed changes
    }
}
