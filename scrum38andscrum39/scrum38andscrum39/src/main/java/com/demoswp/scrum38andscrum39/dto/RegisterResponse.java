package com.demoswp.scrum38andscrum39.dto;

public class RegisterResponse {

    private String message;
    private Long userId;
    private String email;
    private String phone;
    private String status;
    private String role;

    public RegisterResponse() {
    }

    public RegisterResponse(
            String message,
            Long userId,
            String email,
            String phone,
            String status,
            String role) {

        this.message = message;
        this.userId = userId;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getStatus() {
        return status;
    }

    public String getRole() {
        return role;
    }
}
