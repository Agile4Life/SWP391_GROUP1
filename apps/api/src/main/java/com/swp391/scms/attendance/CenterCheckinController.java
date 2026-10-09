package com.swp391.scms.attendance;
import com.swp391.scms.attendance.dto.CheckinRequests;
import com.swp391.scms.attendance.dto.CheckinResponses.CheckinDto;
import com.swp391.scms.attendance.service.CenterCheckinService;
import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.common.i18n.MessageService;
import com.swp391.scms.security.AuthenticatedPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/v1/check-in")
@Tag(name = "Center check-in", description = "QR check-in, checkout and daily history (SCRUM-75)")
public class CenterCheckinController {
    private final CenterCheckinService service; private final MessageService messages;
    public CenterCheckinController(CenterCheckinService service, MessageService messages) { this.service = service; this.messages = messages; }
    @PostMapping("/scan") @Operation(summary = "Scan a membership QR code")
    public ResponseEntity<ApiResponse<CheckinDto>> scan(@AuthenticationPrincipal AuthenticatedPrincipal principal, @Valid @RequestBody CheckinRequests.Scan request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.created(messages.getMessage("success.attendance.checkin_granted"), service.scan(principal, request)));
    }
    @PostMapping("/{id}/checkout") @Operation(summary = "Check out of the center")
    public ApiResponse<CheckinDto> checkout(@AuthenticationPrincipal AuthenticatedPrincipal principal, @PathVariable Long id) {
        return ApiResponse.ok(messages.getMessage("success.attendance.checkout"), service.checkout(principal, id));
    }
    @GetMapping("/history") @Operation(summary = "Get today's check-in history")
    public ApiResponse<List<CheckinDto>> history(@AuthenticationPrincipal AuthenticatedPrincipal principal) { return ApiResponse.ok(messages.getMessage("success.attendance.history"), service.history(principal)); }
}
