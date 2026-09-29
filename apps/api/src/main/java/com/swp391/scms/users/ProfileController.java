package com.swp391.scms.users;

import com.swp391.scms.common.ErrorResponse;
import com.swp391.scms.security.JwtService;
import com.swp391.scms.users.dto.ProfileDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "Profile", description = "Hồ sơ cá nhân của người dùng")
@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final JwtService jwtService;

    public ProfileController(ProfileService profileService, JwtService jwtService) {
        this.profileService = profileService;
        this.jwtService = jwtService;
    }

    private Long getCurrentUserId(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized");
        }
        String token = authHeader.substring(7);
        Integer userId = jwtService.extractUserId(token);
        if (userId == null) {
            throw new RuntimeException("Invalid token");
        }
        return userId.longValue();
    }

    @Operation(summary = "Xem hồ sơ cá nhân", description = "Lấy thông tin cá nhân của người dùng hiện tại từ JWT")
    @GetMapping
    public ResponseEntity<?> getMyProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            Long userId = getCurrentUserId(authHeader);
            ProfileDto profile = profileService.getProfile(userId);
            return ResponseEntity.ok(Map.of("message", "Lấy profile thành công", "data", profile));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ErrorResponse(401, "UNAUTHORIZED", "Không có quyền truy cập: " + e.getMessage(), null));
        }
    }

    @Operation(summary = "Cập nhật hồ sơ cá nhân", description = "Chỉnh sửa thông tin cá nhân, mục tiêu tập luyện của người dùng")
    @PutMapping
    public ResponseEntity<?> updateMyProfile(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ProfileDto request) {
        try {
            Long userId = getCurrentUserId(authHeader);
            ProfileDto updatedProfile = profileService.updateProfile(userId, request);
            return ResponseEntity.ok(Map.of("message", "Cập nhật profile thành công", "data", updatedProfile));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ErrorResponse(401, "UNAUTHORIZED", "Không có quyền truy cập: " + e.getMessage(), null));
        }
    }
}
