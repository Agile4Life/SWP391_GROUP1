package com.swp391.scms.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record VerifyOtpRequest(
    @NotBlank(message = "Vui lòng cung cấp email hoặc số điện thoại") String target,
    @NotBlank(message = "Mã OTP không được trống") @Size(min = 6, max = 6, message = "OTP phải đúng 6 ký tự") String otpCode
) {}