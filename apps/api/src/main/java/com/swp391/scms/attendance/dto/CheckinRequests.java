package com.swp391.scms.attendance.dto;
import jakarta.validation.constraints.NotBlank;
public final class CheckinRequests {
    private CheckinRequests() {}
    public record Scan(@NotBlank String qrCode, String gate) {}
}
