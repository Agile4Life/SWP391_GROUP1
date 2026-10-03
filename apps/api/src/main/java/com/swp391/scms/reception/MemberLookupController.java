package com.swp391.scms.reception;

import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.common.i18n.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Reception", description = "Receptionist tools: quick member lookup")
@RestController
@RequestMapping("/api/v1/members")
public class MemberLookupController {

    private final MemberLookupService service;
    private final MessageService messageService;

    public MemberLookupController(MemberLookupService service) {
        this(service, null);
    }

    public MemberLookupController(MemberLookupService service, MessageService messageService) {
        this.service = service;
        this.messageService = messageService;
    }

    @Operation(summary = "Quick member lookup by code, name, email or phone (max 20 results)")
    @GetMapping("/lookup")
    public ApiResponse<List<MemberLookupDto>> lookup(@RequestParam("q") String query) {
        String message = messageService != null
                ? messageService.getMessageOrDefault("reception.lookup.success", "Member lookup completed")
                : "Member lookup completed";
        return ApiResponse.ok(message, service.search(query));
    }
}