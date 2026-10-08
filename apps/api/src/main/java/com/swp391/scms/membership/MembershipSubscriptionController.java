package com.swp391.scms.membership;

import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.common.i18n.MessageService;
import com.swp391.scms.membership.dto.SubscriptionCreateRequest;
import com.swp391.scms.membership.dto.SubscriptionDto;
import com.swp391.scms.membership.service.MembershipSubscriptionService;
import com.swp391.scms.security.AuthenticatedPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Membership Subscriptions", description = "Purchase, renewal and current membership subscription status")
@RestController
@RequestMapping("/api/v1/memberships/subscriptions")
public class MembershipSubscriptionController {

    private final MembershipSubscriptionService service;
    private final MessageService messageService;

    public MembershipSubscriptionController(MembershipSubscriptionService service) {
        this(service, null);
    }

    @org.springframework.beans.factory.annotation.Autowired
    public MembershipSubscriptionController(MembershipSubscriptionService service, MessageService messageService) {
        this.service = service;
        this.messageService = messageService;
    }

    private String msg(String key) {
        return messageService != null ? messageService.getMessage(key) : key;
    }

    @Operation(summary = "Create a membership subscription awaiting payment")
    @PostMapping
    public ResponseEntity<ApiResponse<SubscriptionDto>> create(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @Valid @RequestBody SubscriptionCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(msg("membership.subscription.created"), service.create(principal, request)));
    }

    @Operation(summary = "Renew a membership subscription")
    @PostMapping("/{id}/renew")
    public ResponseEntity<ApiResponse<SubscriptionDto>> renew(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(msg("membership.subscription.renewed"), service.renew(principal, id)));
    }

    @Operation(summary = "Get the authenticated member's subscription history and current status")
    @GetMapping("/my")
    public ApiResponse<List<SubscriptionDto>> getMy(
            @AuthenticationPrincipal AuthenticatedPrincipal principal) {
        return ApiResponse.ok(msg("membership.subscription.list"), service.getMy(principal));
    }
}
