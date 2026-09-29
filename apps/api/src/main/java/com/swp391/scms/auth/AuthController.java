package com.swp391.scms.auth;

import com.swp391.scms.common.ErrorResponse;
import com.swp391.scms.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Tag(name = "Authentication", description = "Đăng ký tài khoản, đăng nhập JWT, gửi và xác thực mã OTP")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final JwtService jwtService;
    private final OtpService otpService;

    // Giả lập Database tạm thời trong RAM để test trước khi nối với SQL Server
    public record UserRecord(int id, String username, String password, String email, String phone, String role, boolean isActive) {}

    private final List<UserRecord> users = new CopyOnWriteArrayList<>(List.of(
        new UserRecord(1, "admin", "123456", "admin@example.com", "0901234567", "Manager", true),
        new UserRecord(2, "member1", "123456", "member1@example.com", "0912345678", "Member", true)
    ));

    public AuthController(JwtService jwtService, OtpService otpService) {
        this.jwtService = jwtService;
        this.otpService = otpService;
    }

    // API 1: Đăng nhập
    @Operation(summary = "Đăng nhập hệ thống", description = "Xác thực tài khoản và trả về JWT Token cùng vai trò người dùng")
    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginRequest req) {
        var user = users.stream().filter(u -> u.username().equalsIgnoreCase(req.username())).findFirst();
        
        if (user.isEmpty() || !user.get().password().equals(req.password())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(401, "INVALID_CREDENTIALS", "Tên đăng nhập hoặc mật khẩu không chính xác", null));
        }
        if (!user.get().isActive()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponse(403, "ACCOUNT_LOCKED", "Tài khoản của bạn đã bị khóa hoặc chưa kích hoạt", null));
        }

        String token = jwtService.generateToken(user.get().id(), user.get().username(), user.get().role());
        return ResponseEntity.ok(Map.of(
            "token", token, 
            "username", user.get().username(), 
            "role", user.get().role()
        ));
    }

    // API 2: Đăng ký
    @Operation(summary = "Đăng ký tài khoản", description = "Tạo tài khoản hội viên mới và gửi mã kích hoạt")
    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody RegisterRequest req) {
        if (users.stream().anyMatch(u -> u.username().equalsIgnoreCase(req.username()))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(409, "USERNAME_EXISTS", "Username đã tồn tại", null));
        }
        if (users.stream().anyMatch(u -> u.email().equalsIgnoreCase(req.email()))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(409, "EMAIL_EXISTS", "Email đã tồn tại", null));
        }

        var newUser = new UserRecord(users.size() + 1, req.username(), req.password(), req.email(), "", req.role() != null ? req.role() : "Member", false);
        users.add(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
            "message", "Đăng ký thành công. Vui lòng xác thực OTP để kích hoạt",
            "userId", newUser.id(),
            "username", newUser.username()
        ));
    }

    // API 3: Gửi mã OTP
    @Operation(summary = "Gửi mã OTP", description = "Gửi mã OTP 6 chữ số đến email hoặc số điện thoại (hết hạn trong 5 phút)")
    @PostMapping("/send-otp")
    public ResponseEntity<Object> sendOtp(@RequestBody OtpRequest req) {
        if ((req.email() == null || req.email().isBlank()) && (req.phoneNumber() == null || req.phoneNumber().isBlank())) {
            return ResponseEntity.badRequest().body(new ErrorResponse(400, "MISSING_TARGET", "Cần cung cấp Email hoặc Số điện thoại", null));
        }
        String target = (req.email() != null && !req.email().isBlank()) ? req.email().trim() : req.phoneNumber().trim();
        
        String code = otpService.generateOtp(target);

        return ResponseEntity.ok(Map.of(
            "message", "Mã OTP đã được gửi thành công",
            "destination", target,
            "expiresInMinutes", 5,
            "debugOtp", code // Hiện tạm mã OTP ở response để test cho dễ
        ));
    }

    // API 4: Xác thực mã OTP
    @Operation(summary = "Xác thực mã OTP", description = "Xác thực mã OTP và kích hoạt tài khoản hội viên")
    @PostMapping("/verify-otp")
    public ResponseEntity<Object> verifyOtp(@Valid @RequestBody VerifyOtpRequest req) {
        var status = otpService.verifyOtp(req.target(), req.otpCode());

        return switch (status.result()) {
            case EXPIRED_OR_NOT_FOUND -> ResponseEntity.badRequest().body(new ErrorResponse(400, "OTP_EXPIRED", "Mã OTP đã hết hạn hoặc không tồn tại", null));
            case MAX_ATTEMPTS_EXCEEDED -> ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(new ErrorResponse(429, "MAX_ATTEMPTS", "Bạn đã nhập sai OTP quá 3 lần. Vui lòng gửi lại mã mới.", null));
            case INVALID_CODE -> ResponseEntity.badRequest().body(new ErrorResponse(400, "INVALID_OTP", "Mã OTP không chính xác. Bạn còn " + status.remainingAttempts() + " lần thử", null));
            case SUCCESS -> {
                // Logic cập nhật trạng thái isActive = true
                for (int i = 0; i < users.size(); i++) {
                    UserRecord u = users.get(i);
                    if (u.email().equalsIgnoreCase(req.target()) || (u.phone() != null && u.phone().equalsIgnoreCase(req.target()))) {
                        users.set(i, new UserRecord(u.id(), u.username(), u.password(), u.email(), u.phone(), u.role(), true));
                        break;
                    }
                }
                
                yield ResponseEntity.ok(Map.of(
                    "message", "Xác thực OTP thành công. Tài khoản đã được kích hoạt.",
                    "target", req.target(),
                    "isVerified", true
                ));
            }
        };
    }
}