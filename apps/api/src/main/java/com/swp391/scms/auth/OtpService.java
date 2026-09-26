package com.swp391.scms.auth;

import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {
    private static final int MAX_ATTEMPTS = 3;

    public record OtpEntry(String code, Instant expireAt, int failedAttempts) {}
    public enum VerifyResult { SUCCESS, EXPIRED_OR_NOT_FOUND, INVALID_CODE, MAX_ATTEMPTS_EXCEEDED }
    public record Status(VerifyResult result, int remainingAttempts) {}

    // Lưu tạm OTP vào RAM (Sau này có thể đổi sang Redis nếu nhóm yêu cầu)
    private final ConcurrentHashMap<String, OtpEntry> cache = new ConcurrentHashMap<>();

    // Sinh mã OTP 6 số
    public String generateOtp(String target) {
        String code = String.format("%06d", new Random().nextInt(999999));
        cache.put(target.toLowerCase(), new OtpEntry(code, Instant.now().plusSeconds(300), 0)); // Sống 5 phút
        System.out.println(">>> [MOCK SMS/EMAIL] Mã OTP gửi tới " + target + " là: " + code);
        return code;
    }

    // Xác thực OTP
    public Status verifyOtp(String target, String code) {
        String key = target.toLowerCase();
        OtpEntry entry = cache.get(key);

        if (entry == null || Instant.now().isAfter(entry.expireAt())) {
            cache.remove(key);
            return new Status(VerifyResult.EXPIRED_OR_NOT_FOUND, 0);
        }
        if (entry.failedAttempts() >= MAX_ATTEMPTS) {
            cache.remove(key);
            return new Status(VerifyResult.MAX_ATTEMPTS_EXCEEDED, 0);
        }
        if (!entry.code().equals(code)) {
            int attempts = entry.failedAttempts() + 1;
            int remaining = MAX_ATTEMPTS - attempts;
            if (remaining <= 0) cache.remove(key);
            else cache.put(key, new OtpEntry(entry.code(), entry.expireAt(), attempts));
            return new Status(remaining <= 0 ? VerifyResult.MAX_ATTEMPTS_EXCEEDED : VerifyResult.INVALID_CODE, remaining);
        }
        cache.remove(key);
        return new Status(VerifyResult.SUCCESS, 0);
    }
}