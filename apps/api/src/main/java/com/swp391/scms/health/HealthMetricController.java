package com.swp391.scms.health;

import com.swp391.scms.common.ErrorResponse;
import com.swp391.scms.health.dto.HealthMetricDto;
import com.swp391.scms.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "Health Metrics", description = "Quản lý và ghi nhận chỉ số sức khỏe của hội viên")
@RestController
@RequestMapping("/api/v1/members/{memberId}/health-metrics")
public class HealthMetricController {

    private final HealthMetricService healthMetricService;
    private final JwtService jwtService;

    public HealthMetricController(HealthMetricService healthMetricService, JwtService jwtService) {
        this.healthMetricService = healthMetricService;
        this.jwtService = jwtService;
    }

    private Integer getCurrentUserId(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized");
        }
        String token = authHeader.substring(7);
        Integer userId = jwtService.extractUserId(token);
        if (userId == null) {
            throw new RuntimeException("Invalid token");
        }
        return userId;
    }

    private String getCurrentUserRole(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized");
        }
        String token = authHeader.substring(7);
        return jwtService.extractRole(token);
    }

    @Operation(summary = "Xem lịch sử chỉ số sức khỏe", description = "Lấy danh sách các chỉ số sức khỏe đã đo của hội viên")
    @GetMapping
    public ResponseEntity<?> getMetrics(
            @PathVariable Long memberId,
            @RequestHeader("Authorization") String authHeader) {
        try {
            Long currentUserId = getCurrentUserId(authHeader).longValue();
            String currentUserRole = getCurrentUserRole(authHeader);
            List<HealthMetricDto> metrics = healthMetricService.getMetrics(memberId, currentUserId, currentUserRole);
            return ResponseEntity.ok(Map.of("message", "Lấy dữ liệu sức khỏe thành công", "data", metrics));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(400, "BAD_REQUEST", e.getMessage(), null));
        } catch (RuntimeException e) {
            if (e.getMessage().contains("quyền")) {
                return ResponseEntity.status(403).body(new ErrorResponse(403, "FORBIDDEN", e.getMessage(), null));
            }
            return ResponseEntity.status(401).body(new ErrorResponse(401, "UNAUTHORIZED", "Không có quyền truy cập: " + e.getMessage(), null));
        }
    }

    @Operation(summary = "Thêm chỉ số sức khỏe mới", description = "Ghi nhận chỉ số thể chất mới (chiều cao, cân nặng, huyết áp, v.v.)")
    @PostMapping
    public ResponseEntity<?> addMetric(
            @PathVariable Long memberId,
            @Valid @RequestBody HealthMetricDto request,
            @RequestHeader("Authorization") String authHeader) {
        try {
            Long currentUserId = getCurrentUserId(authHeader).longValue();
            String currentUserRole = getCurrentUserRole(authHeader);
            HealthMetricDto newMetric = healthMetricService.addMetric(memberId, request, currentUserId, currentUserRole);
            return ResponseEntity.ok(Map.of("message", "Thêm dữ liệu sức khỏe thành công", "data", newMetric));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(400, "VALIDATION_FAILED", e.getMessage(), null));
        } catch (RuntimeException e) {
            if (e.getMessage().contains("quyền")) {
                return ResponseEntity.status(403).body(new ErrorResponse(403, "FORBIDDEN", e.getMessage(), null));
            }
            return ResponseEntity.status(401).body(new ErrorResponse(401, "UNAUTHORIZED", "Lỗi xử lý: " + e.getMessage(), null));
        }
    }
}
