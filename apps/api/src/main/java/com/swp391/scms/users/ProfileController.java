package com.swp391.scms.users;

import com.swp391.scms.security.AuthenticatedPrincipal;
import com.swp391.scms.users.dto.ProfileDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "Profile", description = "Hồ sơ cá nhân của người dùng")
@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @Operation(summary = "Xem hồ sơ cá nhân", description = "Lấy thông tin cá nhân của người dùng hiện tại từ JWT")
    @GetMapping
    public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal AuthenticatedPrincipal principal) {
        ProfileDto profile = profileService.getProfile(principal.id());
        return ResponseEntity.ok(Map.of("message", "Lấy profile thành công", "data", profile));
    }

    @Operation(summary = "Cập nhật hồ sơ cá nhân", description = "Chỉnh sửa thông tin cá nhân, mục tiêu tập luyện của người dùng")
    @PutMapping
    public ResponseEntity<?> updateMyProfile(@AuthenticationPrincipal AuthenticatedPrincipal principal,
                                             @Valid @RequestBody ProfileDto request) {
        ProfileDto updatedProfile = profileService.updateProfile(principal.id(), request);
        return ResponseEntity.ok(Map.of("message", "Cập nhật profile thành công", "data", updatedProfile));
    }
}