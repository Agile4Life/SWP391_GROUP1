package com.swp391.scms.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank(message = "Tên đăng nhập không được để trống") @Size(min = 3, message = "Tối thiểu 3 ký tự") String username,
    @NotBlank(message = "Mật khẩu không được để trống") @Size(min = 6, message = "Tối thiểu 6 ký tự") String password,
    @NotBlank(message = "Email không được để trống") @Email(message = "Email không hợp lệ") String email,
    String role
) {}