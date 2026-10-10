package com.swp391.scms.attendance.dto;
<<<<<<< Updated upstream
import jakarta.validation.constraints.NotBlank;
public final class CheckinRequests {
    private CheckinRequests() {}
    public record Scan(@NotBlank String qrCode, String gate) {}
=======

import jakarta.validation.constraints.NotBlank;

public final class CheckinRequests {

    private CheckinRequests() {}

    public record Scan(
            @NotBlank(message = "{validation.attendance.qr_code.not_blank}")
            String qrCode,
            String gate
    ) {}
>>>>>>> Stashed changes
}
