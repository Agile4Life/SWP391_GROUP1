package com.swp391.scms.auth;

import com.swp391.scms.common.exception.BadRequestException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@Tag(name = "Authentication", description = "Đăng ký tài khoản, đăng nhập JWT, gửi và xác thực mã OTP")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final boolean debugOtpEnabled;

    public AuthController(AuthService authService,
                          @Value("${app.auth.debug-otp-enabled:false}") boolean debugOtpEnabled) {
        this.authService = authService;
        this.debugOtpEnabled = debugOtpEnabled;
    }

    @Operation(summary = "Đăng nhập hệ thống", description = "Xác thực tài khoản và trả về JWT Token cùng vai trò người dùng")
    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @Operation(summary = "Đăng ký tài khoản", description = "Tạo tài khoản hội viên mới và gửi mã kích hoạt")
    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @Operation(summary = "Gửi mã OTP", description = "Gửi mã OTP 6 chữ số đến email hoặc số điện thoại")
    @PostMapping("/send-otp")
    public ResponseEntity<Object> sendOtp(@Valid @RequestBody OtpRequest request) {
        String target = request.email() != null && !request.email().isBlank()
                ? request.email().trim() : request.phoneNumber();
        if (target == null || target.isBlank()) {
            throw new BadRequestException("MISSING_TARGET", "Cần cung cấp Email hoặc Số điện thoại");
        }
        String code = authService.generateOtp(target);
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Mã OTP đã được tạo thành công");
        response.put("destination", target);
        response.put("expiresInMinutes", 5);
        if (debugOtpEnabled) {
            response.put("debugOtp", code);
        }
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Xác thực mã OTP", description = "Xác thực mã OTP và kích hoạt tài khoản hội viên")
    @PostMapping("/verify-otp")
    public ResponseEntity<Object> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        authService.verifyOtp(request);
        return ResponseEntity.ok(Map.of(
                "message", "Xác thực OTP thành công. Tài khoản đã được kích hoạt.",
                "target", request.target(),
                "isVerified", true));
    }
}