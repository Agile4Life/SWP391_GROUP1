package com.swp391.scms.users;

import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.common.i18n.MessageService;
import com.swp391.scms.security.AuthenticatedPrincipal;
import com.swp391.scms.users.dto.ProfileDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Profile", description = "Hồ sơ cá nhân của người dùng")
@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final MessageService messageService;

    public ProfileController(ProfileService profileService) {
        this(profileService, null);
    }

    public ProfileController(ProfileService profileService, MessageService messageService) {
        this.profileService = profileService;
        this.messageService = messageService;
    }

    private String msg(String key) {
        return messageService != null ? messageService.getMessage(key) : key;
    }

    @Operation(summary = "Xem hồ sơ cá nhân", description = "Lấy thông tin cá nhân của người dùng hiện tại từ JWT")
    @GetMapping
    public ApiResponse<ProfileDto> getMyProfile(@AuthenticationPrincipal AuthenticatedPrincipal principal) {
        return ApiResponse.ok(msg("users.profile.get.success"), profileService.getProfile(principal.id()));
    }

    @Operation(summary = "Cập nhật hồ sơ cá nhân", description = "Chỉnh sửa thông tin cá nhân, mục tiêu tập luyện của người dùng")
    @PutMapping
    public ApiResponse<ProfileDto> updateMyProfile(@AuthenticationPrincipal AuthenticatedPrincipal principal,
                                                   @Valid @RequestBody ProfileDto request) {
        return ApiResponse.ok(msg("users.profile.update.success"), profileService.updateProfile(principal.id(), request));
    }
}