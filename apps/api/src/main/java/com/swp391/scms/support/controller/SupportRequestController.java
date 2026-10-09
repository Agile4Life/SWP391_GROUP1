package com.swp391.scms.support.controller;

import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.common.i18n.MessageService;
import com.swp391.scms.support.dto.SupportRequestResponse;
import com.swp391.scms.support.dto.UpdateTicketStatusRequest;
import com.swp391.scms.support.service.SupportRequestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/support-requests")
public class SupportRequestController {

    private final SupportRequestService supportRequestService;
    private final MessageService messageService;

    public SupportRequestController(SupportRequestService supportRequestService, MessageService messageService) {
        this.supportRequestService = supportRequestService;
        this.messageService = messageService;
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('MANAGER', 'SUPPORT')")
    public ResponseEntity<ApiResponse<SupportRequestResponse>> updateTicketStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTicketStatusRequest request) {
        SupportRequestResponse response = supportRequestService.updateTicketStatus(id, request);
        return ResponseEntity.ok(ApiResponse.ok(
                messageService.getMessage("ticket.status.updated.success"),
                response
        ));
    }
}
